import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCBcuFd0k3INxU9VieMcX5WLYd5mjRsIIk",
  authDomain: "takbatr-2021.firebaseapp.com",
  projectId: "takbatr-2021",
  storageBucket: "takbatr-2021.appspot.com",
  messagingSenderId: "222716808542",
  appId: "1:222716808542:web:e673ef18494d9562b553cf",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default db;
