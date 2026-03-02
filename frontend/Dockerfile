# Build stage
FROM node:18-alpine as build

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code and build
COPY . .
RUN npm run build

# Production stage - use Nginx to serve static files
FROM nginx:alpine

# Copy built assets from build stage to Nginx serve directory
COPY --from=build /app/dist /usr/share/nginx/html

# Add custom Nginx configuration to handle React Router (SPA routing)
# Since we might not have a custom nginx.conf ready, we can use a quick inline addition to default conf if needed
# but standard default usually works for index, we just need a rewrite for SPA.
RUN sed -i '10i \\ttry_files $uri $uri/ /index.html;' /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
