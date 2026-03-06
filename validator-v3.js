#!/usr/bin/env node
/**
 * Validator v3.0 - Bot Unificado con Optimizaciones
 * Integra: Cache, Rate Limiter, Metrics, Health Check
 */

const { Telegraf, Markup } = require('telegraf');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Importar optimizaciones
const CacheEngine = require('./optimizations/cache-engine');
const RateLimiter = require('./optimizations/rate-limiter');
const MetricsExporter = require('./optimizations/metrics-exporter');

// ═══════════════════════════════════════════════════════════
//  CONFIGURACIÓN
// ═══════════════════════════════════════════════════════════

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
const ADMIN_ID = process.env.TELEGRAM_CHAT_ID || '54101...';

// Inicializar optimizaciones
const cache = new CacheEngine('./cache', 3600); // 1 hora TTL
const rateLimiter = new RateLimiter({ maxRequests: 10, windowMs: 60000 }); // 10 req/min
const metrics = new MetricsExporter('./metrics');

// Colectar métricas iniciales
metrics.collectSystemMetrics();
metrics.set('bot_started', 1);

console.log('🚀 Validator v3.0 - Bot Unificado con Optimizaciones');
console.log(`   Admin: ${ADMIN_ID}`);
console.log(`   Cache: ${cache.stats.size} items`);
console.log(`   Rate Limit: ${rateLimiter.maxRequests} req/${rateLimiter.windowMs/1000}s`);

// ═══════════════════════════════════════════════════════════
//  MIDDLEWARE DE SEGURIDAD Y OPTIMIZACIÓN
// ═══════════════════════════════════════════════════════════

// Rate limiting
bot.use((ctx, next) => {
  const userId = ctx.from.id.toString();
  const result = rateLimiter.allow(userId);
  
  if (!result.allowed) {
    metrics.inc('rate_limited');
    return ctx.reply(`⚠️ Demasiados requests. Esperá ${result.retryAfter}s`);
  }
  
  return next();
});

// Admin check
bot.use((ctx, next) => {
  if (ctx.from.id.toString() !== ADMIN_ID.toString()) {
    console.log(`⚠️ Acceso no autorizado: ${ctx.from.id}`);
    return ctx.reply('🚫 Acceso Denegado - ID no registrado');
  }
  return next();
});

// Logging
bot.use((ctx, next) => {
  metrics.inc('bot_messages_total');
  console.log(`[${new Date().toISOString()}] ${ctx.from.first_name}: ${ctx.message?.text || 'media'}`);
  return next();
});

// ═══════════════════════════════════════════════════════════
//  COMANDOS PRINCIPALES
// ═══════════════════════════════════════════════════════════

bot.start((ctx) => {
  metrics.inc('commands_start');
  ctx.reply(
    `🤖 *Smarter OS v2026.3.5*\n\n` +
    `✅ Bot Unificado con Optimizaciones\n` +
    `👤 Admin: ${ADMIN_ID}\n\n` +
    `Usa /menu para ver los controles.`,
    { parse_mode: 'Markdown' }
  );
});

bot.command('menu', (ctx) => {
  metrics.inc('commands_menu');
  ctx.reply(
    '🕹️ *Smarter OS WebControl*\n\nSelecciona:',
    {
      parse_mode: 'Markdown',
      reply_markup: Markup.keyboard([
        ['📊 Status', '📜 Logs'],
        ['📝 Documentar', '🚀 Deploy'],
        ['🔍 Buscar', 'ℹ️ Ayuda'],
        ['📈 Metrics', '💾 Cache'],
        ['🏥 Health', '🔒 Rate Limit']
      ]).resize().one_time()
    }
  );
});

bot.command('status', (ctx) => {
  metrics.inc('commands_status');
  exec('docker ps --format "{{.Names}}: {{.Status}}"', (err, stdout) => {
    if (err) return ctx.reply(`❌ Error: ${err.message}`);
    ctx.reply(`🛰️ *Nodos activos:*\n\`\`\`\n${stdout || 'Ninguno'}\`\`\``, { parse_mode: 'Markdown' });
  });
});

bot.command('logs', (ctx) => {
  metrics.inc('commands_logs');
  const app = ctx.message.text.split(' ')[1];
  const cmd = app ? `docker logs ${app} --tail=30` : 'docker compose logs --tail=30';
  exec(cmd, (err, stdout) => {
    if (err) return ctx.reply(`❌ Error: ${err.message}`);
    ctx.reply(`📋 *Logs${app ? ' de ' + app : ''}:*\n\`\`\`\n${stdout}\`\`\``, { parse_mode: 'Markdown' });
  });
});

bot.command('deploy', (ctx) => {
  metrics.inc('commands_deploy');
  const app = ctx.message.text.split(' ')[1];
  if (!app) return ctx.reply('Uso: /deploy <servicio>');
  
  ctx.reply(`🚀 Reiniciando ${app}...`);
  exec(`docker compose restart ${app}`, (err) => {
    if (err) return ctx.reply(`❌ Error: ${err.message}`);
    ctx.reply(`✅ *Confirmado:* ${app} reiniciado`, { parse_mode: 'Markdown' });
  });
});

bot.command('documentar', (ctx) => {
  metrics.inc('commands_documentar');
  const note = ctx.message.text.split(' ').slice(1).join(' ') || 'Manual';
  const ts = new Date().toLocaleString('es-CL');
  const log = `[${ts}] ${note}\n`;
  
  exec('mkdir -p /opt/smarteros/docs', () => {
    fs.appendFile('/opt/smarteros/docs/activity.log', log, (err) => {
      if (err) return ctx.reply(`❌ Error: ${err.message}`);
      ctx.reply('✅ *Confirmado:* Documentado', { parse_mode: 'Markdown' });
    });
  });
});

bot.command('buscar', (ctx) => {
  metrics.inc('commands_buscar');
  const q = ctx.message.text.split(' ').slice(1).join(' ');
  if (!q) return ctx.reply('Uso: /buscar <término>');
  
  exec(`grep -ri "${q}" /opt/smarteros --include="*.log" | head -10`, (err, stdout) => {
    if (err) return ctx.reply(`❌ Error: ${err.message}`);
    ctx.reply(`🔍 *Resultados "${q}":*\n\`\`\`\n${stdout || 'Sin resultados'}\`\`\``, { parse_mode: 'Markdown' });
  });
});

bot.command('help', (ctx) => {
  metrics.inc('commands_help');
  ctx.reply(`📚 *Comandos:*\n/menu - Botones\n/status - Estado\n/logs - Logs\n/deploy - Reiniciar\n/documentar - Guardar\n/buscar - Buscar\n/metrics - Métricas\n/cache - Cache stats\n/health - Health check\n/ratelimit - Rate limit status`, { parse_mode: 'Markdown' });
});

// ═══════════════════════════════════════════════════════════
//  COMANDOS DE OPTIMIZACIÓN
// ═══════════════════════════════════════════════════════════

bot.command('metrics', (ctx) => {
  metrics.inc('commands_metrics');
  const allMetrics = metrics.getAll();
  const sysMetrics = metrics.get('cpu_usage_percent');
  
  ctx.reply(
    `📊 *Métricas del Sistema*\n\n` +
    `CPU: ${sysMetrics?.value?.toFixed(1) || 'N/A'}%\n` +
    `RAM: ${metrics.get('memory_usage_percent')?.value?.toFixed(1) || 'N/A'}%\n` +
    `Uptime: ${(metrics.get('uptime_seconds')?.value || 0) / 3600 | 0}h\n\n` +
    `Bot Messages: ${metrics.get('bot_messages_total')?.value || 0}\n` +
    `Cache Hits: ${cache.stats.hits}\n` +
    `Cache Misses: ${cache.stats.misses}\n` +
    `Hit Rate: ${cache.stats.hits + cache.stats.misses > 0 ? ((cache.stats.hits / (cache.stats.hits + cache.stats.misses)) * 100).toFixed(1) : 0}%\n\n` +
    `Total Metrics: ${allMetrics.count}`,
    { parse_mode: 'Markdown' }
  );
});

bot.command('cache', (ctx) => {
  metrics.inc('commands_cache');
  const stats = cache.getStats();
  
  ctx.reply(
    `💾 *Cache Engine*\n\n` +
    `Hits: ${stats.hits}\n` +
    `Misses: ${stats.misses}\n` +
    `Size: ${stats.size}\n` +
    `Hit Rate: ${stats.hitRate}\n` +
    `Directory: ${stats.directory}\n` +
    `TTL: ${cache.ttlSeconds}s`,
    { parse_mode: 'Markdown' }
  );
});

bot.command('health', (ctx) => {
  metrics.inc('commands_health');
  
  // Health check rápido
  const checks = [];
  
  // Bot
  checks.push('✅ Bot: Online');
  
  // Docker
  exec('docker ps | wc -l', (err, stdout) => {
    const containers = parseInt(stdout.trim()) - 1;
    checks.push(`✅ Docker: ${containers} containers`);
    
    // Disk
    exec('df -h / | tail -1 | awk \'{print $5}\'', (err, stdout) => {
      const disk = stdout.trim();
      checks.push(`💾 Disk: ${disk}`);
      
      ctx.reply(`🏥 *Health Check*\n\n${checks.join('\n')}`, { parse_mode: 'Markdown' });
    });
  });
});

bot.command('ratelimit', (ctx) => {
  metrics.inc('commands_ratelimit');
  const status = rateLimiter.getStatus(ctx.from.id.toString());
  const stats = rateLimiter.getStats();
  
  ctx.reply(
    `🔒 *Rate Limiter*\n\n` +
    `Your remaining: ${status.remaining}\n` +
    `Reset in: ${status.resetIn}s\n\n` +
    `Total users: ${stats.totalUsers}\n` +
    `Max requests: ${stats.maxRequests}\n` +
    `Window: ${stats.windowMs/1000}s`,
    { parse_mode: 'Markdown' }
  );
});

// ═══════════════════════════════════════════════════════════
//  IA CON CACHE (Optimizado)
// ═══════════════════════════════════════════════════════════

bot.on('text', (ctx) => {
  const text = ctx.message.text;
  
  // Ignorar comandos
  if (text.startsWith('/')) return;
  
  metrics.inc('ia_requests_total');
  
  // Check cache primero
  const cached = cache.get(text, 'Eres QUARK');
  if (cached.hit) {
    metrics.inc('cache_hits');
    ctx.reply(`💾 *Cache Hit*\n\n${cached.response}\n\n_Ahorrado: ${(cached.age).toFixed(0)}s de latencia_`, { parse_mode: 'Markdown' });
    return;
  }
  
  // Cache miss - llamar a IA
  metrics.inc('cache_misses');
  ctx.reply('🧠 Pensando...');
  
  // Simular llamada a IA (en producción usar OpenRouter real)
  setTimeout(() => {
    const response = 'Respuesta de IA simulada (integrar con OpenRouter)';
    cache.set(text, 'Eres QUARK', response);
    ctx.reply(response);
  }, 1000);
});

// ═══════════════════════════════════════════════════════════
//  AUTO-SAVE DE MÉTRICAS
// ═══════════════════════════════════════════════════════════

setInterval(() => {
  metrics.collectSystemMetrics();
  metrics.save();
  cache.clean();
  rateLimiter.cleanup();
  console.log('📊 Metrics auto-saved, cache cleaned');
}, 60000); // Cada 1 minuto

// ═══════════════════════════════════════════════════════════
//  LANZAMIENTO
// ═══════════════════════════════════════════════════════════

bot.launch()
  .then(() => {
    console.log('✅ Bot v3.0 en línea');
    console.log('✅ Optimizaciones activas: Cache, Rate Limiter, Metrics');
    console.log('✅ Auto-save: 60s');
  })
  .catch(err => console.error('❌ Error:', err));

process.once('SIGINT', () => {
  metrics.save();
  bot.stop('SIGINT');
});
process.once('SIGTERM', () => {
  metrics.save();
  bot.stop('SIGTERM');
});
