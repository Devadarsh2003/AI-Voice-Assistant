# Use Nginx as base image
FROM nginx:alpine

# Copy frontend files to Nginx's HTML directory
COPY . /usr/share/nginx/html

# Expose Nginx default port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]