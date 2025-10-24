// Serverless function para Vercel - Estatísticas
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
    // Buscar sessões
    const sessionsSnapshot = await db.collection('scan_sessions')
      .orderBy('startTime', 'desc')
      .limit(1000)
      .get()

    // Buscar áreas
    const areasSnapshot = await db.collection('areas')
      .where('ativo', '==', true)
      .get()

    // Calcular estatísticas
    let totalSessions = 0
    let totalTags = 0
    let totalReads = 0
    let pendingSessions = 0
    let rfidSessions = 0
    let barcodeSessions = 0

    const sessionsByArea = {}
    const sessionsByDate = {}

    sessionsSnapshot.forEach(doc => {
      const data = doc.data()
      totalSessions++
      totalTags += data.tagsUnicas || 0
      totalReads += data.totalLeituras || 0
      
      if (!data.sincronizado) {
        pendingSessions++
      }

      if (data.tipo === 'RFID') {
        rfidSessions++
      } else if (data.tipo === 'BARCODE') {
        barcodeSessions++
      }

      // Por área
      const areaKey = data.areaNome || 'Sem área'
      if (!sessionsByArea[areaKey]) {
        sessionsByArea[areaKey] = {
          count: 0,
          tags: 0,
          reads: 0
        }
      }
      sessionsByArea[areaKey].count++
      sessionsByArea[areaKey].tags += data.tagsUnicas || 0
      sessionsByArea[areaKey].reads += data.totalLeituras || 0

      // Por data
      const date = new Date(data.startTime).toISOString().split('T')[0]
      if (!sessionsByDate[date]) {
        sessionsByDate[date] = 0
      }
      sessionsByDate[date]++
    })

    res.status(200).json({
      success: true,
      data: {
        summary: {
          totalSessions,
          totalTags,
          totalReads,
          pendingSessions,
          syncedSessions: totalSessions - pendingSessions,
          totalAreas: areasSnapshot.size,
          avgTagsPerSession: totalSessions > 0 ? Math.round(totalTags / totalSessions) : 0,
          avgReadsPerSession: totalSessions > 0 ? Math.round(totalReads / totalSessions) : 0
        },
        byType: {
          rfid: rfidSessions,
          barcode: barcodeSessions
        },
        byArea: sessionsByArea,
        byDate: sessionsByDate
      }
    })
  } catch (error) {
    console.error('Erro ao calcular estatísticas:', error)
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
}
