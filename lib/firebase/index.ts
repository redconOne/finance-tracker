// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const AUTH_DOMAIN = process.env.NEXT_PUBLIC_AUTH_DOMAIN;
const PROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID;
const STORAGE_BUCKET = process.env.NEXT_PUBLIC_STORAGE_BUCKET;
const MESSAGING_SENDER_ID = process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID;
const APP_ID = process.env.NEXT_PUBLIC_APP_ID;
const MEASUREMENT_ID = process.env.NEXT_PUBLIC_MEASUREMENT_ID;

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const analytics = getAnalytics(app);

export { app, db };
