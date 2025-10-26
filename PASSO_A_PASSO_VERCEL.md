# 🚀 PASSO A PASSO - RESOLVER API NA VERCEL

## 🎯 OBJETIVO
Fazer `/api/test` retornar JSON ao invés do painel administrativo.

---

## ✅ PASSO 1: VERIFICAR ARQUIVOS LOCALMENTE

### 1.1 Abra o terminal e navegue até o projeto:
```bash
cd "C:\Users\lucas\OneDrive\Desktop\Projetos\OryonTech\ScanApp-Admin-Panel"
```

### 1.2 Liste os arquivos da pasta `api/`:
```bash
dir api
```

**DEVE MOSTRAR:**
```
api/
├── README.md
├── areas.js
├── index.js
├── sessions.js
├── stats.js
└── test.js
```

Se a pasta `api/` NÃO existir ou estiver vazia, **PARE AQUI** e me avise!

---

## ✅ PASSO 2: VERIFICAR CONTEÚDO DO `test.js`

### 2.1 Abra o arquivo:
```bash
notepad api\test.js
```

### 2.2 Deve conter EXATAMENTE isto:
```javascript
// API de teste simples - sem Firebase
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  res.status(200).json({
    success: true,
    message: '✅ API funcionando!',
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.url,
    headers: req.headers
  });
}
```

Se NÃO estiver assim, **copie e cole o código acima** e salve!

---

## ✅ PASSO 3: VERIFICAR `vercel.json`

### 3.1 Abra o arquivo:
```bash
notepad vercel.json
```

### 3.2 Deve conter EXATAMENTE isto (e NADA MAIS):
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist"
}
```

Se estiver diferente, **copie e cole o código acima** e salve!

---

## ✅ PASSO 4: COMMIT E PUSH

### 4.1 Ver o que mudou:
```bash
git status
```

### 4.2 Adicionar tudo:
```bash
git add .
```

### 4.3 Commit:
```bash
git commit -m "fix: Simplify vercel.json and add API test endpoint"
```

### 4.4 Push:
```bash
git push
```

**⏳ Aguarde o push terminar!**

---

## ✅ PASSO 5: VERIFICAR DEPLOY NA VERCEL

### 5.1 Acesse o dashboard da Vercel:
```
https://vercel.com/dashboard
```

### 5.2 Clique no seu projeto

### 5.3 Vá em "Deployments"

### 5.4 Aguarde o deploy mais recente ter status "Ready" (✓)

**Isso pode levar 1-3 minutos!**

---

## ✅ PASSO 6: TESTAR NO NAVEGADOR

### 6.1 Abra uma nova aba anônima (Ctrl + Shift + N)

### 6.2 Acesse:
```
https://SEU-PROJETO.vercel.app/api/test
```

**Substitua `SEU-PROJETO` pelo nome do seu projeto!**

### 6.3 O QUE DEVE APARECER:

**✅ SUCESSO - Deve mostrar JSON:**
```json
{
  "success": true,
  "message": "✅ API funcionando!",
  "timestamp": "2024-10-25T..."
}
```

**❌ ERRO - Se mostrar o painel administrativo:**
Vá para o PASSO 7 (Investigação).

---

## ✅ PASSO 7: INVESTIGAÇÃO (SE AINDA NÃO FUNCIONAR)

### 7.1 Vá na Vercel → Seu Projeto → Settings → General

### 7.2 Procure por "Root Directory"

**Deve estar vazio ou com `.`**

Se estiver com `src` ou qualquer outra pasta, MUDE para vazio!

### 7.3 Vá em Settings → Build & Development Settings

**Verifique:**
- **Build Command:** `npm run build` ✓
- **Output Directory:** `dist` ✓
- **Install Command:** `npm install` ✓

### 7.4 Se mudou algo, clique em "Save"

### 7.5 Vá em Deployments → Último deploy → "..." → Redeploy

---

## ✅ PASSO 8: VERIFICAR ENVIRONMENT VARIABLES

### 8.1 Vá em Settings → Environment Variables

### 8.2 Deve ter 3 variáveis:

| Name | Value | Env |
|------|-------|-----|
| `FIREBASE_PROJECT_ID` | `oryontech-85fdf` | Production, Preview, Development |
| `FIREBASE_CLIENT_EMAIL` | `firebase-adminsdk-...@...` | Production, Preview, Development |
| `FIREBASE_PRIVATE_KEY` | `-----BEGIN PRIVATE KEY-----...` | Production, Preview, Development |

### 8.3 Se NÃO tiver, adicione agora!

**Onde pegar os valores:**
```bash
notepad "C:\Users\lucas\OneDrive\Desktop\Projetos\OryonTech\oryontech-85fdf-firebase-adminsdk-fbsvc-8409d3903d.json"
```

Copie do JSON:
- `project_id` → FIREBASE_PROJECT_ID
- `client_email` → FIREBASE_CLIENT_EMAIL
- `private_key` → FIREBASE_PRIVATE_KEY (com as quebras de linha!)

### 8.4 Após adicionar, faça REDEPLOY!

---

## ✅ PASSO 9: TESTE FINAL

Após REDEPLOY completo, teste TODOS os endpoints:

```
https://SEU-PROJETO.vercel.app/api/test
→ Deve retornar JSON

https://SEU-PROJETO.vercel.app/api/areas
→ Deve retornar JSON com áreas

https://SEU-PROJETO.vercel.app/
→ Deve mostrar o painel administrativo
```

---

## 🆘 SE NADA FUNCIONAR

**Me envie prints de:**

1. `git status` (terminal)
2. `dir api` (terminal)
3. Conteúdo de `vercel.json` (arquivo)
4. Página de Settings → General da Vercel
5. Página de Settings → Environment Variables da Vercel
6. Erro no navegador ao acessar `/api/test`

**Vou resolver pessoalmente!** 💪

---

## 📊 CHECKLIST RÁPIDO

- [ ] ✅ Pasta `api/` existe na raiz
- [ ] ✅ Arquivo `api/test.js` existe e tem o código correto
- [ ] ✅ `vercel.json` está simplificado
- [ ] ✅ Git commit + push feito
- [ ] ✅ Deploy na Vercel concluído (status "Ready")
- [ ] ✅ Root Directory está vazio
- [ ] ✅ Build settings estão corretos
- [ ] ✅ Environment variables configuradas (3 variáveis)
- [ ] ✅ Testei em aba anônima
- [ ] ✅ `/api/test` retorna JSON
