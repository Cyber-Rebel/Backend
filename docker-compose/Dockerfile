FROM node:18-alpine

WORKDIR /app

COPY package* .

RUN npm install

COPY . .

# ENV Mongodb_url = mongodb://localhost:27017/docker-composs

EXPOSE 3000
#  port ko exporse kar sakte hae -p 3000:3000 esliye exporse karte hae 
CMD ["node", "index.js"]