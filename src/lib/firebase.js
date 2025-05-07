import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyA_N9w9fCcY_HYKzlyctIrcWv59uyqpWAw",
    authDomain: "project1-f8017.firebaseapp.com",
    projectId: "project1-f8017",
    storageBucket: "project1-f8017.firebasestorage.app",
    messagingSenderId: "521247763737",
    appId: "1:521247763737:web:92d8081608f3535c4fe988",
    measurementId: "G-9Y2HYFZ84X"
  };

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
