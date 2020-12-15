import app from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyA-7IU7JYfcUvW9qFhqz20vlzjAYr4NDY8",
  authDomain: "medicapp-firebase.firebaseapp.com",
  databaseURL: "https://medicapp-firebase.firebaseio.com",
  projectId: "medicapp-firebase",
  storageBucket: "medicapp-firebase.appspot.com",
  messagingSenderId: "1020281148622",
  appId: "1:1020281148622:web:fb81e99085cdd528de2c9f"
};
// Initialize Firebase
app.initializeApp(firebaseConfig);

const db = app.firestore();
const auth = app.auth();

export {db,auth}