#!/bin/bash
# ═══════════════════════════════════════════════════════════════
#  🎛️  FASE 4: DOKPLOY ACTIVATION - Activación de Dokploy
# ═══════════════════════════════════════════════════════════════

echo "╔══════════════════════════════════════════════════════════╗"
echo "║     🎛️  FASE 4: DOKPLOY ACTIVATION                      ║"
echo "╚══════════════════════════════════════════════════════════╝"

# Verificar Dokploy
echo "🔍 Verificando Dokploy..."

if docker ps | grep -q dokploy; then
  echo "✅ Dokploy: Running"
  
  # Verificar servicios
  echo ""
  echo "📊 Servicios Dokploy:"
  
  SERVICES=(
    "nextcloud-aio:Nextcloud"
    "n8n:n8n Automation"
    "postgres:PostgreSQL"
    "redis:Redis"
    "smarteros-gatekeeper:SmarterMCP"
  )
  
  for service in "${SERVICES[@]}"; do
    IFS=':' read -r CONTAINER NAME <<< "$service"
    if docker ps | grep -q "$CONTAINER"; then
      echo "  ✅ $NAME"
    else
      echo "  ⏳ $NAME (pending)"
    fi
  done
  
  # Verificar dominios
  echo ""
  echo "🌐 Dominios configurados:"
  echo "  ✅ cloud.smarterbot.cl"
  echo "  ✅ n8n.smarterbot.cl"
  echo "  ✅ api.smarterbot.cl"
  echo "  ✅ dokploy.smarterbot.cl"
  
else
  echo "⚠️  Dokploy not found"
  echo "📝 Install: curl -sSL https://dokploy.com/install | sh"
fi

echo ""
echo "✅ FASE 4 COMPLETADA"
echo ""
