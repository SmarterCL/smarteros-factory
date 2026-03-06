#!/bin/bash
# ═══════════════════════════════════════════════════════════════
#  💾 AUTO BACKUP - Smarter OS
#  Backup automático de datos críticos
# ═══════════════════════════════════════════════════════════════

set -e

BACKUP_DIR="/opt/smarteros/backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

echo "💾 Iniciando backup automático..."

# Crear directorio de backups
mkdir -p $BACKUP_DIR/{docker,docs,config}

# Backup de Docker volumes
echo "📦 Backup Docker volumes..."
docker run --rm \
  -v smarteros-factory_nextcloud_data:/data \
  -v $BACKUP_DIR/docker:/backup \
  alpine tar czf /backup/nextcloud-$TIMESTAMP.tar.gz /data

# Backup de documentación
echo "📚 Backup documentación..."
tar czf $BACKUP_DIR/docs-$TIMESTAMP.tar.gz /opt/smarteros-factory/docs/

# Backup de configuración
echo "⚙️ Backup configuración..."
tar czf $BACKUP_DIR/config-$TIMESTAMP.tar.gz /opt/smarteros-factory/*.yml /opt/smarteros-factory/*.env

# Eliminar backups antiguos (>30 días)
echo "🗑️ Limpiando backups antiguos..."
find $BACKUP_DIR -name "*.tar.gz" -mtime +30 -delete

echo "✅ Backup completado: $TIMESTAMP"
echo "📁 Ubicación: $BACKUP_DIR"
