# Working on Jenskin Server

## Go to folder to clone project

cd /Users/vinova/Project

## Clone source code

git clone --single-branch --branch develop git@gitlab.com:vinova/fwd/fwd-tapp-web-frontend.git

## Go to folder Project

cd fwd-tapp-web-frontend

## Build image with docker

docker build --tag fwd.web.frontend:latest .

## Export image to tar file

docker save --output /Users/vinova/Docker/docker-fwd-tapp-frontend.tar fwd.web.frontend:latest

## Copy file to server

scp -i /Users/vinova/ssh_pem/tap-dev.pem /Users/vinova/Docker/docker-fwd-tapp-frontend.tar ubuntu@18.140.74.12:/home/ubuntu/fwdfrontent

## Remove image tar after copy file to server completed

rm /Users/vinova/Docker/docker-fwd-tapp-frontend.tar

## Remove folder project after completed

rm -rf /Users/vinova/Project/fwd-tapp-web-frontend

## Remove images fwd.web.frontend:latest

docker rmi -f fwd.web.frontend:latest

## Remove untagged images

docker image prune

# Working on server client

## SSH to server dev

ssh -i /Users/vinova/ssh_pem/tap-dev.pem ubuntu@18.140.74.12

## Stop current container running

sudo docker stop fwd-frontend

## Remove current container running

sudo docker rm fwd-frontend

## Remove images fwd.web.frontend:latest

sudo docker rmi -f fwd.web.frontend:latest

## Import image to docker

sudo docker load < /home/ubuntu/fwdfrontent/docker-fwd-tapp-frontend.tar

## Run Image with container

sudo docker run -d -p 80:80 -p 443:443 --restart always --name fwd-frontend fwd.web.frontend:latest

## Remove image tar after run container completed

rm /home/ubuntu/fwdfrontent/docker-fwd-tapp-frontend.tar

# Script into Jenskin

```
cd /Users/vinova/Project &&
git clone --single-branch --branch develop git@gitlab.com:vinova/fwd/fwd-tapp-web-frontend.git &&
cd fwd-tapp-web-frontend &&
docker build --tag fwd.web.frontend:latest . &&
docker save --output /Users/vinova/Docker/docker-fwd-tapp-frontend.tar fwd.web.frontend:latest &&
scp -i /Users/vinova/ssh_pem/tap-dev.pem /Users/vinova/Docker/docker-fwd-tapp-frontend.tar ubuntu@18.140.74.12:/home/ubuntu/fwdfrontent &&
rm /Users/vinova/Docker/docker-fwd-tapp-frontend.tar &&
rm -rf /Users/vinova/Project/fwd-tapp-web-frontend &&
docker rmi -f fwd.web.frontend:latest &&
docker image prune &&
ssh -i /Users/vinova/ssh_pem/tap-dev.pem ubuntu@18.140.74.12 'sudo docker stop fwd-frontend && sudo docker rm fwd-frontend && sudo docker rmi -f fwd.web.frontend:latest && sudo docker load < /home/ubuntu/fwdfrontent/docker-fwd-tapp-frontend.tar && sudo docker run -d -p 80:80 --restart always --name fwd-frontend fwd.web.frontend:latest && rm /home/ubuntu/fwdfrontent/docker-fwd-tapp-frontend.tar'
```
