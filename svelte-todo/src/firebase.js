import firebase from "firebase/app";
import "firebase/firestore";

// Your web app's Firebase configuration
  var firebaseConfig = {
    // copy from firebase config
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  db.enablePersistence();

  export default db;
