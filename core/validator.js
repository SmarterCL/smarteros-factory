#!/usr/bin/env node

const botToken = process.env.BOT_TOKEN_MAIN || '7631713367:AAGSmMVnDim6ESlLIh1aBdP1JIQSRcfkOkQ';
const skillfish = process.env.SKILLFISH_PATH || `${process.env.HOME}/.skillfish`;
const mcpEndpoint = process.env.MCP_ENDPOINT || 'http://localhost:3051';
const status = process.env.BOT_STATUS || 'AWAITING_ACTIVE_TOKEN';

console.log('');
console.log('╔════════════════════════════════════════════════════════╗');
console.log('║   🧠 SmarterOS v2.2 - Identity Validator Status       ║');
console.log('╚════════════════════════════════════════════════════════╝');
console.log('');
console.log(`Bot Token:          ${botToken.substring(0,15)}...`);
console.log(`Skillfish Path:     ${skillfish}`);
console.log(`MCP Endpoint:       ${mcpEndpoint}`);
console.log(`Status:             ${status}`);
console.log('');

// Test token
async function testToken() {
    try {
        const response = await fetch(`https://api.telegram.org/bot${botToken}/getMe`);
        const data = await response.json();
        
        if (data.ok) {
            console.log(`✅ Token VALID: @${data.result.username}`);
            console.log('System ready for activation');
            return true;
        } else {
            console.log(`❌ Token ERROR: ${data.description}`);
            console.log('');
            console.log('To activate:');
            console.log('  1. Get active token from @BotFather');
            console.log('  2. Update .env: BOT_TOKEN_MAIN="your_token"');
            console.log('  3. Re-run: node core/validator.js');
            return false;
        }
    } catch (error) {
        console.log(`❌ Connection error: ${error.message}`);
        return false;
    }
}

testToken().then(success => {
    process.exit(success ? 0 : 1);
});
