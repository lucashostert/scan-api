# 📦 Guia de Instalação Rápida

## 1️⃣ Instalar Dependências

```bash
cd "C:\Users\lucas\OneDrive\Desktop\Projetos\OryonTech\ScanApp-Admin-Panel"
npm install
```

## 2️⃣ Configurar Firebase

### Obter Credenciais do Firebase Console:

1. Acesse: https://console.firebase.google.com/
2. Selecione seu projeto (mesmo do Android)
3. Configurações do projeto ⚙️
4. Adicionar app → **Web**
5. Copie as credenciais

### Colar em `src/firebase/config.js`:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "scanapp-xxxxx.firebaseapp.com",
  projectId: "scanapp-xxxxx",
  storageBucket: "scanapp-xxxxx.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
}
```

## 3️⃣ Executar

```bash
npm run dev
```

Abra: http://localhost:3000

## 4️⃣ Completar Views Faltantes

Os arquivos base já foram criados. Você precisa completar:

### `src/views/Items.vue`
- Lista de sessões expandível
- Busca e filtros
- Visualização de itens

### `src/views/Areas.vue`
- Tabela de áreas
- Modal criar/editar
- Botões de ações

**Exemplos estão no `README.md`!**

## 5️⃣ Build para Produção

```bash
npm run build
```

A pasta `dist/` estará pronta para deploy!

## ✅ Checklist

- [ ] `npm install` executado
- [ ] Firebase configurado em `src/firebase/config.js`
- [ ] `npm run dev` funcionando
- [ ] Dashboard carregando dados
- [ ] Items.vue completada
- [ ] Areas.vue completada
- [ ] Testado integração com app Android
- [ ] Build de produção criada
- [ ] Deploy realizado

---

## 🔥 Deploy Rápido

### Netlify (Recomendado)

```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

### Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

### Vercel

```bash
npm install -g vercel
npm run build
vercel --prod
```

---

**Qualquer dúvida, consulte o `README.md`!** 📚
