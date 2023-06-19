import getSlideMarkup from './get-slide';
import TMDBApiService from './tmdb-api';
import { modalController } from './modal-trailer';
import { openModalCard } from './modal-poster';
import { initSwiper } from './hero-swiper';

const wrapperForRender = document.querySelector('.newhero-render-wrapper');
const swiperContainer = document.querySelector('.swiper');

let shouldInitSwiper = false;

const serviceTrendingDaysMovies = new TMDBApiService();
serviceTrendingDaysMovies
  .fetchTrendingDayMovies()
  .then(resp => {
    const data = resp.data;
    const arrayResults = data.results; //array with results
    if (arrayResults.length > 0) {
      const slides = getSlideMarkup(arrayResults);
      wrapperForRender.innerHTML = slides;
      modalController({
        modal: '.modal1',
        btnOpen: '[data-modal-trigger]',
        btnClose: '[data-modal-close]',
      });
      shouldInitSwiper = true;
    }
  })
  .then(() => {
    if (shouldInitSwiper) {
      initSwiper();
    }
  })
  .catch(e => console.error(e));

swiperContainer.addEventListener('click', onBtnDetails)

function onBtnDetails(evt) {
  const btnDetails = evt.target.closest('[film-id] .js-newhero-modal-detail');
  if (btnDetails) {
    const el = btnDetails.closest('[film-id]');
    if (el) {
      openModalCard(el.getAttribute('film-id'));
    }
  }
}
