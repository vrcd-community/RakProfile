FROM node:23-slim

WORKDIR /app

COPY package*.json ./

RUN apt-get update \
  && apt-get install -y \
  python3 \
  make \
  g++ \
  sqlite3 \
  libsqlite3-dev \
  && rm -rf /var/lib/apt/lists/*

RUN npm install

COPY . .

RUN npm run build

ENV NODE_ENV production

EXPOSE 3000

CMD ["npm", "start"]