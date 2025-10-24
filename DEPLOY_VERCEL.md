# 🚀 Deploy na Vercel + APIs REST

## ✅ APIs Criadas!

Foram criadas **5 APIs REST** serverless usando Firebase Admin SDK:

| Endpoint | Método | Descrição |
|----------|--------|-----------|
| `/api` | GET | Lista todos os endpoints disponíveis |
| `/api/areas` | GET | Lista todas as áreas ativas |
| `/api/sessions` | GET | Lista sessões (com filtros) |
| `/api/session/:id` | GET | Busca sessão específica |
| `/api/stats` | GET | Estatísticas completas |

---

## 📦 Estrutura Criada:

```
ScanApp-Admin-Panel/
├── api/
│   ├── index.js          ← Documentação da API
│   ├── areas.js          ← GET /api/areas
│   ├── sessions.js       ← GET /api/sessions
│   ├── session/
│   │   └── [id].js       ← GET /api/session/:id
│   └── stats.js          ← GET /api/stats
├── vercel.json           ← Configuração Vercel
└── package.json          ← Dependências + scripts
```

---

## 🔥 Passo 1: Obter Credenciais Firebase Admin

### 1.1 Acesse Firebase Console:
https://console.firebase.google.com/

### 1.2 Project Settings → Service Accounts

1. Clique em "Generate new private key"
2. Baixe o arquivo JSON
3. Abra o arquivo e copie:
   - `project_id`
   - `client_email`
   - `private_key`

---

## 📝 Passo 2: Criar Repositório Git

```bash
cd ScanApp-Admin-Panel

# Inicializar Git
git init

# Adicionar arquivos
git add .

# Commit inicial
git commit -m "feat: Add admin panel + REST APIs"

# Criar repositório no GitHub
# Vá em https://github.com/new

# Adicionar remote
git remote add origin https://github.com/SEU_USUARIO/scanapp-admin-panel.git

# Push
git branch -M main
git push -u origin main
```

---

## 🚀 Passo 3: Deploy na Vercel

### 3.1 Instalar Vercel CLI (opcional):
```bash
npm install -g vercel
```

### 3.2 Deploy via GitHub (Recomendado):

1. **Acesse:** https://vercel.com/new

2. **Import Git Repository:**
   - Conecte sua conta GitHub
   - Selecione o repositório `scanapp-admin-panel`

3. **Configure Environment Variables:**

   Na página de configuração do projeto, vá em **Environment Variables** e adicione 3 variáveis:

   **Nome:** `FIREBASE_PROJECT_ID`  
   **Value:** `seu-project-id` (encontrado no arquivo JSON baixado)
   
   **Nome:** `FIREBASE_CLIENT_EMAIL`  
   **Value:** `firebase-adminsdk-xxxxx@seu-projeto.iam.gserviceaccount.com`
   
   **Nome:** `FIREBASE_PRIVATE_KEY`  
   **Value:** Cole a chave privada completa do JSON:
   ```
   -----BEGIN PRIVATE KEY-----
   MIIEvQIBADANBgkqhkiG9w0BAQEF...
   -----END PRIVATE KEY-----
   ```

   ⚠️ **IMPORTANTE:** 
   - Cole a chave EXATAMENTE como está no JSON (com quebras de linha)
   - Marque como **Secret** (não é visível depois)
   - Aplique para **Production**, **Preview** e **Development**

4. **Deploy:**
   - Clique em "Deploy"
   - Aguarde build (1-2 minutos)
   - ✅ **Pronto!**

### 3.3 Deploy via CLI:

```bash
cd ScanApp-Admin-Panel

# Login
vercel login

# Deploy
vercel --prod

# Adicionar environment variables
vercel env add FIREBASE_PROJECT_ID
vercel env add FIREBASE_CLIENT_EMAIL
vercel env add FIREBASE_PRIVATE_KEY

# Re-deploy
vercel --prod
```

---

## 🌐 Passo 4: Testar APIs

Após deploy, sua URL será algo como:
```
https://scanapp-admin-panel.vercel.app
```

### Teste os Endpoints:

#### 1️⃣ Documentação da API:
```
GET https://seu-projeto.vercel.app/api
```

**Resposta:**
```json
{
  "name": "Scan App API",
  "version": "1.0.0",
  "endpoints": { ... },
  "examples": { ... }
}
```

#### 2️⃣ Listar Áreas:
```
GET https://seu-projeto.vercel.app/api/areas
```

**Resposta:**
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "id": "abc123",
      "codigo": "A001",
      "nome": "Armazém Principal",
      "ativo": true,
      "createdAt": 1234567890
    }
  ]
}
```

#### 3️⃣ Listar Sessões:
```
GET https://seu-projeto.vercel.app/api/sessions
GET https://seu-projeto.vercel.app/api/sessions?limit=10
GET https://seu-projeto.vercel.app/api/sessions?tipo=RFID
GET https://seu-projeto.vercel.app/api/sessions?sincronizado=false
```

**Resposta:**
```json
{
  "success": true,
  "count": 42,
  "data": [
    {
      "id": "xyz789",
      "areaNome": "Armazém Principal",
      "areaCodigo": "A001",
      "tipo": "RFID",
      "startTime": 1234567890,
      "tagsUnicas": 15,
      "totalLeituras": 87,
      "sincronizado": true,
      "items": { ... }
    }
  ]
}
```

#### 4️⃣ Buscar Sessão Específica:
```
GET https://seu-projeto.vercel.app/api/session/xyz789
```

**Resposta:**
```json
{
  "success": true,
  "data": {
    "id": "xyz789",
    "areaNome": "Armazém Principal",
    "items": {
      "TAG001": {
        "codigo": "TAG001",
        "tipo": "RFID",
        "readCount": 5
      }
    }
  }
}
```

#### 5️⃣ Estatísticas:
```
GET https://seu-projeto.vercel.app/api/stats
```

**Resposta:**
```json
{
  "success": true,
  "data": {
    "summary": {
      "totalSessions": 42,
      "totalTags": 315,
      "totalReads": 1847,
      "pendingSessions": 3,
      "totalAreas": 5
    },
    "byType": {
      "rfid": 35,
      "barcode": 7
    },
    "byArea": { ... },
    "byDate": { ... }
  }
}
```

---

## 🔧 Testar Localmente:

```bash
# Instalar dependências
npm install

# Criar arquivo .env
echo "FIREBASE_PROJECT_ID=seu-projeto" > .env
echo "FIREBASE_CLIENT_EMAIL=seu-email@..." >> .env
echo "FIREBASE_PRIVATE_KEY=sua-chave..." >> .env

# Rodar com Vercel Dev
vercel dev

# Acessar
http://localhost:3000/api
```

---

## 📊 Exemplos de Uso:

### JavaScript/Fetch:
```javascript
// Buscar áreas
fetch('https://seu-projeto.vercel.app/api/areas')
  .then(res => res.json())
  .then(data => console.log(data.data))

// Buscar sessões RFID
fetch('https://seu-projeto.vercel.app/api/sessions?tipo=RFID&limit=5')
  .then(res => res.json())
  .then(data => console.log(data.data))

// Estatísticas
fetch('https://seu-projeto.vercel.app/api/stats')
  .then(res => res.json())
  .then(data => console.log(data.data.summary))
```

### cURL:
```bash
# Áreas
curl https://seu-projeto.vercel.app/api/areas

# Sessões
curl "https://seu-projeto.vercel.app/api/sessions?limit=10"

# Estatísticas
curl https://seu-projeto.vercel.app/api/stats
```

### Python:
```python
import requests

# Buscar áreas
response = requests.get('https://seu-projeto.vercel.app/api/areas')
areas = response.json()['data']
print(f"Total de áreas: {len(areas)}")

# Estatísticas
response = requests.get('https://seu-projeto.vercel.app/api/stats')
stats = response.json()['data']['summary']
print(f"Total de sessões: {stats['totalSessions']}")
```

---

## 🔒 Segurança:

### CORS:
- ✅ Configurado para aceitar requisições de qualquer origem (`*`)
- Para produção, configure apenas origens específicas

### Rate Limiting:
- Vercel Free: 100 GB bandwidth/mês
- 100 requests/segundo por região

### Autenticação (Opcional):
Adicione API Key validation:
```javascript
// No início de cada handler
const apiKey = req.headers['x-api-key']
if (apiKey !== process.env.API_KEY) {
  return res.status(401).json({ error: 'Unauthorized' })
}
```

---

## 🔄 Atualizar Deploy:

```bash
# Fazer mudanças
git add .
git commit -m "feat: Update API"
git push

# Vercel faz deploy automático! 🚀
```

---

## 📁 Arquivos Criados:

- ✅ `api/index.js` - Documentação
- ✅ `api/areas.js` - Listar áreas
- ✅ `api/sessions.js` - Listar sessões
- ✅ `api/session/[id].js` - Sessão específica
- ✅ `api/stats.js` - Estatísticas
- ✅ `vercel.json` - Config Vercel
- ✅ `.gitignore` - Arquivos ignorados

---

## ✅ Checklist:

- [ ] Credenciais Firebase Admin obtidas
- [ ] Repositório Git criado
- [ ] Push para GitHub
- [ ] Deploy na Vercel
- [ ] Environment variables configuradas
- [ ] APIs testadas
- [ ] Documentação lida

---

**APIs REST prontas para consumo! 🎉**

Qualquer aplicação externa pode agora consumir os dados do Firebase através dessas APIs!
