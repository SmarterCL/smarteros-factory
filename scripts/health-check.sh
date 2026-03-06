#!/bin/bash
# ═══════════════════════════════════════════════════════════════
#  🏥 HEALTH CHECK - Smarter OS
#  Verificación periódica de servicios
# ═══════════════════════════════════════════════════════════════

set -e

echo "🏥 Health Check - $(date)"
echo "════════════════════════════════════════════"

# Verificar Docker
echo -n "Docker: "
if docker ps &>/dev/null; then
  echo "✅"
else
  echo "❌"
  exit 1
fi

# Verificar contenedores críticos
for container in smarteros-gatekeeper nextcloud-aio-mastercontainer postgres n8n; do
  echo -n "$container: "
  if docker ps | grep -q $container; then
    echo "✅"
  else
    echo "❌"
  fi
done

# Verificar uso de recursos
echo ""
echo "📊 Uso de Recursos:"
docker stats --no-stream --format "table {{.Name}}\t{{.CPUPerc}}\t{{.MemUsage}}"

# Verificar espacio en disco
echo ""
echo "💾 Espacio en Disco:"
df -h /opt/smarteros | tail -1

# Verificar logs de errores recientes
echo ""
echo "🔍 Errores Recientes:"
docker logs smarteros-gatekeeper --tail 100 | grep -i error || echo "✅ Sin errores"

echo ""
echo "════════════════════════════════════════════"
echo "✅ Health Check completado"
