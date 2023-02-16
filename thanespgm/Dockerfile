FROM node:alpine AS builder

WORKDIR /app

COPY . .

RUN npm install && npm run build
# nginx
FROM nginx:alpine

COPY default.conf /etc/nginx/conf.d

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=builder /app/build .

ENTRYPOINT ["nginx", "-g", "daemon off;"]