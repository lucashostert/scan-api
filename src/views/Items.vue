<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">Itens Escaneados</h1>
    
    <!-- Search Bar -->
    <div class="card mb-6">
      <input 
        v-model="searchQuery"
        type="text"
        placeholder="Buscar por área, código, sessão..."
        class="input-field"
      />
    </div>

    <!-- Filter Chips -->
    <div class="flex flex-wrap gap-2 mb-6">
      <button
        @click="filterType = 'TODOS'"
        class="px-4 py-2 rounded-full text-sm font-medium transition-colors"
        :class="filterType === 'TODOS' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'"
      >
        Todos
      </button>
      <button
        @click="filterType = 'RFID'"
        class="px-4 py-2 rounded-full text-sm font-medium transition-colors"
        :class="filterType === 'RFID' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'"
      >
        RFID
      </button>
      <button
        @click="filterType = 'BARCODE'"
        class="px-4 py-2 rounded-full text-sm font-medium transition-colors"
        :class="filterType === 'BARCODE' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'"
      >
        Código de Barras
      </button>
    </div>

    <!-- Result Count -->
    <p class="text-sm text-gray-600 mb-4">
      {{ filteredSessions.length }} sessões encontradas
    </p>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      <p class="text-gray-600 mt-4">Carregando sessões...</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="filteredSessions.length === 0" class="card text-center py-12">
      <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
      <h3 class="text-lg font-semibold text-gray-900 mb-2">Nenhuma sessão encontrada</h3>
      <p class="text-gray-600">Tente ajustar os filtros de busca</p>
    </div>

    <!-- Sessions List -->
    <div v-else class="space-y-4">
      <div
        v-for="session in filteredSessions"
        :key="session.id"
        class="card hover:shadow-md transition-shadow"
      >
        <!-- Session Header -->
        <div
          @click="toggleExpand(session.id)"
          class="flex items-center justify-between cursor-pointer"
        >
          <div class="flex-1">
            <div class="flex items-center gap-3 mb-2">
              <h3 class="text-lg font-semibold text-primary">{{ session.areaNome }}</h3>
              <span class="text-sm text-gray-500">{{ session.areaCodigo }}</span>
              <span
                class="text-xs px-2 py-1 rounded-full font-medium"
                :class="session.tipo === 'RFID' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'"
              >
                {{ session.tipo }}
              </span>
              <span
                class="inline-block w-3 h-3 rounded-full bg-secondary"
                title="Sincronizado"
              ></span>
            </div>
            <div class="flex items-center gap-4 text-sm text-gray-600">
              <span>📅 {{ formatDate(session.startTime) }}</span>
              <span>🏷️ {{ session.tagsUnicas }} tags</span>
              <span>📊 {{ session.totalLeituras }} leituras</span>
            </div>
          </div>
          <div>
            <svg
              class="w-6 h-6 text-gray-400 transition-transform"
              :class="{ 'rotate-90': expandedSessions.includes(session.id) }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </div>
        </div>

        <!-- Expanded Items List -->
        <div
          v-if="expandedSessions.includes(session.id)"
          class="mt-4 pt-4 border-t border-gray-200"
        >
          <h4 class="font-semibold mb-3">Itens Escaneados:</h4>
          
          <div v-if="!getFilteredItems(session).length" class="text-center py-4 text-gray-500">
            Nenhum item encontrado
          </div>

          <div v-else class="space-y-2">
            <div
              v-for="(item, codigo) in getFilteredItems(session)"
              :key="codigo"
              class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div class="flex-1">
                <p class="font-mono text-sm font-semibold text-gray-900">{{ item.codigo || codigo }}</p>
                <div class="flex items-center gap-3 mt-1 text-xs text-gray-600">
                  <span>Leituras: {{ item.readCount || 0 }}</span>
                  <span v-if="item.rssiMedio">RSSI: {{ item.rssiMedio }} dBm</span>
                </div>
              </div>
              <span
                class="text-xs px-2 py-1 rounded-full font-medium"
                :class="item.tipo === 'RFID' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'"
              >
                {{ item.tipo }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { listenToSessions } from '../firebase/config'

export default {
  name: 'Items',
  data() {
    return {
      sessions: [],
      searchQuery: '',
      filterType: 'TODOS',
      filterSync: 'TODOS',
      expandedSessions: [],
      loading: true,
      unsubscribe: null
    }
  },
  watch: {
    searchQuery(newVal) {
      // Auto-expandir quando houver busca
      if (newVal.trim()) {
        this.expandedSessions = this.filteredSessions.map(s => s.id)
      } else {
        this.expandedSessions = []
      }
    }
  },
  computed: {
    filteredSessions() {
      let filtered = this.sessions

      // Filter by type
      if (this.filterType !== 'TODOS') {
        filtered = filtered.filter(s => s.tipo === this.filterType)
      }

      // Filter by sync status
      if (this.filterSync === 'SINCRONIZADO') {
        filtered = filtered.filter(s => s.sincronizado)
      } else if (this.filterSync === 'PENDENTE') {
        filtered = filtered.filter(s => !s.sincronizado)
      }

      // Filter by search query
      if (this.searchQuery.trim()) {
        const query = this.searchQuery.toLowerCase()
        filtered = filtered.filter(s => {
          // Search in area name and code
          if (s.areaNome?.toLowerCase().includes(query)) return true
          if (s.areaCodigo?.toLowerCase().includes(query)) return true
          if (s.tipo?.toLowerCase().includes(query)) return true
          
          // Search in items
          if (s.items) {
            for (const codigo in s.items) {
              if (codigo.toLowerCase().includes(query)) return true
              if (s.items[codigo].codigo?.toLowerCase().includes(query)) return true
            }
          }
          
          return false
        })
      }

      return filtered
    }
  },
  mounted() {
    this.unsubscribe = listenToSessions((sessions) => {
      this.sessions = sessions
      this.loading = false
    })
  },
  beforeUnmount() {
    if (this.unsubscribe) this.unsubscribe()
  },
  methods: {
    toggleExpand(sessionId) {
      const index = this.expandedSessions.indexOf(sessionId)
      if (index > -1) {
        this.expandedSessions.splice(index, 1)
      } else {
        this.expandedSessions.push(sessionId)
      }
    },
    formatDate(timestamp) {
      return new Date(timestamp).toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    },
    isSearchingForItemCode() {
      if (!this.searchQuery.trim()) return false
      const query = this.searchQuery
      
      // Se tem números, provavelmente é código
      if (/\d/.test(query)) return true
      
      // Se tem caracteres especiais típicos de códigos
      if (/[-_/\\.]/.test(query)) return true
      
      // Se tem letras E números misturados
      if (/[a-zA-Z]/.test(query) && /\d/.test(query)) return true
      
      return false
    },
    getFilteredItems(session) {
      if (!session.items) return []
      
      const items = Object.entries(session.items).map(([codigo, item]) => ({
        ...item,
        codigo: item.codigo || codigo
      }))
      
      // Se não está buscando por código, mostra todos
      if (!this.isSearchingForItemCode()) {
        return items
      }
      
      // Filtrar apenas itens que correspondem à busca
      const query = this.searchQuery.toLowerCase()
      return items.filter(item => 
        item.codigo?.toLowerCase().includes(query)
      )
    }
  }
}
</script>

<style scoped>
.rotate-90 {
  transform: rotate(90deg);
}
</style>
