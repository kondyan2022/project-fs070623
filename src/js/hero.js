import TMDBApiService from './tmdb-api';
import axios from 'axios';
import Swiper from 'swiper';

const myApiService = new TMDBApiService();

const paretteContainer = document.querySelector('.swiper-wrapper');

async function createMarkupFilms() {
  try {
    const response = await axios.get('URL_API'); // 'URL_API' на фактичний URL API
    const movies = response.data.results;

    const markup = movies.map(({ original_name, name, original_title, overview, backdrop_path, vote_average, id }) => {
      return `
        <div class="swiper-slide">
          <div class="hero_box1" id="hero_box1"></div>
          <div class="hero_back"></div>
          <img src="${backdrop_path}" alt="${overview}" loading="lazy" class="hero_img-head">
          <div class="hero_title-box-api">
            <h1 class="hero_first-title-api">${name || original_name || original_title}</h1>
          </div> 
          <div class="star-rate--hero">${vote_average} stars</div>
          <div class="hero_page-box-api">
            <p>${overview}</p>
          </div>
          <div class="hero_page-box2-api">
            <p>${overview}</p>
          </div>
          <button type="button">Watch trailer</button>
        </div>`;
    }).join('');

    paretteContainer.insertAdjacentHTML('beforeend', markup);
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
}

createMarkupFilms();

const swiper = new Swiper('.swiper-container', {
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
  },
});





// const emptyStar = `<svg class="star" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
// <path d="M16.875 7.3125H10.8281L9 1.6875L7.17188 7.3125H1.125L6.04688 10.6875L4.14844 16.3125L9 12.7969L13.8516 16.3125L11.9531 10.6875L16.875 7.3125Z" stroke="url(#paint0_linear_405_766)" stroke-linejoin="round"/>
// <defs>
// <linearGradient id="paint0_linear_405_766" x1="3.375" y1="2.625" x2="13.5" y2="16.5" gradientUnits="userSpaceOnUse">
// <stop stop-color="#F84119"/>
// <stop offset="1" stop-color="#F89F19" stop-opacity="0.68"/>
// </linearGradient>
// </defs>
// </svg>`;

// const fullStar = `<svg class="star" width="18" height="18" viewBox="0 0 18 18" fill="rgba(248, 65, 25, 1)" xmlns="http://www.w3.org/2000/svg">
// <path d="M16.875 7.3125H10.8281L9 1.6875L7.17188 7.3125H1.125L6.04688 10.6875L4.14844 16.3125L9 12.7969L13.8516 16.3125L11.9531 10.6875L16.875 7.3125Z" stroke="url(#paint0_linear_405_766)" stroke-linejoin="round"/>
// <defs>
// <linearGradient id="paint0_linear_405_766" x1="3.375" y1="2.625" x2="13.5" y2="16.5" gradientUnits="userSpaceOnUse">
// <stop stop-color="#F84119"/>
// <stop offset="1" stop-color="#F89F19" stop-opacity="0.68"/>
// </linearGradient>
// </defs>
// </svg>`;

// const halfStar = `<svg class="star" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
// <path d="M16.875 7.3125H10.8281L9 1.6875L7.17188 7.3125H1.125L6.04688 10.6875L4.14844 16.3125L9 12.7969L13.8516 16.3125L11.9531 10.6875L16.875 7.3125Z" stroke="url(#paint0_linear_148_6991)" stroke-linejoin="round"/>
// <path d="M9 1.6875V12.7969L4.14844 16.3125L6.04688 10.6875L1.125 7.3125H7.17188L9 1.6875Z" fill="url(#paint1_linear_148_6991)"/>
// <defs>
// <linearGradient id="paint0_linear_148_6991" x1="3.04877" y1="2.73251" x2="13.478" y2="16.7124" gradientUnits="userSpaceOnUse">
// <stop stop-color="#F84119"/>
// <stop offset="1" stop-color="#F89F19" stop-opacity="0.68"/>
// </linearGradient>
// <linearGradient id="paint1_linear_148_6991" x1="2.08688" y1="2.73251" x2="12.1506" y2="9.47748" gradientUnits="userSpaceOnUse">
// <stop stop-color="#F84119"/>
// <stop offset="1" stop-color="#F89F19" stop-opacity="0.68"/>
// </linearGradient>
// </defs>
// </svg>`;

// function generateStarRating(rating) {
//   const starRatingContainer = document.querySelector(".starRating");
//   starRatingContainer.innerHTML = "";

//   const floorRating = Math.floor(rating);
//   const hasHalfStar = rating % 1 !== 0;

//   for (let i = 0; i < 5; i++) {
//     const star = document.createElement("span");
//     if (i < floorRating) {
//       star.innerHTML = fullStar;
//     } else if (i === floorRating && hasHalfStar) {
//       star.innerHTML = halfStar;
//     } else {
//       star.innerHTML = emptyStar;
//     }
//     starRatingContainer.appendChild(star);
//   }
// }


// generateStarRating(0.5);