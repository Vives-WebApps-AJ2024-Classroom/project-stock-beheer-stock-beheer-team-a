# Build Stage
FROM node:20-alpine3.20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ARG REACT_APP_PHPMYADMIN_URL
ARG REACT_APP_BACKEND_URL
ARG REACT_APP_CLERK_PUBLISHABLE_KEY
RUN npm run build

#node node_modules/serve/build/main.js -s build

EXPOSE 3000
CMD ["node", "node_modules/serve/build/main.js", "-s", "build"]