FROM node:8.1 as builder

COPY src /usr/src
WORKDIR /usr/src
RUN npm install

FROM nginx
COPY --from=builder /usr/src /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]