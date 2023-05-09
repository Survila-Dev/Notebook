import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAnpGflKVpkXLtx19TgyoeJsJOc-ehv-C8",
  authDomain: "fs-notebook.firebaseapp.com",
  projectId: "fs-notebook",
  storageBucket: "fs-notebook.appspot.com",
  messagingSenderId: "177362984310",
  appId: "1:177362984310:web:97f08a3ae16ecc8a452e57"
};

export const firebaseApp = initializeApp(firebaseConfig);