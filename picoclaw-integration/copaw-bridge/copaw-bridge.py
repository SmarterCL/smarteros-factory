#!/usr/bin/env python3
"""
CoPaw Bridge v0.0.4
Puente entre Picoclaw (ESP32) y SmarterMCP (Telegram)
"""

import paho.mqtt.client as mqtt
import json
import os
import requests
from datetime import datetime

# ═══════════════════════════════════════════════════════════
#  CONFIGURACIÓN
# ═══════════════════════════════════════════════════════════

MQTT_BROKER = os.environ.get('MQTT_BROKER', 'localhost')
MQTT_PORT = int(os.environ.get('MQTT_PORT', 1883))
MQTT_TOPIC = 'picoclaw/+/data'
MQTT_COMMAND_TOPIC = 'picoclaw/+/command'

TELEGRAM_BOT_TOKEN = os.environ.get('TELEGRAM_BOT_TOKEN', '')
TELEGRAM_CHAT_ID = os.environ.get('TELEGRAM_CHAT_ID', '')

# ═══════════════════════════════════════════════════════════
#  FUNCIONES DE TELEGRAM
# ═══════════════════════════════════════════════════════════

def send_telegram_message(message):
    """Enviar mensaje a Telegram"""
    if not TELEGRAM_BOT_TOKEN or not TELEGRAM_CHAT_ID:
        print("⚠️ Telegram no configurado")
        return
    
    url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
    payload = {
        'chat_id': TELEGRAM_CHAT_ID,
        'text': message,
        'parse_mode': 'HTML'
    }
    
    try:
        response = requests.post(url, json=payload, timeout=10)
        if response.json().get('ok'):
            print("✅ Telegram enviado")
        else:
            print(f"❌ Telegram error: {response.json()}")
    except Exception as e:
        print(f"❌ Error: {e}")

# ═══════════════════════════════════════════════════════════
#  CALLBACKS MQTT
# ═══════════════════════════════════════════════════════════

def on_connect(client, userdata, flags, rc):
    """Callback cuando se conecta"""
    if rc == 0:
        print(f"✅ Conectado a MQTT Broker: {MQTT_BROKER}")
        client.subscribe(MQTT_TOPIC)
        print(f"📡 Suscrito a: {MQTT_TOPIC}")
    else:
        print(f"❌ Error de conexión: {rc}")

def on_message(client, userdata, msg):
    """Callback cuando llega mensaje"""
    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    print(f"[{timestamp}] 📩 {msg.topic} = {msg.payload.decode()}")
    
    try:
        data = json.loads(msg.payload.decode())
        
        # Extraer datos del dispositivo Picoclaw
        device_id = msg.topic.split('/')[1]
        temperature = data.get('temperature', 'N/A')
        humidity = data.get('humidity', 'N/A')
        status = data.get('status', 'unknown')
        
        # Formatear mensaje para Telegram
        message = f"""
🐾 <b>Picoclaw Alert</b>
━━━━━━━━━━━━━━━━━━━━━━
<b>Dispositivo:</b> {device_id}
<b>Temperatura:</b> {temperature}°C
<b>Humedad:</b> {humidity}%
<b>Estado:</b> {status}
<b>Timestamp:</b> {timestamp}
━━━━━━━━━━━━━━━━━━━━━━
        """.strip()
        
        # Enviar a Telegram
        send_telegram_message(message)
        
    except Exception as e:
        print(f"❌ Error procesando mensaje: {e}")

def on_publish(client, userdata, mid):
    """Callback cuando se publica"""
    print(f"📤 Publicado: {mid}")

# ═══════════════════════════════════════════════════════════
#  COMANDOS DESDE TELEGRAM (MQTT → Picoclaw)
# ═══════════════════════════════════════════════════════════

def send_command_to_picoclaw(device_id, command, params=None):
    """Enviar comando a Picoclaw vía MQTT"""
    topic = f'picoclaw/{device_id}/command'
    payload = {
        'command': command,
        'params': params or {},
        'timestamp': datetime.now().isoformat()
    }
    
    client.publish(topic, json.dumps(payload))
    print(f"📤 Comando enviado: {command} a {device_id}")

# ═══════════════════════════════════════════════════════════
#  MAIN
# ═══════════════════════════════════════════════════════════

if __name__ == '__main__':
    print("🐾 CoPaw Bridge v0.0.4 iniciando...")
    print(f"   MQTT Broker: {MQTT_BROKER}:{MQTT_PORT}")
    print(f"   Telegram: {'✅' if TELEGRAM_BOT_TOKEN else '❌'}")
    
    # Crear cliente MQTT
    client = mqtt.Client()
    client.on_connect = on_connect
    client.on_message = on_message
    client.on_publish = on_publish
    
    # Conectar
    client.connect(MQTT_BROKER, MQTT_PORT, 60)
    
    # Loop principal
    print("✅ CoPaw Bridge en línea. Esperando datos de Picoclaw...")
    client.loop_forever()
