// firebase-config.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-analytics.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVDCpor4h_iquQl6607Z6ZhY8pWAkmtQY",
  authDomain: "bharatbheesetti-28996.firebaseapp.com",
  projectId: "bharatbheesetti-28996",
  storageBucket: "bharatbheesetti-28996.appspot.com",
  messagingSenderId: "1026817649700",
  appId: "1:1026817649700:web:eecd1df9cf3d125f5abcb1",
  measurementId: "G-BN6TN7H458"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);