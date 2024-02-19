const forumCardsContainer = document.getElementById('forumCardsContainer');

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getDatabase, ref, set,get } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";
import {
  getAuth,
  onAuthStateChanged,
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
const auth = getAuth();
const database = getDatabase(app);
const userActions = {};

function updateLikeCount(forumId, newLikeCount) {
  const forumRef = ref(database, `forums/${forumId}/numLikes`);
  set(forumRef, newLikeCount)
    .then(() => {
      console.log("Like count updated successfully");
    })
    .catch((error) => {
      console.error("Error updating like count:", error);
    });
}

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('like-up')) {
    const forumCard = event.target.closest('.info-card');
    const forumId = forumCard.dataset.forumId;
    
    if (userActions[forumId] === 'liked') {
      return;
    }
    
    const currentLikeCount = parseInt(forumCard.querySelector('.like-count').textContent);
    const newLikeCount = currentLikeCount + 1;
    forumCard.querySelector('.like-count').textContent = newLikeCount;
    updateLikeCount(forumId, newLikeCount);

    userActions[forumId] = 'liked';
  } else if (event.target.classList.contains('like-down')) {
    const forumCard = event.target.closest('.info-card');
    const forumId = forumCard.dataset.forumId;
    
    if (userActions[forumId] === 'unliked') {
      return;
    }
    
    const currentLikeCount = parseInt(forumCard.querySelector('.like-count').textContent);
    const newLikeCount = currentLikeCount - 1;
    forumCard.querySelector('.like-count').textContent = newLikeCount;
    updateLikeCount(forumId, newLikeCount);

    userActions[forumId] = 'unliked';
  }
  else if (event.target.classList.contains('btn-more')) {
    const forumCard = event.target.closest('.info-card');
    const forumId = forumCard.dataset.forumId;
    window.location.href = `moredetail.html?forumId=${forumId}`;
  }
});

function fetchForumData() {
  const forumsRef = ref(database, 'forums');
  get(forumsRef).then((snapshot) => {
    console.log("Snapshot:", snapshot);
    if (snapshot.exists()) {
      console.log("Data exists:", snapshot.val());
      snapshot.forEach((childSnapshot) => {
        const forumData = childSnapshot.val();
        console.log("Forum data:", forumData);
        const createdAt = new Date(forumData.createdAt);
        const formattedDate = `${createdAt.getFullYear()}-${(createdAt.getMonth() + 1).toString().padStart(2, '0')}-${createdAt.getDate().toString().padStart(2, '0')}`;
        const cardHtml = `
          <div class="col-xxl-12 col-xl-12">
            <div class="card info-card customers-card" data-forum-id="${childSnapshot.key}">
                <div class="card-body">
                      <div class="row">
                          <div class="col-1 d-block">
                              <div class="text-center" style="margin-top:13px;">
                                  <div class="like-buttons d-block">
                                      <a class="like-up" style="cursor:pointer;">▲</a>
                                  </div>
                                  <span class="like-count">${forumData.numLikes}</span>
                                  <div class="like-buttons d-block">
                                      <a class="like-down"  style="cursor:pointer;">▼</a>
                                  </div>
                              </div>
                          </div>                

                          <div class="col-10">
                              <h5 class="card-title">${forumData.title} - <span style="color: gray; font-size:14px;"> # ${forumData.topics} </span></h5>
                              <p>By ${forumData.username} | <span style="color: gray; font-size:14px;"> Created at ${formattedDate} </span> </p>
                              
                          </div>
                          <div class="col-1 d-flex align-items-center justify-content-center">
                                <button class="btn btn-primary btn-more mt-2 me-2">More</button>
                          </div>

                      </div>
                  </div>
              </div>
          </div>
          `
        forumCardsContainer.innerHTML += cardHtml;
      });
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error("Error fetching data:", error);
  });
}



auth.onAuthStateChanged((user) => {
  const loginLink = document.querySelector('.nav-link[href="login.html"]');
  if (user) {
    const email = user.email;
    const name = user.displayName;
    const profileLink = document.querySelector('.nav-profile .dropdown-toggle');
    const username = document.querySelector('.myname');
    if (profileLink) {
      profileLink.innerHTML = `${email}`;
      username.innerHTML =`${name}`;
    }
    if (loginLink) {
      loginLink.innerHTML = '<i class="bi bi-box-arrow-right"></i><span>Logout</span>';
      loginLink.href = "#";
      loginLink.addEventListener("click", () => {
        auth.signOut().then(() => {
          window.location.href = "login.html";
        }).catch((error) => {
          console.error("Error signing out:", error);
        });
      });
    }
  } else {
    const profileLink = document.querySelector('.logindrop');
    profileLink.innerHTML = `<a href="login.html" style="margin-right:20px;">LOGIN</a>`;
    if (loginLink) {
      loginLink.innerHTML = '<i class="bi bi-box-arrow-in-right"></i><span>Login</span>';
      loginLink.href = "login.html";
    }
  }
});

fetchForumData();