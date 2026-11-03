import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    // PASTE THE CONFIG FROM FIREBASE HERE
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    
    authDomain: "school-management-c8b4e.firebaseapp.com",
    apiKey: "AIzaSyB2D_DlKs8SdluSqD2eby1T7CN3BmsRwZQ",
    storageBucket: "school-management-c8b4e.firebasestorage.app",
    projectId: "school-management-c8b4e",
    appId: "1:936307718233:web:2c3c362d259c5ed76e9948",
    messagingSenderId: "936307718233",
    measurementId: "G-WPK5FEPS66"
    
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);