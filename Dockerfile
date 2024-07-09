# Stage 1: Build the Vite app
FROM node:18 AS builder

WORKDIR /app

# Install dependencies
COPY package.json ./
RUN npm install

# Copy source files and build the app
COPY . .
RUN npm run build

# Stage 2: Serve the app using a lightweight web server
FROM nginx:alpine

# Copy the built app from the previous stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy the nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the port
EXPOSE 3001

# Start the nginx server
CMD ["nginx", "-g", "daemon off;"]
