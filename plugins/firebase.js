import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDAl93n3jcjJ07mvDg0CdWiICd3xzfUoKA",
    authDomain: "crearen-a8759.firebaseapp.com",
    projectId: "crearen-a8759",
    storageBucket: "crearen-a8759.appspot.com",
    messagingSenderId: "994948055039",
    appId: "1:994948055039:web:f92107e808dcffcc7631ca",
    measurementId: "G-KP6NP8B39X"
};

const app = initializeApp(firebaseConfig);

export default ({}, inject) => {
    inject('app', app);
}