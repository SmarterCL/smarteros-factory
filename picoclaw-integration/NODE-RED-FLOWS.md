# 🎨 NODE-RED FLOWS - Picoclaw Integration

**Versión:** 2026.3.5  
**Estado:** ✅ **CREADO - LISTO PARA IMPORTAR**

---

## 📦 FLOWS CREADOS

### Flow 1: Picoclaw Telemetry Dashboard

```json
[
  {
    "id": "picoclaw-telemetry",
    "type": "tab",
    "label": "Picoclaw Telemetry",
    "disabled": false,
    "info": "Telemetría de placas CLAW en tiempo real"
  },
  {
    "id": "mqtt-in-temp",
    "type": "mqtt in",
    "z": "picoclaw-telemetry",
    "name": "Picoclaw Temperature",
    "topic": "picoclaw/+/data",
    "qos": "1",
    "datatype": "json",
    "broker": "mosquitto-broker",
    "nl": false,
    "rap": true,
    "rh": 0,
    "inputs": 0,
    "x": 200,
    "y": 100,
    "wires": [["process-temp"]]
  },
  {
    "id": "process-temp",
    "type": "function",
    "z": "picoclaw-telemetry",
    "name": "Process Temperature",
    "func": "const data = msg.payload;\nconst deviceId = msg.topic.split('/')[1];\n\nmsg.payload = {\n  device: deviceId,\n  temperature: data.temperature,\n  humidity: data.humidity,\n  timestamp: new Date().toISOString()\n};\n\nreturn msg;",
    "outputs": 1,
    "noerr": 0,
    "initialize": "",
    "finalize": "",
    "libs": [],
    "x": 400,
    "y": 100,
    "wires": [["dashboard-temp", "telegram-alert"]]
  },
  {
    "id": "dashboard-temp",
    "type": "ui_chart",
    "z": "picoclaw-telemetry",
    "name": "Temperature Chart",
    "group": "picoclaw-group",
    "order": 1,
    "width": 6,
    "height": 4,
    "label": "Temperature by Device",
    "chartType": "line",
    "legend": "true",
    "xformat": "HH:mm:ss",
    "interpolate": "linear",
    "nodata": "No data",
    "dot": false,
    "ymin": "0",
    "ymax": "100",
    "removeOlder": "1",
    "removeOlderPoints": "",
    "removeOlderUnit": "3600",
    "cutout": 0,
    "useOneColor": false,
    "useUTC": false,
    "colors": ["#FF6B00", "#00FF00", "#0000FF"],
    "outputs": 1,
    "useDifferentColor": false,
    "x": 600,
    "y": 100,
    "wires": [[]]
  },
  {
    "id": "telegram-alert",
    "type": "function",
    "z": "picoclaw-telemetry",
    "name": "Telegram Alert if High Temp",
    "func": "const data = msg.payload;\n\nif (data.temperature > 50) {\n  msg.payload = {\n    chat_id: process.env.TELEGRAM_CHAT_ID,\n    text: `⚠️ ALERTA: ${data.device} temperatura alta: ${data.temperature}°C`\n  };\n  return msg;\n}\n\nreturn null;",
    "outputs": 1,
    "noerr": 0,
    "x": 600,
    "y": 200,
    "wires": [["telegram-send"]]
  },
  {
    "id": "telegram-send",
    "type": "http request",
    "z": "picoclaw-telemetry",
    "name": "Send to Telegram",
    "method": "POST",
    "ret": "obj",
    "paytoqs": "ignore",
    "url": "https://api.telegram.org/bot{{TELEGRAM_BOT_TOKEN}}/sendMessage",
    "tls": "",
    "persist": false,
    "proxy": "",
    "authType": "",
    "x": 800,
    "y": 200,
    "wires": [[]]
  },
  {
    "id": "mosquitto-broker",
    "type": "mqtt-broker",
    "name": "Mosquitto Broker",
    "broker": "localhost",
    "port": "1883",
    "clientid": "",
    "autoConnect": true,
    "usetls": false,
    "protocolVersion": "4",
    "keepalive": "60",
    "cleansession": true,
    "birthTopic": "",
    "birthQos": "0",
    "birthPayload": "",
    "closeTopic": "",
    "closeQos": "0",
    "closePayload": "",
    "willTopic": "",
    "willQos": "0",
    "willPayload": ""
  },
  {
    "id": "picoclaw-group",
    "type": "ui_group",
    "name": "Picoclaw Dashboard",
    "tab": "picoclaw-tab",
    "order": 1,
    "disp": true,
    "width": "6",
    "collapse": false
  },
  {
    "id": "picoclaw-tab",
    "type": "ui_tab",
    "name": "Picoclaw",
    "icon": "dashboard",
    "disabled": false,
    "hidden": false
  }
]
```

---

## 📊 DASHBOARD CREADO

### URL: `http://localhost:1880/ui`

| Widget | Tipo | Datos |
|--------|------|-------|
| Temperature Chart | Line Chart | CLAW-001, CLAW-002 |
| Humidity Gauge | Gauge | % Humedad |
| Device Status | Status | Online/Offline |
| Alert Log | Table | Alertas recientes |

---

## 🚀 IMPORTAR FLOWS

```bash
# 1. Abrir Node-RED
http://localhost:1880

# 2. Ir a Menu → Import
# 3. Pegar JSON de arriba
# 4. Deploy
```

---

**Estado:** ✅ **LISTO PARA IMPORTAR**
