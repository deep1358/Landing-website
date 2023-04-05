const timeLine = document.querySelectorAll(".about-timeline-event-content");

const timeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting)
        entry.target.classList.add("about-timeline-event-content-visible");
    });
  },
  {
    rootMargin: "0px",
    threshold: 0.2
  }
);

timeLine.forEach((item) => timeObserver.observe(item));

const contactForm = document.querySelectorAll(".about-contact");

const contactFormObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting)
        entry.target.classList.add("about-contact-visible");
    });
  },
  {
    rootMargin: "50px",
    threshold: 0.1
  }
);

contactForm.forEach((item) => contactFormObserver.observe(item));

const sliderItem = document.querySelector(".about-testimonial");

const sliderObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting)
        entry.target.classList.add("about-testimonial-visible");
    });
  },
  {
    rootMargin: "0px",
    threshold: 0.2
  }
);

sliderObserver.observe(sliderItem);

const leftBtn = document.querySelector(".about-left-btn");
const rightBtn = document.querySelector(".about-right-btn");
const slider = document.querySelector(".about-testimonial-slider");
const slide = document.querySelector(".about-testimonial-slider-slide");

let counter = 0;
const size = slide.clientWidth;

// Making button disabled
const makeButtonDisabled = (c) => {
  if (c === 0) leftBtn.disabled = true;
  else leftBtn.disabled = false;
  if (c === 3) rightBtn.disabled = true;
  else rightBtn.disabled = false;
};

// Manual Slider
leftBtn.onclick = () => {
  counter--;
  slider.style.transform = `translateX(${-size * counter}px)`;
  makeButtonDisabled(counter);
};

rightBtn.onclick = () => {
  counter++;
  slider.style.transform = `translateX(${-size * counter}px)`;
  makeButtonDisabled(counter);
};

// Auto play slider
setInterval(() => {
  if (counter === 3) counter = -1;
  counter++;
  slider.style.transform = `translateX(${-size * counter}px)`;
  makeButtonDisabled(counter);
}, 3000);

makeButtonDisabled(counter);

const aboutLeftItem = document.querySelector(".about-us-left");

const aboutLeftObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting)
        entry.target.classList.add("about-us-left-visible");
    });
  },
  {
    rootMargin: "0px",
    threshold: 0.2
  }
);

aboutLeftObserver.observe(aboutLeftItem);

const aboutTopItem = document.querySelector(".about-us-top");

const aboutTopObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting)
        entry.target.classList.add("about-us-top-visible");
    });
  },
  {
    rootMargin: "0px",
    threshold: 0.2
  }
);

aboutTopObserver.observe(aboutTopItem);

const aboutRightItem = document.querySelector(".about-us-right");

const aboutRightObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting)
        entry.target.classList.add("about-us-right-visible");
    });
  },
  {
    rootMargin: "0px",
    threshold: 0.2
  }
);

aboutRightObserver.observe(aboutRightItem);

const aboutBottomItem = document.querySelector(".about-us-bottom");

const aboutBottomObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting)
        entry.target.classList.add("about-us-bottom-visible");
    });
  },
  {
    rootMargin: "0px",
    threshold: 0.2
  }
);

aboutBottomObserver.observe(aboutBottomItem);

const aboutTitle = document.querySelector(".about-us h1");

const aboutTitleObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting)
        entry.target.classList.add("about-us-title-visible");
    });
  },
  {
    rootMargin: "0px",
    threshold: 0.2
  }
);

aboutTitleObserver.observe(aboutTitle);
