<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">Dashboard</h1>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="card">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-600 text-sm">Total de Sessões</p>
            <p class="text-3xl font-bold text-gray-900 mt-1">{{ stats.totalSessions }}</p>
          </div>
          <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
            </svg>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-600 text-sm">Tags Escaneadas</p>
            <p class="text-3xl font-bold text-gray-900 mt-1">{{ stats.totalTags }}</p>
          </div>
          <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
            </svg>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-600 text-sm">Total de Leituras</p>
            <p class="text-3xl font-bold text-gray-900 mt-1">{{ stats.totalReads }}</p>
          </div>
          <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-600 text-sm">Pendentes</p>
            <p class="text-3xl font-bold text-gray-900 mt-1">{{ stats.pending }}</p>
          </div>
          <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Sessions -->
    <div class="card mb-8">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-xl font-semibold">Sessões Recentes</h2>
        <router-link to="/items" class="text-primary hover:underline text-sm">Ver todas</router-link>
      </div>

      <div v-if="loading" class="text-center py-8 text-gray-500">
        Carregando...
      </div>

      <div v-else-if="recentSessions.length === 0" class="text-center py-8 text-gray-500">
        Nenhuma sessão encontrada
      </div>

      <div v-else class="space-y-3">
        <div
          v-for="session in recentSessions"
          :key="session.id"
          class="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <div class="flex-1">
            <div class="flex items-center gap-3">
              <h3 class="font-semibold text-primary">{{ session.areaNome }}</h3>
              <span class="text-xs text-gray-500">{{ session.areaCodigo }}</span>
              <span
                class="text-xs px-2 py-1 rounded-full"
                :class="session.tipo === 'RFID' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'"
              >
                {{ session.tipo }}
              </span>
            </div>
            <p class="text-sm text-gray-600 mt-1">
              {{ formatDate(session.startTime) }} • {{ session.tagsUnicas }} tags • {{ session.totalLeituras }} leituras
            </p>
          </div>
          <div>
            <span
              class="inline-block w-3 h-3 rounded-full"
              :class="session.sincronizado ? 'bg-secondary' : 'bg-danger'"
              :title="session.sincronizado ? 'Sincronizado' : 'Pendente'"
            ></span>
          </div>
        </div>
      </div>
    </div>

    <!-- Areas Overview -->
    <div class="card">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-xl font-semibold">Áreas Cadastradas</h2>
        <router-link to="/areas" class="text-primary hover:underline text-sm">Gerenciar</router-link>
      </div>

      <div v-if="loadingAreas" class="text-center py-8 text-gray-500">
        Carregando...
      </div>

      <div v-else-if="areas.length === 0" class="text-center py-8 text-gray-500">
        Nenhuma área cadastrada
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="area in areas"
          :key="area.id"
          class="p-4 bg-gray-50 rounded-lg"
        >
          <h3 class="font-semibold text-gray-900">{{ area.nome }}</h3>
          <p class="text-sm text-gray-600 mt-1">Código: {{ area.codigo }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { listenToSessions, listenToAreas } from '../firebase/config'

export default {
  name: 'Dashboard',
  data() {
    return {
      sessions: [],
      areas: [],
      loading: true,
      loadingAreas: true,
      unsubscribeSessions: null,
      unsubscribeAreas: null
    }
  },
  computed: {
    stats() {
      const totalSessions = this.sessions.length
      const totalTags = this.sessions.reduce((sum, s) => sum + (s.tagsUnicas || 0), 0)
      const totalReads = this.sessions.reduce((sum, s) => sum + (s.totalLeituras || 0), 0)
      const pending = this.sessions.filter(s => !s.sincronizado).length

      return { totalSessions, totalTags, totalReads, pending }
    },
    recentSessions() {
      return this.sessions.slice(0, 5)
    }
  },
  mounted() {
    // Realtime listeners
    this.unsubscribeSessions = listenToSessions((sessions) => {
      this.sessions = sessions
      this.loading = false
    })

    this.unsubscribeAreas = listenToAreas((areas) => {
      this.areas = areas
      this.loadingAreas = false
    })
  },
  beforeUnmount() {
    if (this.unsubscribeSessions) this.unsubscribeSessions()
    if (this.unsubscribeAreas) this.unsubscribeAreas()
  },
  methods: {
    formatDate(timestamp) {
      return new Date(timestamp).toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
  }
}
</script>
