# 🚀 MERCADO PAGO - QUICK START

**Tiempo estimado:** 5 minutos

---

## 📋 Pasos

### 1️⃣ Obtener credenciales

```bash
# Ir a: https://www.mercadopago.cl/developers/panel/credentials
# Copiar: Access Token
```

### 2️⃣ Configurar entorno

```bash
cd smarteros-factory

# Copiar template
cp .env.example .env

# Editar con tus credenciales
nano .env
```

Agregar:
```
MP_ACCESS_TOKEN=APP_USR-...
```

### 3️⃣ Instalar dependencias

```bash
npm install
```

### 4️⃣ Test local

```bash
# Probar API
node core/mercadopago-api-wrapper.js info

# Probar MCP
npm run mcp:mp

# Test suite
bash scripts/test-mercadopago-mcp.sh
```

### 5️⃣ Docker

```bash
# Deploy
docker-compose up -d

# Ver logs
docker logs -f mercadopago-mcp
```

---

## 🔧 Comandos útiles

| Comando | Acción |
|---------|--------|
| `npm run mcp:mp` | Iniciar MCP server |
| `npm run api:mp info` | Info de cuenta |
| `npm run test:mp` | Test suite |
| `docker logs mercadopago-mcp` | Ver logs |

---

## 📝 Crear un pago

```javascript
const { MercadoPagoAPI } = require('./core/mercadopago-api-wrapper.js');
const mp = new MercadoPagoAPI(process.env.MP_ACCESS_TOKEN);

const payment = await mp.createPayment(
  10000,                    // $10.000 CLP
  'Servicio de ejemplo',     // Descripción
  'cliente@email.cl'        // Email cliente
);

console.log(payment.init_point);  // Link de pago
```

---

## 🆘 Problemas comunes

| Problema | Solución |
|----------|----------|
| Token no configurado | `export MP_ACCESS_TOKEN=...` |
| 401 Unauthorized | Verificar token en panel MP |
| Puerto en uso | Cambiar `MP_WEBHOOK_PORT` |

---

**Listo!** 🎉
