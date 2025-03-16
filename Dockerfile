FROM node:23-slim

WORKDIR /app
ENV NODE_ENV production

COPY package*.json ./

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

COPY . .

RUN pnpm run build

EXPOSE 3000

CMD ["npm", "start"]