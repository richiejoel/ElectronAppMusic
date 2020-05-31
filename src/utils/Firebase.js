import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDouGJzbUmuiVhalk10TFanQHYGTGsYLlo",
  authDomain: "musicfy-5f41a.firebaseapp.com",
  databaseURL: "https://musicfy-5f41a.firebaseio.com",
  projectId: "musicfy-5f41a",
  storageBucket: "musicfy-5f41a.appspot.com",
  messagingSenderId: "675898786858",
  appId: "1:675898786858:web:d0964fa54431351d0a2f53",
  measurementId: "G-G83VYZBJVW",
};

export default firebase.initializeApp(firebaseConfig);
// firebase.analytics();
