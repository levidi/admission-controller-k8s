FROM node:13.7.0

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN openssl genrsa -out rootCA.key 4096

RUN openssl req -x509 -new -nodes -key rootCA.key -sha256 -days 1024 -out rootCA.crt \
    -subj "/C=BR/ST=São Paulo/L=São Paulo /O=Corp Security/OU=IT Department/CN=*.security.svc"

RUN openssl genrsa -out webhook.key 4096

RUN openssl req -new -key webhook.key -out webhook.csr \
    -subj "/C=BR/ST=São Paulo/L=São Paulo /O=Corp Security/OU=IT Department/CN=webhook-service.security.svc"

RUN openssl x509 -req -in webhook.csr -CA rootCA.crt -CAkey rootCA.key -CAcreateserial -out webhook.crt -days 1024 -sha256

RUN cat rootCA.crt | base64 | tr -d '\n'

ENV PORT=8443
ENV HOST_NAME='0.0.0.0'

CMD node index.js
