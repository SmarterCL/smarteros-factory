#!/usr/bin/env node

const http = require('http');

const PORT = process.env.MP_WEBHOOK_PORT || 3054;

const server = http.createServer(async (req, res) => {
  if (req.method === 'POST' && req.url === '/webhook/mercadopago') {
    let body = '';
    
    req.on('data', chunk => { body += chunk; });
    
    req.on('end', async () => {
      try {
        const payload = JSON.parse(body);
        console.log('📥 Webhook recibido:', payload.type);
        
        const { type, data } = payload;
        
        switch (type) {
          case 'payment':
            await handlePayment(data.id);
            break;
          case 'merchant_order':
            await handleMerchantOrder(data.id);
            break;
          default:
            console.log('⚠️ Tipo no manejado:', type);
        }
        
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ received: true }));
        
      } catch (error) {
        console.error('❌ Error procesando webhook:', error.message);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: error.message }));
      }
    });
    
  } else if (req.method === 'GET' && req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', service: 'mercadopago-webhook' }));
    
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

async function handlePayment(paymentId) {
  console.log('💰 Procesando pago:', paymentId);
  console.log('   Estado: pendiente de verificar en DB');
}

async function handleMerchantOrder(orderId) {
  console.log('📦 Procesando orden:', orderId);
  console.log('   Estado: pendiente de verificar en DB');
}

server.listen(PORT, () => {
  console.log(`🌐 Webhook server corriendo en puerto ${PORT}`);
  console.log(`   Health: http://localhost:${PORT}/health`);
  console.log(`   Webhook: http://localhost:${PORT}/webhook/mercadopago`);
});

module.exports = { server };
