# BUILD STAGE
FROM node:16.6.0 AS build

WORKDIR /usr/src/app
COPY . .

RUN npm ci --ignore-scripts
RUN npm run build

# PROD STAGE
FROM nginx:1.21-alpine AS prod

RUN apk update && apk add dumb-init

COPY --from=build /usr/src/app/build /usr/src/app
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./nginx/start-nginx.sh /usr/bin/start-nginx.sh

RUN chmod 770 /usr/bin/start-nginx.sh && \
    chown -R nginx:nginx /usr/bin/start-nginx.sh && \
    chown -R nginx:nginx /usr/src/app && \
    chown -R nginx:nginx /etc/nginx && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx
RUN mkdir -p /var/run && \
    touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid

ENV FILES /usr/src/app/static/js/*.js

USER nginx
CMD ["dumb-init", "start-nginx.sh"]