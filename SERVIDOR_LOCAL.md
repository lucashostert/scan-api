# 🚀 SERVIDOR LOCAL DE DESENVOLVIMENTO

## ❓ Por que preciso disso?

As **Vercel Serverless Functions** (`/api/areas.js`, etc.) **NÃO funcionam localmente** com `npm run dev`.

Você tem 2 opções:

### 📍 Opção 1: Servidor Local (Recomendado para desenvolvimento)
Use o `server-local.js` que criei

### 📍 Opção 2: Vercel Dev (Requer Vercel CLI)
Use `vercel dev` (mais lento)

---

## 🔧 OPÇÃO 1: SERVIDOR LOCAL

### 1️⃣ Instalar Dependências

```bash
cd "C:\Users\lucas\OneDrive\Desktop\Projetos\OryonTech\ScanApp-Admin-Panel"
npm install express cors firebase-admin
```

### 2️⃣ Mover Service Account

O arquivo `oryontech-85fdf-firebase-adminsdk-fbsvc-8409d3903d.json` precisa estar na pasta `ScanApp-Admin-Panel`.

**Copie de:**
```
C:\Users\lucas\OneDrive\Desktop\Projetos\OryonTech\oryontech-85fdf-firebase-adminsdk-fbsvc-8409d3903d.json
```

**Para:**
```
C:\Users\lucas\OneDrive\Desktop\Projetos\OryonTech\ScanApp-Admin-Panel\oryontech-85fdf-firebase-adminsdk-fbsvc-8409d3903d.json
```

### 3️⃣ Iniciar Servidor

```bash
node server-local.js
```

**Você verá:**
```
╔════════════════════════════════════════╗
║   🚀 SCANAPP API - SERVIDOR LOCAL     ║
╠════════════════════════════════════════╣
║                                        ║
║   ✅ Servidor rodando!                 ║
║   📍 http://localhost:3000             ║
║                                        ║
║   ENDPOINTS DISPONÍVEIS:               ║
║   📦 /api/areas                        ║
║   📋 /api/sessions                     ║
║   📊 /api/stats                        ║
║                                        ║
╚════════════════════════════════════════╝
```

---

## 📡 ENDPOINTS

### 📦 GET /api/areas
Retorna todas as áreas ativas

**URL:** `http://localhost:3000/api/areas`

**Resposta:**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "id": "area-123",
      "codigo": "CD-01",
      "nome": "Centro de Distribuição",
      "ativo": true
    }
  ]
}
```

---

### 📋 GET /api/sessions
Retorna sessões com filtros opcionais

**URL:** `http://localhost:3000/api/sessions`

**Parâmetros (query string):**
- `area` - ID da área (opcional)
- `limit` - Número de resultados (padrão: 50)
- `startDate` - Data inicial em timestamp (opcional)
- `endDate` - Data final em timestamp (opcional)

**Exemplos:**
```
# Todas as sessões
http://localhost:3000/api/sessions

# Sessões de uma área
http://localhost:3000/api/sessions?area=area-123

# Últimas 10 sessões
http://localhost:3000/api/sessions?limit=10

# Sessões em intervalo
http://localhost:3000/api/sessions?startDate=1698019200000&endDate=1698105600000
```

**Resposta:**
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "id": "session-456",
      "areaId": "area-123",
      "areaNome": "Centro de Distribuição",
      "tipo": "RFID",
      "tagsUnicas": 150,
      "totalLeituras": 300,
      "startTime": 1698019200000
    }
  ]
}
```

---

### 📊 GET /api/stats
Retorna estatísticas gerais

**URL:** `http://localhost:3000/api/stats`

**Parâmetros (query string):**
- `area` - ID da área (opcional)
- `startDate` - Data inicial em timestamp (opcional)
- `endDate` - Data final em timestamp (opcional)

**Exemplos:**
```
# Estatísticas gerais
http://localhost:3000/api/stats

# Estatísticas de uma área
http://localhost:3000/api/stats?area=area-123

# Estatísticas em intervalo
http://localhost:3000/api/stats?startDate=1698019200000&endDate=1698105600000
```

**Resposta:**
```json
{
  "success": true,
  "data": {
    "totalSessions": 100,
    "totalTags": 15000,
    "totalReads": 30000,
    "avgTagsPerSession": 150,
    "avgReadsPerSession": 300,
    "sessionsByArea": {
      "Centro de Distribuição": 50,
      "Armazém": 30,
      "Expedição": 20
    },
    "sessionsByType": {
      "RFID": 80,
      "BARCODE": 20
    }
  }
}
```

---

## 🧪 TESTAR NO INSOMNIA

### 1️⃣ Criar Request - GET /api/areas

```
Method: GET
URL: http://localhost:3000/api/areas
Headers: (nenhum necessário)
```

**Clique em "Send"**

✅ Deve retornar JSON com as áreas!

---

### 2️⃣ Criar Request - GET /api/sessions

```
Method: GET
URL: http://localhost:3000/api/sessions?limit=10
```

✅ Deve retornar JSON com as sessões!

---

### 3️⃣ Criar Request - GET /api/stats

```
Method: GET
URL: http://localhost:3000/api/stats
```

✅ Deve retornar JSON com estatísticas!

---

## 🌐 TESTAR NO NAVEGADOR

Abra no Chrome/Edge:

```
http://localhost:3000/api/areas
http://localhost:3000/api/sessions
http://localhost:3000/api/stats
```

✅ Deve exibir JSON diretamente no navegador!

---

## 🔧 OPÇÃO 2: VERCEL DEV

Se preferir usar o ambiente Vercel:

### 1️⃣ Instalar Vercel CLI

```bash
npm install -g vercel
```

### 2️⃣ Configurar Variáveis de Ambiente

Crie `.env.local`:

```env
FIREBASE_PROJECT_ID=oryontech-85fdf
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-fbsvc@oryontech-85fdf.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

### 3️⃣ Rodar Vercel Dev

```bash
vercel dev
```

**URLs:**
```
http://localhost:3000/api/areas
http://localhost:3000/api/sessions
http://localhost:3000/api/stats
```

---

## ❗ PROBLEMAS COMUNS

### ❌ "Cannot find module 'express'"
```bash
npm install express cors firebase-admin
```

### ❌ "Error: Could not load the default credentials"
Verifique se o arquivo `oryontech-85fdf-firebase-adminsdk-fbsvc-8409d3903d.json` está na pasta correta.

### ❌ "Port 3000 already in use"
Mude a porta no `server-local.js`:
```javascript
const PORT = 3001; // ou outra porta
```

### ❌ "404 Not Found"
Certifique-se de que o servidor está rodando:
```bash
node server-local.js
```

---

## 📚 PRÓXIMOS PASSOS

1. ✅ Iniciar servidor local
2. ✅ Testar no Insomnia
3. ✅ Integrar com o app Android
4. 🚀 Deploy no Vercel quando pronto

---

## 🎯 RESUMO

| Item | Comando | URL |
|------|---------|-----|
| **Iniciar Servidor** | `node server-local.js` | `http://localhost:3000` |
| **Áreas** | GET | `http://localhost:3000/api/areas` |
| **Sessões** | GET | `http://localhost:3000/api/sessions` |
| **Estatísticas** | GET | `http://localhost:3000/api/stats` |

---

**Agora sua API está funcionando localmente!** 🎉
