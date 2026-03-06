#!/bin/bash
TOKEN="${BOT_TOKEN_MAIN:-7631713367:AAGSmMVnDim6ESlLIh1aBdP1JIQSRcfkOkQ}"
echo "Testing token: ${TOKEN:0:10}..."
RESPONSE=$(curl -s -X GET "https://api.telegram.org/bot${TOKEN}/getMe")
if echo "$RESPONSE" | grep -q '"ok":true'; then
    echo "✅ Token VALID"
    echo "$RESPONSE" | jq .
else
    echo "❌ Token ERROR (likely revoked or inactive)"
fi
