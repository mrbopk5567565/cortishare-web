FROM node:12.16.2 as builder-stage
WORKDIR /app
COPY ./package*.json ./
COPY . .
RUN npm install
RUN npm run build-dev

FROM nginx:latest as nginx-stage
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/default.conf /etc/nginx/conf.d
EXPOSE 80
EXPOSE 443
COPY --from=builder-stage /app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
