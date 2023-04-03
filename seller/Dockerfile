FROM node:18.15.0-alpine as build

ENV NODE_ENV development
ENV REACT_APP_SERVER_URL=http://localhost:3003

WORKDIR /app

COPY ./package.json /app/
COPY ./yarn.lock /app/

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build/ /usr/share/nginx/html

EXPOSE 80


