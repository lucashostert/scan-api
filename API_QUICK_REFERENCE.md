# ⚡ API - REFERÊNCIA RÁPIDA

**Base URL:** `https://scan-49ozym7qn-lucashosterts-projects.vercel.app`

---

## 📋 ENDPOINTS

### 1. **GET /api/test**
Teste simples (sem Firebase)
```
GET /api/test
```

---

### 2. **GET /api/debug**
Diagnóstico do ambiente
```
GET /api/debug
```

---

### 3. **GET /api/areas**
Listar todas as áreas
```
GET /api/areas
```
**Retorna:** Array com todas as áreas ativas

---

### 4. **GET /api/sessions**
Listar sessões com filtros

**Parâmetros:**
```
?limit=50              (padrão: 50)
&area=area-123         (opcional)
&tipo=RFID             (opcional: RFID | BARCODE)
&sincronizado=true     (opcional: true | false)
&startDate=1698019200000  (opcional: timestamp)
&endDate=1698105600000    (opcional: timestamp)
```

**Exemplos:**
```
GET /api/sessions                    # Todas (limit 50)
GET /api/sessions?limit=10           # Últimas 10
GET /api/sessions?tipo=RFID          # Apenas RFID
GET /api/sessions?sincronizado=false # Pendentes
GET /api/sessions?area=area-123      # De uma área
```

---

### 5. **GET /api/session/:id**
Sessão específica por ID
```
GET /api/session/session-789
```
**Retorna:** Sessão completa com todos os itens

---

### 6. **GET /api/stats**
Estatísticas gerais

**Parâmetros:**
```
?area=area-123         (opcional)
&startDate=1698019200000  (opcional: timestamp)
&endDate=1698105600000    (opcional: timestamp)
```

**Exemplos:**
```
GET /api/stats                 # Estatísticas gerais
GET /api/stats?area=area-123   # De uma área
GET /api/stats?startDate=...&endDate=...  # Período
```

---

## 💻 EXEMPLOS RÁPIDOS

### JavaScript (Fetch)
```javascript
// Áreas
fetch('BASE_URL/api/areas')
  .then(res => res.json())
  .then(data => console.log(data));

// Sessões RFID
fetch('BASE_URL/api/sessions?tipo=RFID&limit=10')
  .then(res => res.json())
  .then(data => console.log(data));

// Estatísticas
fetch('BASE_URL/api/stats')
  .then(res => res.json())
  .then(data => console.log(data));
```

### Android (Retrofit)
```java
@GET("/api/areas")
Call<AreasResponse> getAreas();

@GET("/api/sessions")
Call<SessionsResponse> getSessions(
    @Query("limit") Integer limit,
    @Query("tipo") String tipo
);

@GET("/api/stats")
Call<StatsResponse> getStats();
```

### cURL
```bash
# Áreas
curl https://BASE_URL/api/areas

# Sessões
curl "https://BASE_URL/api/sessions?limit=10"

# Estatísticas
curl https://BASE_URL/api/stats
```

---

## 📊 FORMATO DE RESPOSTA

### Sucesso
```json
{
  "success": true,
  "count": 10,
  "data": [ ... ]
}
```

### Erro
```json
{
  "success": false,
  "error": "Mensagem de erro"
}
```

---

## 🎯 FILTROS MAIS COMUNS

### Sessões:
- **Últimas 10:** `?limit=10`
- **RFID:** `?tipo=RFID`
- **BARCODE:** `?tipo=BARCODE`
- **Pendentes:** `?sincronizado=false`
- **De uma área:** `?area=area-123`
- **Hoje:** `?startDate=TIMESTAMP_HOJE&endDate=TIMESTAMP_AGORA`

### Estatísticas:
- **Gerais:** sem parâmetros
- **De uma área:** `?area=area-123`
- **Últimos 7 dias:** `?startDate=TIMESTAMP_7_DIAS&endDate=TIMESTAMP_AGORA`

---

## 📝 DICAS

✅ **Timestamps:** Em milissegundos (Unix epoch)  
✅ **CORS:** Habilitado para todas as origens  
✅ **Cache:** Sem cache (dados em tempo real)  
✅ **Rate Limit:** 100 req/s por região  

---

**📚 Documentação completa:** `API_DOCUMENTATION.md`
