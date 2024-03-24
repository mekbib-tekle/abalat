# Use a lightweight Node.js image
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

RUN apk update && \
    apk add --no-cache python3 make g++ && \
    rm -rf /var/cache/apk/*

# Set Python 3 as the default Python interpreter
RUN ln -sf python3 /usr/bin/python

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

# Rebuild bcrypt
RUN npm rebuild bcrypt --build-from-source
# Expose the port
EXPOSE 8000

# Start the NestJS server
CMD ["npm", "start"]