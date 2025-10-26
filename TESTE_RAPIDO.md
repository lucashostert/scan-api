# ⚡ TESTE RÁPIDO - API Vercel

## 🎯 OBJETIVO
Verificar se a API está funcionando na Vercel

---

## 1️⃣ TESTE SIMPLES (SEM FIREBASE)

Criei um endpoint de teste que NÃO precisa de Firebase.

**Acesse no navegador ou Insomnia:**
```
https://SEU-PROJETO.vercel.app/api/test
```

### ✅ Se funcionar:
```json
{
  "success": true,
  "message": "✅ API funcionando!",
  "timestamp": "2024-10-25T..."
}
```

**Significa:** ✅ Vercel está OK! O problema é configuração do Firebase.

---

### ❌ Se der 404:

**Problema:** Estrutura de pastas ou `vercel.json`

**Solução:**

1. **Verifique a estrutura:**
```
ScanApp-Admin-Panel/
├── api/              ← DEVE estar AQUI
│   ├── test.js       ← arquivo que criei
│   ├── areas.js
│   └── ...
├── src/
├── package.json
└── vercel.json
```

2. **Se api/ estiver em src/, mova:**
```bash
cd "C:\Users\lucas\OneDrive\Desktop\Projetos\OryonTech\ScanApp-Admin-Panel"
mv src/api .
```

3. **Commit e push:**
```bash
git add .
git commit -m "fix: Move api folder to root"
git push
```

4. **Aguarde o deploy automático da Vercel (1-2 min)**

5. **Teste novamente:** `https://SEU-PROJETO.vercel.app/api/test`

---

## 2️⃣ TESTE COM FIREBASE

Depois que `/api/test` funcionar, teste os endpoints com Firebase:

### A. Teste `/api/areas`

```
https://SEU-PROJETO.vercel.app/api/areas
```

### ✅ Se funcionar:
```json
{
  "success": true,
  "count": X,
  "data": [...]
}
```

**Significa:** 🎉 Tudo funcionando!

---

### ❌ Se der ERRO 500:

**Problema:** Variáveis de ambiente

**Solução:**

1. **Acesse Vercel Dashboard:**
```
https://vercel.com/[seu-usuario]/[seu-projeto]/settings/environment-variables
```

2. **Adicione 3 variáveis:**

**FIREBASE_PROJECT_ID:**
```
oryontech-85fdf
```

**FIREBASE_CLIENT_EMAIL:**
```
firebase-adminsdk-fbsvc@oryontech-85fdf.iam.gserviceaccount.com
```

**FIREBASE_PRIVATE_KEY:**
```
Abra o arquivo:
C:\Users\lucas\OneDrive\Desktop\Projetos\OryonTech\oryontech-85fdf-firebase-adminsdk-fbsvc-8409d3903d.json

Copie o valor de "private_key" (TUDO, incluindo -----BEGIN e -----END)
```

3. **Marque:** Production, Preview, Development

4. **Salve**

5. **REDEPLOY:**
   - Vá em "Deployments"
   - Clique nos "..." do último deploy
   - Clique em "Redeploy"

6. **Aguarde 1-2 min**

7. **Teste novamente:** `https://SEU-PROJETO.vercel.app/api/areas`

---

## 3️⃣ VERIFICAÇÃO COMPLETA

Se tudo funcionar, teste todos os endpoints:

### ✅ API Root
```
GET https://SEU-PROJETO.vercel.app/api
```

### ✅ Teste Simples
```
GET https://SEU-PROJETO.vercel.app/api/test
```

### ✅ Áreas
```
GET https://SEU-PROJETO.vercel.app/api/areas
```

### ✅ Sessões
```
GET https://SEU-PROJETO.vercel.app/api/sessions
GET https://SEU-PROJETO.vercel.app/api/sessions?limit=10
```

### ✅ Estatísticas
```
GET https://SEU-PROJETO.vercel.app/api/stats
```

---

## 🔧 COMANDOS ÚTEIS

### Commit e Push:
```bash
cd "C:\Users\lucas\OneDrive\Desktop\Projetos\OryonTech\ScanApp-Admin-Panel"
git add .
git commit -m "fix: Update API configuration"
git push
```

### Ver logs da Vercel:
1. Acesse: https://vercel.com/[projeto]/deployments
2. Clique no deploy mais recente
3. Vá em "Functions"
4. Clique em uma função
5. Veja os logs

---

## 📊 RESUMO DO FLUXO

```
1. Teste /api/test (sem Firebase)
   ├─ Funciona → Vá para passo 2
   └─ 404 → Corrija estrutura de pastas

2. Teste /api/areas (com Firebase)
   ├─ Funciona → 🎉 Pronto!
   └─ 500 → Configure variáveis de ambiente

3. Redeploy na Vercel

4. Teste novamente

5. ✅ Sucesso!
```

---

## 🆘 AINDA COM PROBLEMAS?

**Me mande:**
1. Print do erro no Insomnia/navegador
2. URL que você está testando
3. Print da estrutura de pastas (screenshot do VS Code)
4. Print das Environment Variables na Vercel

**Vou resolver!** 💪
