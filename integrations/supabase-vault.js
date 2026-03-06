#!/usr/bin/env node
/**
 * Supabase Vault Integration - Almacenamiento Seguro
 * Para guardar credenciales y datos sensibles
 */

const { createClient } = require('@supabase/supabase-js');

class SupabaseVault {
  constructor(url, key) {
    this.supabase = createClient(url, key);
    console.log('🔐 Supabase Vault inicializado');
  }
  
  // Guardar secreto
  async setSecret(key, value, metadata = {}) {
    const { data, error } = await this.supabase
      .from('secrets')
      .insert({
        key,
        value,
        metadata,
        created_at: new Date().toISOString()
      });
    
    if (error) throw error;
    console.log(`🔐 Secret guardado: ${key}`);
    return data;
  }
  
  // Obtener secreto
  async getSecret(key) {
    const { data, error } = await this.supabase
      .from('secrets')
      .select('*')
      .eq('key', key)
      .single();
    
    if (error) throw error;
    console.log(`🔐 Secret obtenido: ${key}`);
    return data;
  }
  
  // Actualizar secreto
  async updateSecret(key, value) {
    const { data, error } = await this.supabase
      .from('secrets')
      .update({ value, updated_at: new Date().toISOString() })
      .eq('key', key);
    
    if (error) throw error;
    console.log(`🔐 Secret actualizado: ${key}`);
    return data;
  }
  
  // Eliminar secreto
  async deleteSecret(key) {
    const { error } = await this.supabase
      .from('secrets')
      .delete()
      .eq('key', key);
    
    if (error) throw error;
    console.log(`🔐 Secret eliminado: ${key}`);
  }
  
  // Listar secretos
  async listSecrets() {
    const { data, error } = await this.supabase
      .from('secrets')
      .select('key, metadata, created_at');
    
    if (error) throw error;
    return data;
  }
  
  // Guardar credenciales bancarias
  async setBankCredentials(bank, username, password, metadata = {}) {
    return await this.setSecret(`bank_${bank}`, { username, password }, { ...metadata, type: 'bank' });
  }
  
  // Obtener credenciales bancarias
  async getBankCredentials(bank) {
    return await this.getSecret(`bank_${bank}`);
  }
  
  // Guardar API Keys
  async setApiKey(service, key, metadata = {}) {
    return await this.setSecret(`api_${service}`, key, { ...metadata, type: 'api_key' });
  }
  
  // Obtener API Key
  async getApiKey(service) {
    return await this.getSecret(`api_${service}`);
  }
}

// Mock para desarrollo
class SupabaseVaultMock {
  constructor() {
    this.store = new Map();
    console.log('🔐 Supabase Vault Mock inicializado (modo desarrollo)');
  }
  
  async setSecret(key, value, metadata = {}) {
    this.store.set(key, { value, metadata, created_at: new Date().toISOString() });
    console.log(`🔐 [Mock] Secret guardado: ${key}`);
    return { key };
  }
  
  async getSecret(key) {
    const data = this.store.get(key);
    if (!data) throw new Error(`Secret not found: ${key}`);
    console.log(`🔐 [Mock] Secret obtenido: ${key}`);
    return data;
  }
  
  async updateSecret(key, value) {
    const data = this.store.get(key);
    if (!data) throw new Error(`Secret not found: ${key}`);
    data.value = value;
    data.updated_at = new Date().toISOString();
    this.store.set(key, data);
    console.log(`🔐 [Mock] Secret actualizado: ${key}`);
    return data;
  }
  
  async deleteSecret(key) {
    this.store.delete(key);
    console.log(`🔐 [Mock] Secret eliminado: ${key}`);
  }
  
  async listSecrets() {
    return Array.from(this.store.entries()).map(([key, data]) => ({
      key,
      metadata: data.metadata,
      created_at: data.created_at
    }));
  }
  
  async setBankCredentials(bank, username, password, metadata = {}) {
    return await this.setSecret(`bank_${bank}`, { username, password }, { ...metadata, type: 'bank' });
  }
  
  async getBankCredentials(bank) {
    return await this.getSecret(`bank_${bank}`);
  }
  
  async setApiKey(service, key, metadata = {}) {
    return await this.setSecret(`api_${service}`, key, { ...metadata, type: 'api_key' });
  }
  
  async getApiKey(service) {
    return await this.getSecret(`api_${service}`);
  }
}

// Exportar según configuración
module.exports = process.env.SUPABASE_URL ? SupabaseVault : SupabaseVaultMock;

// Test
if (require.main === module) {
  console.log('🧪 Testing Supabase Vault...');
  
  const vault = new SupabaseVaultMock();
  
  // Test set/get
  vault.setSecret('test_key', 'test_value', { test: true });
  vault.getSecret('test_key').then(data => {
    console.log('Secret:', data);
  });
  
  // Test bank credentials
  vault.setBankCredentials('santander', 'usuario', 'password123');
  vault.getBankCredentials('santander').then(creds => {
    console.log('Bank credentials:', creds.value);
  });
  
  // Test API key
  vault.setApiKey('openrouter', 'sk-or-xxx');
  vault.getApiKey('openrouter').then(key => {
    console.log('API Key:', key.value);
  });
  
  // List
  vault.listSecrets().then(secrets => {
    console.log('Secrets:', secrets);
  });
  
  console.log('✅ Supabase Vault test completed');
}
