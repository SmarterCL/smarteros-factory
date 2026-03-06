# 🐾 PICOCLAW + SMARTERMCP INTEGRATION

**Versión:** 2026.3.5  
**Estado:** 🟢 **EN EJECUCIÓN**

---

## 🎯 OBJETIVO

Integrar **Picoclaw** (placas industriales ESP32) con **SmarterMCP** (Telegram Bot) para control remoto de hardware industrial vía Telegram.

---

## 🏗️ ARQUITECTURA

```
┌─────────────────────────────────────────────────────────────┐
│  TELEGRAM (Interfaz Humana)                                 │
│  @smarteros_gatekeeper_bot                                  │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  SMARTERMCP (Cerebro)                                       │
│  validator.js + CoPaw Bridge                                │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│  PICOCLAW (Hardware Industrial)                             │
│  ESP32-S3 + Placas CLAW                                     │
│  • Sensores                                                 │
│  • Actuadores                                               │
│  • Telemetría                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## 📦 COMPONENTES

| Componente | Función | Estado |
|------------|---------|--------|
| **Picoclaw** | Placas ESP32 industriales | ⏳ Pendiente |
| **CoPaw Bridge** | Puente MQTT ↔ Telegram | ⏳ Pendiente |
| **SmarterMCP** | Bot de Telegram | ✅ Listo |
| **Mosquitto** | Broker MQTT | ⏳ Pendiente |
| **Node-RED** | Flujos de automatización | ⏳ Pendiente |

---

## 🔧 COMANDOS DE INSTALACIÓN

### 1. Instalar Mosquitto (MQTT Broker)

```bash
docker run -d --name mosquitto \
  -p 1883:1883 \
  -p 9001:9001 \
  -v /opt/smarteros/mosquitto/config:/mosquitto/config \
  -v /opt/smarteros/mosquitto/data:/mosquitto/data \
  -v /opt/smarteros/mosquitto/log:/mosquitto/log \
  eclipse-mosquitto:latest
```

### 2. Instalar Node-RED

```bash
docker run -d --name node-red \
  -p 1880:1880 \
  -v /opt/smarteros/node-red/data:/data \
  nodered/node-red:latest
```

### 3. Instalar CoPaw Bridge

```bash
cd /opt/smarteros-factory
mkdir -p copaw-bridge
cd copaw-bridge

# Crear script principal
cat > copaw-bridge.py << 'EOF'
#!/usr/bin/env python3
"""
CoPaw Bridge v0.0.4
Puente entre Picoclaw (ESP32) y SmarterMCP (Telegram)
"""

import paho.mqtt.client as mqtt
import json
import os

# Configuración
MQTT_BROKER = os.environ.get('MQTT_BROKER', 'localhost')
MQTT_PORT = int(os.environ.get('MQTT_PORT', 1883))
MQTT_TOPIC = 'picoclaw/+/data'

# Callback cuando se conecta
def on_connect(client, userdata, flags, rc):
    print(f"✅ Conectado a MQTT Broker: {MQTT_BROKER}")
    client.subscribe(MQTT_TOPIC)
    print(f"📡 Suscrito a: {MQTT_TOPIC}")

# Callback cuando llega mensaje
def on_message(client, userdata, msg):
    print(f"📩 Recibido: {msg.topic} = {msg.payload.decode()}")
    
    # Procesar datos de Picoclaw
    try:
        data = json.loads(msg.payload.decode())
        print(f"🔍 Datos: {data}")
        
        # Aquí iría la lógica para enviar a Telegram
        # send_to_telegram(data)
        
    except Exception as e:
        print(f"❌ Error: {e}")

# Main
client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message

print("🐾 CoPaw Bridge v0.0.4 iniciando...")
client.connect(MQTT_BROKER, MQTT_PORT, 60)
client.loop_forever()
EOF

chmod +x copaw-bridge.py
```

---

## 📊 CHECKLIST DE EJECUCIÓN

### Fase 1: Configurar

- [x] ✅ Crear directorio picoclaw-integration
- [ ] ⏳ Crear docker-compose.yml
- [ ] ⏳ Configurar Mosquitto
- [ ] ⏳ Configurar Node-RED flows

### Fase 2: Plan

- [ ] ⏳ Definir tópicos MQTT
- [ ] ⏳ Definir comandos Telegram
- [ ] ⏳ Definir estructura de datos

### Fase 3: Instalar

- [ ] ⏳ `docker compose up -d`
- [ ] ⏳ `npm install paho-mqtt`
- [ ] ⏳ `pip install paho-mqtt`

### Fase 4: Ejecutar

- [ ] ⏳ Iniciar Mosquitto
- [ ] ⏳ Iniciar Node-RED
- [ ] ⏳ Iniciar CoPaw Bridge
- [ ] ⏳ Conectar Picoclaw

### Fase 5: Reportar

- [ ] ⏳ Verificar logs
- [ ] ⏳ Testear comandos
- [ ] ⏳ Validar telemetría

### Fase 6: Volver al Ciclo

- [ ] ⏳ Integrar con SmarterMCP
- [ ] ⏳ Actualizar validator.js
- [ ] ⏳ Testear end-to-end

---

**Próximo:** Ejecutando instalación...
