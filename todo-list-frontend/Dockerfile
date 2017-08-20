FROM kyma/docker-nginx

COPY default /etc/nginx/sites-enabled/default

COPY src/dist/ /var/www
CMD 'nginx'
