// task 01 :
// - category niye asa
// - category button ui te show kora (
//     -category er loop calabo
//     -loop kore button toiri kore display te show korai dibo
//   )

async function getCategory() {
  // get category
  const dataRes = await fetch(
    "https://openapi.programming-hero.com/api/phero-tube/categories"
  );
  // console.log(dataRes);
  const data = await dataRes.json();
  //   console.log(data.categories);
  showCategoryInHTML(data.categories);
}
function showCategoryInHTML(categories) {
  const categoryContainer = document.querySelector(".catergory-container");
  // loop operation on array
  categories.forEach((category) => {
    // create category element
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
    <button id="btn-${category.category_id}" onclick="loadCategoryVideos(${category.category_id})" class="btn btn-sm bg-gray-200 text-gray-600">${category.category}</button> 
    `;
    // append category in category container
    categoryContainer.appendChild(categoryDiv);
  });
}

// task 02 :
// - video niye asa
// - vido card ui te show kora (
//     -video er array te loop calabo
//     -loop kore card toiri kore display te show korai dibo
//   )

function getVideos() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((dataRes) => dataRes.json())
    .then((data) => {
      const selectedBtn = document.getElementById("selected-btn");
      if (!selectedBtn.classList.contains("active")) {
        removeActiveClass();
        selectedBtn.classList.add("active");
      }
      console.log(data.videos[1]);
      showVideoInHTML(data.videos);
    });
}

function showVideoInHTML(videos) {
  // console.log(videos[2]);
  const videoContainer = document.getElementById("video-container");
  videoContainer.innerHTML = "";
  //   loop on videos array
  if (videos.length) {
    videos.forEach((video) => {
      const videoDiv = document.createElement("div");
      videoDiv.innerHTML = createVideoCard(video);
      videoContainer.appendChild(videoDiv);
    });
  } else {
    showErroMessage();
  }
}
function createVideoCard(video) {
  return `
  <div class="card bg-base-100 max-w-96 shadow-sm">
    <figure class="relative">
      <img
        class="object-cover w-full h-[200px] rounded-lg"
        src="${video.thumbnail}"
        alt="Shoes"
      />
      <span
        class="absolute bg-black px-2 py-1 text-white bottom-2 right-2 rounded-md text-sm"
        >3 hrs 30 min ago</span
      >
    </figure>
    <div class="px-0 py-5 flex items-start gap-2">
      <div class="profile avatar">
        <div class="w-12 rounded-full">
          <img
            src="${video.authors[0].profile_picture}"
          />
        </div>
      </div>
      <div class="space-y-1">
        <h2 class="card-title">
        ${video.description.split(" ").slice(0, 9).join(" ")}
        </h2>
        <div class="flex">
          <p class="text-sm text-gray-500">${video.authors[0].profile_name}</p>
          ${
            video.authors[0].verified
              ? `<img class="w-[20px] ml-2" src="assets/varify.png" alt="" />`
              : ""
          } 
          
        </div>
        <p class="text text-gray-500">${video.others.views} views</p>
      </div>
    </div>
    <button onclick="videoDetails('${
      video.video_id
    }')" class="btn btn-block">Details</button>
  </div>
  `;
}

// task 03:
//    - category onusare video load kora
//    - category button e ekta event handler bosanu and oi handler ekta id pass kora
//    - oi id diye url toiri kora then oi url diye data fetch kore vidoe load kora

function loadCategoryVideos(id) {
  // jdi category te click kore taile id pass hobe. r jdi id thake tahole oi category id diye url toiri kore video load kora hobe. r jdi category te click na kore . ba all e click korle othoba normally id pass hobe na tai all video load hobe
  /*if (id) {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
      .then((res) => res.json())
      .then((data) => showVideoInHTML(data.category));
  } else {
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
      .then((dataRes) => dataRes.json())
      .then((data) => showVideoInHTML(data.videos));
  }*/

  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      removeActiveClass();
      const currentCatButton = document.getElementById(`btn-${id}`);
      currentCatButton.classList.add("active");
      showVideoInHTML(data.category);
    });
}
function removeActiveClass() {
  const activeButtons = document.getElementsByClassName("active");
  for (const cat of activeButtons) {
    cat.classList.remove("active");
  }
}
function showErroMessage() {
  const videoContainer = document.getElementById("video-container");
  const errorDiv = document.createElement("div");
  errorDiv.classList.add("sm:col-span-full");
  errorDiv.innerHTML = `
  <div class="hero bg-base-200 py-28 ">
    <div class="hero-content text-center">
      <div class="max-w-md  flex flex-col items-center">
        <img src="assets/Icon.png" alt="" />
        <h2 class="py-6 text-3xl font-bold">
          Oops!! Sorry, There is no content here
        </h2>
      </div>
    </div>
  </div>
  `;
  videoContainer.appendChild(errorDiv);
}
function videoDetails(videoId) {
  console.log(videoId);
  fetch("https://openapi.programming-hero.com/api/phero-tube/video/aaac")
    .then((res) => res.json())
    .then((details) => showVideoDetails(details.video));
}
function showVideoDetails(details) {
  console.log(details);
}
getCategory();

// getVideos();
