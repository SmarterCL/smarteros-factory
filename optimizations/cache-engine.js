#!/usr/bin/env node
/**
 * Cache Engine para Smarter OS
 * Almacena respuestas de IA para reducir latencia y costos
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

class CacheEngine {
  constructor(cacheDir = './cache', ttlSeconds = 3600) {
    this.cacheDir = cacheDir;
    this.ttlSeconds = ttlSeconds;
    this.stats = { hits: 0, misses: 0, size: 0 };
    
    // Crear directorio de cache
    if (!fs.existsSync(cacheDir)) {
      fs.mkdirSync(cacheDir, { recursive: true });
    }
    
    // Cargar estadísticas
    this.loadStats();
    
    console.log(`✅ Cache Engine inicializado (${cacheDir})`);
  }
  
  // Generar hash único para una query
  generateKey(prompt, systemPrompt) {
    const data = `${prompt}|${systemPrompt}`;
    return crypto.createHash('sha256').update(data).digest('hex').substring(0, 16);
  }
  
  // Obtener del cache
  get(prompt, systemPrompt = '') {
    const key = this.generateKey(prompt, systemPrompt);
    const filePath = path.join(this.cacheDir, `${key}.json`);
    
    if (fs.existsSync(filePath)) {
      try {
        const cached = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const age = Date.now() - cached.timestamp;
        
        // Verificar TTL
        if (age < this.ttlSeconds * 1000) {
          this.stats.hits++;
          this.saveStats();
          console.log(`📦 Cache HIT: ${key} (age: ${(age/1000).toFixed(0)}s)`);
          return {
            hit: true,
            response: cached.response,
            age: age / 1000
          };
        } else {
          // Expirado
          fs.unlinkSync(filePath);
          console.log(`🗑️ Cache EXPIRED: ${key}`);
        }
      } catch (err) {
        console.error(`❌ Cache read error: ${err.message}`);
      }
    }
    
    this.stats.misses++;
    this.saveStats();
    console.log(`📦 Cache MISS: ${key}`);
    return { hit: false };
  }
  
  // Guardar en cache
  set(prompt, systemPrompt, response) {
    const key = this.generateKey(prompt, systemPrompt);
    const filePath = path.join(this.cacheDir, `${key}.json`);
    
    const data = {
      prompt,
      systemPrompt,
      response,
      timestamp: Date.now(),
      ttl: this.ttlSeconds
    };
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    this.stats.size++;
    this.saveStats();
    console.log(`💾 Cache SET: ${key}`);
  }
  
  // Limpiar cache viejo
  clean() {
    const files = fs.readdirSync(this.cacheDir);
    let cleaned = 0;
    
    files.forEach(file => {
      if (file.endsWith('.json')) {
        const filePath = path.join(this.cacheDir, file);
        try {
          const cached = JSON.parse(fs.readFileSync(filePath, 'utf8'));
          const age = Date.now() - cached.timestamp;
          
          if (age > this.ttlSeconds * 1000) {
            fs.unlinkSync(filePath);
            cleaned++;
          }
        } catch (err) {
          // Ignorar errores
        }
      }
    });
    
    console.log(`🧹 Cache cleaned: ${cleaned} files removed`);
    return cleaned;
  }
  
  // Guardar estadísticas
  saveStats() {
    const statsPath = path.join(this.cacheDir, 'stats.json');
    fs.writeFileSync(statsPath, JSON.stringify(this.stats, null, 2));
  }
  
  // Cargar estadísticas
  loadStats() {
    const statsPath = path.join(this.cacheDir, 'stats.json');
    if (fs.existsSync(statsPath)) {
      this.stats = JSON.parse(fs.readFileSync(statsPath, 'utf8'));
    }
  }
  
  // Obtener estadísticas
  getStats() {
    const hitRate = this.stats.hits + this.stats.misses > 0
      ? (this.stats.hits / (this.stats.hits + this.stats.misses) * 100).toFixed(2)
      : 0;
    
    return {
      ...this.stats,
      hitRate: `${hitRate}%`,
      directory: this.cacheDir
    };
  }
}

module.exports = CacheEngine;

// Test
if (require.main === module) {
  console.log('🧪 Testing Cache Engine...');
  
  const cache = new CacheEngine('./test-cache', 60);
  
  // Test set
  cache.set('¿Qué es Nodo Cabernet?', 'Eres QUARK', 'Nodo Cabernet es...');
  
  // Test get (hit)
  const result1 = cache.get('¿Qué es Nodo Cabernet?', 'Eres QUARK');
  console.log('Get 1:', result1);
  
  // Test get (miss)
  const result2 = cache.get('¿Qué es Mendoza?', 'Eres QUARK');
  console.log('Get 2:', result2);
  
  // Stats
  console.log('Stats:', cache.getStats());
  
  // Clean
  cache.clean();
  
  console.log('✅ Cache Engine test completed');
}
