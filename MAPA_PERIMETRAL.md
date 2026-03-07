# 🗺️ MAPA PERIMETRAL - SMARTEROS ECOSYSTEM

**Fecha:** 2026-03-07  
**Estado:** Exploración completada

---

## 📊 PROYECTOS EN /Users/mac/dev/2026

| # | Proyecto | Tipo | Estado |
|---|----------|------|--------|
| 1 | smarteros-factory/ | Core - Telegram Bot | ✅ Activo |
| 2 | smarter.OS/ | Next.js + AI Skills | ✅ Setup |
| 3 | app.smarterbot.cl/ | Next.js + Supabase + n8n | ✅ Setup |
| 4 | flow.smarterbot.cl/ | Next.js - Flujos | ✅ Setup |
| 5 | crm.smarterbot.cl/ | Next.js - CRM | ✅ Setup |
| 6 | webcontrol.smarterbot.cl/ | Next.js - Dashboard | ✅ Setup |
| 7 | smarterbot.store/ | E-commerce Next.js | ✅ Setup |
| 8 | rut.smarterbot.store/ | Servicios RUT | ✅ Setup |
| 9 | picoclaw/ | Hardware + MCP | ✅ Activo |
| 10 | ecocanasta.ecocupon.cl/ | E-commerce | ✅ Setup |
| 11 | ecocupon/ | Cupones | ✅ Setup |
| 12 | odoo.smarterbot.cl/ | ERP | ✅ Setup |
| 13 | smarterprop.it/ | Bienes raíces | ✅ Setup |

---

## 🔌 INTEGRACIONES EXISTENTES

### MCP Servers
| Servicio | Ubicación | Herramientas |
|----------|-----------|---------------|
| **picoclaw** | picoclaw/mcp-server.js | 2 tools (clasificar, procesar) |
| **smartermcp** | app.smarterbot.cl/bin/smartermcp.py | Python MCP |

### Docker Stacks
| Proyecto | Servicios |
|----------|-----------|
| smarteros-factory | validator, redis, postgres |
| app.smarterbot.cl | Next.js, n8n, supabase |

### APIs Externas
- Telegram Bot API
- Supabase
- n8n
- Vercel

---

## ❌ FALTANTES (NO EXISTEN)

| Componente | Reportado | Existe |
|------------|-----------|--------|
| Mercado Pago MCP | ✅ Sí | ❌ NO |
| Visual CAD (draw) | ✅ Sí | ❌ NO |
| CNAME draw.smarterbot.cl | ✅ Sí | ❌ NO |

---

## 🗂️ ESTRUCTURA CORE

```
/Users/mac/dev/2026/
├── smarteros-factory/          ← CORE PRINCIPAL
│   ├── core/
│   │   └── validator.js        ← Telegram Bot (46 LOC)
│   ├── docker-compose.yml
│   ├── package.json            ← telegraf only
│   └── docs/                   ← 17+ reportes
│
├── picoclaw/                   ← HARDWARE/MONITOREO
│   ├── mcp-server.js           ← MCP Server (147 LOC)
│   ├── server.js               ← WebSocket server
│   └── telegram-webhook.js     ← Webhook handler
│
├── app.smarterbot.cl/          ← NEXT.JS MAIN
│   ├── services/
│   ├── components/
│   ├── lib/
│   └── bin/smartermcp.py
│
└── [otros 10 proyectos]
```

---

## 🔧 STACK TECNOLÓGICO

| Capa | Tecnología |
|------|------------|
| Frontend | Next.js 14, React, Tailwind |
| Backend | Node.js, Python |
| Database | PostgreSQL (Supabase) |
| ORM | Prisma |
| Container | Docker, Dokploy |
| CI/CD | GitHub Actions |
| AI/ML | MCP Servers, Ollama |
| Automation | n8n, Node-RED |
| Messaging | Telegram Bot API |
| Hosting | Cloudflare, Vercel, VPS |

---

## 📍 PRIORIDADES DE EJECUCIÓN

### NIVEL 1 - CRÍTICO
1. ✅ Entender estado actual ← **COMPLETADO**
2. 🔄 Crear Mercado Pago MCP ← **PRÓXIMO**
3. 🔄 Integrar con validator.js
4. 🔄 Docker config para MP

### NIVEL 2 - IMPORTANTE
5. 🔄 Configurar CNAME draw
6. 🔄 Sincronizar con VPS

### NIVEL 3 - MEJORA
7. 🔄 Expandir MCP con más herramientas
8. 🔄 Documentación

---

## 🚀 PRÓXIMO: CREAR MERCADO PAGO MCP

**Archivo destino:** `smarteros-factory/core/mercadopago-mcp.js`

**Herramientas a implementar:**
1. `create-payment` - Crear pago
2. `get-payment` - Consultar pago
3. `list-payments` - Historial
4. `refund-payment` - Reembolso
5. `create-webhook` - Configurar webhook
6. `test-webhook` - Simular notificación
7. `get-merchant-order` - Orden de compra

---

## 📝 NOTAS

- MCP Server de picoclaw usa stdio transport
- El validator.js actual solo valida token de Telegram
- No hay integraciones de pago activas
- draw.smarterbot.cl requiere configuración DNS

---

**Estado:** 🗺️ Mapa creado, listo para ejecutar
