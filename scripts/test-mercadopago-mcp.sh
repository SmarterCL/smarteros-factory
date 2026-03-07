#!/bin/bash

echo "╔════════════════════════════════════════════════════════╗"
echo "║  🧪 Test Suite - Mercado Pago MCP Server             ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

# Colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Verificar variable de entorno
if [ -z "$MP_ACCESS_TOKEN" ]; then
    echo -e "${RED}❌ ERROR: MP_ACCESS_TOKEN no configurado${NC}"
    echo ""
    echo "Para configurar:"
    echo "  export MP_ACCESS_TOKEN='APP_USR-...'"
    echo ""
    exit 1
fi

echo -e "${GREEN}✅ Token de Mercado Pago configurado${NC}"
echo ""

# Tests disponibles
TESTS=(
    "mp_get_account_settings:Obtener información de cuenta"
    "mp_list_payments:Listar pagos (últimos 5)"
    "mp_test_webhook:Simular webhook de pago"
)

echo "╔════════════════════════════════════════════════════════╗"
echo "║  Ejecutando tests...                                   ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

# Test 1: Get Account Info
echo -e "${YELLOW}📋 Test 1: mp_get_account_settings${NC}"
node -e "
const { MercadoPagoAPI } = require('./core/mercadopago-api-wrapper.js');
const mp = new MercadoPagoAPI();
mp.getAccountInfo().then(r => console.log(JSON.stringify(r, null, 2))).catch(e => { console.error(e.message); process.exit(1); });
"
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ PASSED${NC}"
else
    echo -e "${RED}❌ FAILED${NC}"
fi
echo ""

# Test 2: List Payments
echo -e "${YELLOW}📋 Test 2: mp_list_payments (limit=5)${NC}"
echo "{ \"limit\": 5 }" | node -e "
const { MercadoPagoAPI } = require('./core/mercadopago-api-wrapper.js');
const mp = new MercadoPagoAPI();
mp.listPayments({ limit: 5 }).then(r => {
    console.log('Total pagos:', r.results.length);
    console.log('✅ Test passed');
}).catch(e => { console.error(e.message); process.exit(1); });
"
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ PASSED${NC}"
else
    echo -e "${RED}❌ FAILED${NC}"
fi
echo ""

# Test 3: Get Payment Methods
echo -e "${YELLOW}📋 Test 3: mp_get_payment_methods${NC}"
node -e "
const { MercadoPagoAPI } = require('./core/mercadopago-api-wrapper.js');
const mp = new MercadoPagoAPI();
mp.getPaymentMethods().then(r => {
    console.log('Métodos disponibles:', r.length);
    console.log('✅ Test passed');
}).catch(e => { console.error(e.message); process.exit(1); });
"
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ PASSED${NC}"
else
    echo -e "${RED}❌ FAILED${NC}"
fi
echo ""

echo "╔════════════════════════════════════════════════════════╗"
echo "║  🧪 Tests completados                                  ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""
echo "Para usar MCP con Claude/OpenCode:"
echo "  node core/mercadopago-mcp.js"
echo ""
