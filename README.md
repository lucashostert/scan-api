# 🎛️ Scan App - Painel Administrativo

Painel administrativo Vue.js 3 + PWA para gerenciar o aplicativo Android de Scan RFID/Barcode.

## 🚀 Características

- ✅ **Vue 3** + Vite
- ✅ **Tailwind CSS** para estilização
- ✅ **PWA** (Progressive Web App)
- ✅ **Firebase Realtime** (atualização instantânea)
- ✅ **Responsivo** (Desktop + Mobile)
- ✅ **CRUD completo** de Áreas
- ✅ **Visualização** de Sessões e Itens
- ✅ **Sincronização em tempo real** com o app Android

## 📦 Instalação

```bash
cd ScanApp-Admin-Panel
npm install
```

## ⚙️ Configuração do Firebase

1. Abra `src/firebase/config.js`
2. Cole suas credenciais do Firebase (mesmas do app Android):

```javascript
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "seu-projeto.firebaseapp.com",
  projectId: "seu-projeto-id",
  storageBucket: "seu-projeto.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
}
```

## 🎨 Páginas Criadas

### ✅ Dashboard (/)
- Estatísticas em tempo real
- Sessões recentes
- Áreas cadastradas

### 📦 Items (/items)
- **CRIAR:** `src/views/Items.vue`
- Lista de todas as sessões
- Filtros e busca
- Expandir para ver itens
- Ordenação por data

### 🏢 Areas (/areas)
- **CRIAR:** `src/views/Areas.vue`
- CRUD completo (Create, Read, Update, Delete)
- Formulário para adicionar/editar
- Validação de código único

## 📝 Criar Views Faltantes

### Items.vue
```vue
<template>
  <div>
    <h1 class="text-3xl font-bold mb-6">Itens Escaneados</h1>
    
    <!-- Search -->
    <input 
      v-model="searchQuery"
      type="text"
      placeholder="Buscar..."
      class="input-field mb-6"
    >
    
    <!-- Sessions List (com expand) -->
    <div v-for="session in filteredSessions" :key="session.id">
      <!-- Similar ao app Android -->
    </div>
  </div>
</template>

<script>
import { listenToSessions } from '../firebase/config'

export default {
  data() {
    return {
      sessions: [],
      searchQuery: '',
      unsubscribe: null
    }
  },
  computed: {
    filteredSessions() {
      // Implementar busca
      return this.sessions.filter(s => 
        s.areaNome.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    }
  },
  mounted() {
    this.unsubscribe = listenToSessions((sessions) => {
      this.sessions = sessions
    })
  },
  beforeUnmount() {
    if (this.unsubscribe) this.unsubscribe()
  }
}
</script>
```

### Areas.vue
```vue
<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold">Gerenciar Áreas</h1>
      <button @click="showModal = true" class="btn-primary">
        + Nova Área
      </button>
    </div>
    
    <!-- Areas List -->
    <div class="card">
      <table class="w-full">
        <thead>
          <tr>
            <th>Código</th>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="area in areas" :key="area.id">
            <td>{{ area.codigo }}</td>
            <td>{{ area.nome }}</td>
            <td>
              <button @click="editArea(area)" class="btn-secondary">Editar</button>
              <button @click="deleteArea(area.id)" class="btn-danger">Excluir</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <!-- Modal de Criar/Editar -->
    <div v-if="showModal" class="modal">
      <!-- Formulário -->
    </div>
  </div>
</template>

<script>
import { listenToAreas, createArea, updateArea, deleteArea } from '../firebase/config'

export default {
  data() {
    return {
      areas: [],
      showModal: false,
      editingArea: null,
      form: { codigo: '', nome: '' }
    }
  },
  methods: {
    async saveArea() {
      if (this.editingArea) {
        await updateArea(this.editingArea.id, this.form)
      } else {
        await createArea(this.form)
      }
      this.showModal = false
    }
  }
}
</script>
```

## 🚀 Executar

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

## 🔥 Deploy

### Netlify / Vercel
```bash
npm run build
# Faça deploy da pasta `dist/`
```

### Firebase Hosting
```bash
npm install -g firebase-tools
firebase init hosting
npm run build
firebase deploy
```

## 🔄 Sincronização em Tempo Real

O painel usa `onSnapshot` do Firestore para atualizar automaticamente:

- ✅ Novas sessões aparecem instantaneamente
- ✅ Áreas criadas/editadas refletem no app
- ✅ Status de sincronização em tempo real
- ✅ Sem necessidade de refresh

## 📱 PWA

O painel é instalável como app:

- ✅ Funciona offline (cache)
- ✅ Ícone na tela inicial
- ✅ Modo standalone
- ✅ Service Worker automático

## 🎨 Personalização

- **Cores:** Edite `tailwind.config.js`
- **Ícones:** Adicione em `/public/icon-*.png`
- **Manifest:** Edite `vite.config.js` → manifest

## 📊 Funcionalidades Completas

### Dashboard
- [x] Estatísticas em tempo real
- [x] Sessões recentes
- [x] Áreas cadastradas
- [x] Cards responsivos

### Items
- [ ] Lista de sessões (expandir para criar)
- [ ] Busca e filtros
- [ ] Ordenação
- [ ] Visualizar itens escaneados

### Areas
- [ ] CRUD completo (expandir para criar)
- [ ] Formulário com validação
- [ ] Confirmação de exclusão
- [ ] Edição inline

## 🤝 Integração com Android

Ambos usam o MESMO Firebase:
- Mesmas collections: `areas`, `scan_sessions`
- Realtime sync bidirecional
- Alterações no painel → refletem no app
- Alterações no app → refletem no painel

## 📝 Próximos Passos

1. Completar `Items.vue`
2. Completar `Areas.vue`
3. Configurar Firebase
4. Testar sincronização
5. Deploy!

---

**Desenvolvido para integração perfeita com o Scan App Android** 🚀
