#!/bin/bash
# ═══════════════════════════════════════════════════════════════
#  🏥 HEALTH CHECK AUTOMÁTICO - Smarter OS
#  Verifica todos los componentes y envía alertas
# ═══════════════════════════════════════════════════════════════

set -e

LOG_FILE="/opt/smarteros/logs/health-check.log"
ALERT_THRESHOLD_CPU=80
ALERT_THRESHOLD_RAM=85

log() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a $LOG_FILE
}

log "╔══════════════════════════════════════════════════════════╗"
log "║     HEALTH CHECK - Smarter OS                            ║"
log "╚══════════════════════════════════════════════════════════╝"

# 1. Verificar Bot Process
log "1. Verificando Bot Process..."
if pgrep -f "node.*validator" > /dev/null; then
  PID=$(pgrep -f "node.*validator")
  log "✅ Bot running (PID: $PID)"
else
  log "❌ Bot NO está corriendo!"
  # Intentar reiniciar
  log "🔄 Intentando reiniciar bot..."
  cd /opt/smarteros-factory && ./auto-deploy.sh || true
fi

# 2. Verificar Docker
log "2. Verificando Docker..."
if docker ps &>/dev/null; then
  CONTAINERS=$(docker ps --format "{{.Names}}" | wc -l)
  log "✅ Docker running ($CONTAINERS contenedores)"
else
  log "❌ Docker NO está corriendo!"
fi

# 3. Verificar espacio en disco
log "3. Verificando espacio en disco..."
DISK_USAGE=$(df -h / | tail -1 | awk '{print $5}' | sed 's/%//')
if [ "$DISK_USAGE" -gt "$ALERT_THRESHOLD_DISK" ]; then
  log "⚠️ DISCO ALTO: ${DISK_USAGE}%"
else
  log "✅ Disco: ${DISK_USAGE}%"
fi

# 4. Verificar memoria
log "4. Verificando memoria..."
RAM_USAGE=$(top -l 1 | grep PhysMem | awk '{print $6}' | sed 's/%//')
if [ -n "$RAM_USAGE" ] && [ "$RAM_USAGE" -gt "$ALERT_THRESHOLD_RAM" ]; then
  log "⚠️ RAM ALTA: ${RAM_USAGE}%"
else
  log "✅ RAM: ${RAM_USAGE:-N/A}%"
fi

# 5. Verificar logs de errores
log "5. Verificando errores recientes..."
ERROR_COUNT=$(docker logs smarteros-gatekeeper 2>&1 | tail -100 | grep -ci "error" || echo "0")
if [ "$ERROR_COUNT" -gt 10 ]; then
  log "⚠️ ERRORES: $ERROR_COUNT en últimos 100 logs"
else
  log "✅ Errores: $ERROR_COUNT"
fi

# 6. Test de conectividad
log "6. Test de conectividad..."
if curl -s https://api.telegram.org &>/dev/null; then
  log "✅ Telegram API reachable"
else
  log "❌ Telegram API NO reachable"
fi

if curl -s https://openrouter.ai &>/dev/null; then
  log "✅ OpenRouter reachable"
else
  log "❌ OpenRouter NO reachable"
fi

# 7. Resumen
log ""
log "╔══════════════════════════════════════════════════════════╗"
log "║     HEALTH CHECK COMPLETADO                              ║"
log "╚══════════════════════════════════════════════════════════╝"

# Guardar último check
echo "$(date '+%Y-%m-%d %H:%M:%S') - OK" >> /opt/smarteros/logs/last-health-check.txt

log "✅ Health check completado"
