# Stage 1: Build the React app
FROM node:alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the React app with NGINX
FROM nginx:1.21.3-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY /etc/nginx/nginx.conf /etc/nginx/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
