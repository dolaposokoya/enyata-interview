const { initializeApp } = require('firebase/app')
const { getAuth } = require('firebase/auth')
const { getDatabase } = require('firebase/database')

const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
    measurementId: process.env.measurementId,
    databaseURL: process.env.DATABASE_URL
};

const app = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(app)
const database = getDatabase()
console.log('App called')
module.exports = {
    app,
    firebaseAuth,
    database
}