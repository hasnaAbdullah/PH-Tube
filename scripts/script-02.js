// task -01 :
//   - fetch all the category data
//   - create button element using those data

const loadAllCategory = async () => {
  const catRes = await fetch(
    "https://openapi.programming-hero.com/api/phero-tube/categories"
  );
  const data = await catRes.json();

  categoryButton(data.categories);
};
// step 01
function categoryButton(catsData) {
  const catContainer = document.getElementById("category-container");
  catsData.forEach((cat) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <button
        id="${cat.category_id}"
        onclick="loadCatData('${cat.category_id}')"
        class="btn btn-sm bg-gray-700  text-white cat-button"
      >
        ${cat.category}
      </button>
    `;
    catContainer.appendChild(div);
  });
}
// step 02
const loadCatData = async (catId) => {
  showLoader();
  const dataRes = await fetch(
    `https://openapi.programming-hero.com/api/phero-tube/category/${catId}`
  );
  const catsData = await dataRes.json();
  removeActiveClass();
  const currentButton = document.getElementById(catId);
  currentButton.classList.add("active");
  showVideoCart(catsData.category);
};

// step 03
// utility function
function showVideoCart(cats) {
  const videoContainer = document.getElementById("video-container");
  videoContainer.innerHTML = "";
  if (cats.length) {
    cats.forEach((video) => {
      const div = document.createElement("div");
      div.innerHTML = createVideoCart(video);
      videoContainer.appendChild(div);
      hideLoader();
    });
  } else {
    const div = document.createElement("div");
    div.classList.add("lg:col-span-full");
    div.innerHTML = errorMessage();
    videoContainer.appendChild(div);
    hideLoader();
  }
}
// step 04
// utility function
function createVideoCart(video) {
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
// step 05
// utility function
function errorMessage() {
  return `
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
}
// utility function
function removeActiveClass() {
  const catButton = document.getElementsByClassName("cat-button");
  for (const button of catButton) {
    button.classList.remove("active");
    button.classList.add("bg-gray-700");
    button.classList.add("text-white");
  }
}
loadAllCategory();
// task -02 :
//   - fetch all data
//   - loop calaite hobe
//   - proti ta video element er jonno card toir kort hobe
//   - card gulo ekta ekta kore container e show korate hobe
//   - all button e click korbe tkhn all active hobe and all video show korate hobe
// step 01
const getVideos = async () => {
  showLoader();
  const dataRes = await fetch(
    "https://openapi.programming-hero.com/api/phero-tube/videos"
  );
  const data = await dataRes.json();
  removeActiveClass();
  const currentButton = document.getElementById("selected-btn");
  currentButton.classList.add("active");
  //   console.log(data.videos);
  showVideoCart(data.videos);
};

// step 02
async function videoDetails(id) {
  const dataRes = await fetch(
    `https://openapi.programming-hero.com/api/phero-tube/video/${id}`
  );
  const data = await dataRes.json();
  const detailsButton = document.getElementById("video_details");
  detailsButton.showModal();
  const modalContainer = document.getElementById("modal-container");
  modalContainer.innerHTML = detailsCard(data.video);
}
function detailsCard(video) {
  return `
  <div class="card bg-base-100  shadow-sm">
    <figure class="relative">
      <img
        class="object-cover w-full h-[200px] rounded-lg"
        src="${video.thumbnail}"
        alt="Shoes"
      />
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
        <p class="text-gray-600"> ${video.description} </p>
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
  </div>
  `;
}
getVideos();

// task 03 :
function searchVideo() {
  const input = document.getElementById("search-btn");
  input.addEventListener("keyup", async (e) => {
    showLoader();
    const inputValue = e.target.value;
    const dataRes = await fetch(
      `https://openapi.programming-hero.com/api/phero-tube/videos?title=${inputValue}`
    );
    const data = await dataRes.json();
    removeActiveClass();
    showVideoCart(data.videos);
    if (inputValue === "") {
      document.getElementById("selected-btn").classList.add("active");
    }
  });
}
searchVideo();

// task 04 :
function sortByView() {
  const sortButton = document.getElementById("sorted-btn");
  sortButton.addEventListener("click", async () => {
    // console.log(videoList[0].others.views.replace("K", ""));
    // console.log(selectedButton);
    const selectedButton = document.querySelector(".active");
    if (selectedButton.id !== "selected-btn") {
      showLoader();
      const selectedId = selectedButton.id;
      const dataRes = await fetch(
        `https://openapi.programming-hero.com/api/phero-tube/category/${selectedId}`
      );
      const data = await dataRes.json();
      const videoList = data.category;
      sorting(videoList);
    } else {
      showLoader;
      const dataRes = await fetch(
        "https://openapi.programming-hero.com/api/phero-tube/videos"
      );
      const data = await dataRes.json();
      const videoList = data.videos;
      console.log(videoList);
      sorting(videoList);
    }
  });
}
function sorting(videoList) {
  console.log(videoList);
  const sortedVideoList = videoList.sort((v1, v2) => {
    return (
      parseFloat(v2.others.views.replace("K", "")) -
      parseFloat(v1.others.views.replace("K", ""))
    );
  });
  showVideoCart(sortedVideoList);
}
sortByView();

// task 05
function showLoader() {
  document.getElementById("loader").classList.remove("hidden");
  document.getElementById("video-container").classList.add("hidden");
}
function hideLoader() {
  document.getElementById("loader").classList.add("hidden");
  document.getElementById("video-container").classList.remove("hidden");
}
