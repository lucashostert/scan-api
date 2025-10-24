<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Mobile Header -->
    <header class="lg:hidden bg-white shadow-sm sticky top-0 z-50">
      <div class="flex items-center justify-between px-4 py-3">
        <h1 class="text-xl font-bold text-primary">Scan App Admin</h1>
        <button @click="mobileMenuOpen = !mobileMenuOpen" class="p-2">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      </div>
      
      <!-- Mobile Menu -->
      <nav v-show="mobileMenuOpen" class="border-t border-gray-200 pb-3">
        <router-link
          v-for="item in menuItems"
          :key="item.path"
          :to="item.path"
          @click="mobileMenuOpen = false"
          class="flex items-center px-4 py-3 hover:bg-gray-50 transition-colors"
          active-class="bg-blue-50 text-primary border-l-4 border-primary"
        >
          <span v-html="item.icon" class="w-6 h-6 mr-3"></span>
          <span class="font-medium">{{ item.name }}</span>
        </router-link>
      </nav>
    </header>

    <div class="lg:flex">
      <!-- Desktop Sidebar -->
      <aside class="hidden lg:block w-64 bg-white shadow-sm min-h-screen sticky top-0">
        <div class="p-6 border-b border-gray-200">
          <h1 class="text-2xl font-bold text-primary">Scan App</h1>
          <p class="text-sm text-gray-600 mt-1">Painel Administrativo</p>
        </div>
        
        <nav class="p-4">
          <router-link
            v-for="item in menuItems"
            :key="item.path"
            :to="item.path"
            class="flex items-center px-4 py-3 rounded-lg mb-2 hover:bg-gray-50 transition-colors"
            active-class="bg-blue-50 text-primary font-semibold"
          >
            <span v-html="item.icon" class="w-6 h-6 mr-3"></span>
            <span>{{ item.name }}</span>
          </router-link>
        </nav>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 p-4 lg:p-8">
        <router-view />
      </main>
    </div>

    <!-- PWA Install Banner -->
    <div v-if="showInstallBanner" class="fixed bottom-4 left-4 right-4 lg:left-auto lg:right-4 lg:w-96 bg-primary text-white rounded-lg shadow-lg p-4">
      <div class="flex items-start justify-between">
        <div>
          <h3 class="font-semibold mb-1">Instalar App</h3>
          <p class="text-sm opacity-90">Adicione o painel à tela inicial</p>
        </div>
        <button @click="showInstallBanner = false" class="text-white/80 hover:text-white">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
      <button @click="installPWA" class="mt-3 w-full bg-white text-primary py-2 rounded-lg font-semibold">
        Instalar
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      mobileMenuOpen: false,
      showInstallBanner: false,
      deferredPrompt: null,
      menuItems: [
        {
          path: '/',
          name: 'Dashboard',
          icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>'
        },
        {
          path: '/items',
          name: 'Itens Escaneados',
          icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/></svg>'
        },
        {
          path: '/areas',
          name: 'Gerenciar Áreas',
          icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>'
        }
      ]
    }
  },
  mounted() {
    // PWA Install prompt
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault()
      this.deferredPrompt = e
      this.showInstallBanner = true
    })
  },
  methods: {
    async installPWA() {
      if (!this.deferredPrompt) return
      
      this.deferredPrompt.prompt()
      const { outcome } = await this.deferredPrompt.userChoice
      
      if (outcome === 'accepted') {
        this.showInstallBanner = false
      }
      
      this.deferredPrompt = null
    }
  }
}
</script>
