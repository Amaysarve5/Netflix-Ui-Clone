
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAjccUsUXOet4Uxji_P3SDXwRNGR4rJtF4",
  authDomain: "netfix-clone-9bcd0.firebaseapp.com",
  projectId: "netfix-clone-9bcd0",
  storageBucket: "netfix-clone-9bcd0.firebasestorage.app",
  messagingSenderId: "875074664471",
  appId: "1:875074664471:web:334003fe1c4aef1b62c452",
  measurementId: "G-17T55Y4RT0"
};


const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);