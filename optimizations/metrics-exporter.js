#!/usr/bin/env node
/**
 * Metrics Exporter para Smarter OS
 * Exporta métricas para Grafana/Prometheus
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

class MetricsExporter {
  constructor(metricsDir = './metrics') {
    this.metricsDir = metricsDir;
    this.metrics = {};
    
    // Crear directorio
    if (!fs.existsSync(metricsDir)) {
      fs.mkdirSync(metricsDir, { recursive: true });
    }
    
    console.log(`✅ Metrics Exporter: ${metricsDir}`);
  }
  
  // Registrar métrica
  set(name, value, labels = {}) {
    this.metrics[name] = {
      value,
      labels,
      timestamp: Date.now()
    };
  }
  
  // Incrementar métrica
  inc(name, value = 1) {
    if (!this.metrics[name]) {
      this.set(name, 0);
    }
    this.metrics[name].value += value;
  }
  
  // Obtener métrica
  get(name) {
    return this.metrics[name];
  }
  
  // Exportar a formato Prometheus
  exportPrometheus() {
    let output = '# HELP smarteros_metrics Smarter OS Metrics\n';
    output += '# TYPE smarteros_metrics gauge\n\n';
    
    for (const [name, data] of Object.entries(this.metrics)) {
      const labels = Object.entries(data.labels)
        .map(([k, v]) => `${k}="${v}"`)
        .join(',');
      
      const labelStr = labels ? `{${labels}}` : '';
      output += `smarteros_${name}${labelStr} ${data.value}\n`;
    }
    
    return output;
  }
  
  // Exportar a JSON
  exportJSON() {
    return JSON.stringify({
      metrics: this.metrics,
      exported_at: new Date().toISOString(),
      hostname: os.hostname()
    }, null, 2);
  }
  
  // Guardar a archivo
  save(filename = 'metrics.json') {
    const filePath = path.join(this.metricsDir, filename);
    fs.writeFileSync(filePath, this.exportJSON());
    console.log(`📊 Metrics saved: ${filePath}`);
  }
  
  // Obtener métricas del sistema
  collectSystemMetrics() {
    // CPU
    const cpus = os.cpus();
    const cpuUsage = cpus.map(cpu => {
      const total = Object.values(cpu.times).reduce((a, b) => a + b, 0);
      const idle = cpu.times.idle;
      return 100 - ((idle / total) * 100);
    });
    
    this.set('cpu_usage_percent', cpuUsage.reduce((a, b) => a + b, 0) / cpus.length);
    
    // Memoria
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const usedMem = totalMem - freeMem;
    this.set('memory_used_bytes', usedMem);
    this.set('memory_total_bytes', totalMem);
    this.set('memory_usage_percent', (usedMem / totalMem) * 100);
    
    // Uptime
    this.set('uptime_seconds', os.uptime());
    
    // Disk (simplificado)
    this.set('disk_free_bytes', fs.statfsSync('/').f_bsize * fs.statfsSync('/').f_bavail);
    
    console.log('📊 System metrics collected');
  }
  
  // Limpiar métricas viejas
  cleanup(maxAge = 3600000) {
    const now = Date.now();
    let cleaned = 0;
    
    for (const [name, data] of Object.entries(this.metrics)) {
      if (now - data.timestamp > maxAge) {
        delete this.metrics[name];
        cleaned++;
      }
    }
    
    console.log(`🧹 Metrics cleaned: ${cleaned}`);
    return cleaned;
  }
  
  // Obtener todas las métricas
  getAll() {
    return {
      metrics: this.metrics,
      count: Object.keys(this.metrics).length,
      timestamp: Date.now()
    };
  }
}

module.exports = MetricsExporter;

// Test
if (require.main === module) {
  console.log('🧪 Testing Metrics Exporter...');
  
  const metrics = new MetricsExporter();
  
  // Collect system metrics
  metrics.collectSystemMetrics();
  
  // Custom metrics
  metrics.set('bot_messages_total', 150, { type: 'telegram' });
  metrics.set('ia_requests_total', 45, { provider: 'openrouter' });
  metrics.set('ia_latency_ms', 1720, { provider: 'openrouter' });
  metrics.inc('cache_hits');
  metrics.inc('cache_hits');
  metrics.inc('cache_misses');
  
  // Export
  console.log('\n=== Prometheus Format ===');
  console.log(metrics.exportPrometheus());
  
  console.log('\n=== JSON Format ===');
  console.log(metrics.exportJSON());
  
  // Save
  metrics.save();
  
  console.log('\n✅ Metrics Exporter test completed');
}
