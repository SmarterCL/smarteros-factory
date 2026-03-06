FROM node:18-alpine

WORKDIR /app

# Instalar Docker CLI
RUN apk add --no-cache docker-cli

# Instalar dependencias
COPY package*.json ./
RUN npm ci --only=production

# Copiar código
COPY core/ ./core/

# Ejecutar
CMD ["node", "core/validator.js"]
