import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
//My onfig
const firebaseConfig = {
  apiKey: 'AIzaSyBmDPhE_ILiG0HjlvAXynQWQbMXnZL_Id8',
  authDomain: 'croudfund-app.firebaseapp.com',
  projectId: 'croudfund-app',
  storageBucket: 'croudfund-app.appspot.com',
  messagingSenderId: '473185107333',
  appId: '1:473185107333:web:f3a56eaaf52cbaa8e218ec',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
