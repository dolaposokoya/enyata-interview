## Running this project make sure you have knowledge of environment variables and docker and how to create noode js project.

#TODO 

### To run code without docker

##### Step 1: Run npm install to install all the packages listed in package.json

---
##### Step 2: Create an environment variable with the following names.

1. JWT_SECRET
2. JWT_EXPIRES_IN
3. MONGO_URL

---
##### Step 3: Create a mongodb url string for your database connectivity, and paste it in the mong environment.
___

##### Step 4: Create JWT secret key and JWT expiration time #NOTE - (use between 1h and 24h)

-------------------------

##### Step 5: Run command npm start

---
### To run code with docker

###### How to set up [docker](https://www.docker.com/blog/how-to-setup-your-local-node-js-development-environment-using-docker/ "Optional Title") for node.js

##### Step 1: Follow the steps in the link above

---

##### Step 2: Before RUN npm install command, copy all your environment variables by adding ENV "your environment variable name=environment value"

##### TODO - ENV NAME=VALUE


----

##### Visit [postman](https://crimson-escape-292203.postman.co/workspace/Enyata-Interview~b5d3a855-624b-4056-9385-a2c1261509d0/collection/16442484-cc4d2abf-074d-4908-8291-1ce094aafacf?action=share&creator=16442484/ "Optional Title") for endpoints

---