// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTYNbeDzGtzQndutPwHRbde6xb55Rnex0",
  authDomain: "react-fb-auth-5988d.firebaseapp.com",
  projectId: "react-fb-auth-5988d",
  storageBucket: "react-fb-auth-5988d.appspot.com",
  messagingSenderId: "385855860469",
  appId: "1:385855860469:web:7884b77654d2bab0751fbc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)