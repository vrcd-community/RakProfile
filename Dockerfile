FROM node:23-slim AS builder

WORKDIR /app

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

ENV NODE_ENV=production

ARG BOOKSTACK_BASEURL
ENV BOOKSTACK_BASEURL=$BOOKSTACK_BASEURL

ARG LOGTO_BASEURL
ENV LOGTO_BASEURL=$LOGTO_BASEURL

ARG BOOKSTACK_API_ID
ENV BOOKSTACK_API_ID=$BOOKSTACK_API_ID

ARG BOOKSTACK_API_SECRET
ENV BOOKSTACK_API_SECRET=$BOOKSTACK_API_SECRET

ARG LOGTO_APP_ID
ENV LOGTO_APP_ID=$LOGTO_APP_ID

ARG LOGTO_APP_SECRET
ENV LOGTO_APP_SECRET=$LOGTO_APP_SECRET

RUN pnpm run build

EXPOSE 3000

CMD ["pnpm", "start"]