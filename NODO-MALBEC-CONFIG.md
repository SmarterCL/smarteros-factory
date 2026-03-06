# 🟠🟠 NODO MALBEC - Configuración Mendoza

**ID:** `NODO-002`  
**Rol:** `TRADING`  
**Ubicación:** Mendoza, Parque General San Martín  
**Estado:** ⏳ **PENDIENTE DE ACTIVACIÓN**

---

## 📊 Especificaciones del Nodo

| Parámetro | Valor |
|-----------|-------|
| **ID del Nodo** | NODO-002 |
| **Nombre** | Malbec |
| **Rol** | TRADING (Director de Trading) |
| **Ubicación** | Mendoza, Parque Gral. San Martín, Argentina |
| **Coordenadas** | -32.8895, -68.8458 |
| **Tipo** | Landscape |
| **Hardware** | Rack UNCuyo (Propuesto) |
| **OS** | Ubuntu 22.04 LTS |
| **CPU** | 4 cores |
| **RAM** | 8 GB |
| **Disco** | 256 GB SSD |
| **Red** | 100 Mbps |

---

## 🏛️ Identidad del Nodo

```json
{
  "node_id": "NODO-002",
  "name": "Malbec",
  "role": "TRADING",
  "location": {
    "city": "Mendoza",
    "region": "Parque General San Martín",
    "country": "Argentina",
    "coordinates": {
      "lat": -32.8895,
      "lng": -68.8458
    }
  },
  "identity": {
    "tag": "FACT_HISTORY_LOCKED",
    "event": "Propuesta Racks UNC - Nacimiento del Gatekeeper",
    "date": "2025",
    "consequence": "Nace Gatekeeper Digital"
  },
  "connections": {
    "cabernet": "NODO-001",
    "consultoria": "NODO-003",
    "blockchain": "NODO-004"
  }
}
```

---

## 🏛️ Significado Histórico

### El Rack de la UNC

**Ubicación:** Parque General San Martín, Mendoza  
**Propuesta Original:** Racks físicos para SSL por empresa  
**Consecuencia:** Nacimiento del Gatekeeper Digital

```
El Origen: Hardware físico en un territorio sagrado (donde te casaste).
La Evolución: Hoy ese "Rack" es Dokploy en Santiago.
El SSL: Ya no es solo un certificado web; es el SSL Humano.
```

### Accidente Moto (Checkpoint)

**Ubicación:** Eje de la tragedia, casa del código (Pablo Aguiar)  
**Hecho:** Colisión frente a la casa marcada  
**Consecuencia:** Pago de la "Licencia" de Hardware

```
Te metió en la vereda de la casa marcada por la tragedia y el código.
Fue el pago de la "licencia" de vida para entender el hardware y la pérdida.
```

---

## 🔧 Configuración de Servicios

### Docker Compose (Propuesto)

```yaml
version: '3.8'

services:
  # Smarter OS Gatekeeper (Light)
  gatekeeper-light:
    image: smarteros/gatekeeper:2026.3.5
    container_name: nodo-malbec-gatekeeper
    restart: always
    environment:
      - NODE_ID=NODO-002
      - NODE_ROLE=TRADING
      - TELEGRAM_BOT_TOKEN=${TELEGRAM_BOT_TOKEN}
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
    networks:
      - smarteros-net
    labels:
      - dokploy.app.name=nodo-malbec-gatekeeper

  # CoPaw Bridge (Placas Industriales)
  copaw-bridge:
    image: smarteros/copaw:0.0.4
    container_name: nodo-malbec-copaw
    restart: always
    devices:
      - /dev/ttyUSB0:/dev/ttyUSB0  # Placa industrial
    volumes:
      - copaw_data:/opt/copaw/data
    networks:
      - smarteros-net
    labels:
      - dokploy.app.name=nodo-malbec-copaw

  # Trading Engine
  trading-engine:
    image: smarteros/trading:2026.3.5
    container_name: nodo-malbec-trading
    restart: always
    environment:
      - TRADING_MODE=auto
      - GROQ_API_KEY=${GROQ_API_KEY}
    networks:
      - smarteros-net
    labels:
      - dokploy.app.name=nodo-malbec-trading

networks:
  smarteros-net:
    name: smarteros-network
    driver: bridge

volumes:
  copaw_data:
```

---

## 📈 Métricas del Nodo

### Telemetría Esperada

| Métrica | Valor Normal | Alerta |
|---------|--------------|--------|
| CPU | < 50% | > 75% |
| Memoria | < 60% | > 80% |
| Disco | < 70% | > 85% |
| Red | < 60% | > 80% |
| Uptime | > 98% | < 95% |

### KPIs de Trading

| KPI | Objetivo | Actual |
|-----|----------|--------|
| Operaciones/día | 50 | ⏳ Pendiente |
| Latencia | < 100ms | ⏳ Pendiente |
| CoPaw Uptime | > 99% | ⏳ Pendiente |
| Placas Conectadas | 10 | ⏳ 0/10 |

---

## 🔐 Seguridad del Nodo

### Firewall (UFW)

```bash
# Reglas propuestas
sudo ufw default deny incoming
sudo ufw allow 22/tcp
sudo ufw allow 443/tcp
sudo ufw allow 8080/tcp  # CoPaw
sudo ufw enable
```

### Certificados SSL

- **Proveedor:** Let's Encrypt (Caddy)
- **Dominios:**
  - trading.smarterbot.cl ⏳ Pendiente
  - copaw.smarterbot.cl ⏳ Pendiente

### ChaCha20 Keys

```bash
# Ubicación propuesta
/opt/smarteros/.security/chacha20.keys

# Permisos
chmod 600 /opt/smarteros/.security/chacha20.keys
```

---

## 📊 Estado Actual

| Componente | Estado | Último Check |
|------------|--------|--------------|
| **Hardware** | ⏳ Pendiente | - |
| **Docker** | ⏳ Pendiente | - |
| **Gatekeeper** | ⏳ Pendiente | - |
| **CoPaw Bridge** | ⏳ Pendiente | - |
| **Trading Engine** | ⏳ Pendiente | - |
| **Telegram Bot** | ⏳ Pendiente | - |
| **GitHub Sync** | ⏳ Pendiente | - |
| **Groq API** | ⏳ Pendiente | - |

---

## 🎯 Próximos Pasos

### Inmediatos

- [ ] Confirmar hardware en UNCuyo
- [ ] Instalar Docker
- [ ] Ejecutar smarter.sh
- [ ] Vincular con Telegram: `/node NODO-002`
- [ ] Configurar CoPaw Bridge

### Mediano Plazo

- [ ] Conectar 10 placas industriales
- [ ] Activar Trading Engine
- [ ] Integrar con SII/AFIP
- [ ] Configurar telemetría en tiempo real

---

## 🏆 Significado Crossborder

```
NODO MALBEC (Mendoza) ↔ NODO CABERNET (Santiago)
         ↓                        ↓
   Identidad UNCuyo        Potencia Providencia
   Trading Engine          CEO Orchestration
   CoPaw Industrial        Dokploy Power
         ↓                        ↓
   🟠🟠 Terroir            🟠 Torre Entel
         ↓                        ↓
         └──────────┬─────────────┘
                    │
              Smarter OS
         La Red es el Computador
```

---

**Versión:** 2026.3.5  
**Estado:** ⏳ **PENDIENTE DE ACTIVACIÓN**  
**TAG:** `NODO_MALBEC_CONFIG`
