import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDIlJNsjA_ImM55PtQIKkgq2g1ZmIPm9NE",
  authDomain: "catalog-69b75.firebaseapp.com",
  projectId: "catalog-69b75",
  storageBucket: "catalog-69b75.appspot.com",
  messagingSenderId: "862453580486",
  appId: "1:862453580486:web:1e9d612d5805e8ced08dc7",
  measurementId: "G-FCN0PMRL90",
};

export const app = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth;
export const provider = new firebase.auth.GoogleAuthProvider();
firebase.auth().setPersistence("session");
