# Stage 1: Build the React app
FROM node:alpine AS builder

WORKDIR /app
COPY package.json package-lock.json ./
COPY public/ public/
COPY src/ src/
RUN npm ci
RUN npm run build

# Stage 2: Serve the React app with Nginx
FROM nginx:alpine

# Copy the Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built React app from the previous stage to Nginx's web directory
COPY --from=builder /app/build /usr/share/nginx/html

# Change ownership of some directories to the nginx user
RUN chown -R nginx:nginx /var/run/nginx.pid /usr/share/nginx/html /var/cache/nginx /var/log/nginx /etc/nginx/conf.d

# Switch to the nginx user
USER nginx

# Expose port 80 for Nginx
EXPOSE 80

# Start Nginx as a daemon when the container is run
CMD ["nginx", "-g", "daemon off;"]
