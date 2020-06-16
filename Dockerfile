FROM node:13.7.0-alpine3.10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .
EXPOSE 8443
ENV PORT=8443
ENV HOST_NAME='0.0.0.0'
CMD ["node", "index.js"]