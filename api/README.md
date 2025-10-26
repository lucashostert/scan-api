# 🚀 APIs Serverless - Vercel

Esta pasta contém as **Serverless Functions** que são automaticamente deployadas pela Vercel.

## 📁 Estrutura

Cada arquivo `.js` nesta pasta vira uma rota `/api/[nome-do-arquivo]`

```
api/
├── test.js       → /api/test
├── areas.js      → /api/areas
├── sessions.js   → /api/sessions
└── stats.js      → /api/stats
```

## ✅ Requisitos

1. Cada arquivo deve exportar um `handler`:
```javascript
export default async function handler(req, res) {
  res.status(200).json({ success: true });
}
```

2. Variáveis de ambiente devem estar configuradas na Vercel:
   - `FIREBASE_PROJECT_ID`
   - `FIREBASE_CLIENT_EMAIL`
   - `FIREBASE_PRIVATE_KEY`

## 🧪 Testar

Após deploy, acesse:
```
https://seu-projeto.vercel.app/api/test
https://seu-projeto.vercel.app/api/areas
```

## ❗ IMPORTANTE

A Vercel detecta esta pasta **automaticamente**.  
NÃO precisa configurar rotas no `vercel.json` para APIs.
