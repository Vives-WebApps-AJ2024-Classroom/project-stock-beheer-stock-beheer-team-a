# Development stage
FROM node:18.20-alpine3.20
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3001
CMD ./wait-for $DB_HOST:$DB_PORT -t 40 -- node index.js