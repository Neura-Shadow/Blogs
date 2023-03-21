import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA2ZJZZZmOlbnco9kaooztR4DBz2Gm5y5U",
  authDomain: "vueandfb-1c39f.firebaseapp.com",
  projectId: "vueandfb-1c39f",
  storageBucket: "vueandfb-1c39f.appspot.com",
  messagingSenderId: "276834095115",
  appId: "1:276834095115:web:d6b536f8ee2b92aeb3370e"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { timestamp };
export default firebaseApp.firestore();

