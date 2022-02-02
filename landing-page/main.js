const sections = document.querySelectorAll("section");
const trans = document.querySelector(".trans");

const options = {
  threshold: 0.85,
};

let observer = new IntersectionObserver(navScroll, options);

function navScroll(entries) {
  entries.forEach(function (entry) {
    console.log(entry);
    const className = entry.target.className;
    const activeLink = document.querySelector(`[data-page="${className}"]`);
    const coordinates = activeLink.getBoundingClientRect();
    const directions = {
      height: coordinates.height,
      width: coordinates.width,
      top: coordinates.top,
      left: coordinates.left,
    };

    if (entry.isIntersecting) {
      trans.style.setProperty("height", `${directions.height}px`);
      trans.style.setProperty("width", `${directions.width}px`);
      trans.style.setProperty("top", `${directions.top}px`);
      trans.style.setProperty("left", `${directions.left}px`);
    }
  });
}

sections.forEach(function (section) {
  observer.observe(section);
});

//modal//
const openBtn = document.querySelector(".open");
const modalContainer = document.querySelector(".modal-container");
const closeBtn = document.querySelector(".modal-btn");

openBtn.addEventListener("click", function () {
  modalContainer.classList.add("show");
});

closeBtn.addEventListener("click", function () {
  modalContainer.classList.remove("show");
});

//validation//
function surveyValidation() {
  var name = document.forms["surveyForm"]["Name"];
  var email = document.forms["surveyForm"]["Email"];
  var age = document.forms["surveyForm"]["Mobile"];
  var selectSong = document.forms["surveyForm"]["Payment"];

  if (name.value == "") {
    alert("Please enter your name.");
    return false;
  }

  if (email.value == "") {
    alert("Please enter a valid e-mail address.");
    return false;
  }

  if (age.value == "") {
    alert("Please enter your no.");
    return false;
  }

  if (selectSong.selectedIndex < 1) {
    alert("Please select payment method.");
    return false;
  }

  return true;
}

//carouselNav//
const list = document.querySelector(".gallery-carousel_img-list");
const imgs = Array.from(list.children);
const nextButton = document.querySelector(".gallery-carousel_btn--right");
const prevButton = document.querySelector(".gallery-carousel_btn--left");
const carouselNav = document.querySelector(".gallery-carousel_nav");
const dots = Array.from(carouselNav.children);

//carouselNav-IMG//
const imgWidth = imgs[0].getBoundingClientRect().width;

const setImgPosition = (img, index) => {
  img.style.left = imgWidth * index + "px";
};
imgs.forEach(setImgPosition);

const moveToImg = (list, currentImg, targetImg) => {
  list.style.transform = "translateX(-" + targetImg.style.left + ")";

  currentImg.classList.remove("current--img");
  targetImg.classList.add("current--img");
};

const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove("current--img");
  targetDot.classList.add("current--img");
};

const hideShowArrows = (imgs, prevButton, nextButton, targetIndex) => {
  if (targetIndex === 0) {
    prevButton.classList.add("hidden");
    nextButton.classList.remove("hidden");
  } else if (targetIndex === imgs.length - 1) {
    prevButton.classList.remove("hidden");
    nextButton.classList.add("hidden");
  } else {
    prevButton.classList.remove("hidden");
    nextButton.classList.remove("hidden");
  }
};

//carouselNav-Arrows//
nextButton.addEventListener("click", () => {
  const currentImg = list.querySelector(".current--img");
  const nextImg = currentImg.nextElementSibling;
  const currentDot = carouselNav.querySelector(".current--img");
  const nextDot = currentDot.nextElementSibling;
  const nextIndex = imgs.findIndex((img) => img === nextImg);

  moveToImg(list, currentImg, nextImg);
  updateDots(currentDot, nextDot);
  hideShowArrows(imgs, prevButton, nextButton, nextIndex);
});

prevButton.addEventListener("click", (e) => {
  const currentImg = list.querySelector(".current--img");
  const prevImg = currentImg.previousElementSibling;
  const currentDot = carouselNav.querySelector(".current--img");
  const prevDot = currentDot.previousElementSibling;
  const prevIndex = imgs.findIndex((img) => img === prevImg);

  moveToImg(list, currentImg, prevImg);
  updateDots(currentDot, prevDot);
  hideShowArrows(imgs, prevButton, nextButton, prevIndex);
});

//carouselNav-buttons//
carouselNav.addEventListener("click", (e) => {
  const targetDot = e.target.closest("button");
  if (!targetDot) return;

  const currentImg = list.querySelector(".current--img");
  const currentDot = carouselNav.querySelector(".current--img");
  const targetIndex = dots.findIndex((dot) => dot === targetDot);
  const targetImg = imgs[targetIndex];

  moveToImg(list, currentImg, targetImg);
  updateDots(currentDot, targetDot);
  hideShowArrows(imgs, prevButton, nextButton, targetIndex);
});
