#### Tạo image to deploy

- cd vào Project muốn tạo docker image.
  \$ touch Dockerfile

- Paste Config below

```
FROM node:10.16.2 as builder-stage
WORKDIR /app
COPY ./package*.json ./
COPY . .
RUN npm install
RUN npm run build

FROM nginx:latest as nginx-stage
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/default.conf /etc/nginx/conf.d
EXPOSE 80
EXPOSE 443
COPY --from=builder-stage /app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]

```

## Build image

docker build --tag fwd.web.frontend:latest .

## Build image to tar file

docker save --output /Users/dboi/Desktop/docker-fwd-tapp-frontend.tar fwd.web.frontend:latest

## Import image to docker

docker load < docker-fwd-tapp-frontend.tar

## Run Image with container

docker run -d -p 80:80 --restart always --name fwd-frontend fwd.web.frontend:latest

## Copy file to server

scp -i ~/Desktop/tap-dev.pem ~/Desktop/docker-fwd-tapp-frontend.tar ubuntu@18.140.74.12:/home/ubuntu/fwdfrontent
