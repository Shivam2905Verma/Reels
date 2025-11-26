let container = document.querySelector(".container");

const posts = [
  {
    username: "tech_shivam",
    image: "./userImage/img1.avif",
    video: "./videos/video1.mp4",
    isFollowed: false,
    isLiked: true,
    likes: 12800,
    comments: 420,
    shares: 120,
    description: "Building my MERN stack project — day 21 💻🔥",
  },
  {
    username: "fitness_rahul",
    image: "./userImage/img2.avif",
    video: "./videos/video2.mp4",
    isFollowed: true,
    isLiked: false,
    likes: 5400,
    comments: 310,
    shares: 82,
    description: "Morning workout routine! 🏋️‍♂️✨",
  },
  {
    username: "foodie_kriti",
    image: "./userImage/img3.avif",
    video: "./videos/video3.mp4",
    isFollowed: false,
    isLiked: true,
    likes: 21500,
    comments: 903,
    shares: 260,
    description: "Trying the new chocolate lava cake recipe 😍🍫",
  },
  {
    username: "travel_aman",
    image: "./userImage/img4.avif",
    video: "./videos/video4.mp4",
    isFollowed: true,
    isLiked: false,
    likes: 7800,
    comments: 401,
    shares: 190,
    description: "Sunset at Goa beach 🏖️🌅",
  },
  {
    username: "coding_with_riya",
    image: "./userImage/img5.avif",
    video: "./videos/video5.mp4",
    isFollowed: true,
    isLiked: true,
    likes: 9500,
    comments: 522,
    shares: 210,
    description: "Explaining JavaScript Closures in 30 seconds ⚡💡",
  },
];

let isMuted = false;

function allData() {
  let allPosts = "";

  posts.forEach(function (el, idx) {
    allPosts += `<div class="videoDiv">
          <div class="sound">
          ${
            isMuted
              ? '<i class="ri-volume-mute-fill"></i>'
              : '<i class="ri-volume-up-fill"></i>'
          }
          </div>
          <video id='${idx}' autoplay loop muted src="${el.video}"></video>
          <div class="description">
            <div class="usernameAndFollow">
              <img src="${el.image}" alt="" />
              <p>@${el.username}</p>
              <button ${
                el.isFollowed
                  ? 'style="background-color: transparent; border: 2px solid white; color:white;"'
                  : ""
              }>${el.isFollowed ? "Followed" : "Follow"}</button>
            </div>
            <div class="titleOfVideo">
              ${el.description}
            </div>
          </div>
          <div class="allBtns">
            <div>
            ${
              el.isLiked
                ? `<i id="${el.username}" class="heart liked ri-heart-fill"></i>`
                : `<i id="${el.username}" class="heart ri-heart-line"></i>`
            }
              <p>${el.likes}</p>
            </div>
            <div>
              <i class="ri-chat-3-line"></i>
              <p>${el.comments}</p>
            </div>
            <div>
              <i class="ri-share-forward-line"></i>
              <p>${el.shares}</p>
            </div>
            <div>
              <i class="ri-more-2-line"></i>
            </div>
          </div>
        </div>`;
  });

  container.innerHTML = allPosts;
}

allData();

let heart = document.querySelectorAll(".heart");

heart.forEach(function (el) {
  el.addEventListener("click", function () {
    let id = this.id;

    posts.forEach((post) => {
      if (post.username === id) {
        post.isLiked = !post.isLiked;

        if (post.isLiked) {
          this.classList.remove("ri-heart-line");
          this.classList.add("ri-heart-fill");
          this.classList.add("liked");
          post.likes += 1;
        } else {
          this.classList.remove("ri-heart-fill");
          this.classList.remove("liked");
          this.classList.add("ri-heart-line");
          post.likes -= 1;
        }

        console.log(this.nextElementSibling.textContent);
        this.nextElementSibling.textContent = post.likes;
      }
    });
  });
});

function sound() {
  const videoDivs = document.querySelectorAll(".videoDiv");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(async (entry) => {
        const video = entry.target.querySelector("video");
        if (entry.isIntersecting) {
          await video.play();
          video.muted = isMuted;
        } else {
          video.pause();
          video.muted = true;
        }
      });
    },
    {
      threshold: 0.7,
    }
  );

  videoDivs.forEach((div) => observer.observe(div));
}

sound();

let soundBtns = document.querySelectorAll(".sound");
console.log(soundBtns);
soundBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    console.log("clicked");
    isMuted = !isMuted;
    sound();
    this.innerHTML = isMuted ? '<i class="ri-volume-mute-fill"></i>' : '<i class="ri-volume-up-fill"></i>';
  });
});
