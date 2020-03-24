FROM node:10-alpine

WORKDIR /defcovidapi

COPY package*.json ./
RUN npm install
COPY . .

CMD ["node", "app"]
