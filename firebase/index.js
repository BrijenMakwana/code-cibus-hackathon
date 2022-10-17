// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  docs,
  doc,
  deleteDoc,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDTem_68Ek-GrVRCko-8RX5FN6Vwh2eAkg",
  authDomain: "cibus-c2b89.firebaseapp.com",
  projectId: "cibus-c2b89",
  storageBucket: "cibus-c2b89.appspot.com",
  messagingSenderId: "981350157983",
  appId: "1:981350157983:web:e0bc8475994552f40f9caa",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { db, collection, addDoc, getDocs, docs, doc, deleteDoc };
