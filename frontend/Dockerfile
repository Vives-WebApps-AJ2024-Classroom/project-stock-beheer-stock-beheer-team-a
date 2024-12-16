# Build Stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

#node node_modules/serve/build/main.js -s build

EXPOSE 3000
CMD ["node", "node_modules/serve/build/main.js", "-s", "build"]