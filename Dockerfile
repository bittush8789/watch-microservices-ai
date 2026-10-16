# =====================================================================
# Dockerfile for Neek Watches Client & Web Frontend
# =====================================================================
FROM node:20-alpine AS build

WORKDIR /app

COPY package.json package-lock.json* bun.lock* ./
RUN npm install

COPY . .

# Build Vite frontend assets
RUN npm run build

EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000

CMD ["npm", "run", "start"]
