var admin = require("firebase-admin");
var app = require('firebase');

var serviceAccount = require("../../gideana-project-firebase-adminsdk-myjcr-5f963379dc.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://gideana-project.firebaseio.com"
});

app.initializeApp({  
  apiKey: "AIzaSyCil70O4YGZmsZjtyO06hsuPVrGf95B11I",
    authDomain: "gideana-project.firebaseapp.com",
    databaseURL: "https://gideana-project.firebaseio.com",
    projectId: "gideana-project",
    storageBucket: "gideana-project.appspot.com",
    messagingSenderId: "28993149484"
})

const firestore = admin.firestore();
const auth = app.auth();

module.exports = {
    firestore: firestore,
    auth: auth,
}

