FROM node:23-slim AS builder

WORKDIR /app
ENV NODE_ENV production

COPY package*.json ./
COPY pnpm-lock.yaml ./

RUN apt-get update \
  && apt-get install -y \
  python3 \
  make \
  g++ \
  sqlite3 \
  libsqlite3-dev \
  && rm -rf /var/lib/apt/lists/*

RUN npm install --global corepack@latest
RUN corepack enable pnpm

RUN pnpm install
RUN pnpm approve-builds -g

COPY . .

RUN pnpm run build

FROM node:23-slim

WORKDIR /app
ENV NODE_ENV production

COPY --from=builder /app/.next ./
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["npm", "start"]