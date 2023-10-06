// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth} from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9AeD1re_1923Bk75luUIDgv4JvYkrYpw",
  authDomain: "chat-app-12aa6.firebaseapp.com",
  projectId: "chat-app-12aa6",
  storageBucket: "chat-app-12aa6.appspot.com",
  messagingSenderId: "1065611970122",
  appId: "1:1065611970122:web:4822485801b5ffa18108b3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);