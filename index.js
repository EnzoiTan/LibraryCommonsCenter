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
    // When hovering, apply the active color to the hovered link (but not the active one)
    if (!link.classList.contains("active")) {
      link.classList.add("hovered");
    }
    moveIndicator(link);
  });

  link.addEventListener("mouseleave", () => {
    // Remove hovered state when not hovering
    link.classList.remove("hovered");
    const activeLink = document.querySelector("nav a.active");
    if (activeLink) {
      moveIndicator(activeLink); // Restore the active indicator
    }
  });

  link.addEventListener("click", (e) => {
    e.preventDefault();
    const id = link.getAttribute("data-id");

    // Save active state
    localStorage.setItem("activeLink", id);
    links.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");
    moveIndicator(link); // Move indicator to clicked link
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

document.getElementById('play-button').addEventListener('click', function() {
  document.getElementById('video-thumbnail').style.display = 'none';
  this.style.display = 'none';
  document.getElementById('video-iframe').src += "?autoplay=1";
});


