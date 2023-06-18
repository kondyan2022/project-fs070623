import TMDBApiService from './tmdb-api';
import generateMarkup from './hero-render';
import { Buffer } from 'buffer';
import Swiper from 'swiper';
import Swiper, {  Navigation, Pagination, Scrollbar, Autoplay } from 'swiper';

// import Swiper and modules styles
import 'swiper/swiper.min.css';
import 'swiper/modules/pagination/pagination.min.css';
import 'swiper/modules/navigation/navigation.min.css';
import 'swiper/modules/scrollbar/scrollbar.min.css';
import 'swiper/modules/autoplay/autoplay.min.css';
Swiper.use([Navigation, Pagination, Scrollbar, Autoplay]);



import { modalController } from './modal-trailer';

const myApiService = new TMDBApiService();

const paretteContainer = document.querySelector('.swiper-wrapper');

async function createMarkupFilms() {
  try {
    const response = await myApiService.fetchTrendingDayMovies();
    const movies = response.data.results;

    const markup = generateMarkup(movies);

    // const markup = movies.map(({ original_name, name, original_title, overview, backdrop_path, vote_average, id }) => {
    //   return `
    //     <div class="swiper-slide">
    //       <div class="hero_box1" id="hero_box1"></div>
    //       <div class="hero_back"></div>
    //       <img src="${backdrop_path}" alt="${overview}" loading="lazy" class="hero_img-head">
    //       <div class="hero_title-box-api">
    //         <h1 class="hero_first-title-api">${name || original_name || original_title}</h1>
    //       </div>
    //       <div class="star-rate--hero">${vote_average} stars</div>
    //       <div class="hero_page-box-api">
    //         <p>${overview}</p>
    //       </div>
    //       <div class="hero_page-box2-api">
    //         <p>${overview}</p>
    //       </div>
    //       <button type="button">Watch trailer</button>
    //     </div>`;
    // }).join('');

    paretteContainer.insertAdjacentHTML('beforeend', markup);
    modalController({
      modal: '.modal1',
      btnOpen: '.section__button1',
      btnClose: '.modal__close',
    });
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
}

createMarkupFilms();

const swiper = new Swiper('.swiper-container', {
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  spaceBetween: 30,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});
