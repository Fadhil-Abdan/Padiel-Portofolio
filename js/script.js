const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });
}

const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {
  revealElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementTop < windowHeight - 80) {
      element.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

const filterButtons = document.querySelectorAll(".filter-btn");
const portfolioCards = document.querySelectorAll(".portfolio-card");

function applyFilter(filterValue) {
  filterButtons.forEach((btn) => btn.classList.remove("active"));
  document.querySelector(`[data-filter="${filterValue}"]`).classList.add("active");

  portfolioCards.forEach((card) => {
    const cardCategory = card.getAttribute("data-category");

    if (filterValue === cardCategory) {
      card.style.display = "block";

      setTimeout(() => {
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }, 80);
    } else {
      card.style.opacity = "0";
      card.style.transform = "translateY(20px)";

      setTimeout(() => {
        card.style.display = "none";
      }, 250);
    }
  });
}

// Apply default filter when page loads
window.addEventListener("load", () => {
  applyFilter("grafis");
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filterValue = button.getAttribute("data-filter");
    applyFilter(filterValue);
  });
});

const modal = document.getElementById("portfolioModal");
const modalClose = document.getElementById("modalClose");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalCategory = document.getElementById("modalCategory");

const ratioMap = {
  grafis: "ratio-3-4",
  ui: "ratio-16-9",
  "3d": "ratio-3-4",
  logo: "ratio-1-1"
};

portfolioCards.forEach((card) => {
  card.addEventListener("click", () => {
    if (!modal) return;

    const img = card.getAttribute("data-img");
    const title = card.getAttribute("data-title");
    const desc = card.getAttribute("data-desc");
    const category = card.getAttribute("data-category");
    const ratioClass = ratioMap[category] || "ratio-3-4";

    modalImg.src = img;
    modalImg.alt = title;
    modalImg.className = ratioClass;
    modalTitle.textContent = title;
    modalDesc.textContent = desc;
    modalCategory.textContent = card.querySelector(".portfolio-info span").textContent;

    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  });
});

function closeModal() {
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
  }
}

if (modalClose) {
  modalClose.addEventListener("click", closeModal);
}

if (modal) {
  modal.addEventListener("click", (event) => {
    if (event.target.classList.contains("modal-backdrop")) {
      closeModal();
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
});
