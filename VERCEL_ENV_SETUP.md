# 🔐 Configurar Environment Variables na Vercel

## ❌ Erro Comum:
```
Environment Variable "FIREBASE_PROJECT_ID" references Secret "firebase-project-id", which does not exist.
```

**Causa:** O `vercel.json` estava tentando referenciar secrets que não existem.  
**Solução:** ✅ Já corrigido! Agora configure diretamente no dashboard.

---

## 📋 Passo a Passo Visual:

### 1️⃣ **Baixar Credenciais Firebase**

1. Acesse: https://console.firebase.google.com/
2. Selecione seu projeto
3. ⚙️ **Project Settings** → **Service Accounts**
4. Clique em **"Generate new private key"**
5. Baixe o arquivo JSON (exemplo: `scanapp-firebase-adminsdk-xxxxx.json`)

O arquivo terá este formato:
```json
{
  "type": "service_account",
  "project_id": "scanapp-12345",
  "private_key_id": "abc123...",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBg...\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-xxxxx@scanapp-12345.iam.gserviceaccount.com",
  "client_id": "123456789",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  ...
}
```

---

### 2️⃣ **Fazer Deploy na Vercel**

#### Opção A: Via Dashboard (Mais Fácil)

1. **Acesse:** https://vercel.com/new

2. **Import Git Repository:**
   - Conecte GitHub se ainda não fez
   - Clique em "Import" no repositório `scanapp-admin-panel`

3. **Na página de configuração, ANTES de Deploy:**

   Clique em **"Environment Variables"**

4. **Adicione as 3 variáveis:**

---

### 3️⃣ **Variável 1: FIREBASE_PROJECT_ID**

```
Key: FIREBASE_PROJECT_ID
Value: scanapp-12345
```

📝 **Onde encontrar:**
- Abra o JSON baixado
- Copie o valor de `"project_id"`

**Exemplo:**
```json
"project_id": "scanapp-12345"  ← Copie isso
```

**Configuração:**
- Environment: ✅ Production, ✅ Preview, ✅ Development

---

### 4️⃣ **Variável 2: FIREBASE_CLIENT_EMAIL**

```
Key: FIREBASE_CLIENT_EMAIL
Value: firebase-adminsdk-xxxxx@scanapp-12345.iam.gserviceaccount.com
```

📝 **Onde encontrar:**
- Abra o JSON baixado
- Copie o valor de `"client_email"`

**Exemplo:**
```json
"client_email": "firebase-adminsdk-xxxxx@scanapp-12345.iam.gserviceaccount.com"  ← Copie isso
```

**Configuração:**
- Environment: ✅ Production, ✅ Preview, ✅ Development

---

### 5️⃣ **Variável 3: FIREBASE_PRIVATE_KEY**

```
Key: FIREBASE_PRIVATE_KEY
Value: [Cole a chave privada completa - veja abaixo]
```

📝 **Onde encontrar:**
- Abra o JSON baixado
- Copie **TODO** o valor de `"private_key"` (incluindo aspas)

**Exemplo no JSON:**
```json
"private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"
```

⚠️ **CUIDADO - Formato Correto:**

**OPÇÃO 1 - Com `\n` (Recomendado):**
```
-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEF...\n-----END PRIVATE KEY-----\n
```

**OPÇÃO 2 - Com quebras reais:**
```
-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...
...várias linhas...
-----END PRIVATE KEY-----
```

💡 **Dica:** Use a OPÇÃO 1 copiando exatamente como está no JSON (com `\n`).

**Configuração:**
- ✅ Marque como **Secret** (oculta a chave)
- Environment: ✅ Production, ✅ Preview, ✅ Development

---

### 6️⃣ **Exemplo Visual de Configuração**

```
┌─────────────────────────────────────────────────┐
│ Environment Variables                           │
├─────────────────────────────────────────────────┤
│                                                 │
│ Key: FIREBASE_PROJECT_ID                        │
│ Value: scanapp-12345                            │
│ [x] Production [x] Preview [x] Development      │
│ [Add]                                           │
│                                                 │
├─────────────────────────────────────────────────┤
│                                                 │
│ Key: FIREBASE_CLIENT_EMAIL                      │
│ Value: firebase-adminsdk-xxx@...               │
│ [x] Production [x] Preview [x] Development      │
│ [Add]                                           │
│                                                 │
├─────────────────────────────────────────────────┤
│                                                 │
│ Key: FIREBASE_PRIVATE_KEY                       │
│ Value: -----BEGIN PRIVATE KEY-----\nMII...     │
│ [x] Secret                                      │
│ [x] Production [x] Preview [x] Development      │
│ [Add]                                           │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

### 7️⃣ **Deploy!**

Depois de adicionar as 3 variáveis:

1. Clique em **"Deploy"**
2. Aguarde 1-2 minutos
3. ✅ **Sucesso!**

Você verá:
```
✅ Deployment ready
🌐 https://seu-projeto.vercel.app
```

---

## 🧪 Testar APIs:

Após deploy bem-sucedido:

```bash
# Testar documentação
curl https://seu-projeto.vercel.app/api

# Testar áreas
curl https://seu-projeto.vercel.app/api/areas

# Testar sessões
curl https://seu-projeto.vercel.app/api/sessions

# Testar estatísticas
curl https://seu-projeto.vercel.app/api/stats
```

---

## 🔄 Se Já Fez Deploy e Deu Erro:

### Adicionar Variáveis Depois:

1. Vá em: https://vercel.com/dashboard
2. Selecione seu projeto
3. **Settings** → **Environment Variables**
4. Adicione as 3 variáveis (passos acima)
5. Vá em **Deployments**
6. Clique nos 3 pontos do último deploy → **Redeploy**
7. ✅ Pronto!

---

## 🐛 Troubleshooting:

### Erro: "Invalid credentials"
❌ **Problema:** Private key mal formatada  
✅ **Solução:** Copie exatamente como está no JSON, incluindo `\n`

### Erro: "Project ID not found"
❌ **Problema:** Project ID errado  
✅ **Solução:** Verifique se copiou corretamente do JSON

### Erro: "Permission denied"
❌ **Problema:** Service account sem permissões  
✅ **Solução:** No Firebase Console, verifique que a service account tem role "Firebase Admin SDK Administrator Service Agent"

### APIs retornam 500
❌ **Problema:** Variáveis não configuradas  
✅ **Solução:** 
1. Vercel Dashboard → Settings → Environment Variables
2. Verifique se as 3 variáveis existem
3. Redeploy

---

## ✅ Checklist Final:

- [ ] JSON do Firebase baixado
- [ ] `FIREBASE_PROJECT_ID` adicionada
- [ ] `FIREBASE_CLIENT_EMAIL` adicionada
- [ ] `FIREBASE_PRIVATE_KEY` adicionada (com `\n` ou quebras reais)
- [ ] Todas marcadas para Production/Preview/Development
- [ ] Deploy executado
- [ ] APIs testadas e funcionando

---

## 📞 Comandos Úteis:

### Push nova versão:
```bash
git add .
git commit -m "fix: Update config"
git push
# Vercel faz deploy automático
```

### Ver logs:
```bash
vercel logs
# ou no dashboard: Deployments → [seu deploy] → Logs
```

### Testar localmente:
```bash
# Criar .env
echo "FIREBASE_PROJECT_ID=scanapp-12345" > .env
echo "FIREBASE_CLIENT_EMAIL=..." >> .env
echo "FIREBASE_PRIVATE_KEY=..." >> .env

# Rodar
vercel dev
```

---

**Agora está tudo configurado corretamente! 🚀**
