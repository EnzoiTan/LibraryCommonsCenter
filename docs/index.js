// Select all links and the indicator
const links = document.querySelectorAll("nav a");
const indicator = document.querySelector(".indicator");

// Function to move the indicator
function moveIndicator(link) {
  const rect = link.getBoundingClientRect();
  const parentRect = link.parentNode.getBoundingClientRect();
  const left = rect.left - parentRect.left; // Offset from the parent
  const width = rect.width;

  // Move and resize the indicator
  indicator.style.transform = `translateX(${left}px)`;
  indicator.style.width = `${width}px`;
}

// Set initial active state on page load
document.addEventListener("DOMContentLoaded", () => {
  const savedId = localStorage.getItem("activeLink") || "home";
  const activeLink = document.querySelector(`nav a[data-id="${savedId}"]`);
  if (activeLink) {
    activeLink.classList.add("active");
    moveIndicator(activeLink);
  }
});

// Hover behavior
links.forEach((link) => {
  link.addEventListener("mouseenter", () => {
    if (!link.classList.contains("active")) {
      link.classList.add("hovered");
    }
    moveIndicator(link);
  });

  link.addEventListener("mouseleave", () => {
    link.classList.remove("hovered");
    const activeLink = document.querySelector("nav a.active");
    if (activeLink) {
      moveIndicator(activeLink); // Restore active indicator
    }
  });

  link.addEventListener("click", (e) => {
    const id = link.getAttribute("data-id");
    const href = link.getAttribute("href");

    // Save active state
    localStorage.setItem("activeLink", id);
    links.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");
    moveIndicator(link); // Move indicator to clicked link

    // Allow navigation if href exists
    if (href && href !== "#") {
      window.location.href = href;
    }

    // Prevent default only if href is "#"
    if (href === "#") {
      e.preventDefault();
    }
  });
});

// On mouse leave, restore the active state
document.querySelector("nav").addEventListener("mouseleave", () => {
  const savedId = localStorage.getItem("activeLink") || "home";
  const activeLink = document.querySelector(`nav a[data-id="${savedId}"]`);
  if (activeLink) {
    moveIndicator(activeLink);
  }
});

// Play button functionality
document.getElementById("play-button").addEventListener("click", function () {
  document.getElementById("video-thumbnail").style.display = "none";
  this.style.display = "none";
  document.getElementById("video-iframe").src += "?autoplay=1";
});
