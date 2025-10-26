// API de DEBUG - Mostra informações do ambiente
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Informações do ambiente
  const info = {
    success: true,
    message: '✅ API /debug funcionando!',
    timestamp: new Date().toISOString(),
    
    // Request info
    request: {
      method: req.method,
      url: req.url,
      headers: {
        host: req.headers.host,
        userAgent: req.headers['user-agent'],
        accept: req.headers.accept
      }
    },
    
    // Environment info
    environment: {
      nodeVersion: process.version,
      platform: process.platform,
      vercelEnv: process.env.VERCEL_ENV || 'local',
      vercelUrl: process.env.VERCEL_URL || 'not-set',
      hasFirebaseProjectId: !!process.env.FIREBASE_PROJECT_ID,
      hasFirebaseClientEmail: !!process.env.FIREBASE_CLIENT_EMAIL,
      hasFirebasePrivateKey: !!process.env.FIREBASE_PRIVATE_KEY
    },
    
    // API status
    apis: {
      '/api/debug': '✅ Você está aqui!',
      '/api/test': 'Endpoint de teste simples',
      '/api/areas': 'Requer Firebase configurado',
      '/api/sessions': 'Requer Firebase configurado',
      '/api/stats': 'Requer Firebase configurado'
    }
  };

  res.status(200).json(info);
}
