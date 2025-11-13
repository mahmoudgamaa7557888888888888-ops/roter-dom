import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAEWax_GNwm-MPhj_xNM7JLNuSarFtrLDs",
    authDomain: "database-anabeb.firebaseapp.com",
    projectId: "database-anabeb",
    storageBucket: "database-anabeb.firebasestorage.app",
    messagingSenderId: "755050731031",
    appId: "1:755050731031:web:28a74419ea4edb3263ee52",
    measurementId: "G-7G7YCS2CQT",
    
  
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();