#!/bin/bash
# ═══════════════════════════════════════════════════════════════
#  🏭 FASE 2: FACTORY PREP - Preparación de Fábrica
# ═══════════════════════════════════════════════════════════════

echo "╔══════════════════════════════════════════════════════════╗"
echo "║     🏭 FASE 2: FACTORY PREP                              ║"
echo "╚══════════════════════════════════════════════════════════╝"

# Crear directorios
echo "📁 Creando directorios..."
mkdir -p /root/smarteros-factory/{docs,core,optimizations,cache,metrics,logs}
echo "✅ Directorios creados"

# Configurar permisos
echo "🔐 Configurando permisos..."
chmod +x /root/smarteros-factory/*.sh 2>/dev/null || true
chmod +x /root/smarteros-factory/core/*.js 2>/dev/null || true
echo "✅ Permisos configurados"

# Cargar variables de entorno
echo "⚙️  Cargando variables de entorno..."
if [ -f /root/smarteros-factory/.env ]; then
  export $(cat /root/smarteros-factory/.env | grep -v '^#' | xargs)
  echo "✅ Variables cargadas"
else
  echo "⚠️  .env not found (creating example)"
  cp /root/smarteros-factory/.env.example /root/smarteros-factory/.env 2>/dev/null || true
fi

# Verificar dependencias
echo "📦 Verificando dependencias..."
if command -v node &>/dev/null; then
  echo "✅ Node.js: $(node --version)"
else
  echo "⚠️  Node.js not found"
fi

if command -v npm &>/dev/null; then
  echo "✅ npm: $(npm --version)"
else
  echo "⚠️  npm not found"
fi

echo ""
echo "✅ FASE 2 COMPLETADA"
echo ""
