// API Home - Lista de endpoints disponíveis
export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  
  res.status(200).json({
    name: 'Scan App API',
    version: '1.0.0',
    description: 'API REST para gerenciamento de áreas e sessões de scan',
    endpoints: {
      areas: {
        url: '/api/areas',
        method: 'GET',
        description: 'Lista todas as áreas ativas',
        response: 'Array de áreas'
      },
      sessions: {
        url: '/api/sessions',
        method: 'GET',
        description: 'Lista sessões de scan',
        params: {
          limit: 'Número máximo de resultados (padrão: 100)',
          areaId: 'Filtrar por ID da área',
          tipo: 'Filtrar por tipo (RFID ou BARCODE)',
          sincronizado: 'Filtrar por status de sincronização (true/false)'
        },
        response: 'Array de sessões'
      },
      sessionById: {
        url: '/api/session/:id',
        method: 'GET',
        description: 'Busca sessão específica por ID',
        response: 'Objeto da sessão'
      },
      stats: {
        url: '/api/stats',
        method: 'GET',
        description: 'Estatísticas gerais do sistema',
        response: 'Objeto com estatísticas agregadas'
      }
    },
    examples: {
      allAreas: '/api/areas',
      allSessions: '/api/sessions',
      limitedSessions: '/api/sessions?limit=10',
      rfidSessions: '/api/sessions?tipo=RFID',
      pendingSessions: '/api/sessions?sincronizado=false',
      sessionById: '/api/session/abc123',
      stats: '/api/stats'
    },
    docs: 'https://github.com/seu-repo/scanapp-api'
  })
}
