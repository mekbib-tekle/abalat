FROM node:18-alpine AS base

WORKDIR /app
RUN apk update && apk add --no-cache python3 make g++ && rm -rf /var/cache/apk/*

# Set Python 3 as the default Python interpreter
RUN ln -sf python3 /usr/bin/python

COPY package*.json ./
RUN npm ci
COPY . .

# Rebuild bcrypt (or any other native modules)
RUN npm rebuild bcrypt --build-from-source

# Development stage
FROM base AS development

# Expose the development server port
EXPOSE 8000

# Start the NestJS development server with hot reloading
CMD ["npm", "run", "start:dev"]

# Build stage
FROM base AS build

# Build the NestJS application
RUN npm run build

# Production stage
FROM node:18-alpine AS production

# Set working directory
WORKDIR /app

# Copy only the build output and production dependencies
COPY package*.json ./
RUN npm ci --only=production
COPY --from=build /app/dist ./dist

# Expose the port the app runs on
EXPOSE 8000

# Start the NestJS application
CMD ["node", "dist/main"]
