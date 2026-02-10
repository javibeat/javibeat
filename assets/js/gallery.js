/* Obsidian Noir - Fixed Gallery Logic */
document.addEventListener('DOMContentLoaded', () => {
    // We use a small delay to ensure elements are loaded by interactions.js loader
    setTimeout(() => {
        const lightbox = document.getElementById('lightbox');
        const lightboxImage = document.getElementById('lightbox-image');
        const closeBtn = document.querySelector('.close');
        const prevBtn = document.querySelector('.prev');
        const nextBtn = document.querySelector('.next');
        const galleryItems = document.querySelectorAll('.gallery-item img');

        if (!lightbox) return;

        let currentIndex = 0;

        const openLightbox = (index) => {
            currentIndex = index;
            lightboxImage.src = galleryItems[currentIndex].src;
            lightbox.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        };

        const closeLightbox = () => {
            lightbox.style.display = 'none';
            document.body.style.overflow = '';
        };

        const nextImage = () => {
            currentIndex = (currentIndex + 1) % galleryItems.length;
            lightboxImage.src = galleryItems[currentIndex].src;
        };

        const prevImage = () => {
            currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
            lightboxImage.src = galleryItems[currentIndex].src;
        };

        galleryItems.forEach((item, index) => {
            item.style.cursor = 'pointer';
            item.addEventListener('click', () => openLightbox(index));
        });

        if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
        if (nextBtn) nextBtn.addEventListener('click', nextImage);
        if (prevBtn) prevBtn.addEventListener('click', prevImage);

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });

        document.addEventListener('keydown', (e) => {
            if (lightbox.style.display === 'flex') {
                if (e.key === 'Escape') closeLightbox();
                if (e.key === 'ArrowRight') nextImage();
                if (e.key === 'ArrowLeft') prevImage();
            }
        });
    }, 500);
});
