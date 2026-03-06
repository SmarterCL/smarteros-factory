#!/bin/bash
# ═══════════════════════════════════════════════════════════════
#  🚀 SMARTER OS - DEPLOY SCRIPT AUTÓNOMO
#  Ejecuta todo sin intervención humana
# ═══════════════════════════════════════════════════════════════

set -e

ORANGE='\033[0;38;5;208m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${ORANGE}"
cat << 'EOF'
╔═══════════════════════════════════════════════════════════════╗
║         🚀 SMARTER OS - DEPLOY AUTÓNOMO                       ║
║         Trabajando sin intervención humana                    ║
╚═══════════════════════════════════════════════════════════════╝
EOF
echo -e "${NC}"

# 1. Verificar Docker
echo -e "${BLUE}[1/6] Verificando Docker...${NC}"
if ! command -v docker &> /dev/null; then
  echo -e "${RED}❌ Docker no instalado. Instalando...${NC}"
  curl -fsSL https://get.docker.com | sh
fi
echo -e "${GREEN}✓ Docker verificado${NC}"

# 2. Crear red Dokploy
echo -e "${BLUE}[2/6] Creando red Docker...${NC}"
docker network create dokploy-network 2>/dev/null || true
echo -e "${GREEN}✓ Red creada${NC}"

# 3. Ir al directorio
echo -e "${BLUE}[3/6] Navegando a smarteros-factory...${NC}"
cd /opt/smarteros-factory || exit 1
echo -e "${GREEN}✓ Directorio listo${NC}"

# 4. Desplegar stack principal
echo -e "${BLUE}[4/6] Desplegando stack principal...${NC}"
docker compose pull
docker compose up -d --build --remove-orphans
echo -e "${GREEN}✓ Stack principal desplegado${NC}"

# 5. Desplegar Picoclaw
echo -e "${BLUE}[5/6] Desplegando Picoclaw integration...${NC}"
cd picoclaw-integration
docker compose pull
docker compose up -d --build
echo -e "${GREEN}✓ Picoclaw desplegado${NC}"

# 6. Verificar
echo -e "${BLUE}[6/6] Verificando servicios...${NC}"
sleep 5
docker ps --format "table {{.Names}}\t{{.Status}}"

echo ""
echo -e "${GREEN}╔═══════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║  ✅ DEPLOY AUTÓNOMO COMPLETADO                                ║${NC}"
echo -e "${GREEN}╚═══════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${BLUE}📱 En Telegram:${NC}"
echo "   /start"
echo "   /menu"
echo "   /claw status"
echo "   /fact"
echo ""
echo -e "${ORANGE}🚀 La Red es el Computador. YOSI es el Arquitecto.${NC}"
