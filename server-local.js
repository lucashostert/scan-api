/**
 * =====================================
 * SERVIDOR LOCAL DE DESENVOLVIMENTO
 * =====================================
 * 
 * Para testar a API localmente sem precisar do Vercel.
 * 
 * COMO USAR:
 * 1. npm install express cors
 * 2. node server-local.js
 * 3. Acesse: http://localhost:3000/api/areas
 */

const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

// Inicializar Firebase Admin
const serviceAccount = require('./oryontech-85fdf-firebase-adminsdk-fbsvc-8409d3903d.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// ===== ROTAS =====

/**
 * GET /api/areas
 * Retorna todas as áreas ativas
 */
app.get('/api/areas', async (req, res) => {
  try {
    console.log('📍 GET /api/areas');
    
    const snapshot = await db.collection('areas')
      .where('ativo', '==', true)
      .orderBy('codigo', 'asc')
      .get();

    const areas = [];
    snapshot.forEach(doc => {
      areas.push({
        id: doc.id,
        ...doc.data()
      });
    });

    console.log(`✅ ${areas.length} áreas encontradas`);

    res.json({
      success: true,
      count: areas.length,
      data: areas
    });
  } catch (error) {
    console.error('❌ Erro ao buscar áreas:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/sessions
 * Retorna sessões com filtros opcionais
 */
app.get('/api/sessions', async (req, res) => {
  try {
    console.log('📍 GET /api/sessions');
    
    const { area, limit = 50, startDate, endDate } = req.query;
    
    let query = db.collection('sessions');
    
    // Filtro por área
    if (area) {
      query = query.where('areaId', '==', area);
    }
    
    // Filtro por data
    if (startDate) {
      const start = parseInt(startDate);
      query = query.where('startTime', '>=', start);
    }
    
    if (endDate) {
      const end = parseInt(endDate);
      query = query.where('startTime', '<=', end);
    }
    
    // Ordenar e limitar
    query = query.orderBy('startTime', 'desc').limit(parseInt(limit));
    
    const snapshot = await query.get();
    
    const sessions = [];
    snapshot.forEach(doc => {
      sessions.push({
        id: doc.id,
        ...doc.data()
      });
    });

    console.log(`✅ ${sessions.length} sessões encontradas`);

    res.json({
      success: true,
      count: sessions.length,
      data: sessions
    });
  } catch (error) {
    console.error('❌ Erro ao buscar sessões:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/stats
 * Retorna estatísticas gerais
 */
app.get('/api/stats', async (req, res) => {
  try {
    console.log('📍 GET /api/stats');
    
    const { area, startDate, endDate } = req.query;
    
    let query = db.collection('sessions');
    
    if (area) {
      query = query.where('areaId', '==', area);
    }
    
    if (startDate) {
      query = query.where('startTime', '>=', parseInt(startDate));
    }
    
    if (endDate) {
      query = query.where('startTime', '<=', parseInt(endDate));
    }
    
    const snapshot = await query.get();
    
    let totalSessions = 0;
    let totalTags = 0;
    let totalReads = 0;
    let sessionsByArea = {};
    let sessionsByType = {};
    
    snapshot.forEach(doc => {
      const data = doc.data();
      totalSessions++;
      totalTags += data.tagsUnicas || 0;
      totalReads += data.totalLeituras || 0;
      
      // Por área
      const areaKey = data.areaNome || 'Sem área';
      sessionsByArea[areaKey] = (sessionsByArea[areaKey] || 0) + 1;
      
      // Por tipo
      const typeKey = data.tipo || 'Sem tipo';
      sessionsByType[typeKey] = (sessionsByType[typeKey] || 0) + 1;
    });

    console.log(`✅ Estatísticas: ${totalSessions} sessões`);

    res.json({
      success: true,
      data: {
        totalSessions,
        totalTags,
        totalReads,
        avgTagsPerSession: totalSessions > 0 ? Math.round(totalTags / totalSessions) : 0,
        avgReadsPerSession: totalSessions > 0 ? Math.round(totalReads / totalSessions) : 0,
        sessionsByArea,
        sessionsByType
      }
    });
  } catch (error) {
    console.error('❌ Erro ao buscar estatísticas:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /
 * Rota raiz - informações da API
 */
app.get('/', (req, res) => {
  res.json({
    name: 'ScanApp API - Servidor Local',
    version: '1.0.0',
    endpoints: {
      areas: 'GET /api/areas',
      sessions: 'GET /api/sessions?area=&limit=&startDate=&endDate=',
      stats: 'GET /api/stats?area=&startDate=&endDate='
    },
    status: 'online'
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║   🚀 SCANAPP API - SERVIDOR LOCAL     ║
╠════════════════════════════════════════╣
║                                        ║
║   ✅ Servidor rodando!                 ║
║   📍 http://localhost:${PORT}            ║
║                                        ║
║   ENDPOINTS DISPONÍVEIS:               ║
║   📦 /api/areas                        ║
║   📋 /api/sessions                     ║
║   📊 /api/stats                        ║
║                                        ║
╚════════════════════════════════════════╝
  `);
  console.log('\n🔥 Aguardando requisições...\n');
});
