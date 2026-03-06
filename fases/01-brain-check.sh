#!/bin/bash
# ═══════════════════════════════════════════════════════════════
#  🧠 FASE 1: BRAIN CHECK - Verificación del Cerebro Central
# ═══════════════════════════════════════════════════════════════

echo "╔══════════════════════════════════════════════════════════╗"
echo "║     🧠 FASE 1: BRAIN CHECK                               ║"
echo "╚══════════════════════════════════════════════════════════╝"

# Verificar Docker
echo -n "🐳 Docker: "
if docker ps &>/dev/null; then
  CONTAINERS=$(docker ps | wc -l)
  echo "✅ Running ($((CONTAINERS-1)) containers)"
else
  echo "❌ NOT running"
  exit 1
fi

# Verificar Dokploy
echo -n "🎛️  Dokploy: "
if docker ps | grep -q dokploy; then
  echo "✅ Active"
else
  echo "⚠️  Not found (optional)"
fi

# Verificar PostgreSQL
echo -n "🐘 PostgreSQL: "
if docker ps | grep -q postgres; then
  echo "✅ Running"
else
  echo "⚠️  Not found"
fi

# Verificar red
echo -n "🌐 Network: "
if ping -c 1 8.8.8.8 &>/dev/null; then
  echo "✅ OK"
else
  echo "❌ FAILED"
  exit 1
fi

# Verificar espacio
echo -n "💾 Disk Space: "
DISK=$(df -h / | tail -1 | awk '{print $5}')
echo "$DISK used"

echo ""
echo "✅ FASE 1 COMPLETADA"
echo ""
