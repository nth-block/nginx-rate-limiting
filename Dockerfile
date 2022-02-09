FROM nginx:latest
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY conf.d/logging.js /etc/nginx/conf.d/logging.js