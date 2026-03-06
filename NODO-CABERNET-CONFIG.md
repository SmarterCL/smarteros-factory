# 🟠 NODO CABERNET - Configuración Santiago

**ID:** `NODO-001`  
**Rol:** `CEO`  
**Ubicación:** Santiago, Providencia  
**Estado:** ✅ **ACTIVO**

---

## 📊 Especificaciones del Nodo

| Parámetro | Valor |
|-----------|-------|
| **ID del Nodo** | NODO-001 |
| **Nombre** | Cabernet |
| **Rol** | CEO (Chief Executive Officer) |
| **Ubicación** | Santiago, Providencia, Chile |
| **Coordenadas** | -33.4372, -70.6506 |
| **Tipo** | Landscape |
| **Hardware** | VPS Dokploy |
| **OS** | Ubuntu 22.04 LTS |
| **CPU** | 8 cores |
| **RAM** | 16 GB |
| **Disco** | 500 GB SSD |
| **Red** | 1 Gbps |

---

## 🏛️ Identidad del Nodo

```json
{
  "node_id": "NODO-001",
  "name": "Cabernet",
  "role": "CEO",
  "location": {
    "city": "Santiago",
    "region": "Providencia",
    "country": "Chile",
    "coordinates": {
      "lat": -33.4372,
      "lng": -70.6506
    }
  },
  "identity": {
    "tag": "FACT_HISTORY_LOCKED",
    "event": "Smarter OS v2026.3.5",
    "date": "2026-03-05",
    "consequence": "Soberanía YOSI Completa"
  },
  "connections": {
    "malbec": "NODO-002",
    "consultoria": "NODO-003",
    "blockchain": "NODO-004"
  }
}
```

---

## 🔧 Configuración de Servicios

### Docker Compose

```yaml
version: '3.8'

services:
  # Smarter OS Gatekeeper
  gatekeeper:
    image: smarteros/gatekeeper:2026.3.5
    container_name: nodo-cabernet-gatekeeper
    restart: always
    environment:
      - NODE_ID=NODO-001
      - NODE_ROLE=CEO
      - TELEGRAM_BOT_TOKEN=${TELEGRAM_BOT_TOKEN}
      - TELEGRAM_CHAT_ID=${TELEGRAM_CHAT_ID}
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - /opt/smarteros/docs:/opt/smarteros/docs
    networks:
      - smarteros-net
    labels:
      - dokploy.app.name=nodo-cabernet-gatekeeper

  # Nextcloud AIO
  nextcloud:
    image: ghcr.io/nextcloud-releases/all-in-one:latest
    container_name: nodo-cabernet-nextcloud
    restart: always
    ports:
      - "8443:8443"
    volumes:
      - nextcloud_data:/mnt/ncdata
    networks:
      - smarteros-net
    labels:
      - dokploy.app.name=nodo-cabernet-nextcloud
      - dokploy.domain=cloud.smarterbot.cl

  # n8n Automation
  n8n:
    image: n8nio/n8n:latest
    container_name: nodo-cabernet-n8n
    restart: always
    environment:
      - N8N_HOST=n8n.smarterbot.cl
      - DB_TYPE=postgresdb
      - DB_POSTGRESDB_HOST=postgres
    ports:
      - "5678:5678"
    networks:
      - smarteros-net
    labels:
      - dokploy.app.name=nodo-cabernet-n8n
      - dokploy.domain=n8n.smarterbot.cl

  # PostgreSQL
  postgres:
    image: postgres:17.6-alpine
    container_name: nodo-cabernet-postgres
    restart: always
    environment:
      - POSTGRES_DB=smarteros
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - smarteros-net

  # Redis
  redis:
    image: redis:7-alpine
    container_name: nodo-cabernet-redis
    restart: always
    command: redis-server --appendonly yes
    volumes:
      - redis_data:/data
    networks:
      - smarteros-net

networks:
  smarteros-net:
    name: smarteros-network
    driver: bridge

volumes:
  nextcloud_data:
  postgres_data:
  redis_data:
```

---

## 📈 Métricas del Nodo

### Telemetría Esperada

| Métrica | Valor Normal | Alerta |
|---------|--------------|--------|
| CPU | < 60% | > 80% |
| Memoria | < 70% | > 85% |
| Disco | < 80% | > 90% |
| Red | < 70% | > 90% |
| Uptime | > 99% | < 95% |

### KPIs de Negocio

| KPI | Objetivo | Actual |
|-----|----------|--------|
| Nodos Activos | 4 | 1/4 |
| Transacciones SII | 100%/día | ⏳ Pendiente |
| Respuestas Groq | < 500ms | ⏳ Pendiente |
| Backup Exitoso | 100% | ⏳ Pendiente |

---

## 🔐 Seguridad del Nodo

### Firewall (UFW)

```bash
# Reglas configuradas
sudo ufw status

# Expected:
Status: active

To                         Action      From
--                         ------      ----
22/tcp                     ALLOW       Anywhere
443/tcp                    ALLOW       Anywhere
8443/tcp                   ALLOW       Anywhere
5432/tcp                   ALLOW       192.168.1.0/24
```

### Certificados SSL

- **Proveedor:** Let's Encrypt (Caddy)
- **Dominios:**
  - cloud.smarterbot.cl ✅
  - n8n.smarterbot.cl ✅
  - api.smarterbot.cl ✅
- **Renovación:** Automática

### ChaCha20 Keys

```bash
# Ubicación
/opt/smarteros/.security/chacha20.keys

# Permisos
chmod 600 /opt/smarteros/.security/chacha20.keys
```

---

## 📊 Estado Actual

| Componente | Estado | Último Check |
|------------|--------|--------------|
| **Docker** | ✅ Running | Ahora |
| **Gatekeeper** | ✅ Running | Ahora |
| **Nextcloud** | ✅ Running | Ahora |
| **n8n** | ✅ Running | Ahora |
| **PostgreSQL** | ✅ Running | Ahora |
| **Redis** | ✅ Running | Ahora |
| **Telegram Bot** | ✅ Online | Ahora |
| **GitHub Sync** | ⏳ Pendiente | - |
| **Groq API** | ⏳ Pendiente | - |

---

## 🎯 Próximos Pasos

### Inmediatos

- [ ] Configurar Groq API Key
- [ ] Sincronizar con GitHub
- [ ] Activar NODO-002 (Malbec)
- [ ] Activar NODO-003 (Consultoría)
- [ ] Activar NODO-004 (Blockchain)

### Mediano Plazo

- [ ] Smarter Contador RAG (SII/AFIP)
- [ ] CoPaw Bridge (Placas industriales)
- [ ] Flutter Mini App
- [ ] 3 Monitores de Telemetría

---

**Versión:** 2026.3.5  
**Estado:** ✅ **ACTIVO**  
**TAG:** `NODO_CABERNET_CONFIG`
