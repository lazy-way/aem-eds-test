/**
 * Handles carousel component initialization
 */
export function initializeCarousel() {
    const carouselList = document.querySelectorAll('.carousel');
    carouselList.forEach((carousel) => {
        const slidesContainer = carousel.querySelector('.carousel-slides-container');
        const slides = slidesContainer.querySelectorAll('.carousel-slide');
        const prevButton = carousel.querySelector('.carousel-navigation-buttons .slide-prev');
        const nextButton = carousel.querySelector('.carousel-navigation-buttons .slide-next');
        const indicators = carousel.querySelectorAll('.carousel-slide-indicator button');

        let currentIndex = 0;
        const updateActiveSlide = (index) => {
            slidesContainer.scrollTo({ left: slides[index].offsetLeft, behavior: 'smooth' });
            indicators.forEach((indicator, i) => indicator.disabled = i === index);
            currentIndex = index;
        };

        prevButton?.addEventListener('click', () => {
            if (currentIndex > 0) updateActiveSlide(currentIndex - 1);
        });

        nextButton?.addEventListener('click', () => {
            if (currentIndex < slides.length - 1) updateActiveSlide(currentIndex + 1);
        });

        indicators?.forEach((indicator, index) =>
            indicator.addEventListener('click', () => updateActiveSlide(index))
        );
    });
}

document.addEventListener('DOMContentLoaded', initializeCarousel);