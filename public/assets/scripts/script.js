const slides = document.querySelectorAll(".carousel_slide");
const thumbs = document.querySelectorAll(".thumb");

function setActiveSlide(index) {
  thumbs.forEach(function (thumbElement) {
    thumbElement.classList.remove("active");
  });

  // voeg active class toe aan huidige thumbnail
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