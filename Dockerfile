FROM node:16.15.0
WORKDIR /enyata
COPY . . 


RUN npm install
EXPOSE 5201

CMD ["npm","run","dev"]
