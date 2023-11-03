import { initializeApp } from "firebase/app";

import {getStorage} from 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBU1kKpSljeQUpEkIG453-b7zA9_5lUqR4",
  authDomain: "verbvoyage-d1a5a.firebaseapp.com",
  projectId: "verbvoyage-d1a5a",
  storageBucket: "verbvoyage-d1a5a.appspot.com",
  messagingSenderId: "965406152240",
  appId: "1:965406152240:web:cd75713322343eeec33ff5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)