// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDkYASHbtoinmmsfNFVmShDbzPq_RIV1iU",
  authDomain: "expo-firebasetest.firebaseapp.com",
  projectId: "expo-firebasetest",
  storageBucket: "expo-firebasetest.appspot.com",
  messagingSenderId: "307054777993",
  appId: "1:307054777993:web:4f061d1b0e2e09b1211858",
  measurementId: "G-1SYNNES5DP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);