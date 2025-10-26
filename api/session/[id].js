// Serverless function para Vercel - Sessão específica
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
    const { id } = req.query

    if (!id) {
      return res.status(400).json({
        success: false,
        error: 'ID da sessão não fornecido'
      })
    }

    const doc = await db.collection('scan_sessions').doc(id).get()

    if (!doc.exists) {
      return res.status(404).json({
        success: false,
        error: 'Sessão não encontrada'
      })
    }

    const data = doc.data()
    
    // Filtrar campos - remover dados de sincronização
    const {
      sincronizadoEm,
      lastSyncAttempt,
      syncStatus,
      ...cleanData
    } = data

    res.status(200).json({
      success: true,
      data: {
        id: doc.id,
        ...cleanData,
        // Garantir que a data do scan está presente
        scanDate: data.startTime || data.createdAt || Date.now()
      }
    })
  } catch (error) {
    console.error('Erro ao buscar sessão:', error)
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
}
