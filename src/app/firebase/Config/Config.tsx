// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs } from "firebase/firestore"; 
import { getStorage } from "firebase/storage";

export const config = {
  apiKey: "AIzaSyC2ABR8DojMdtgQaSI4VckrNyqnNgzWZlU",
  authDomain: "p-kidtales-ai.firebaseapp.com",
  projectId: "p-kidtales-ai",
  storageBucket: "p-kidtales-ai.appspot.com",
  messagingSenderId: "698783263359",
  appId: "1:698783263359:web:88e7e22bee931830e96d4a",
  measurementId: "G-89BPJENC4Q"
};

export const app = initializeApp(config);
export const db = getFirestore(app);
const analytics = app.name && typeof window !== 'undefined' ? getAnalytics(app) : null;;
export const storage = getStorage(app);
export {collection, addDoc, getDocs}
