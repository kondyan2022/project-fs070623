import getSlideMarkup from './get-slide';
import TMDBApiService from './tmdb-api';
import { modalController } from './modal-trailer';
import { openModalCard } from './modal-poster';
import { initSwiper } from './hero-swiper';

const wrapperForRender = document.querySelector('.newhero-render-wrapper');
const swiperContainer = document.querySelector('.swiper');

const fetchTrendindMovies = async () => {
  try {
    const serviceTrendingDaysMovies = new TMDBApiService();
    const resp = await serviceTrendingDaysMovies.fetchTrendingDayMovies();
    const data = resp.data;
    const arrayResults = data.results; //array with results
    if (arrayResults.length > 0) {
      const slides = await getSlideMarkup(arrayResults);
      wrapperForRender.innerHTML = slides;
      initSwiper();
      //modal window with trailer
      modalController({
        modal: '.modal1',
        btnOpen: '[data-modal-trigger]',
        btnClose: '[data-modal-close]',
      });
    }
  } catch (err) {
    console.error(err);
  }
}
fetchTrendindMovies();
//modal window with details
swiperContainer.addEventListener('click', onBtnDetails);
function onBtnDetails(evt) {
  const btnDetails = evt.target.closest('[film-id] .js-newhero-modal-detail');
  if (btnDetails) {
    const el = btnDetails.closest('[film-id]');
    if (el) {
      openModalCard(el.getAttribute('film-id'));
    }
  }
};