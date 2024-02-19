const forumCardsContainer = document.getElementById('forumCardsContainer');

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getDatabase, ref, set, push } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";
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

const app = initializeApp(firebaseConfig);

// Get a reference to the Firebase Realtime Database
const database = getDatabase(app);
const auth = getAuth();
document.getElementById("forumPostForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent default form submission

  // Get form values
  var title = document.getElementById("title").value;
  var topics = document.getElementById("topics").value;
  var mainContent = document.getElementById("mainContent").value;

  // Get current date
  var currentDate = new Date().toISOString();
  const user = auth.currentUser;
  var userEmail = null;
  var username = null;
  if (user) {
    userEmail = user.email;
    username = userEmail.substring(0, userEmail.indexOf('@'));
  } else {
    window.location.href = 'login.html';
  }

  // Create data object with current date
  var postData = {
    title: title,
    topics: topics,
    mainContent: mainContent,
    createdAt: currentDate, // Add current date to postData
    username: username,
    userEmail: user.email,
    numLikes: 0
  };

  // Push data to Firebase Realtime Database
  push(ref(database, "forums"), postData)
    .then(function() {
      // Reset form after successful submission
      document.getElementById("forumPostForm").reset();
      alert("Post submitted successfully!");
      window.location.href = 'index.html';
    })
    .catch(function(error) {
      console.error("Error adding post: ", error);
    });
});