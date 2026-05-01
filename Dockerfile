FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

ENV MONGODB_URI=mongodb://kzari898_db_user:ZZAARUIJI@ac-dfjna31-shard-00-00.5wqvdv2.mongodb.net:27017,ac-dfjna31-shard-00-01.5wqvdv2.mongodb.net:27017,ac-dfjna31-shard-00-02.5wqvdv2.mongodb.net:27017/literati_hub?ssl=true&replicaSet=atlas-zq1oi2-shard-0&authSource=admin&retryWrites=true&w=majority&appName=DevOps

RUN npm install && npm cache clean --force

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
