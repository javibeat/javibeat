document.addEventListener("DOMContentLoaded", function () {
    const images = document.querySelectorAll(".grid-container div img");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const captionText = document.getElementById("lightbox-caption");
    const closeBtn = document.querySelector(".close");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");
    let currentIndex;
  
    images.forEach((img, index) => {
      img.addEventListener("click", () => {
        lightbox.style.display = "block";
        lightboxImg.src = img.src;
        captionText.textContent = img.alt;
        currentIndex = index;
      });
    });
  
    function showImage(index) {
      lightboxImg.src = images[index].src;
      captionText.textContent = images[index].alt;
      currentIndex = index;
    }
  
    closeBtn.addEventListener("click", () => {
      lightbox.style.display = "none";
    });
  
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox || e.target === closeBtn) {
        lightbox.style.display = "none";
      }
    });
  
    prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
      showImage(currentIndex);
    });
  
    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
      showImage(currentIndex);
    });
  
    document.addEventListener("keydown", (e) => {
      if (lightbox.style.display === "block") {
        if (e.key === "Escape") {
          lightbox.style.display = "none";
        } else if (e.key === "ArrowLeft") {
          prevBtn.click();
        } else if (e.key === "ArrowRight") {
          nextBtn.click();
        }
      }
    });
  });
  