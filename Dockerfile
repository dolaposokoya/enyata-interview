FROM node:16.15.0
WORKDIR /enyata
COPY . . 
ENV JWT_EXPIRES_IN='24h'
ENV MONGO_URL=mongodb+srv://dolaposokoya97:adedolapo97@cluster0-xmua4.mongodb.net/enyata
ENV JWT_SECRET='ufyeiuyeiiyeiuersnFUWFFvH'
ENV apiKey=AIzaSyDTMIDLSM7ar_YgcW0hh-xDu1xHduOSom0
ENV authDomain=enyata-interview.firebaseapp.com
ENV projectId=enyata-interview
ENV storageBucket=enyata-interview.appspot.com
ENV messagingSenderId=1085547622417
ENV appId=1:1085547622417:web:09349fb9071ac765f981b0
ENV measurementId=G-ZD0Y6XJZ8N
ENV DATABASE_URL=https://enyata-interview-default-rtdb.europe-west1.firebasedatabase.app

RUN npm install
EXPOSE 5201

CMD ["npm","run","dev"]

