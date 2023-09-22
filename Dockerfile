# Use the official Node.js image based on Alpine Linux as the base image
FROM node:alpine AS development

# Set the environment variable to development
ENV NODE_ENV development

# Set the working directory within the container
WORKDIR /cgaas-ui-2

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy all the files in your project to the container
COPY . .

# Start your Node.js application when the container is run
CMD ["npm", "start"]

# Stage for Nginx
FROM nginx:alpine AS production

# Copy the built React app from the Node.js development stage to Nginx's web directory
COPY --from=development /cgaas-ui-2/build /usr/share/nginx/html

# Expose port 80 for Nginx
EXPOSE 80

# Start Nginx as a daemon when the container is run
CMD ["nginx", "-g", "daemon off;"]

