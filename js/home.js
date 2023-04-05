// Intersection Observer for all main boxes.
const options = {
  rootMargin: "0px",
  threshold: 0.1
};

const boxVisible = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("box-visible");
  });
};

const boxObserver = new IntersectionObserver(boxVisible, options);

boxObserver.observe(document.getElementById("box-1"));
boxObserver.observe(document.getElementById("box-2"));
boxObserver.observe(document.getElementById("box-3"));
boxObserver.observe(document.getElementById("box-4"));
boxObserver.observe(document.getElementById("box-5"));

// Intersection Observer for left main container.
const homeLeft = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting)
      entry.target.classList.add("home-choose-left-visible");
  });
};

const homeLeftObserver = new IntersectionObserver(homeLeft, options);

homeLeftObserver.observe(document.getElementById("img"));
homeLeftObserver.observe(document.querySelector(".home-choose-left h1"));
homeLeftObserver.observe(document.querySelector(".home-choose-left p"));
homeLeftObserver.observe(document.querySelector(".home-choose-left button"));

// Intersection Observer for top-left three boxes.
const homeChooseOptions = {
  rootMargin: "0px",
  threshold: 0.1
};

const homeChooseBoxVisible = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting)
      entry.target.classList.add("home-choose-box-visible");
  });
};

const homeChooseBoxObserver = new IntersectionObserver(
  homeChooseBoxVisible,
  homeChooseOptions
);

homeChooseBoxObserver.observe(document.querySelector(".home-choose .rect-1"));
homeChooseBoxObserver.observe(document.querySelector(".home-choose .rect-2"));
homeChooseBoxObserver.observe(document.querySelector(".home-choose .rect-3"));
