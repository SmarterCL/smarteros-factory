#!/usr/bin/env node

const MP_ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN;
const MP_CLIENT_ID = process.env.MP_CLIENT_ID;
const MP_CLIENT_SECRET = process.env.MP_CLIENT_SECRET;
const MP_BASE_URL = process.env.MP_BASE_URL || 'https://api.mercadopago.com';
const MP_NOTIFICATION_URL = process.env.MP_NOTIFICATION_URL || 'https://smarterbot.cl/webhook/mercadopago';

const { Server } = require('@modelcontextprotocol/sdk/server/index.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const { CallToolRequestSchema, ListToolsRequestSchema } = require('@modelcontextprotocol/sdk/types.js');

const server = new Server(
  { name: 'mercadopago-mcp', version: '1.0.0' },
  { capabilities: { tools: {} } }
);

async function mpRequest(endpoint, method = 'GET', body = null) {
  if (!MP_ACCESS_TOKEN) {
    throw new Error('MP_ACCESS_TOKEN no configurado. Agrega MP_ACCESS_TOKEN al .env');
  }

  const url = `${MP_BASE_URL}${endpoint}`;
  const headers = {
    'Authorization': `Bearer ${MP_ACCESS_TOKEN}`,
    'Content-Type': 'application/json'
  };

  const options = { method, headers };
  if (body) options.body = JSON.stringify(body);

  const response = await fetch(url, options);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(`MP Error ${response.status}: ${JSON.stringify(data)}`);
  }

  return data;
}

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'mp_create_payment',
        description: 'Crea un nuevo pago en Mercado Pago. Requiere amount, description y payer email.',
        inputSchema: {
          type: 'object',
          properties: {
            amount: { type: 'number', description: 'Monto en centavos (ej: 1000 = $10)' },
            description: { type: 'string', description: 'Descripción del pago' },
            email: { type: 'string', description: 'Email del pagador' },
            currency: { type: 'string', description: 'Moneda (CLP, ARS, USD)', default: 'CLP' },
            external_reference: { type: 'string', description: 'Referencia externa opcional' }
          },
          required: ['amount', 'description', 'email']
        }
      },
      {
        name: 'mp_get_payment',
        description: 'Obtiene los detalles de un pago específico por ID',
        inputSchema: {
          type: 'object',
          properties: {
            id: { type: 'string', description: 'ID del pago a consultar' }
          },
          required: ['id']
        }
      },
      {
        name: 'mp_list_payments',
        description: 'Lista pagos con filtros opcionales (estado, fecha, límites)',
        inputSchema: {
          type: 'object',
          properties: {
            status: { type: 'string', description: 'Estado: approved, pending, rejected, refunded' },
            limit: { type: 'number', description: 'Cantidad de resultados (max 100)', default: 20 },
            offset: { type: 'number', description: 'Offset para paginación', default: 0 },
            date_from: { type: 'string', description: 'Fecha desde (ISO 8601)' },
            date_to: { type: 'string', description: 'Fecha hasta (ISO 8601)' }
          }
        }
      },
      {
        name: 'mp_refund_payment',
        description: 'Reembolsa un pago completamente',
        inputSchema: {
          type: 'object',
          properties: {
            payment_id: { type: 'string', description: 'ID del pago a reembolsar' },
            amount: { type: 'number', description: 'Monto parcial a reembolsar (opcional)' }
          },
          required: ['payment_id']
        }
      },
      {
        name: 'mp_create_merchant_order',
        description: 'Crea una orden de compra (Merchant Order) para múltiples items',
        inputSchema: {
          type: 'object',
          properties: {
            items: { 
              type: 'array', 
              description: 'Array de items [{title, quantity, unit_price, currency_id}]',
              items: {
                type: 'object',
                properties: {
                  title: { type: 'string' },
                  quantity: { type: 'number' },
                  unit_price: { type: 'number' },
                  currency_id: { type: 'string' }
                }
              }
            },
            payer: { type: 'object', description: 'Datos del pagador {email, name}' },
            external_reference: { type: 'string', description: 'Referencia externa' }
          },
          required: ['items']
        }
      },
      {
        name: 'mp_get_merchant_order',
        description: 'Obtiene una orden de compra por ID',
        inputSchema: {
          type: 'object',
          properties: {
            id: { type: 'string', description: 'ID de la orden de compra' }
          },
          required: ['id']
        }
      },
      {
        name: 'mp_create_preference',
        description: 'Crea una preferencia de pago para Checkout Pro',
        inputSchema: {
          type: 'object',
          properties: {
            items: { type: 'array', description: 'Items del carrito' },
            payer: { type: 'object', description: 'Datos del pagador' },
            external_reference: { type: 'string', description: 'Referencia externa' },
            notification_url: { type: 'string', description: 'URL de webhook' },
            back_urls: { type: 'object', description: 'URLs de retorno {success, failure, pending}' }
          },
          required: ['items']
        }
      },
      {
        name: 'mp_test_webhook',
        description: 'Simula una notificación de webhook para testing',
        inputSchema: {
          type: 'object',
          properties: {
            topic: { type: 'string', description: 'Topic: payment, merchant_order', default: 'payment' },
            payment_id: { type: 'string', description: 'ID del pago a simular' }
          },
          required: ['payment_id']
        }
      },
      {
        name: 'mp_get_account_settings',
        description: 'Obtiene la configuración de la cuenta de Mercado Pago',
        inputSchema: {
          type: 'object',
          properties: {}
        }
      }
    ]
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    let result;

    switch (name) {
      case 'mp_create_payment': {
        const paymentData = {
          transaction_amount: args.amount / 100,
          description: args.description,
          payment_method_id: 'pix',
          payer: { email: args.email },
          external_reference: args.external_reference || `PAY-${Date.now()}`,
          notification_url: MP_NOTIFICATION_URL,
          currency_id: args.currency || 'CLP'
        };
        result = await mpRequest('/v1/payments', 'POST', paymentData);
        break;
      }

      case 'mp_get_payment': {
        result = await mpRequest(`/v1/payments/${args.id}`, 'GET');
        break;
      }

      case 'mp_list_payments': {
        const params = new URLSearchParams();
        if (args.status) params.append('status', args.status);
        if (args.limit) params.append('limit', args.limit);
        if (args.offset) params.append('offset', args.offset);
        if (args.date_from) params.append('date_created.from', args.date_from);
        if (args.date_to) params.append('date_created.to', args.date_to);
        result = await mpRequest(`/v1/payments/search?${params}`, 'GET');
        break;
      }

      case 'mp_refund_payment': {
        const refundData = {};
        if (args.amount) refundData.amount = args.amount;
        result = await mpRequest(`/v1/payments/${args.payment_id}/refunds`, 'POST', refundData);
        break;
      }

      case 'mp_create_merchant_order': {
        const orderData = {
          items: args.items,
          payer: args.payer || {},
          external_reference: args.external_reference || `ORD-${Date.now()}`,
          notification_url: MP_NOTIFICATION_URL
        };
        result = await mpRequest('/merchant_orders', 'POST', orderData);
        break;
      }

      case 'mp_get_merchant_order': {
        result = await mpRequest(`/merchant_orders/${args.id}`, 'GET');
        break;
      }

      case 'mp_create_preference': {
        const prefData = {
          items: args.items,
          payer: args.payer || {},
          external_reference: args.external_reference || `PREF-${Date.now()}`,
          notification_url: args.notification_url || MP_NOTIFICATION_URL,
          back_urls: args.back_urls || {
            success: 'https://smarterbot.cl/payment/success',
            failure: 'https://smarterbot.cl/payment/failure',
            pending: 'https://smarterbot.cl/payment/pending'
          }
        };
        result = await mpRequest('/checkout/preferences', 'POST', prefData);
        break;
      }

      case 'mp_test_webhook': {
        const topics = {
          payment: `/v1/payments/${args.payment_id}`,
          merchant_order: `/merchant_orders/${args.payment_id}`
        };
        const topic = args.topic || 'payment';
        const data = await mpRequest(topics[topic], 'GET');
        result = {
          simulated: true,
          topic,
          data,
          message: `Webhook simulado para ${topic} ID: ${args.payment_id}`
        };
        break;
      }

      case 'mp_get_account_settings': {
        result = await mpRequest('/users/me', 'GET');
        break;
      }

      default:
        return {
          content: [{ type: 'text', text: `Herramienta desconocida: ${name}` }],
          isError: true
        };
    }

    return {
      content: [{ type: 'text', text: JSON.stringify(result, null, 2) }]
    };

  } catch (error) {
    return {
      content: [{ type: 'text', text: `Error: ${error.message}` }],
      isError: true
    };
  }
});

async function main() {
  console.error('Mercado Pago MCP Server iniciado');
  console.error('Token configurado:', MP_ACCESS_TOKEN ? '✅' : '❌');
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error('Error en Mercado Pago MCP:', error);
  process.exit(1);
});
