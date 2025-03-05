FROM nginx:latest

WORKDIR /usr/share/nginx/html

# COPY nginx.conf /etc/nginx/nginx.conf

COPY dist/ .
COPY entrypoint.sh entrypoint.sh
RUN chmod +x entrypoint.sh

EXPOSE 80

ENTRYPOINT ["sh", "entrypoint.sh"]