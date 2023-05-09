FROM node:16.15.0
WORKDIR /enyata
COPY . . 
ENV JWT_EXPIRES_IN='24h'
ENV MONGO_URL=mongodb+srv://dolaposokoya97:adedolapo97@cluster0-xmua4.mongodb.net/enyata
ENV JWT_SECRET='ufyeiuyeiiyeiuersnFUWFFvH'

RUN npm install
EXPOSE 5201

CMD ["npm","run","dev"]

