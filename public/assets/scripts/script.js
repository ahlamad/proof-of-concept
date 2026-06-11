const slides = document.querySelectorAll(".carousel_slide");
const thumbs = document.querySelectorAll(".thumb");
const searchInput = document.querySelector("#search-input")
const searchLabel = document.querySelector(".search-label");

// Search label
searchInput.addEventListener("focus", hideLabelName)
searchInput.addEventListener("blur", showLabelName);

function hideLabelName() { 
  searchLabel.classList.add("visually-hidden");
}

function showLabelName() {
  searchLabel.classList.remove("visually-hidden");
}

// Active thumb navigation
function setActiveSlide(index) {
  thumbs.forEach(function (thumbElement) {
    thumbElement.classList.remove("active");
  });

  thumbs[index].classList.add("active");

  // scroll naar de juiste slide
  slides[index].scrollIntoView({
    behavior: "smooth",
    inline: "start"
  });

    thumbs[index].scrollIntoView({
    behavior: "smooth",
    inline: "center",
    block: "nearest"
  });
}

// klik event op elke thumbnail
thumbs.forEach(function (thumbElement, index) {
  thumbElement.addEventListener("click", function () {
    setActiveSlide(index);
  });
});