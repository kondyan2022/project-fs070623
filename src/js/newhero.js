import TMDBApiService from './tmdb-api';
import { modalController } from './modal-trailer';
import getFiveStar from './fivezerostar.js';
import { openModalCard } from './modal-poster';
import '../sass/_fivestar.scss';
//swiper------>
import Swiper from 'swiper';
import Swiper, { Navigation, Pagination, Scrollbar, Autoplay } from 'swiper';
import 'swiper/swiper.min.css';
import 'swiper/modules/autoplay/autoplay.min.css';
Swiper.use([Navigation, Pagination, Scrollbar, Autoplay]);
// import 'swiper/modules/navigation/navigation.min.css';
// import 'swiper/modules/pagination/pagination.min.css';
// import 'swiper/modules/scrollbar/scrollbar.min.css';


let numberLetters = 200;

function createMarkup(movie) {
  const title = movie.title.innerText;
  if (movie.title.length > 25) {
    numberLetters = 170;
  }
  return `

          <div class="swiper-slide" film-id="${movie.id
    }">
            <div class="newhero-thumb" >
                <img
                    srcset="
                        https://image.tmdb.org/t/p/w300/${movie.backdrop_path
    }      300w,
                        https://image.tmdb.org/t/p/w780/${movie.backdrop_path
    }      780w,
                        https://image.tmdb.org/t/p/w1280/${movie.backdrop_path
    }      1280w,
                        https://image.tmdb.org/t/p/original/${movie.backdrop_path
    }  3840w
                    "
                    sizes="(min-width: 320px) 772px,
                            (min-width: 768px) 768px,
                            (min-width: 1280px) 1280px,
                            100vw"
                    src="https://image.tmdb.org/t/p/w300/${movie.backdrop_path
    }"
                    alt="${movie.title}"
                    class="newhero-image swiper-img"
                    width="1280"
                    height="720"
                />
            </div>

            <div class="newhero-inform-wrap">
                <h1 class="newhero-movie-title">${movie.title.substring(0, 25)}</h1>
                <div class="newhero-stars">${getFiveStar(
      movie.vote_average
    )}</div>
                <p class="newhero-about">${movie.overview.substring(0, numberLetters)}...</p>
                <div class="newh-wrap-buttons">
                    <div class="newh-wrap-trailer">
                        <button type="button" class="newhero-modal-trailer js-newhero-modal-trailer" data-modal-trigger>Watch trailer</button>
                    </div>
                    <div class="newh-wrap-detail">
                        <button type="button" class="newhero-modal-detail js-newhero-modal-detail">More details</button>
                    </div>
                  </div>
              </div>
          </div>
    `;
}

const wrapperForRender = document.querySelector('.newhero-render-wrapper');
const swiperContainer = document.querySelector('.swiper')

let shouldInitSwiper = false;

const serviceTrendingDaysMovies = new TMDBApiService();
serviceTrendingDaysMovies
  .fetchTrendingDayMovies()
  .then(resp => {
    const data = resp.data;
    const datasTrendDay = {
      pageCurrent: data.page,
      totalResults: data.total_results,
      results: data.results, //this
    };
    const arrayResults = datasTrendDay.results; //array with results
    if (arrayResults.length > 0) {
      renderToMarkup(arrayResults);
      shouldInitSwiper = true;
      return;
    }
  })
  .then(() => {
    if (shouldInitSwiper) {
      setTimeout(() => {
        const swiper = new Swiper('.swiper', {
          autoplay: {
            delay: 5000,
            disableOnInteraction: false,
          },
          slidesPerView: 1,
          spaceBetween: 10,
          direction: 'horizontal',
          loop: true,
          observer: true,
          simulateTouch: false,
          speed: 600
        });
      }, 0);
    }
  })
  .catch(e => console.error(e));

//------------------------------------------------------------------------

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

function renderToMarkup(array) {
  const slides = array
    .filter(movie => movie.backdrop_path !== null)
    .map(movie => createMarkup(movie))
    .join('');
  setTimeout(() => {
    wrapperForRender.innerHTML = slides;

    modalController({
      modal: '.modal1',
      btnOpen: '[data-modal-trigger]',
      btnClose: '[data-modal-close]',
    });
  }, 0);
}
