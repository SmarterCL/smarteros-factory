#!/bin/bash
# ═══════════════════════════════════════════════════════════════
#  🚀 SMARTER.SH - Instalador Maestro v2.2
#  Despliega Smarter OS completo en 5 fases automáticas
# ═══════════════════════════════════════════════════════════════

set -e

# Colores
ORANGE='\033[0;38;5;208m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

# Banner
echo -e "${ORANGE}"
cat << 'EOF'
╔═══════════════════════════════════════════════════════════════╗
║         🚀 SMARTER.SH v2.2 - Instalador Maestro               ║
║         Red Bioceánica - Chile ↔ Argentina                    ║
╚═══════════════════════════════════════════════════════════════╝
EOF
echo -e "${NC}"

# Directorio del script
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo -e "${BLUE}📍 Directorio: $SCRIPT_DIR${NC}"
echo ""

# ═══════════════════════════════════════════════════════════════
#  FASE 1: BRAIN CHECK
# ═══════════════════════════════════════════════════════════════
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}🧠 FASE 1: BRAIN CHECK${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
bash "$SCRIPT_DIR/fases/01-brain-check.sh"

# ═══════════════════════════════════════════════════════════════
#  FASE 2: FACTORY PREP
# ═══════════════════════════════════════════════════════════════
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}🏭 FASE 2: FACTORY PREP${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
bash "$SCRIPT_DIR/fases/02-factory-prep.sh"

# ═══════════════════════════════════════════════════════════════
#  FASE 3: NODE DEPLOYMENT
# ═══════════════════════════════════════════════════════════════
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}🌐 FASE 3: NODE DEPLOYMENT${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
bash "$SCRIPT_DIR/fases/03-node-deployment.sh"

# ═══════════════════════════════════════════════════════════════
#  FASE 4: DOKPLOY ACTIVATION
# ═══════════════════════════════════════════════════════════════
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}🎛️  FASE 4: DOKPLOY ACTIVATION${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
bash "$SCRIPT_DIR/fases/04-dokploy-activation.sh"

# ═══════════════════════════════════════════════════════════════
#  FASE 5: NETWORK VERIFICATION
# ═══════════════════════════════════════════════════════════════
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}✅ FASE 5: NETWORK VERIFICATION${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
bash "$SCRIPT_DIR/fases/05-network-verification.sh"

# ═══════════════════════════════════════════════════════════════
#  RESUMEN FINAL
# ═══════════════════════════════════════════════════════════════
echo -e "${GREEN}"
cat << 'EOF'
╔═══════════════════════════════════════════════════════════════╗
║         🎉 SMARTER OS v2.2 - DESPLIEGUE COMPLETADO            ║
╠═══════════════════════════════════════════════════════════════╣
║  ✅ 5 Fases automáticas completadas                           ║
║  ✅ Red Bioceánica operativa                                  ║
║  ✅ 4 Nodos activos                                           ║
║  ✅ Telegram Bot: @nodocabernetbot                            ║
║  ✅ Docker: 25+ servicios                                     ║
║  ✅ Dokploy: Operacional                                      ║
╠═══════════════════════════════════════════════════════════════╣
║  PRÓXIMOS PASOS:                                              ║
║  1. Telegram: /start en @nodocabernetbot                      ║
║  2. Web: http://localhost:8080 (Dashboard)                    ║
║  3. Docs: /root/smarteros-factory/docs/                       ║
╚═══════════════════════════════════════════════════════════════╝

La Red es el Computador.
YOSI es el Arquitecto.
Red Bioceánica: 100% Operativa.
EOF
echo -e "${NC}"
