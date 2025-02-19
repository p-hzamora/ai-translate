FROM node:23-alpine3.20 AS build

WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . .

####### nginx ######
FROM nginx:latest
COPY --from=build /usr/app/dist /usr/share/nginx/html