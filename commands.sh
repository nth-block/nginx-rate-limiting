docker pull nginx:latest
docker pull httpd:latest
docker network create --driver=bridge nth
docker container run -d -p 80:80 --name apache1 --hostname apache1 --network nth httpd
docker container run -d -p 81:80 --name apache2 --hostname apache2 --network nth httpd

docker build -t nginx-apache .
docker run --network nth --name nginx -p 8080:80 -d nginx-apache

# Update the index.html to just hostname

for i in {1..50}; do curl -s http://localhost:8080 ; done
