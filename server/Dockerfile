
FROM node:20-alpine


WORKDIR /app


COPY package*.json ./


RUN npm install --production


COPY . .


EXPOSE 5000

# Start server in production mode
CMD ["node", "app.js"]
