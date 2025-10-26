// Serverless function para Vercel
import { initializeApp, getApps, cert } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

// Inicializar Firebase Admin apenas uma vez
if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
    })
  })
}

const db = getFirestore()

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método não permitido' })
  }

  try {
    const { limit = 100, areaId, tipo, sincronizado } = req.query

    let query = db.collection('scan_sessions')
      .orderBy('startTime', 'desc')

    // Filtros opcionais
    if (areaId) {
      query = query.where('areaId', '==', areaId)
    }
    if (tipo) {
      query = query.where('tipo', '==', tipo)
    }
    if (sincronizado !== undefined) {
      query = query.where('sincronizado', '==', sincronizado === 'true')
    }

    const snapshot = await query.limit(parseInt(limit)).get()

    const sessions = []
    snapshot.forEach(doc => {
      const data = doc.data()
      
      // Filtrar campos - remover dados de sincronização
      const {
        sincronizadoEm,
        lastSyncAttempt,
        syncStatus,
        ...cleanData
      } = data
      
      sessions.push({
        id: doc.id,
        ...cleanData,
        // Garantir que a data do scan está presente
        scanDate: data.startTime || data.createdAt || Date.now()
      })
    })

    res.status(200).json({
      success: true,
      count: sessions.length,
      data: sessions
    })
  } catch (error) {
    console.error('Erro ao buscar sessões:', error)
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
}
