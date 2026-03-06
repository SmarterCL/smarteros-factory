# 📱 TELEGRAM MINI APP - Layout de Interfaz

**Versión:** 2026.3.5  
**Estado:** ✅ **LISTO PARA FLUTTER/REACT**  
**TAG:** `MINI_APP_LAYOUT`

---

## 🎨 Concepto de Diseño

**Branding:** Naranja x2 (Smarter OS)  
**Filosofía:** "La Red es el Computador. Los Nodos son Expansibles."

---

## 📊 PANTALLA PRINCIPAL: Dashboard de Nodo

```
┌─────────────────────────────────────────────────────────────┐
│  🍇 Smarter OS                      🔔 3    ⚙️ [NODO-001]  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │  🏛️ FACT HISTORY - IDENTIDAD REGISTRADA              │ │
│  │  "NO FUE ERROR. FUE PROTECCIÓN."                      │ │
│  │  Mendoza ↔ Santiago | 26-Dic Kill Switch             │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
│  ┌─────────────────┐  ┌─────────────────┐                  │
│  │  📊 STATUS      │  │  🌡️ TEMP        │                  │
│  │  ✅ Online      │  │  45°C           │                  │
│  │  ▲ 99.9%        │  │  ▲ Normal       │                  │
│  └─────────────────┘  └─────────────────┘                  │
│                                                             │
│  ┌─────────────────┐  ┌─────────────────┐                  │
│  │  ⚡ ENERGÍA     │  │  📈 LEY REP     │                  │
│  │  2.4 kWh        │  │  87%            │                  │
│  │  ▼ -12%         │  │  ▲ +5%          │                  │
│  └─────────────────┘  └─────────────────┘                  │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │  🎮 ACCIONES RÁPIDAS                                  │ │
│  │                                                       │ │
│  │  [📊 Status]  [📜 Logs]  [🚀 Deploy]  [⚙️ Config]    │ │
│  │                                                       │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │  📊 TELEMETRÍA EN VIVO                                │ │
│  │                                                       │ │
│  │  CPU: ████████░░ 78%    ▲ 12%                         │ │
│  │  MEM: █████░░░░░ 52%    ▼ 3%                          │ │
│  │  DISK: ███░░░░░░░ 28%    ▲ 1%                          │ │
│  │  NET: ██████░░░░ 64%    ▲ 8%                          │ │
│  │                                                       │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │  🗺️ NODOS CONECTADOS                                 │ │
│  │                                                       │ │
│  │  🟠 NODO-001 (CEO)         Santiago      ✅ Online    │ │
│  │  🟠 NODO-002 (Trading)     Mendoza       ✅ Online    │ │
│  │  🟠 NODO-003 (Consult.)    Buenos Aires  ⏳ Pending   │ │
│  │  🟠 NODO-004 (Blockchain)  Valparaíso    ✅ Online    │ │
│  │                                                       │ │
│  │  [+ Agregar Nodo]                                     │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │  📜 ACTIVIDAD RECIENTE                                │ │
│  │                                                       │ │
│  │  [14:32] NODO-001: Deploy completado ✅              │ │
│  │  [14:28] NODO-002: Sync con SII ✅                   │ │
│  │  [14:15] NODO-004: Hash blockchain registrado 🔗     │ │
│  │  [13:58] NODO-001: Backup automático ✅              │ │
│  │                                                       │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🕹️ PANTALLA: Comandos del Bot

```
┌─────────────────────────────────────────────────────────────┐
│  ← Volver              🕹️ WEBCONTROL             [?]      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │  📊 STATUS                                            │ │
│  │  Ver estado de todos los contenedores Docker          │ │
│  │  [Ejecutar]                                           │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │  📜 LOGS                                              │ │
│  │  Ver logs en tiempo real de servicios                 │ │
│  │  [Ejecutar]                                           │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │  🚀 DEPLOY                                            │ │
│  │  Reiniciar servicios en Dokploy                       │ │
│  │  [Ejecutar]                                           │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │  📝 DOCUMENTAR                                        │ │
│  │  Guardar acción en /docs/activity.log                 │ │
│  │  [Ejecutar]                                           │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │  🔍 BUSCAR                                            │ │
│  │  Buscar en logs y documentos                          │ │
│  │  [Ejecutar]                                           │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │  🐙 MCP GITHUB                                        │ │
│  │  Sincronizar con repositorio GitHub                   │ │
│  │  [Ejecutar]                                           │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │  🏛️ FACT HISTORY                                      │ │
│  │  Ver Identidad Registrada del sistema                 │ │
│  │  [Ejecutar]                                           │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🗺️ PANTALLA: Mapa de Nodos

```
┌─────────────────────────────────────────────────────────────┐
│  ← Volver              🗺️ RED DE NODOS            [+]      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│         🌎 SUDAMÉRICA - NODOS SMARTER OS                   │
│                                                             │
│                      🟠 LIMA (NODO-005)                    │
│                         ⏳ Pending                          │
│                           •                                 │
│                           |                                 │
│         🟠 BOGOTÁ (NODO-006)                               │
│            ⏳ Pending                                        │
│                                                             │
│                                                             │
│    🟠 MENDOZA ─────────────🟠 SANTIAGO                     │
│    (NODO-002)              (NODO-001)                      │
│    Trading                 CEO                              │
│    ✅ Online               ✅ Online                        │
│         • ──────────────────•                               │
│         |                                                 | │
│         |                                                 | │
│    🟠 BUENOS AIRES         🟠 VALPARAÍSO                  │
│    (NODO-003)              (NODO-004)                     │
│    Consultoría             Blockchain                      │
│    ⏳ Pending              ✅ Online                        │
│                                                             │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │  ESTADÍSTICAS DE RED                                  │ │
│  │                                                       │ │
│  │  Total Nodos: 6                                       │ │
│  │  Online: 3 ✅                                         │ │
│  │  Pending: 3 ⏳                                         │ │
│  │  Offline: 0 ❌                                         │ │
│  │                                                       │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🏛️ PANTALLA: Fact History

```
┌─────────────────────────────────────────────────────────────┐
│  ← Volver              🏛️ FACT HISTORY           [🔗]      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │  "NO FUE ERROR. FUE PROTECCIÓN DE IDENTIDAD."         │ │
│  │                                                       │ │
│  │  El accidente del auto blanco el 26 de diciembre     │ │
│  │  fue el Kill Switch que salvó la soberanía.          │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │  📅 LÍNEA DE TIEMPO                                   │ │
│  │                                                       │ │
│  │  2025                                                 │ │
│  │  ├─ Propuesta Racks UNC (Mendoza)                    │ │
│  │  │  Nace Gatekeeper Digital                          │ │
│  │  │                                                    │ │
│  │  ├─ Accidente Moto (Mendoza)                         │ │
│  │  │  Pago de Licencia Hardware                        │ │
│  │  │                                                    │ │
│  │  22-Dic-2025                                          │ │
│  │  ├─ Despido + Liquidación (Santiago)                 │ │
│  │  │  Energía para Golden Ticket                       │ │
│  │  │                                                    │ │
│  │  26-Dic-2025 ⚠️                                       │ │
│  │  ├─ Accidente Auto Blanco (Chile)                    │ │
│  │  │  Kill Switch de Canadá                            │ │
│  │  │  Chile + Argentina = Puerto de Enlace             │ │
│  │  │                                                    │ │
│  │  05-Mar-2026 ✅                                       │ │
│  │  └─ Smarter OS v2026.3.5 (Santiago)                  │ │
│  │     Soberanía YOSI Completa                          │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │  📊 SATISFACCIÓN HUMANA vs. EFICIENCIA               │ │
│  │                                                       │ │
│  │  ┌─────────────────┬─────────────────┐               │ │
│  │  │ Golden Ticket   │ Plan QUARK      │               │ │
│  │  ├─────────────────┼─────────────────┤               │ │
│  │  │ Canadá          │ Santiago/Mza    │               │ │
│  │  │ 100% proceso    │ 100% humana     │               │ │
│  │  │ Hardware ajeno  │ Hardware propio │               │ │
│  │  │ Consumidor      │ Arquitecto      │               │ │
│  │  └─────────────────┴─────────────────┘               │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │  🔗 IDENTIDAD REGISTRADA                              │ │
│  │                                                       │ │
│  │  Tag: FACT_HISTORY_LOCKED                             │ │
│  │  Hash: 0x7f8a9b2c3d4e5f6a7b8c9d0e1f2a3b4c            │ │
│  │  GitHub: smarterbot/smarteros-core/docs/FACT-HISTORY │ │
│  │                                                       │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 📱 PANTALLA: Instalación de Nodo (smarter.sh)

```
┌─────────────────────────────────────────────────────────────┐
│  ← Volver              🔧 INSTALAR NODO           [?]      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │  🍇 SMARTER.SH - Instalador de Nodos                  │ │
│  │                                                       │ │
│  │  Convierte cualquier hardware en un nodo inteligente │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │  PASO 1: COPIAR COMANDO                               │ │
│  │                                                       │ │
│  │  ┌─────────────────────────────────────────────────┐ │ │
│  │  │ curl -sL smarter.sh | bash                      │ │ │
│  │  └─────────────────────────────────────────────────┘ │ │
│  │                                                       │ │
│  │  [Copiar]                                             │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │  PASO 2: EJECUTAR EN EL NODO                          │ │
│  │                                                       │ │
│  │  1. SSH al servidor/hardware                          │ │
│  │  2. Pegar el comando                                  │ │
│  │  3. Esperar instalación                               │ │
│  │                                                       │ │
│  │  ✅ Docker instalado                                  │ │
│  │  ✅ Nodo registrado                                   │ │
│  │  ✅ CoPaw Bridge (opcional)                           │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │  PASO 3: VINCULAR CON TELEGRAM                        │ │
│  │                                                       │ │
│  │  ID del Nodo: NODE-abc123                             │ │
│  │                                                       │ │
│  │  ┌─────────────────────────────────────────────────┐ │ │
│  │  │  ██████  ██████  ██████                         │ │ │
│  │  │  ██████  ██████  ██████  [QR CODE]             │ │ │
│  │  │  ██████  ██████  ██████                         │ │ │
│  │  └─────────────────────────────────────────────────┘ │ │
│  │                                                       │ │
│  │  O usa este link:                                     │ │
│  │  t.me/smarteros_gatekeeper_bot?start=node_NODE-abc123│ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
│  ┌───────────────────────────────────────────────────────┐ │
│  │  NODOS INSTALADOS                                     │ │
│  │                                                       │ │
│  │  🟠 NODO-001 (CEO)         Santiago      ✅ Online    │ │
│  │  🟠 NODO-002 (Trading)     Mendoza       ✅ Online    │ │
│  │                                                       │ │
│  │  [+ Instalar Otro Nodo]                               │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎨 Paleta de Colores

| Color | Hex | Uso |
|-------|-----|-----|
| **Naranja Smarter** | `#FF6B00` | Branding principal |
| **Naranja Oscuro** | `#CC5500` | Botones primarios |
| **Blanco** | `#FFFFFF` | Fondos |
| **Gris Claro** | `#F5F5F5` | Fondos secundarios |
| **Gris Medio** | `#9E9E9E` | Texto secundario |
| **Gris Oscuro** | `#424242` | Texto principal |
| **Verde Éxito** | `#4CAF50` | Estados online |
| **Rojo Error** | `#F44336` | Estados offline |
| **Amarillo Alert** | `#FFC107` | Estados pending |

---

## 📐 Componentes de UI

### Botones

```
┌─────────────────┐
│   [  BOTÓN  ]   │  ← Primario (Naranja)
└─────────────────┘

┌─────────────────┐
│   [  Botón  ]   │  ← Secundario (Borde Naranja)
└─────────────────┘

   [Icono] Texto   ← Botón de acción rápida
```

### Tarjetas de Nodo

```
┌─────────────────────────────────┐
│  🟠 NODO-001 (CEO)      ✅     │
│  Santiago                     │
│  CPU: 45%  MEM: 62%  DISK: 28%│
└─────────────────────────────────┘
```

### Gráficos de Telemetría

```
CPU: ████████░░ 78%
MEM: █████░░░░░ 52%
DISK: ███░░░░░░░ 28%
```

---

## 🔄 Flujo de Navegación

```
┌─────────────┐
│   HOME      │
│  Dashboard  │
└──────┬──────┘
       │
   ┌───┴───┬───────────┬──────────┐
   │       │           │          │
   ▼       ▼           ▼          ▼
┌──────┐ ┌──────┐ ┌────────┐ ┌────────┐
│ WEB  │ │ MAPA │ │ FACT   │ │ INSTAL │
│CTRL  │ │NODOS │ │HISTORY │ │  NODO  │
└──────┘ └──────┘ └────────┘ └────────┘
```

---

**Versión:** 2026.3.5  
**Estado:** ✅ **LISTO PARA IMPLEMENTAR EN FLUTTER/REACT**  
**TAG:** `MINI_APP_LAYOUT`
