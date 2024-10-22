// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_KEY,
  authDomain: "my-test-project-416814.firebaseapp.com",
  projectId: "my-test-project-416814",
  storageBucket: "my-test-project-416814.appspot.com",
  messagingSenderId: "85667518220",
  appId: import.meta.VITE_APP_APP_ID,
  measurementId: "G-R8YXJ646W3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
