#!/usr/bin/env node

const MP_ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN;
const MP_BASE_URL = process.env.MP_BASE_URL || 'https://api.mercadopago.com';

class MercadoPagoAPI {
  constructor(accessToken) {
    this.accessToken = accessToken || MP_ACCESS_TOKEN;
    this.baseUrl = MP_BASE_URL;
    
    if (!this.accessToken) {
      throw new Error('MP_ACCESS_TOKEN requerido');
    }
  }

  async request(endpoint, method = 'GET', body = null) {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'Authorization': `Bearer ${this.accessToken}`,
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

  async createPayment(amount, description, email, options = {}) {
    return this.request('/v1/payments', 'POST', {
      transaction_amount: amount,
      description,
      payment_method_id: options.paymentMethod || 'pix',
      payer: { email },
      external_reference: options.externalReference || `PAY-${Date.now()}`,
      notification_url: options.notificationUrl,
      currency_id: options.currency || 'CLP'
    });
  }

  async getPayment(id) {
    return this.request(`/v1/payments/${id}`, 'GET');
  }

  async listPayments(filters = {}) {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    return this.request(`/v1/payments/search?${params}`, 'GET');
  }

  async refundPayment(paymentId, amount = null) {
    const body = amount ? { amount } : {};
    return this.request(`/v1/payments/${paymentId}/refunds`, 'POST', body);
  }

  async createPreference(items, payer = {}, options = {}) {
    return this.request('/checkout/preferences', 'POST', {
      items,
      payer,
      external_reference: options.externalReference,
      notification_url: options.notificationUrl,
      back_urls: options.backUrls || {}
    });
  }

  async getPreference(id) {
    return this.request(`/checkout/preferences/${id}`, 'GET');
  }

  async createMerchantOrder(items, payer = {}, options = {}) {
    return this.request('/merchant_orders', 'POST', {
      items,
      payer,
      external_reference: options.externalReference,
      notification_url: options.notificationUrl
    });
  }

  async getMerchantOrder(id) {
    return this.request(`/merchant_orders/${id}`, 'GET');
  }

  async getAccountInfo() {
    return this.request('/users/me', 'GET');
  }

  async getPaymentMethods() {
    return this.request('/v1/payment_methods', 'GET');
  }
}

if (require.main === module) {
  const mp = new MercadoPagoAPI(process.env.MP_ACCESS_TOKEN);
  
  const command = process.argv[2];
  
  (async () => {
    try {
      switch (command) {
        case 'info':
          const info = await mp.getAccountInfo();
          console.log(JSON.stringify(info, null, 2));
          break;
        case 'methods':
          const methods = await mp.getPaymentMethods();
          console.log(JSON.stringify(methods, null, 2));
          break;
        default:
          console.log('Uso:');
          console.log('  node mercadopago-api-wrapper.js info     - Info de cuenta');
          console.log('  node mercadopago-api-wrapper.js methods   - Métodos de pago');
          console.log('  (Importar como módulo para más funciones)');
      }
    } catch (err) {
      console.error('Error:', err.message);
      process.exit(1);
    }
  })();
}

module.exports = { MercadoPagoAPI };
