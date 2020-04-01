FROM node:10-alpine

WORKDIR /defcovidapi

COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build

CMD ["node", "dist/app"]
EXPOSE 8080
