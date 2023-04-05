let checkbox = document.getElementById("navbar-check");
let navContainer = document.querySelector(".navbar-body");
let navLinks = document.querySelectorAll(".navbar-body a");

// Toggle active class from links
checkbox.onchange = () => navContainer.classList.toggle("active");

// Loop for discarding active class when link is clicked
navLinks.forEach((link) => {
  link.onclick = () => {
    navContainer.classList.remove("active");
    checkbox.checked = false;
  };
});

// Function for set active link for particular page
const setActive = () => {
  for (let link of navLinks)
    if (document.location.href.indexOf(link.href) >= 0)
      link.className = "active";
};

setActive();
