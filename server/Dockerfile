FROM node:18.15.0-alpine3.17
RUN apk update && apk install yarn
WORKDIR /app

COPY package*.json ./

RUN yarn install
COPY . .
EXPOSE 3000

CMD ["yarn", "start"]
