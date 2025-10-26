# 🔧 TROUBLESHOOTING API - Vercel 404

## ❌ PROBLEMA COMUM: 404 na Vercel

Se você está recebendo 404 ao acessar `/api/areas` na Vercel, siga este checklist:

---

## ✅ CHECKLIST DE VERIFICAÇÃO

### 1️⃣ **Variáveis de Ambiente Configuradas?**

Acesse: https://vercel.com/[seu-usuario]/[seu-projeto]/settings/environment-variables

**Deve ter 3 variáveis:**
- ✅ `FIREBASE_PROJECT_ID`
- ✅ `FIREBASE_CLIENT_EMAIL`  
- ✅ `FIREBASE_PRIVATE_KEY`

**Se NÃO estiverem configuradas:**
1. Vá em Settings → Environment Variables
2. Adicione cada uma
3. Cole os valores do arquivo `oryontech-85fdf-firebase-adminsdk-fbsvc-8409d3903d.json`
4. ⚠️ IMPORTANTE: Marque "Production", "Preview" e "Development"
5. Clique em "Save"
6. **REDEPLOY** o projeto

---

### 2️⃣ **Estrutura de Pastas Correta?**

Sua pasta `api/` deve estar na RAIZ do projeto:

```
ScanApp-Admin-Panel/
├── api/              ← DEVE ESTAR AQUI
│   ├── areas.js
│   ├── sessions.js
│   ├── stats.js
│   └── index.js
├── src/
├── package.json
└── vercel.json
```

**Se a pasta `api/` estiver em outro lugar, mova para a raiz!**

---

### 3️⃣ **`vercel.json` Configurado?**

Abra `vercel.json` e veja se está assim:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ]
}
```

**Se estiver diferente, corrija e faça commit + push!**

---

### 4️⃣ **Arquivos da API têm `export default`?**

Abra `api/areas.js` e veja se tem isto no FINAL:

```javascript
export default async function handler(req, res) {
  // ... código aqui
}
```

**CORRETO:** ✅ `export default async function handler(...)`  
**ERRADO:** ❌ `module.exports = ...`

---

### 5️⃣ **Dependências Instaladas?**

Seu `package.json` deve ter:

```json
{
  "dependencies": {
    "firebase-admin": "^12.0.0"
  }
}
```

**Se NÃO tiver, adicione:**

```bash
npm install firebase-admin --save
git add package.json package-lock.json
git commit -m "fix: Add firebase-admin dependency"
git push
```

---

### 6️⃣ **URL Correta?**

**CORRETO:**
```
https://seu-projeto.vercel.app/api/areas
```

**ERRADO:**
```
https://seu-projeto.vercel.app/api/areas.js  ← NÃO inclua .js
https://seu-projeto.vercel.app/areas          ← Faltou /api/
```

---

## 🔍 TESTAR PASSO A PASSO

### Teste 1: API Root

```
GET https://seu-projeto.vercel.app/api
```

**Deve retornar:**
```json
{
  "name": "Scan App API",
  "version": "1.0.0",
  "endpoints": { ... }
}
```

**Se retornar 404:**
- Problema na configuração do `vercel.json`
- Pasta `api/` não está na raiz

---

### Teste 2: API Areas

```
GET https://seu-projeto.vercel.app/api/areas
```

**Deve retornar:**
```json
{
  "success": true,
  "count": X,
  "data": [...]
}
```

**Se retornar 500 (erro):**
- Variáveis de ambiente não configuradas
- Credenciais Firebase incorretas

**Se retornar 404:**
- Arquivo `api/areas.js` não existe
- Estrutura de pastas errada

---

## 🚨 ERROS COMUNS E SOLUÇÕES

### Erro: "Cannot find module 'firebase-admin'"

**Solução:**
```bash
npm install firebase-admin --save
git add .
git commit -m "fix: Add firebase-admin"
git push
```

---

### Erro: "Could not load default credentials"

**Causa:** Variáveis de ambiente não configuradas

**Solução:**
1. Vá em Settings → Environment Variables
2. Adicione as 3 variáveis
3. Clique em "Redeploy" no dashboard da Vercel

---

### Erro: 404 - Not Found

**Causas possíveis:**

**1. URL errada:**
- ✅ USE: `/api/areas`
- ❌ NÃO: `/api/areas.js`

**2. Pasta api/ no lugar errado:**
```bash
# Deve estar na RAIZ, não em src/
mv src/api .
```

**3. vercel.json sem rotas:**
- Adicione as rotas conforme mostrado acima

---

### Erro: Page loads but shows admin panel

**Causa:** Rota conflitando com o front-end

**Solução no vercel.json:**
```json
{
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    },
    {
      "handle": "filesystem"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

---

## 🔄 FORÇAR REDEPLOY

Se nada funcionou, force um novo deploy:

### Via Dashboard:
1. Acesse https://vercel.com/
2. Vá no seu projeto
3. Clique em "Deployments"
4. Clique em "..." do último deploy
5. Clique em "Redeploy"

### Via CLI:
```bash
vercel --prod --force
```

---

## 📊 LOGS DE DEBUG

Para ver os logs da Vercel:

1. Acesse https://vercel.com/[projeto]/deployments
2. Clique no deploy mais recente
3. Vá em "Functions"
4. Clique em uma função (ex: `api/areas`)
5. Veja os logs de erro

---

## ✅ CHECKLIST FINAL

Antes de testar, verifique:

- [ ] ✅ Variáveis de ambiente configuradas
- [ ] ✅ Pasta `api/` na raiz do projeto
- [ ] ✅ `vercel.json` com rotas corretas
- [ ] ✅ `firebase-admin` no `package.json`
- [ ] ✅ Arquivos usam `export default`
- [ ] ✅ Commit + Push feito
- [ ] ✅ Deploy concluído sem erros
- [ ] ✅ URL correta (sem .js)

---

## 🆘 AINDA NÃO FUNCIONA?

**Me envie:**
1. URL completa que você está testando
2. Print da resposta (404, 500, etc)
3. Print do seu projeto na Vercel
4. Print das Environment Variables configuradas

**Vou debugar pessoalmente!** 💪
