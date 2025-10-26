# 📚 DOCUMENTAÇÃO COMPLETA DA API

**Base URL:** `https://scan-49ozym7qn-lucashosterts-projects.vercel.app`

---

## 📋 ÍNDICE

1. [GET /api/test](#1-get-apitest) - Teste simples
2. [GET /api/debug](#2-get-apidebug) - Diagnóstico
3. [GET /api/areas](#3-get-apiareas) - Listar áreas
4. [GET /api/sessions](#4-get-apisessions) - Listar sessões
5. [GET /api/session/:id](#5-get-apisessionid) - Sessão específica
6. [GET /api/stats](#6-get-apistats) - Estatísticas

---

## 1. GET /api/test

### 📝 Descrição
Endpoint de teste simples (não requer Firebase).

### 🔗 URL
```
GET /api/test
```

### 📥 Parâmetros
Nenhum parâmetro necessário.

### 📤 Resposta
```json
{
  "success": true,
  "message": "✅ API funcionando!",
  "timestamp": "2024-10-25T23:30:00.000Z",
  "method": "GET",
  "url": "/api/test",
  "headers": { ... }
}
```

### 💻 Exemplo - JavaScript
```javascript
fetch('https://scan-49ozym7qn-lucashosterts-projects.vercel.app/api/test')
  .then(res => res.json())
  .then(data => console.log(data));
```

### 💻 Exemplo - cURL
```bash
curl https://scan-49ozym7qn-lucashosterts-projects.vercel.app/api/test
```

---

## 2. GET /api/debug

### 📝 Descrição
Endpoint de diagnóstico com informações do ambiente.

### 🔗 URL
```
GET /api/debug
```

### 📥 Parâmetros
Nenhum parâmetro necessário.

### 📤 Resposta
```json
{
  "success": true,
  "message": "✅ API /debug funcionando!",
  "timestamp": "2024-10-25T23:30:00.000Z",
  "request": {
    "method": "GET",
    "url": "/api/debug",
    "headers": { ... }
  },
  "environment": {
    "nodeVersion": "v20.x.x",
    "platform": "linux",
    "vercelEnv": "production",
    "vercelUrl": "scan-49ozym7qn-lucashosterts-projects.vercel.app",
    "hasFirebaseProjectId": true,
    "hasFirebaseClientEmail": true,
    "hasFirebasePrivateKey": true
  },
  "apis": {
    "/api/debug": "✅ Você está aqui!",
    "/api/test": "Endpoint de teste simples",
    "/api/areas": "Requer Firebase configurado",
    "/api/sessions": "Requer Firebase configurado",
    "/api/stats": "Requer Firebase configurado"
  }
}
```

---

## 3. GET /api/areas

### 📝 Descrição
Retorna todas as áreas ativas cadastradas no Firebase.

### 🔗 URL
```
GET /api/areas
```

### 📥 Parâmetros
Nenhum parâmetro necessário.

### 📤 Resposta
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "id": "area-123",
      "codigo": "CD-01",
      "nome": "Centro de Distribuição",
      "ativo": true,
      "createdAt": 1698019200000,
      "updatedAt": 1698105600000
    },
    {
      "id": "area-456",
      "codigo": "ARM-01",
      "nome": "Armazém Principal",
      "ativo": true,
      "createdAt": 1698019200000,
      "updatedAt": 1698105600000
    }
  ]
}
```

### 💻 Exemplo - JavaScript
```javascript
fetch('https://scan-49ozym7qn-lucashosterts-projects.vercel.app/api/areas')
  .then(res => res.json())
  .then(data => {
    console.log(`Total de áreas: ${data.count}`);
    data.data.forEach(area => {
      console.log(`${area.codigo} - ${area.nome}`);
    });
  });
```

### 💻 Exemplo - Android (Retrofit)
```java
@GET("/api/areas")
Call<AreasResponse> getAreas();
```

---

## 4. GET /api/sessions

### 📝 Descrição
Retorna sessões de scan com filtros opcionais.

### 🔗 URL
```
GET /api/sessions
```

### 📥 Parâmetros (Query String)

| Parâmetro | Tipo | Obrigatório | Padrão | Descrição |
|-----------|------|-------------|---------|-----------|
| `limit` | `number` | Não | `50` | Número máximo de resultados (1-1000) |
| `area` | `string` | Não | - | Filtrar por ID da área |
| `tipo` | `string` | Não | - | Filtrar por tipo (`RFID` ou `BARCODE`) |
| `sincronizado` | `boolean` | Não | - | Filtrar por status de sincronização (`true` ou `false`) |
| `startDate` | `number` | Não | - | Data inicial em timestamp (milissegundos) |
| `endDate` | `number` | Não | - | Data final em timestamp (milissegundos) |

### 📤 Resposta
```json
{
  "success": true,
  "count": 5,
  "filters": {
    "limit": 10,
    "area": null,
    "tipo": "RFID",
    "sincronizado": null,
    "startDate": null,
    "endDate": null
  },
  "data": [
    {
      "id": "session-789",
      "areaId": "area-123",
      "areaNome": "Centro de Distribuição",
      "areaCodigo": "CD-01",
      "tipo": "RFID",
      "startTime": 1698019200000,
      "endTime": 1698022800000,
      "scanDate": 1698019200000,
      "tagsUnicas": 150,
      "totalLeituras": 300,
      "sincronizado": true,
      "items": {
        "TAG001": {
          "codigo": "TAG001",
          "tipo": "RFID",
          "readCount": 5,
          "firstRead": 1698019300000,
          "lastRead": 1698022700000
        }
      }
    }
  ]
}
```

### 💻 Exemplos - Diferentes Filtros

#### Todas as sessões (limit padrão = 50):
```
GET /api/sessions
```

#### Últimas 10 sessões:
```
GET /api/sessions?limit=10
```

#### Sessões de uma área específica:
```
GET /api/sessions?area=area-123
```

#### Sessões RFID:
```
GET /api/sessions?tipo=RFID
```

#### Sessões BARCODE:
```
GET /api/sessions?tipo=BARCODE
```

#### Sessões pendentes (não sincronizadas):
```
GET /api/sessions?sincronizado=false
```

#### Sessões sincronizadas:
```
GET /api/sessions?sincronizado=true
```

#### Sessões em um intervalo de datas:
```
GET /api/sessions?startDate=1698019200000&endDate=1698105600000
```

#### Combinando filtros (RFID + área + últimas 5):
```
GET /api/sessions?tipo=RFID&area=area-123&limit=5
```

### 💻 Exemplo - JavaScript
```javascript
// Últimas 10 sessões RFID
const params = new URLSearchParams({
  tipo: 'RFID',
  limit: 10
});

fetch(`https://scan-49ozym7qn-lucashosterts-projects.vercel.app/api/sessions?${params}`)
  .then(res => res.json())
  .then(data => {
    console.log(`Total de sessões: ${data.count}`);
    data.data.forEach(session => {
      console.log(`${session.areaNome} - ${session.tagsUnicas} tags`);
    });
  });
```

### 💻 Exemplo - Android (Retrofit)
```java
@GET("/api/sessions")
Call<SessionsResponse> getSessions(
    @Query("limit") Integer limit,
    @Query("area") String areaId,
    @Query("tipo") String tipo,
    @Query("sincronizado") Boolean sincronizado,
    @Query("startDate") Long startDate,
    @Query("endDate") Long endDate
);

// Uso:
Call<SessionsResponse> call = api.getSessions(10, null, "RFID", null, null, null);
```

---

## 5. GET /api/session/:id

### 📝 Descrição
Retorna uma sessão específica por ID com todos os detalhes.

### 🔗 URL
```
GET /api/session/{id}
```

### 📥 Parâmetros (Path)

| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| `id` | `string` | Sim | ID da sessão no Firebase |

### 📤 Resposta
```json
{
  "success": true,
  "data": {
    "id": "session-789",
    "areaId": "area-123",
    "areaNome": "Centro de Distribuição",
    "areaCodigo": "CD-01",
    "tipo": "RFID",
    "startTime": 1698019200000,
    "endTime": 1698022800000,
    "tagsUnicas": 150,
    "totalLeituras": 300,
    "sincronizado": true,
    "sincronizadoEm": 1698023000000,
    "items": {
      "TAG001": {
        "codigo": "TAG001",
        "tipo": "RFID",
        "readCount": 5,
        "firstRead": 1698019300000,
        "lastRead": 1698022700000
      },
      "TAG002": {
        "codigo": "TAG002",
        "tipo": "RFID",
        "readCount": 3,
        "firstRead": 1698019500000,
        "lastRead": 1698022500000
      }
    }
  }
}
```

### 📤 Resposta (Erro - Não encontrado)
```json
{
  "success": false,
  "error": "Sessão não encontrada"
}
```

### 💻 Exemplo - JavaScript
```javascript
const sessionId = 'session-789';

fetch(`https://scan-49ozym7qn-lucashosterts-projects.vercel.app/api/session/${sessionId}`)
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      const session = data.data;
      console.log(`Sessão: ${session.areaNome}`);
      console.log(`Tags únicas: ${session.tagsUnicas}`);
      console.log(`Items:`, Object.keys(session.items));
    } else {
      console.error(data.error);
    }
  });
```

### 💻 Exemplo - Android (Retrofit)
```java
@GET("/api/session/{id}")
Call<SessionResponse> getSession(@Path("id") String sessionId);

// Uso:
Call<SessionResponse> call = api.getSession("session-789");
```

---

## 6. GET /api/stats

### 📝 Descrição
Retorna estatísticas completas com filtros opcionais.

### 🔗 URL
```
GET /api/stats
```

### 📥 Parâmetros (Query String)

| Parâmetro | Tipo | Obrigatório | Descrição |
|-----------|------|-------------|-----------|
| `area` | `string` | Não | Filtrar por ID da área |
| `startDate` | `number` | Não | Data inicial em timestamp (milissegundos) |
| `endDate` | `number` | Não | Data final em timestamp (milissegundos) |

### 📤 Resposta
```json
{
  "success": true,
  "filters": {
    "area": null,
    "startDate": null,
    "endDate": null
  },
  "data": {
    "summary": {
      "totalSessions": 100,
      "totalTags": 15000,
      "totalReads": 30000,
      "pendingSessions": 3,
      "syncedSessions": 97,
      "totalAreas": 5,
      "avgTagsPerSession": 150,
      "avgReadsPerSession": 300
    },
    "byType": {
      "rfid": {
        "sessions": 80,
        "tags": 12000,
        "reads": 24000
      },
      "barcode": {
        "sessions": 20,
        "tags": 3000,
        "reads": 6000
      }
    },
    "byArea": {
      "Centro de Distribuição": {
        "sessions": 50,
        "tags": 7500,
        "reads": 15000
      },
      "Armazém Principal": {
        "sessions": 30,
        "tags": 4500,
        "reads": 9000
      },
      "Expedição": {
        "sessions": 20,
        "tags": 3000,
        "reads": 6000
      }
    },
    "byDate": {
      "2024-10-20": {
        "sessions": 10,
        "tags": 1500,
        "reads": 3000
      },
      "2024-10-21": {
        "sessions": 12,
        "tags": 1800,
        "reads": 3600
      }
    },
    "recentSessions": [
      {
        "id": "session-789",
        "areaNome": "Centro de Distribuição",
        "tipo": "RFID",
        "tagsUnicas": 150,
        "startTime": 1698019200000
      }
    ]
  }
}
```

### 💻 Exemplos - Diferentes Filtros

#### Estatísticas gerais:
```
GET /api/stats
```

#### Estatísticas de uma área específica:
```
GET /api/stats?area=area-123
```

#### Estatísticas em um intervalo de datas:
```
GET /api/stats?startDate=1698019200000&endDate=1698105600000
```

#### Estatísticas de uma área em um período:
```
GET /api/stats?area=area-123&startDate=1698019200000&endDate=1698105600000
```

### 💻 Exemplo - JavaScript
```javascript
// Estatísticas dos últimos 7 dias
const today = Date.now();
const sevenDaysAgo = today - (7 * 24 * 60 * 60 * 1000);

const params = new URLSearchParams({
  startDate: sevenDaysAgo,
  endDate: today
});

fetch(`https://scan-49ozym7qn-lucashosterts-projects.vercel.app/api/stats?${params}`)
  .then(res => res.json())
  .then(data => {
    const stats = data.data.summary;
    console.log(`Total de sessões: ${stats.totalSessions}`);
    console.log(`Total de tags: ${stats.totalTags}`);
    console.log(`Média de tags/sessão: ${stats.avgTagsPerSession}`);
    console.log(`Pendentes: ${stats.pendingSessions}`);
  });
```

### 💻 Exemplo - Android (Retrofit)
```java
@GET("/api/stats")
Call<StatsResponse> getStats(
    @Query("area") String areaId,
    @Query("startDate") Long startDate,
    @Query("endDate") Long endDate
);

// Uso:
Call<StatsResponse> call = api.getStats(null, null, null); // Estatísticas gerais
```

---

## 🔒 AUTENTICAÇÃO

Atualmente, as APIs **não requerem autenticação**.

Para adicionar autenticação (opcional):

### Via API Key (Header)
```javascript
fetch('https://scan-49ozym7qn-lucashosterts-projects.vercel.app/api/areas', {
  headers: {
    'X-API-Key': 'sua-chave-aqui'
  }
})
```

---

## ⚠️ TRATAMENTO DE ERROS

Todas as APIs seguem o mesmo padrão de erro:

### Erro 404 - Não encontrado
```json
{
  "success": false,
  "error": "Sessão não encontrada"
}
```

### Erro 500 - Erro interno
```json
{
  "success": false,
  "error": "Mensagem de erro detalhada"
}
```

### Erro 405 - Método não permitido
```json
{
  "error": "Método não permitido"
}
```

---

## 🌐 CORS

Todas as APIs têm CORS habilitado:
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

---

## 📊 RATE LIMITS

**Vercel Free Tier:**
- ✅ 100 GB bandwidth/mês
- ✅ 100 requests/segundo por região
- ✅ Sem limite de requisições

---

## 🔧 EXEMPLOS PRÁTICOS

### Dashboard simples em HTML
```html
<!DOCTYPE html>
<html>
<head>
  <title>Dashboard</title>
</head>
<body>
  <h1>Dashboard ScanApp</h1>
  <div id="stats"></div>
  
  <script>
    fetch('https://scan-49ozym7qn-lucashosterts-projects.vercel.app/api/stats')
      .then(res => res.json())
      .then(data => {
        const stats = data.data.summary;
        document.getElementById('stats').innerHTML = `
          <p>Total de Sessões: ${stats.totalSessions}</p>
          <p>Total de Tags: ${stats.totalTags}</p>
          <p>Pendentes: ${stats.pendingSessions}</p>
        `;
      });
  </script>
</body>
</html>
```

### App Android (Retrofit + Gson)
```java
public interface ScanAppApi {
    @GET("/api/areas")
    Call<AreasResponse> getAreas();
    
    @GET("/api/sessions")
    Call<SessionsResponse> getSessions(
        @Query("limit") Integer limit,
        @Query("tipo") String tipo
    );
    
    @GET("/api/stats")
    Call<StatsResponse> getStats();
}

// Retrofit setup
Retrofit retrofit = new Retrofit.Builder()
    .baseUrl("https://scan-49ozym7qn-lucashosterts-projects.vercel.app")
    .addConverterFactory(GsonConverterFactory.create())
    .build();

ScanAppApi api = retrofit.create(ScanAppApi.class);

// Buscar áreas
api.getAreas().enqueue(new Callback<AreasResponse>() {
    @Override
    public void onResponse(Call<AreasResponse> call, Response<AreasResponse> response) {
        if (response.isSuccessful()) {
            List<Area> areas = response.body().getData();
            Log.d("API", "Total de áreas: " + areas.size());
        }
    }
    
    @Override
    public void onFailure(Call<AreasResponse> call, Throwable t) {
        Log.e("API", "Erro: " + t.getMessage());
    }
});
```

---

## 📝 NOTAS IMPORTANTES

1. **Timestamps**: Todos os timestamps estão em **milissegundos** (Unix epoch)
2. **IDs**: IDs são strings geradas pelo Firebase
3. **Cache**: APIs não têm cache (sempre dados em tempo real)
4. **Formato**: Todas as respostas são em **JSON**
5. **Charset**: UTF-8

---

## 🆘 SUPORTE

**Problemas comuns:**

- ❌ 404: Endpoint não existe ou URL errada
- ❌ 500: Erro no servidor (verifique environment variables)
- ❌ CORS: Certifique-se de fazer requisições do cliente (não do servidor)

---

**📚 Documentação completa! Todas as APIs prontas para uso!** 🎉
