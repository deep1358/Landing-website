// Intersection Observer for all main boxes.
const options = {
  rootMargin: "0px",
  threshold: 0.1
};

const boxVisible = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("portfolio-visible");
  });
};

const boxObserver = new IntersectionObserver(boxVisible, options);

boxObserver.observe(document.querySelector(".portfolio-title h1"));
boxObserver.observe(document.querySelector(".portfolio-title p"));
boxObserver.observe(document.querySelector(".portfolio-menu ul"));

// Intersection Observer for all main boxes.

const imageVisible = (entries) => {
  console.log(entries);
  entries.forEach((entry) => {
    if (entry.isIntersecting)
      entry.target.classList.add("portfolio-grid-item-visible");
  });
};

const imageObserver = new IntersectionObserver(imageVisible, options);

document.querySelectorAll(".portfolio-grid-item img").forEach((image) => {
  imageObserver.observe(image);
});
