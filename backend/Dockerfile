# Use a lightweight Node.js image
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy remaining project files
COPY . .

# Build the NestJS app
# CMD ["npm", "run", "build"]

# Switch to a slimmer image for production
# FROM node:18-alpine

# Copy the built artifacts
# COPY --from=builder /app/dist /app

# Expose the port
EXPOSE 8000

# Start the NestJS server
CMD ["npm", "start"]