#!/usr/bin/env node
/**
 * Fintoc Integration - Neo Bancos para Smarter OS
 * Integración con Fintoc API para bancos chilenos
 */

const https = require('https');

class FintocClient {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.fintoc.com/v1';
    console.log('🏦 Fintoc Client inicializado');
  }
  
  // Request helper
  request(method, path, data = null) {
    return new Promise((resolve, reject) => {
      const url = `${this.baseUrl}${path}`;
      const options = {
        hostname: 'api.fintoc.com',
        port: 443,
        path: url.replace('https://api.fintoc.com', ''),
        method,
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      };
      
      const req = https.request(options, (res) => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(JSON.parse(body));
          } else {
            reject(new Error(`HTTP ${res.statusCode}: ${body}`));
          }
        });
      });
      
      req.on('error', reject);
      
      if (data) {
        req.write(JSON.stringify(data));
      }
      
      req.end();
    });
  }
  
  // Obtener instituciones bancarias
  async getInstitutions() {
    return await this.request('GET', '/institutions');
  }
  
  // Crear link de conexión bancaria
  async createLink(email, country = 'cl') {
    return await this.request('POST', '/links', { email, country });
  }
  
  // Obtener cuentas
  async getAccounts(linkId) {
    return await this.request('GET', `/accounts?link_id=${linkId}`);
  }
  
  // Obtener movimientos
  async getMovements(accountId, since, until) {
    return await this.request('GET', `/movements?account_id=${accountId}&since=${since}&until=${until}`);
  }
  
  // Obtener saldo
  async getBalance(accountId) {
    const accounts = await this.getAccounts('link_id_placeholder');
    return accounts.data?.find(a => a.id === accountId);
  }
}

// Mock para desarrollo (sin API key real)
class FintocMock {
  constructor() {
    console.log('🏦 Fintoc Mock inicializado (modo desarrollo)');
  }
  
  async getInstitutions() {
    return {
      data: [
        { id: 'santander', name: 'Banco Santander', country: 'cl' },
        { id: 'chile', name: 'Banco de Chile', country: 'cl' },
        { id: 'estado', name: 'Banco del Estado', country: 'cl' },
        { id: 'bci', name: 'BCI', country: 'cl' },
        { id: 'falabella', name: 'Banco Falabella', country: 'cl' }
      ]
    };
  }
  
  async getAccounts(linkId) {
    return {
      data: [
        {
          id: 'acc_123',
          name: 'Cuenta Corriente',
          number: '****1234',
          balance: 1500000,
          currency: 'CLP',
          type: 'checking'
        },
        {
          id: 'acc_456',
          name: 'Cuenta de Ahorro',
          number: '****5678',
          balance: 5000000,
          currency: 'CLP',
          type: 'savings'
        }
      ]
    };
  }
  
  async getMovements(accountId, since, until) {
    return {
      data: [
        {
          id: 'mov_1',
          date: '2026-03-05',
          description: 'Transferencia recibida',
          amount: 500000,
          currency: 'CLP',
          type: 'credit'
        },
        {
          id: 'mov_2',
          date: '2026-03-04',
          description: 'Pago de servicios',
          amount: -150000,
          currency: 'CLP',
          type: 'debit'
        },
        {
          id: 'mov_3',
          date: '2026-03-03',
          description: 'Compra supermercado',
          amount: -85000,
          currency: 'CLP',
          type: 'debit'
        }
      ]
    };
  }
  
  async getBalance(accountId) {
    const accounts = await this.getAccounts('link_id');
    return accounts.data.find(a => a.id === accountId);
  }
}

// Exportar según configuración
module.exports = process.env.FINTOC_API_KEY ? FintocClient : FintocMock;

// Test
if (require.main === module) {
  console.log('🧪 Testing Fintoc Integration...');
  
  const fintoc = new FintocMock();
  
  // Test instituciones
  fintoc.getInstitutions().then(inst => {
    console.log('Instituciones:', inst.data.map(i => i.name));
  });
  
  // Test cuentas
  fintoc.getAccounts('link_123').then(accounts => {
    console.log('Cuentas:', accounts.data.map(a => `${a.name}: $${a.balance}`));
  });
  
  // Test movimientos
  fintoc.getMovements('acc_123', '2026-03-01', '2026-03-05').then(movs => {
    console.log('Movimientos:', movs.data.map(m => `${m.date}: ${m.description} ($${m.amount})`));
  });
  
  console.log('✅ Fintoc Integration test completed');
}
