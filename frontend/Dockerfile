# Base stage
FROM node:18-alpine AS base

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Development stage
FROM base AS development

EXPOSE 3000

CMD ["npm", "start"]

# Build stage
FROM base AS build

RUN npm run build

# Production stage
FROM nginx:alpine AS production

# Copy the build output to nginx's html directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port nginx will run on
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
