const slides = document.querySelectorAll(".blog-slider-slide");
const sliderButtons = document.querySelectorAll(".blog-slider-btns span");
let currentSlide = 1;

// Manual Navigation
const manualNav = (index) => {
  slides.forEach((slide) => {
    slide.classList.remove("active");
  });
  sliderButtons.forEach((button) => {
    button.classList.remove("active");
  });
  slides[index].classList.add("active");
  sliderButtons[index].classList.add("active");
};

sliderButtons.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    manualNav(index);
    currentSlide = index;
  });
});

// Automatic Navigation
const autoNav = () => {
  const repeater = () => {
    setTimeout(() => {
      slides.forEach((slide) => {
        slide.classList.remove("active");
      });
      sliderButtons.forEach((button) => {
        button.classList.remove("active");
      });
      slides[currentSlide].classList.add("active");
      sliderButtons[currentSlide].classList.add("active");
      currentSlide++;
      if (slides.length === currentSlide) currentSlide = 0;
      if (currentSlide >= slides.length) return;
      repeater();
    }, 5000);
  };
  repeater();
};

autoNav();

// Debounce function
const debounce = (fn, delay) => {
  let timer;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

// For Infinite scrolling
window.addEventListener(
  "scroll",
  debounce(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 5) loadMore();
  }, 200)
);

const topToBottomBtn = document.querySelector(".blog-top-to-bottom");

// Bottom to top logic
topToBottomBtn.onclick = () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};

window.addEventListener("scroll", () => {
  if (
    document.body.scrollTop > innerHeight ||
    document.documentElement.scrollTop > innerHeight
  )
    topToBottomBtn.style.display = "flex";
  else topToBottomBtn.style.display = "none";
});

// Building blog cards
const buildCard = (imageUrl, title, author) => {
  const div = document.createElement("div");
  div.setAttribute("class", "blog-container-card");
  div.innerHTML = `
    <div class="overlay"></div>
        <div class="blog-container-card-img">
            <img
                src="${imageUrl}"
                alt="${imageUrl}"
            />
        </div>
        <div class="blog-container-card-date">
            <div class="category category-green">NEWS</div>
            <p>26/2/2022</p>
        </div>
        <div class="blog-container-card-title">
            <p>${title}</p>
        </div>
        <div class="blog-container-card-author">
            <span>by</span>
            <p>${author}</p>
    </div>
    `;
  document.querySelector(".blog-container").appendChild(div);
  cardObserver.observe(div);
};

// Loading cards
const loadMore = () => {
  for (let i = 1; i <= 9; i++) {
    let imageUrl;
    let title;
    let author;
    fetch(`https://jsonplaceholder.typicode.com/comments?id=${i}`)
      .then((res) => res.json())
      .then((result) => {
        title = result[0].name;
        fetch(`https://picsum.photos/id/${i}/info`)
          .then((res) => res.json())
          .then((result) => {
            imageUrl = result.download_url;
            author = result.author;
            buildCard(imageUrl, title, author);
          })
          .catch((e) => console.log(e));
      })
      .catch((e) => console.log(e));
  }
};

loadMore();

const cardObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting)
        entry.target.classList.add("blog-container-card-visible");
    });
  },
  {
    rootMargin: "0px",
    threshold: 0.1
  }
);
