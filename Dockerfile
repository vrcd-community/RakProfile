FROM node:23-slim AS builder

WORKDIR /app

COPY package*.json ./
COPY pnpm-lock.yaml ./

RUN npm install --global corepack@latest
RUN corepack enable pnpm

RUN pnpm install
RUN pnpm approve-builds

COPY . .

ENV NODE_ENV=production

EXPOSE 3000

CMD ["/bin/sh", "-c", "pnpm run build && pnpm start"]