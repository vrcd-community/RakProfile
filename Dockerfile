FROM node:23-slim AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm install --os=linux --cpu=x64 sharp

COPY . .

ENV NODE_ENV=production

EXPOSE 3000

CMD ["/bin/sh", "-c", "npm run build && npm start"]