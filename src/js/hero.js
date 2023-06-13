
import TMDBApiService from './tmdb-api';
import generateMarkup from './hero-render';
import { Buffer } from 'buffer'
import Swiper from 'swiper';

// import Swiper and modules styles
import 'swiper/swiper.min.css';
import 'swiper/modules/pagination/pagination.min.css';
import 'swiper/modules/navigation/navigation.min.css';
import 'swiper/modules/autoplay/autoplay.min.css';


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
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
}

createMarkupFilms();




const swiper = new Swiper('.swiper-container', {
  loop: true,                         //loop
  pagination: {                       //pagination（dots）
      el: '.swiper-pagination',
  },
  autoplay: {                         
    delay: 500,  
},
  navigation: {                       //navigation（arrows）
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
  },
});


