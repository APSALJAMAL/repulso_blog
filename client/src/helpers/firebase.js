import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { initializeApp } from "firebase/app";
import { getEvn } from "./getEnv";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: getEvn('VITE_FIREBASE_API'),
    // apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "project-56430.firebaseapp.com",
    projectId: "project-56430",
    storageBucket: "project-56430.appspot.com",
    messagingSenderId: "570423432896",
    appId: "1:570423432896:web:b9f0940ae382fc43273f25"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export { auth, provider }