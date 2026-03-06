# 🚀 DESPLIEGUE INMEDIATO: Smarter OS WebControl

**Ejecutar AHORA para tener todo funcionando**

---

## Paso 1: Copiar Archivos al Servidor

```bash
# En tu Mac/local
scp -r /Users/mac/smarteros-factory root@srv814944:/opt/smarteros-factory
```

## Paso 2: Configurar Credenciales

```bash
# SSH al servidor
ssh root@srv814944

# Ir al directorio
cd /opt/smarteros-factory

# Copiar .env
cp .env.example .env

# Editar con tus credenciales
nano .env

# Poner:
TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrsTUVwxyz
TELEGRAM_CHAT_ID=54101...  # Tu ID real
```

## Paso 3: Instalar Dependencias

```bash
npm install
```

## Paso 4: Desplegar con Docker

```bash
# Asegurar que la red dokploy existe
docker network create dokploy-network 2>/dev/null || true

# Desplegar
docker compose up -d --build

# Ver logs
docker logs -f smarteros-gatekeeper
```

## Paso 5: Probar en Telegram

```
1. Abrir Telegram
2. Buscar tu bot
3. Enviar: /menu

Debe mostrar botones:
📊 Status  📜 Logs
📝 Documentar  🚀 Deploy
🔍 Buscar  ℹ️ Ayuda
```

## Paso 6: Configurar Redirección Web

```bash
# Opción A: Caddy en Dokploy
# Ir a dokploy.smarterbot.cl → Tu App → Caddyfile
# Pegar contenido de Caddyfile

# Opción B: HTML Redirect
mkdir -p /var/www/app.smarterbot.cl
echo '<meta http-equiv="refresh" content="0; url=https://t.me/smarteros_gatekeeper_bot">' > /var/www/app.smarterbot.cl/index.html
```

## Verificación Final

```bash
# Ver contenedor
docker ps | grep gatekeeper

# Ver logs
docker logs smarteros-gatekeeper

# En Telegram:
/status → Debe mostrar contenedores
/logs → Debe mostrar logs
```

---

## ✅ Checklist Cero Pendientes

- [x] validator.js actualizado
- [x] docker-compose.yml creado
- [x] Dockerfile creado
- [x] package.json creado
- [x] Caddyfile creado
- [x] .env.example creado
- [ ] Copiar a servidor
- [ ] Configurar .env con token real
- [ ] docker compose up -d
- [ ] Probar /menu en Telegram
- [ ] Configurar redirección web

---

**Ejecutar ahora:**

```bash
cd /opt/smarteros-factory
cp .env.example .env
nano .env  # Poner token y ID
docker compose up -d --build
docker logs -f smarteros-gatekeeper
```

**Luego en Telegram:** `/menu`

---

**Estado:** ⚡ LISTO PARA EJECUTAR
