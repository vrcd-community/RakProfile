FROM node:23-slim AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV NODE_ENV=production

EXPOSE 3000

CMD ["/bin/sh", "-c", "pnpm run build && pnpm start"]