import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCGuyD2hC36bAuscdT6WboLFClmKU059xY",
  authDomain: "food-diary-e72b4.firebaseapp.com",
  projectId: "food-diary-e72b4",
  storageBucket: "food-diary-e72b4.appspot.com",
  messagingSenderId: "340041755401",
  appId: "1:340041755401:web:71873271dae943d88881d8",
  measurementId: "G-TVGB7VF6RC",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);

export { auth, provider, db, storage };
