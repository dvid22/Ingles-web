import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database"; // si usarás Realtime DB

const firebaseConfig = {
  apiKey: "AIzaSyDP8hJI7jsJcnOgMp1nttitmqXbUtue8i0",
  authDomain: "pablo-d0d87.firebaseapp.com",
  databaseURL: "https://pablo-d0d87-default-rtdb.firebaseio.com",
  projectId: "pablo-d0d87",
  storageBucket: "pablo-d0d87.appspot.com",
  messagingSenderId: "528405471290",
  appId: "1:528405471290:web:248ea9272985dded5b1503",
  measurementId: "G-LZ1ZD8PCP4",
};

export const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export const rtdb = getDatabase(firebaseApp);