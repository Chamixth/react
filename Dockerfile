# Stage 1: Build the Node.js application
FROM node:alpine AS development

# Declaring env
ENV NODE_ENV development

# Setting up the work directory
WORKDIR /cgaas-ui

# Installing dependencies
COPY ./package.json ./package-lock.json /cgaas-ui/
RUN npm install

# Copying all the files in our project
COPY . .

# Build the Node.js application (e.g., create a production-ready build)
RUN npm run build

# Stage 2: Create the Nginx container
FROM nginx:alpine

# Remove the default Nginx configuration
RUN rm -rf /etc/nginx/conf.d/*

# Copy the Nginx configuration file for your application
COPY nginx.conf /etc/nginx/conf.d/

# Copy the built Node.js application from the previous stage
COPY --from=development /cgaas-ui/build /usr/share/nginx/html

# Expose port 80 for the Nginx server
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
