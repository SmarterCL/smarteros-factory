# 🤖 Smarter OS v2026.3.5 - WebControl Remoto

**Telegram = Tu consola privada | Dokploy = Motor**

---

## 🚀 Quick Start

```bash
cd /opt/smarteros-factory
cp .env.example .env
nano .env  # Poner tu token de Telegram
docker compose up -d
```

Luego en Telegram: `/menu`

---

## 📁 Estructura

```
/smarteros-factory/
├── core/
│   └── validator.js       # Bot WebControl
├── docker-compose.yml     # Docker config
├── Dockerfile             # Container build
├── package.json           # Dependencies
├── Caddyfile              # Web redirect
├── .env.example           # Env template
└── README.md              # This file
```

---

## 🎮 Comandos

| Comando | Acción |
|---------|--------|
| `/menu` | Botones |
| `/status` | Docker ps |
| `/logs [app]` | Ver logs |
| `/documentar [nota]` | Guardar |
| `/deploy [app]` | Reiniciar |
| `/buscar <término>` | Grep |
| `/help` | Ayuda |

---

## 🔒 Seguridad

Solo tu Chat ID tiene acceso. Configurado en `.env`:

```
TELEGRAM_CHAT_ID=54101...
```

---

## 🌐 Web

app.smarterbot.cl redirecciona a Telegram.

---

**Versión:** 2026.3.5  
**Estado:** ✅ Listo
