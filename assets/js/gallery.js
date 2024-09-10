// Variables to hold references to lightbox elements
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const closeBtn = document.querySelector('.close');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const galleryItems = document.querySelectorAll('.gallery-item');

let currentIndex = 0;

// Ensure the lightbox is hidden when the page loads
document.addEventListener('DOMContentLoaded', () => {
    lightbox.style.display = 'none';
});

// Función para deshabilitar el scroll del body
function disableScroll() {
    document.body.style.overflow = 'hidden';
}

// Función para habilitar el scroll del body
function enableScroll() {
    document.body.style.overflow = '';
}

// Open lightbox when an image is clicked
galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        lightboxImage.src = item.src; // Set the image source
        lightbox.style.display = 'flex'; // Then display the lightbox
        currentIndex = index;
        disableScroll();  // Deshabilitar el scroll al abrir el lightbox
    });
});

// Close lightbox when the close button is clicked or ESC key is pressed
closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
    lightboxImage.src = ''; // Clear the image source when closing
    enableScroll();  // Habilitar el scroll al cerrar el lightbox
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        lightbox.style.display = 'none';
        lightboxImage.src = ''; // Clear the image source when closing
        enableScroll();  // Habilitar el scroll al cerrar el lightbox
    }
    if (event.key === 'ArrowRight') {
        nextImage();
    }
    if (event.key === 'ArrowLeft') {
        prevImage();
    }
});

// Navigate to the next image
nextBtn.addEventListener('click', nextImage);

function nextImage() {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    lightboxImage.src = galleryItems[currentIndex].src;
}

// Navigate to the previous image
prevBtn.addEventListener('click', prevImage);

function prevImage() {
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    lightboxImage.src = galleryItems[currentIndex].src;
}

// Close lightbox when clicking outside of the image
lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) {
        lightbox.style.display = 'none';
        lightboxImage.src = ''; // Clear the image source when closing
        enableScroll();  // Habilitar el scroll al cerrar el lightbox
    }
});
