// eslint-disable-next-line import/prefer-default-export
/** Carousel block migrated from source */
import { fetchPlaceholders } from '../../scripts/placeholders.js';

// eslint-disable-next-line import/prefer-default-export

// eslint-disable-next-line import/prefer-default-export
function updateActiveSlide(slide) {
// eslint-disable-next-line import/prefer-default-export
  const block = slide.closest('.carousel');
// eslint-disable-next-line import/prefer-default-export
  const slideIndex = parseInt(slide.dataset.slideIndex, 10);
// eslint-disable-next-line import/prefer-default-export
  block.dataset.activeSlide = slideIndex;
// eslint-disable-next-line import/prefer-default-export
  const slides = block.querySelectorAll('.carousel-slide');
// eslint-disable-next-line import/prefer-default-export
  slides.forEach((aSlide, idx) => {
// eslint-disable-next-line import/prefer-default-export
    aSlide.setAttribute('aria-hidden', idx !== slideIndex);
// eslint-disable-next-line import/prefer-default-export
    aSlide.querySelectorAll('a').forEach((link) => {
// eslint-disable-next-line import/prefer-default-export
      if (idx !== slideIndex) {
// eslint-disable-next-line import/prefer-default-export
        link.setAttribute('tabindex', '-1');
// eslint-disable-next-line import/prefer-default-export
      } else {
// eslint-disable-next-line import/prefer-default-export
        link.removeAttribute('tabindex');
// eslint-disable-next-line import/prefer-default-export
      }
// eslint-disable-next-line import/prefer-default-export
    });
// eslint-disable-next-line import/prefer-default-export
  });
// eslint-disable-next-line import/prefer-default-export
  const indicators = block.querySelectorAll('.carousel-slide-indicator');
// eslint-disable-next-line import/prefer-default-export
  indicators.forEach((indicator, idx) => {
// eslint-disable-next-line import/prefer-default-export
    if (idx !== slideIndex) {
// eslint-disable-next-line import/prefer-default-export
      indicator.querySelector('button').removeAttribute('disabled');
// eslint-disable-next-line import/prefer-default-export
    } else {
// eslint-disable-next-line import/prefer-default-export
      indicator.querySelector('button').setAttribute('disabled', 'true');
// eslint-disable-next-line import/prefer-default-export
    }
// eslint-disable-next-line import/prefer-default-export
  });
// eslint-disable-next-line import/prefer-default-export
}
// eslint-disable-next-line import/prefer-default-export

// eslint-disable-next-line import/prefer-default-export
function showSlide(block, slideIndex = 0) {
// eslint-disable-next-line import/prefer-default-export
  const slides = block.querySelectorAll('.carousel-slide');
// eslint-disable-next-line import/prefer-default-export
  let realSlideIndex = slideIndex < 0 ? slides.length - 1 : slideIndex;
// eslint-disable-next-line import/prefer-default-export
  if (slideIndex >= slides.length) realSlideIndex = 0;
// eslint-disable-next-line import/prefer-default-export
  const activeSlide = slides[realSlideIndex];
// eslint-disable-next-line import/prefer-default-export
  activeSlide.querySelectorAll('a').forEach((link) => link.removeAttribute('tabindex'));
// eslint-disable-next-line import/prefer-default-export
  block.querySelector('.carousel-slides').scrollTo({
// eslint-disable-next-line import/prefer-default-export
    top: 0,
// eslint-disable-next-line import/prefer-default-export
    left: activeSlide.offsetLeft,
// eslint-disable-next-line import/prefer-default-export
    behavior: 'smooth',
// eslint-disable-next-line import/prefer-default-export
  });
// eslint-disable-next-line import/prefer-default-export
}
// eslint-disable-next-line import/prefer-default-export

// eslint-disable-next-line import/prefer-default-export
function bindEvents(block) {
// eslint-disable-next-line import/prefer-default-export
  const slideIndicators = block.querySelector('.carousel-slide-indicators');
// eslint-disable-next-line import/prefer-default-export
  if (!slideIndicators) return;
// eslint-disable-next-line import/prefer-default-export
  slideIndicators.querySelectorAll('button').forEach((button) => {
// eslint-disable-next-line import/prefer-default-export
    button.addEventListener('click', (e) => {
// eslint-disable-next-line import/prefer-default-export
      const slideIndicator = e.currentTarget.parentElement;
// eslint-disable-next-line import/prefer-default-export
      showSlide(block, parseInt(slideIndicator.dataset.targetSlide, 10));
// eslint-disable-next-line import/prefer-default-export
    });
// eslint-disable-next-line import/prefer-default-export
  });
// eslint-disable-next-line import/prefer-default-export
  block.querySelector('.slide-prev').addEventListener('click', () => {
// eslint-disable-next-line import/prefer-default-export
    showSlide(block, parseInt(block.dataset.activeSlide, 10) - 1);
// eslint-disable-next-line import/prefer-default-export
  });
// eslint-disable-next-line import/prefer-default-export
  block.querySelector('.slide-next').addEventListener('click', () => {
// eslint-disable-next-line import/prefer-default-export
    showSlide(block, parseInt(block.dataset.activeSlide, 10) + 1);
// eslint-disable-next-line import/prefer-default-export
  });
// eslint-disable-next-line import/prefer-default-export
  const slideObserver = new IntersectionObserver((entries) => {
// eslint-disable-next-line import/prefer-default-export
    entries.forEach((entry) => {
// eslint-disable-next-line import/prefer-default-export
      if (entry.isIntersecting) updateActiveSlide(entry.target);
// eslint-disable-next-line import/prefer-default-export
    });
// eslint-disable-next-line import/prefer-default-export
  }, { threshold: 0.5 });
// eslint-disable-next-line import/prefer-default-export
  block.querySelectorAll('.carousel-slide').forEach((slide) => {
// eslint-disable-next-line import/prefer-default-export
    slideObserver.observe(slide);
// eslint-disable-next-line import/prefer-default-export
  });
// eslint-disable-next-line import/prefer-default-export
}
// eslint-disable-next-line import/prefer-default-export

// eslint-disable-next-line import/prefer-default-export
function createSlide(row, slideIndex, carouselId) {
// eslint-disable-next-line import/prefer-default-export
  const slide = document.createElement('li');
// eslint-disable-next-line import/prefer-default-export
  slide.dataset.slideIndex = slideIndex;
// eslint-disable-next-line import/prefer-default-export
  slide.setAttribute('id', `carousel-${carouselId}-slide-${slideIndex}`);
// eslint-disable-next-line import/prefer-default-export
  slide.classList.add('carousel-slide');
// eslint-disable-next-line import/prefer-default-export
  row.querySelectorAll(':scope > div').forEach((column, colIdx) => {
// eslint-disable-next-line import/prefer-default-export
    column.classList.add(`carousel-slide-${colIdx === 0 ? 'image' : 'content'}`);
// eslint-disable-next-line import/prefer-default-export
    slide.append(column);
// eslint-disable-next-line import/prefer-default-export
  });
// eslint-disable-next-line import/prefer-default-export
  const labeledBy = slide.querySelector('h1, h2, h3, h4, h5, h6');
// eslint-disable-next-line import/prefer-default-export
  if (labeledBy) {
// eslint-disable-next-line import/prefer-default-export
    slide.setAttribute('aria-labelledby', labeledBy.getAttribute('id'));
// eslint-disable-next-line import/prefer-default-export
  }
// eslint-disable-next-line import/prefer-default-export
  return slide;
// eslint-disable-next-line import/prefer-default-export
}
// eslint-disable-next-line import/prefer-default-export

// eslint-disable-next-line import/prefer-default-export
let carouselId = 0;
// eslint-disable-next-line import/prefer-default-export

// eslint-disable-next-line import/prefer-default-export
export default async function decorate(block) {
// eslint-disable-next-line import/prefer-default-export
  carouselId += 1;
// eslint-disable-next-line import/prefer-default-export
  block.setAttribute('id', `carousel-${carouselId}`);
// eslint-disable-next-line import/prefer-default-export
  const rows = block.querySelectorAll(':scope > div');
// eslint-disable-next-line import/prefer-default-export
  const isSingleSlide = rows.length < 2;
// eslint-disable-next-line import/prefer-default-export
  const placeholders = await fetchPlaceholders();
// eslint-disable-next-line import/prefer-default-export
  block.setAttribute('role', 'region');
// eslint-disable-next-line import/prefer-default-export
  block.setAttribute('aria-roledescription', placeholders.carousel || 'Carousel');
// eslint-disable-next-line import/prefer-default-export
  const container = document.createElement('div');
// eslint-disable-next-line import/prefer-default-export
  container.classList.add('carousel-slides-container');
// eslint-disable-next-line import/prefer-default-export
  const slidesWrapper = document.createElement('ul');
// eslint-disable-next-line import/prefer-default-export
  slidesWrapper.classList.add('carousel-slides');
// eslint-disable-next-line import/prefer-default-export
  block.prepend(slidesWrapper);
// eslint-disable-next-line import/prefer-default-export
  let slideIndicators;
// eslint-disable-next-line import/prefer-default-export
  if (!isSingleSlide) {
// eslint-disable-next-line import/prefer-default-export
    const slideIndicatorsNav = document.createElement('nav');
// eslint-disable-next-line import/prefer-default-export
    slideIndicatorsNav.setAttribute('aria-label', placeholders.carouselSlideControls || 'Carousel Slide Controls');
// eslint-disable-next-line import/prefer-default-export
    slideIndicators = document.createElement('ol');
// eslint-disable-next-line import/prefer-default-export
    slideIndicators.classList.add('carousel-slide-indicators');
// eslint-disable-next-line import/prefer-default-export
    slideIndicatorsNav.append(slideIndicators);
// eslint-disable-next-line import/prefer-default-export
    block.append(slideIndicatorsNav);
// eslint-disable-next-line import/prefer-default-export
    const slideNavButtons = document.createElement('div');
// eslint-disable-next-line import/prefer-default-export
    slideNavButtons.classList.add('carousel-navigation-buttons');
// eslint-disable-next-line import/prefer-default-export
    slideNavButtons.innerHTML = `
// eslint-disable-next-line import/prefer-default-export
      <button type="button" class="slide-prev" aria-label="${placeholders.previousSlide || 'Previous Slide'}"></button>
// eslint-disable-next-line import/prefer-default-export
      <button type="button" class="slide-next" aria-label="${placeholders.nextSlide || 'Next Slide'}"></button>
// eslint-disable-next-line import/prefer-default-export
    `;
// eslint-disable-next-line import/prefer-default-export
    container.append(slideNavButtons);
// eslint-disable-next-line import/prefer-default-export
  }
// eslint-disable-next-line import/prefer-default-export
  rows.forEach((row, idx) => {
// eslint-disable-next-line import/prefer-default-export
    const slide = createSlide(row, idx, carouselId);
// eslint-disable-next-line import/prefer-default-export
    slidesWrapper.append(slide);
// eslint-disable-next-line import/prefer-default-export
    if (slideIndicators) {
// eslint-disable-next-line import/prefer-default-export
      const indicator = document.createElement('li');
// eslint-disable-next-line import/prefer-default-export
      indicator.classList.add('carousel-slide-indicator');
// eslint-disable-next-line import/prefer-default-export
      indicator.dataset.targetSlide = idx;
// eslint-disable-next-line import/prefer-default-export
      indicator.innerHTML = `<button type="button" aria-label="${placeholders.showSlide || 'Show Slide'} ${idx + 1} ${placeholders.of || 'of'} ${rows.length}"></button>`;
// eslint-disable-next-line import/prefer-default-export
      slideIndicators.append(indicator);
// eslint-disable-next-line import/prefer-default-export
    }
// eslint-disable-next-line import/prefer-default-export
    row.remove();
// eslint-disable-next-line import/prefer-default-export
  });
// eslint-disable-next-line import/prefer-default-export
  container.append(slidesWrapper);
// eslint-disable-next-line import/prefer-default-export
  block.prepend(container);
// eslint-disable-next-line import/prefer-default-export
  if (!isSingleSlide) {
// eslint-disable-next-line import/prefer-default-export
    bindEvents(block);
// eslint-disable-next-line import/prefer-default-export
  }
// eslint-disable-next-line import/prefer-default-export
}
