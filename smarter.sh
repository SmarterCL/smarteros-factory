#!/bin/bash
# ═══════════════════════════════════════════════════════════════
#  🍇 SMARTER.SH v2026.3.5 - Instalador de Nodos Inteligentes
#  Convierte cualquier hardware en un nodo de Smarter OS
#  La Red es el Computador | Los Nodos son Expansibles
# ═══════════════════════════════════════════════════════════════

set -e

# Colores (Naranja Smarter OS)
ORANGE='\033[0;38;5;208m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# ═══════════════════════════════════════════════════════════════
#  BANNER DE INICIO
# ═══════════════════════════════════════════════════════════════
echo -e "${ORANGE}"
cat << 'EOF'
╔═══════════════════════════════════════════════════════════════╗
║         🍇 SMARTER.SH v2026.3.5                               ║
║         Instalador de Nodos Inteligentes                      ║
║                                                               ║
║         "La Red es el Computador"                             ║
║         "Los Nodos son Expansibles"                           ║
╚═══════════════════════════════════════════════════════════════╝
EOF
echo -e "${NC}"

# ═══════════════════════════════════════════════════════════════
#  1. DETECCIÓN DE HARDWARE
# ═══════════════════════════════════════════════════════════════
echo -e "${BLUE}🔍 Detectando hardware...${NC}"

# Generar ID Único del Nodo
if [ -f /proc/cpuinfo ]; then
  NODE_ID=$(cat /proc/cpuinfo | grep Serial | cut -d' ' -f2 | head -1)
fi

if [ -z "$NODE_ID" ] || [ "$NODE_ID" = "Serial" ]; then
  # Fallback para sistemas sin /proc/cpuinfo
  NODE_ID="$(hostname -s)-$(date +%s | tail -c 8)"
fi

# Si no hay NODE_ID, generar uno aleatorio
if [ -z "$NODE_ID" ]; then
  NODE_ID="NODE-$(openssl rand -hex 4)"
fi

echo -e "${GREEN}✓ Hardware ID: $NODE_ID${NC}"

# ═══════════════════════════════════════════════════════════════
#  2. INSTALACIÓN DE DEPENDENCIAS
# ═══════════════════════════════════════════════════════════════
echo -e "${BLUE}📦 Verificando dependencias...${NC}"

# Instalar Docker si no existe
if ! command -v docker &> /dev/null; then
  echo -e "${ORANGE}⚠️  Docker no encontrado. Instalando...${NC}"
  curl -fsSL https://get.docker.com | sh
  echo -e "${GREEN}✓ Docker instalado${NC}"
else
  echo -e "${GREEN}✓ Docker ya instalado${NC}"
fi

# Instalar Docker Compose si no existe
if ! command -v docker compose &> /dev/null; then
  echo -e "${ORANGE}⚠️  Docker Compose no encontrado. Instalando...${NC}"
  DOCKER_CONFIG=${DOCKER_CONFIG:-$HOME/.docker}
  mkdir -p $DOCKER_CONFIG/cli-plugins
  curl -SL https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-linux-x86_64 -o $DOCKER_CONFIG/cli-plugins/docker-compose
  chmod +x $DOCKER_CONFIG/cli-plugins/docker-compose
  echo -e "${GREEN}✓ Docker Compose instalado${NC}"
else
  echo -e "${GREEN}✓ Docker Compose ya instalado${NC}"
fi

# ═══════════════════════════════════════════════════════════════
#  3. REGISTRO DEL NODO
# ═══════════════════════════════════════════════════════════════
echo -e "${BLUE}🔗 Registrando nodo en Smarter OS...${NC}"

# Crear directorio de configuración
mkdir -p /etc/smarteros

# Guardar configuración del nodo
cat > /etc/smarteros/node.conf << EOF
# Smarter OS Node Configuration
NODE_ID=$NODE_ID
NODE_TYPE=landscape
NODE_ROLE=pending
INSTALLED_AT=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
HOSTNAME=$(hostname -f)
OS=$(uname -s)
ARCH=$(uname -m)
EOF

echo -e "${GREEN}✓ Nodo registrado en /etc/smarteros/node.conf${NC}"

# ═══════════════════════════════════════════════════════════════
#  4. VINCULACIÓN CON TELEGRAM
# ═══════════════════════════════════════════════════════════════
echo ""
echo -e "${ORANGE}╔═══════════════════════════════════════════════════════════════╗${NC}"
echo -e "${ORANGE}║  📱 VINCULACIÓN CON TELEGRAM                                  ║${NC}"
echo -e "${ORANGE}╚═══════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo "Para vincular este nodo con Smarter OS:"
echo ""
echo "  ${GREEN}1.${NC} Abre Telegram"
echo "  ${GREEN}2.${NC} Busca: @smarteros_gatekeeper_bot"
echo "  ${GREEN}3.${NC} Envía: ${ORANGE}/node $NODE_ID${NC}"
echo "  ${GREEN}4.${NC} Escanea el QR o usa el link de abajo"
echo ""

# Generar QR data
QR_DATA="smarteros://node/$NODE_ID"
TELEGRAM_LINK="https://t.me/smarteros_gatekeeper_bot?start=node_$NODE_ID"

echo -e "${BLUE}🔗 Link de vinculación:${NC}"
echo -e "${ORANGE}   $TELEGRAM_LINK${NC}"
echo ""

# Mostrar QR en terminal (si está disponible)
if command -v qrencode &> /dev/null; then
  echo -e "${BLUE}📱 QR Code:${NC}"
  qrencode -t ANSIUTF8 "$QR_DATA"
fi

# ═══════════════════════════════════════════════════════════════
#  5. INSTALACIÓN DE CoPAW (OPCIONAL)
# ═══════════════════════════════════════════════════════════════
echo ""
read -p "¿Instalar CoPaw Bridge para placas industriales? (y/n): " install_copaw

if [[ "$install_copaw" =~ ^[Yy]$ ]]; then
  echo -e "${BLUE}🔧 Instalando CoPaw Bridge...${NC}"
  
  # Crear directorio CoPaw
  mkdir -p /opt/copaw
  
  # Descargar CoPaw (placeholder - se implementará después)
  cat > /opt/copaw/copaw-bridge.py << 'COPAW_EOF'
#!/usr/bin/env python3
"""
CoPaw Bridge v0.0.4
Puente entre placas industriales y Smarter OS
"""
import sys
import time

def main():
    print("🐾 CoPaw Bridge v0.0.4")
    print("   Conectando con placas industriales...")
    print("   (Implementación pendiente)")
    return 0

if __name__ == "__main__":
    sys.exit(main())
COPAW_EOF

  chmod +x /opt/copaw/copaw-bridge.py
  echo -e "${GREEN}✓ CoPaw Bridge instalado en /opt/copaw/${NC}"
else
  echo -e "${BLUE}⏭️  CoPaw Bridge saltado (puedes instalarlo después)${NC}"
fi

# ═══════════════════════════════════════════════════════════════
#  6. RESUMEN DE INSTALACIÓN
# ═══════════════════════════════════════════════════════════════
echo ""
echo -e "${ORANGE}╔═══════════════════════════════════════════════════════════════╗${NC}"
echo -e "${ORANGE}║  ✅ NODO SMARTER OS INSTALADO EXITOSAMENTE                    ║${NC}"
echo -e "${ORANGE}╚═══════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${BLUE}📊 Estado del nodo:${NC}"
echo -e "   ID: ${ORANGE}$NODE_ID${NC}"
echo -e "   Tipo: landscape"
echo -e "   Ubicación: $(hostname -f)"
echo -e "   Sistema: $(uname -s) $(uname -m)"
echo -e "   Instalado: $(date -u +"%Y-%m-%dT%H:%M:%SZ")"
echo ""
echo -e "${BLUE}🎯 Próximos pasos:${NC}"
echo -e "   ${GREEN}1.${NC} Vincular con Telegram: ${ORANGE}/node $NODE_ID${NC}"
echo -e "   ${GREEN}2.${NC} Configurar monitoreo en la Mini App"
echo -e "   ${GREEN}3.${NC} Activar telemetría"
echo -e "   ${GREEN}4.${NC} (Opcional) Instalar CoPaw para placas"
echo ""
echo -e "${BLUE}📚 Documentación:${NC}"
echo -e "   /etc/smarteros/node.conf"
echo ""
echo -e "${ORANGE}🚀 La Red es el Computador. Los Nodos son Expansibles.${NC}"
echo ""

# ═══════════════════════════════════════════════════════════════
#  FIN DEL SCRIPT
# ═══════════════════════════════════════════════════════════════
