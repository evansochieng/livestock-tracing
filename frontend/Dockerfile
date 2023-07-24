# Use a base image with Node.js
FROM node:18.6.0-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the React application code
COPY . .

# Build the React app
RUN npm run build

# Set the environment variable for React production build
ENV NODE_ENV=production

# Expose a port (if needed) for the React server
EXPOSE 3000

# Run the React application
CMD ["npx", "serve", "-s", "build"]

