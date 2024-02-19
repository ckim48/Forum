     
const forumCardsContainer = document.getElementById('forumCardsContainer');

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getDatabase, ref,get} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";
import {
  getStorage,
  uploadBytesResumable,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-storage.js";
import {
  getFirestore,
  doc,
  getDocs,
  setDoc,
  collection,
  query,
  orderBy,
  limit,
  updateDoc,
  addDoc,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
const firebaseConfig = {
  apiKey: "AIzaSyCAwOs7hj52m1v3R3ZPXAUOcomgfY3IsmU",
  authDomain: "forum-eea36.firebaseapp.com",
  databaseURL: "https://forum-eea36-default-rtdb.firebaseio.com",
  projectId: "forum-eea36",
  storageBucket: "forum-eea36.appspot.com",
  messagingSenderId: "25387248715",
  appId: "1:25387248715:web:7e27edcd627b446e5471ce",
  measurementId: "G-1ZEX07TRN2"
};
    const app = firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();


  const loginForm = document.getElementById('loginForm');

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = loginForm.email.value;
    const password = loginForm.password.value;

    try {
      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
      // Login successful
      console.log('Login successful!', userCredential.user);
      // You can redirect the user to another page or perform other actions upon successful login
      window.location.href = 'index.html';
    } catch (error) {
      // Handle login errors
      console.error('Login error:', error.message);
      // Display error message to the user
      loginForm.querySelector('.invalid-feedback2').innerHTML = "Invalid password or username!";

    }
  });