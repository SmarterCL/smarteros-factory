#!/usr/bin/env node
/**
 * Rate Limiter para Smarter OS
 * Previene abuso y controla uso de créditos de IA
 */

class RateLimiter {
  constructor(options = {}) {
    this.maxRequests = options.maxRequests || 10; // Máximo de requests
    this.windowMs = options.windowMs || 60000; // Ventana de tiempo (1 minuto)
    this.message = options.message || 'Demasiados requests, intentá de nuevo en 1 minuto';
    
    // Store: userId -> { count, resetTime }
    this.store = new Map();
    
    console.log(`✅ Rate Limiter: ${this.maxRequests} requests / ${this.windowMs/1000}s`);
  }
  
  // Verificar si el usuario puede hacer request
  allow(userId) {
    const now = Date.now();
    const user = this.store.get(userId);
    
    if (!user) {
      // Primer request
      this.store.set(userId, { count: 1, resetTime: now + this.windowMs });
      return { allowed: true };
    }
    
    // Verificar ventana
    if (now > user.resetTime) {
      // Resetear ventana
      this.store.set(userId, { count: 1, resetTime: now + this.windowMs });
      return { allowed: true };
    }
    
    // Dentro de ventana
    if (user.count < this.maxRequests) {
      user.count++;
      this.store.set(userId, user);
      return { allowed: true };
    }
    
    // Límite excedido
    const retryAfter = Math.ceil((user.resetTime - now) / 1000);
    return {
      allowed: false,
      retryAfter,
      message: this.message
    };
  }
  
  // Resetear límite para un usuario
  reset(userId) {
    this.store.delete(userId);
    console.log(`🔄 Rate limit reset for: ${userId}`);
  }
  
  // Obtener estado de un usuario
  getStatus(userId) {
    const user = this.store.get(userId);
    const now = Date.now();
    
    if (!user) {
      return {
        remaining: this.maxRequests,
        resetIn: 0
      };
    }
    
    if (now > user.resetTime) {
      return {
        remaining: this.maxRequests,
        resetIn: 0
      };
    }
    
    return {
      remaining: Math.max(0, this.maxRequests - user.count),
      resetIn: Math.ceil((user.resetTime - now) / 1000)
    };
  }
  
  // Limpiar store viejo
  cleanup() {
    const now = Date.now();
    let cleaned = 0;
    
    this.store.forEach((user, userId) => {
      if (now > user.resetTime) {
        this.store.delete(userId);
        cleaned++;
      }
    });
    
    console.log(`🧹 Rate limiter cleaned: ${cleaned} users`);
    return cleaned;
  }
  
  // Obtener estadísticas
  getStats() {
    return {
      totalUsers: this.store.size,
      maxRequests: this.maxRequests,
      windowMs: this.windowMs
    };
  }
}

module.exports = RateLimiter;

// Test
if (require.main === module) {
  console.log('🧪 Testing Rate Limiter...');
  
  const limiter = new RateLimiter({ maxRequests: 5, windowMs: 10000 });
  
  // Test allow
  for (let i = 0; i < 7; i++) {
    const result = limiter.allow('user123');
    console.log(`Request ${i + 1}:`, result);
  }
  
  // Status
  console.log('Status:', limiter.getStatus('user123'));
  
  // Stats
  console.log('Stats:', limiter.getStats());
  
  console.log('✅ Rate Limiter test completed');
}
