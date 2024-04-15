const elts = {
  text1: document.getElementById("text1"),
  text2: document.getElementById("text2"),
};

const texts = ["Learn", "All", "About", "Unicorns"];

const morphTime = 1;
const cooldownTime = 0.25;

let textIndex = texts.length - 1;
let time = new Date();
let morph = 0;
let cooldown = cooldownTime;

elts.text1.textContent = texts[textIndex % texts.length];
elts.text2.textContent = texts[(textIndex + 1) % texts.length];

function doMorph() {
  morph -= cooldown;
  cooldown = 0;

  let fraction = morph / morphTime;

  if (fraction > 1) {
    cooldown = cooldownTime;
    fraction = 1;
  }

  setMorph(fraction);
}

function setMorph(fraction) {
  elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
  elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

  fraction = 1 - fraction;
  elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
  elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

  elts.text1.textContent = texts[textIndex % texts.length];
  elts.text2.textContent = texts[(textIndex + 1) % texts.length];
}

function doCooldown() {
  morph = 0;

  elts.text2.style.filter = "";
  elts.text2.style.opacity = "100%";

  elts.text1.style.filter = "";
  elts.text1.style.opacity = "0%";
}

function animate() {
  requestAnimationFrame(animate);

  let newTime = new Date();
  let shouldIncrementIndex = cooldown > 0;
  let dt = (newTime - time) / 1000;
  time = newTime;

  cooldown -= dt;

  if (cooldown <= 0) {
    if (shouldIncrementIndex) {
      textIndex++;
    }

    doMorph();
  } else {
    doCooldown();
  }
}

animate();

const videoFilenames = ["unicorn1.mp4", "unicorn2.mp4"];

let index = 0;

const video = document.querySelector("#unicorns");
const playBtn = document.querySelector("#play-btn");
const pauseBtn = document.querySelector("#pause-btn");
const nextBtn = document.querySelector("#next-btn");
const progressBar = document.querySelector("#progress-bar");
const volumeSlider = document.querySelector("#volume-slider");
const volumeIcon = document.querySelector("#volume-icon");

playBtn.addEventListener("click", () => {
  video.play();
});

pauseBtn.addEventListener("click", () => {
  video.pause();
});

nextBtn.addEventListener("click", () => {
  index = (index + 1) % videoFilenames.length;
  const newSrc = "./video/" + videoFilenames[index];
  video.setAttribute("src", newSrc);
  video.play();

  const lessons = document.querySelectorAll(".lessons li");
  lessons.forEach((lesson, i) => {
    if (i === index) {
      lesson.style.opacity = "1";
    } else {
      lesson.style.opacity = "0.4";
    }
  });
});

document.body.style.transition = "background 2s ease";

video.addEventListener("play", (e) => {
  document.body.style.background = "black";
});
video.addEventListener("pause", (e) => {
  document.body.style.background = "white";
});

video.addEventListener("timeupdate", () => {
  const currentTime = video.currentTime;
  const duration = video.duration;
  const progress = (currentTime / duration) * 100;
  progressBar.value = progress;
});

// video.addEventListener("timeupdate", (e) => {
//   const currentTime = video.currentTime;
//   localStorage.setItem("videoCurrentTime", currentTime);
// });

// window.addEventListener("DOMContentLoaded", () => {
//     const storedTime = localStorage.getItem("videoCurrentTime");
//     if (storedTime) {
//       video.currentTime = parseFloat(storedTime);
//     }
// });
