<template>
  <div>
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <h1 class="text-3xl font-bold">Gerenciar Áreas</h1>
      <button @click="openCreateModal" class="btn-primary w-full sm:w-auto">
        + Nova Área
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      <p class="text-gray-600 mt-4">Carregando áreas...</p>
    </div>

    <!-- Empty State -->
    <div v-else-if="areas.length === 0" class="card text-center py-12">
      <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
      </svg>
      <h3 class="text-lg font-semibold text-gray-900 mb-2">Nenhuma área cadastrada</h3>
      <p class="text-gray-600 mb-4">Comece criando sua primeira área</p>
      <button @click="openCreateModal" class="btn-primary">
        + Criar Primeira Área
      </button>
    </div>

    <!-- Areas Table (Desktop) -->
    <div v-else class="card overflow-hidden">
      <div class="hidden md:block overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Código</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="area in areas" :key="area.id" class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="font-mono font-semibold text-primary">{{ area.codigo }}</span>
              </td>
              <td class="px-6 py-4">
                <span class="text-gray-900">{{ area.nome }}</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button @click="openEditModal(area)" class="text-primary hover:text-blue-700 mr-4">
                  Editar
                </button>
                <button @click="confirmDelete(area)" class="text-danger hover:text-red-700">
                  Excluir
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Areas Cards (Mobile) -->
      <div class="md:hidden space-y-4 p-4">
        <div
          v-for="area in areas"
          :key="area.id"
          class="bg-gray-50 rounded-lg p-4"
        >
          <div class="flex justify-between items-start mb-3">
            <div>
              <p class="font-mono font-semibold text-primary">{{ area.codigo }}</p>
              <p class="text-gray-900 mt-1">{{ area.nome }}</p>
            </div>
          </div>
          <div class="flex gap-2">
            <button @click="openEditModal(area)" class="btn-secondary flex-1 text-sm">
              Editar
            </button>
            <button @click="confirmDelete(area)" class="btn-danger flex-1 text-sm">
              Excluir
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Create/Edit -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      @click.self="closeModal"
    >
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <h2 class="text-2xl font-bold mb-4">
          {{ editingArea ? 'Editar Área' : 'Nova Área' }}
        </h2>

        <form @submit.prevent="saveArea">
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Código *
            </label>
            <input
              v-model="form.codigo"
              type="text"
              required
              class="input-field"
              placeholder="Ex: A001"
              maxlength="20"
            />
          </div>

          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Nome *
            </label>
            <input
              v-model="form.nome"
              type="text"
              required
              class="input-field"
              placeholder="Ex: Armazém Principal"
              maxlength="100"
            />
          </div>

          <div class="flex gap-3">
            <button type="button" @click="closeModal" class="btn-secondary flex-1">
              Cancelar
            </button>
            <button type="submit" :disabled="saving" class="btn-primary flex-1">
              {{ saving ? 'Salvando...' : 'Salvar' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div
      v-if="showDeleteConfirm"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      @click.self="showDeleteConfirm = false"
    >
      <div class="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <h2 class="text-2xl font-bold mb-4 text-danger">Confirmar Exclusão</h2>
        <p class="text-gray-700 mb-6">
          Tem certeza que deseja excluir a área <strong>{{ areaToDelete?.nome }}</strong> ({{ areaToDelete?.codigo }})?
        </p>
        <p class="text-sm text-gray-600 mb-6">
          Esta ação não pode ser desfeita.
        </p>
        <div class="flex gap-3">
          <button @click="showDeleteConfirm = false" class="btn-secondary flex-1">
            Cancelar
          </button>
          <button @click="executeDelete" :disabled="deleting" class="btn-danger flex-1">
            {{ deleting ? 'Excluindo...' : 'Excluir' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { listenToAreas, createArea, updateArea, deleteArea } from '../firebase/config'

export default {
  name: 'Areas',
  data() {
    return {
      areas: [],
      showModal: false,
      showDeleteConfirm: false,
      editingArea: null,
      areaToDelete: null,
      form: {
        codigo: '',
        nome: ''
      },
      loading: true,
      saving: false,
      deleting: false,
      unsubscribe: null
    }
  },
  mounted() {
    console.log('🔄 Iniciando listener de áreas...')
    this.unsubscribe = listenToAreas((areas) => {
      console.log('✅ Áreas recebidas:', areas.length, areas)
      this.areas = areas
      this.loading = false
    })
  },
  beforeUnmount() {
    if (this.unsubscribe) this.unsubscribe()
  },
  methods: {
    openCreateModal() {
      this.editingArea = null
      this.form = { codigo: '', nome: '' }
      this.showModal = true
    },
    openEditModal(area) {
      this.editingArea = area
      this.form = { codigo: area.codigo, nome: area.nome }
      this.showModal = true
    },
    closeModal() {
      this.showModal = false
      this.editingArea = null
      this.form = { codigo: '', nome: '' }
    },
    async saveArea() {
      this.saving = true
      
      try {
        if (this.editingArea) {
          // Update
          console.log('🔄 Atualizando área:', this.editingArea.id, this.form)
          await updateArea(this.editingArea.id, this.form)
          console.log('✅ Área atualizada com sucesso!')
          alert('Área atualizada com sucesso!')
        } else {
          // Create
          console.log('🔄 Criando área:', this.form)
          await createArea(this.form)
          console.log('✅ Área criada com sucesso!')
          alert('Área criada com sucesso!')
        }
        this.closeModal()
      } catch (error) {
        console.error('❌ Erro ao salvar área:', error)
        alert('Erro ao salvar área: ' + error.message)
      } finally {
        this.saving = false
      }
    },
    confirmDelete(area) {
      this.areaToDelete = area
      this.showDeleteConfirm = true
    },
    async executeDelete() {
      this.deleting = true
      
      try {
        console.log('🔄 Excluindo área:', this.areaToDelete.id)
        await deleteArea(this.areaToDelete.id)
        console.log('✅ Área excluída com sucesso!')
        alert('Área excluída com sucesso!')
        this.showDeleteConfirm = false
        this.areaToDelete = null
      } catch (error) {
        console.error('❌ Erro ao excluir área:', error)
        alert('Erro ao excluir área: ' + error.message)
      } finally {
        this.deleting = false
      }
    }
  }
}
</script>
