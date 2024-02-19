const forumCardsContainer = document.getElementById('forumCardsContainer');

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";

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
const auth = getAuth();
const database = getDatabase(app);

// Function to fetch forum details
function fetchForumDetails(forumId) {
  const forumRef = ref(database, 'forums/' + forumId);
  get(forumRef).then((snapshot) => {
    if (snapshot.exists()) {
      const forumData = snapshot.val();
        const createdAt = new Date(forumData.createdAt);
        const formattedDate = `${createdAt.getFullYear()}-${(createdAt.getMonth() + 1).toString().padStart(2, '0')}-${createdAt.getDate().toString().padStart(2, '0')}`;
      // Populate the forum details on the page
      document.getElementById('forumDetails').innerHTML = `
        <h3 class="card-title" style="font-size:25px;"><strong>${forumData.title}</strong> </h3>
         <p style="color:#8B8B8B;"> by ${forumData.username} at ${formattedDate} </p>
        <p><span  style="font-size:18px;"> ${forumData.mainContent} <span> </p>
       
        <!-- Add more details as needed -->
      `;
    } else {
      console.log("No such document!");
    }
  }).catch((error) => {
    console.log("Error getting document:", error);
  });
}

// Function to retrieve forum ID from URL query parameter
function getForumIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('forumId');
}

// Fetch forum details when the page loads
document.addEventListener('DOMContentLoaded', () => {
  const forumId = getForumIdFromUrl();
  if (forumId) {
    fetchForumDetails(forumId);
  } else {
    console.log('Forum ID not found in URL.');
  }
});
