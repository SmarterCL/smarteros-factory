const { Telegraf } = require('telegraf');
require('dotenv').config();

// ═══════════════════════════════════════════════════════════
//  📡 MCP MARKET SKILLS - TELEGRAM (INSTALADOS)
// ═══════════════════════════════════════════════════════════

// Skill: telegram-send (lycfyi/community-agent-plugin)
// Note: Changed to use absolute path or process.env.HOME for reliability in Node
const path = require('path');
const homeDir = require('os').homedir();

const telegramSendPath = path.join(homeDir, '.skillfish/lycfyi-community-agent-plugin/telegram-send');
const telegramSend = require(telegramSendPath);

// Skill: telegram-messaging (vampik33/claude-plugins)
const telegramMessagingPath = path.join(homeDir, '.skillfish/vampik33-claude-plugins/telegram-messaging');
const telegramMessaging = require(telegramMessagingPath);

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

// Módulo de Comando: /send
bot.command('send', async (ctx) => {
  const msg = ctx.message.text.split(' ').slice(1).join(' ');
  if (!msg) return ctx.reply('Uso: /send <mensaje>');
  
  try {
    await telegramSend.send({
      chatId: process.env.TELEGRAM_CHAT_ID,
      text: msg
    });
    ctx.reply('✅ *Enviado*', { parse_mode: 'Markdown' });
  } catch (err) {
    ctx.reply('❌ Error: ' + err.message);
  }
});

// Módulo de Comando: /receive
bot.command('receive', async (ctx) => {
  try {
    const messages = await telegramMessaging.getMessages({
      limit: 10
    });
    // Assuming messages is an array based on the example join
    ctx.reply('📬 *Últimos mensajes:*\n\n' + messages.join('\n'), { 
        parse_mode: 'Markdown' });
  } catch (err) {
    ctx.reply('❌ Error: ' + err.message);
  }
});

bot.launch().then(() => {
    console.log('SmarterOS Gatekeeper - Bot Started Successfully');
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
