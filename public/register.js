    
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
    const registrationForm = document.getElementById('registrationForm');
    registrationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = registrationForm['name'].value;
      const email = registrationForm['email'].value;
      const grade = registrationForm['grade'].value;
      const password = registrationForm['password'].value;

      // Create user with email and password
      auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // Update user's display name
          user.updateProfile({
            displayName: name
          }).then(() => {
            // Update successful
            console.log('User display name updated successfully');
            // Redirect user to another page or show a success message
            window.location.href = 'login.html';

          }).catch((error) => {
            // An error occurred
            console.error('Error updating user display name:', error.message);
          });
        })
        .catch((error) => {
          // Handle errors here
          console.error('Registration error:', error.message);
        });
    });