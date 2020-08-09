//@Author - RajKumar B00849566

import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDvfu7jfKwSqh5P-nm6Uu4ucKG9L1I7V0k",
    authDomain: "watchmaker-fb165.firebaseapp.com",
    databaseURL: "https://watchmaker-fb165.firebaseio.com",
    projectId: "watchmaker-fb165",
    storageBucket: "watchmaker-fb165.appspot.com",
    messagingSenderId: "526525473724",
    appId: "1:526525473724:web:c35ea633c6f3539b55c1b9",
    measurementId: "G-0YW371WZQ3"
};
  
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };