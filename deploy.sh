#!/bin/bash
# ═══════════════════════════════════════════════════════════════════════════════
#  SMARTER OS v2026.3.5 - Factory Reset
#  Script de Despliegue Rápido del Gatekeeper
# ═══════════════════════════════════════════════════════════════════════════════

set -e

echo "🤖 Smarter OS v2026.3.5 - Factory Reset"
echo "══════════════════════════════════════"
echo ""

# Colores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# 1. Verificar Docker
echo -n "🔍 Verificando Docker... "
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker no instalado${NC}"
    echo "Instalar: curl -fsSL https://get.docker.com | sh"
    exit 1
fi
echo -e "${GREEN}✅${NC}"

# 2. Verificar credenciales
echo ""
echo "🔑 Verificando credenciales..."
if [ ! -f .env ]; then
    echo -e "${YELLOW}⚠️  .env no encontrado${NC}"
    echo ""
    echo "📝 Configura tus credenciales:"
    echo "   cp .env.example .env"
    echo "   nano .env"
    echo ""
    echo "   TELEGRAM_BOT_TOKEN=tu_token_aqui"
    echo "   TELEGRAM_CHAT_ID=tu_id_aqui"
    echo ""
    read -p "¿Ya configuraste .env? (y/n): " response
    if [[ ! "$response" =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Verificar que .env tenga valores
if ! grep -q "TELEGRAM_BOT_TOKEN=" .env || ! grep -q "TELEGRAM_CHAT_ID=" .env; then
    echo -e "${RED}❌ .env sin valores configurados${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Credenciales verificadas${NC}"

# 3. Instalar dependencias (si es local)
if [ ! -d "node_modules" ]; then
    echo ""
    echo "📦 Instalando dependencias..."
    npm install
    echo -e "${GREEN}✅ Dependencias instaladas${NC}"
fi

# 4. Desplegar
echo ""
echo "🚀 Desplegando Gatekeeper..."

# Opción A: Docker (recomendado)
if command -v docker compose &> /dev/null; then
    # Crear docker-compose.yml si no existe
    if [ ! -f docker-compose.yml ]; then
        cat > docker-compose.yml << 'EOF'
version: '3.8'
services:
  validator:
    build: .
    env_file: .env
    restart: always
    container_name: smarteros-gatekeeper
EOF
    fi
    
    docker compose up -d --build
    echo -e "${GREEN}✅ Contenedor desplegado${NC}"
else
    # Opción B: Docker directo
    docker build -t smarteros-gatekeeper .
    docker run -d --name smarteros-gatekeeper --env-file .env smarteros-gatekeeper
    echo -e "${GREEN}✅ Contenedor desplegado${NC}"
fi

# 5. Verificar
echo ""
echo "🔍 Verificando estado..."
sleep 3

if docker ps | grep -q smarteros-gatekeeper; then
    echo -e "${GREEN}✅ Gatekeeper en línea${NC}"
    echo ""
    echo "📊 Logs en tiempo real:"
    echo "   docker logs -f smarteros-gatekeeper"
    echo ""
    echo "📱 Ahora en Telegram:"
    echo "   1. Busca tu bot"
    echo "   2. Envía /start"
    echo "   3. Debe responder: '✅ Reset Completo'"
else
    echo -e "${RED}❌ Algo salió mal${NC}"
    echo "Ver logs: docker logs smarteros-gatekeeper"
    exit 1
fi

echo ""
echo "══════════════════════════════════════"
echo "✅ Smarter OS Factory Reset COMPLETADO"
echo "══════════════════════════════════════"
