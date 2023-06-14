import TMDBApiService from './tmdb-api';
import { modalController } from './modal-trailer';
import getFiveStar from './fivezerostar.js';
import '../sass/_fivestar.scss';
// import Swiper from 'swiper';
// import 'swiper/swiper.min.css';
// import 'swiper/swiper.css';

function createMarkup(movie) {
    return `
    <div class="swiper">
        <div class="swiper-wrapper">
            <div class="swiper-slide newhero-content-wrapper">
                    <div class="newhero-thumb">
                        <img
                            srcset="
                                https://image.tmdb.org/t/p/w300/${movie.backdrop_path}      300w,
                                https://image.tmdb.org/t/p/w780/${movie.backdrop_path}      780w,
                                https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}      1280w,
                                https://image.tmdb.org/t/p/original/${movie.backdrop_path}  3840w
                            "
                            sizes="(min-width: 320px) 772px,
                                    (min-width: 768px) 768px,
                                    (min-width: 1280px) 1280px,
                                    100vw"
                            src="https://image.tmdb.org/t/p/w300/${movie.backdrop_path}"
                            alt="${movie.title}"
                            class="newhero-image"
                            width="1280"
                            height="720"
                        />
                    </div>

                    <div class="newhero-movie-inform-wrap">
                        <h1 class="newhero-movie-title">${movie.title}</h1>
                        <div class="newhero-stars">${getFiveStar(movie.vote_average)}</div>
                        <p class="newhero-about-descr">${movie.overview}</p>
                        <div class="newh-wrap-buttons">
                            <div class="newhero-wrap-btn-api-one newh-wrap-trailer">
                                <button type="button" class="newhero-btn-api-one js-newhero-open-modal-tr">Watch trailer</button>
                            </div>
                            <div class="newhero-wrap-btn-api-two newh-wrap-detail">
                                <button type="button" class="newhero-btn-api-two js-newhero-open-mod-det">More details</button>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
        </div>
    `
}

const wrapperContent = document.querySelector('.newhero-content-wrapper');
const wrapperForRender = document.querySelector('.newhero-render-wrapper')
//----------------- modal-------------------------------------------------------

// function hendlerOpenModalWindow(evt) {
//     console.log(evt.target.getAttribute('film-id'), 'Це id фільму');
// }
//------------------------------------------------------------------------

const serviceTrendingDaysMovies = new TMDBApiService();

serviceTrendingDaysMovies
    .fetchTrendingDayMovies()
    .then((resp) => {
        const data = resp.data;
        const datasTrendDay = {
            pageCurrent: data.page,
            totalResults: data.total_results,
            results: data.results
        }
        const arrayResults = datasTrendDay.results; //array with results
        if (arrayResults.length > 0) {
            renderToMarkup(arrayResults);
            wrapperForRender.addEventListener('click', (e) => {
                console.log(e.currentTarget, e.target)
                console.log(e.currentTarget)
                if (e.target === document.querySelector('.js-newhero-open-mod-det')) {
                    /// open modal with details 
                    console.log('button DETAILS')
                    wrapperForRender.addEventListener('click', (e) => {
                        const el = evt.target.closest('[film-id]');
                        if (el) {
                            openModalCard(el.getAttribute('film-id'));
                        }
                    });
                }
            })
            return
        }
    })
    .catch((e) => console.error(e));

function renderToMarkup(array) {
    const randomIndex = getRandomIndex();
    const randomMovie = array
        .filter(movie => movie.backdrop_path !== null)
        .map(movie => {
            const movieMarkup = createMarkup(movie);
            return {
                id: movie.id,
                markup: movieMarkup
            }
        })[randomIndex];
    const { id, markup } = randomMovie;
    // wrapperForRender.innerHTML = markup;
    setTimeout(() => {
        // wrapperForRender.innerHTML = randomMovie;
        wrapperForRender.innerHTML = markup;
        modalController({
            modal: '.modal1',
            btnOpen: '.js-newhero-open-modal-tr',
            btnClose: '.modalclose',
        });

    }, 3000);
}

function getRandomIndex() {
    return Math.floor(Math.random() * 15);
}


//=================swiper

// function renderToMarkup(array) {
//     // const randomIndex = getRandomIndex();
//     const randomMovie = array
//         .filter(movie => movie.backdrop_path !== null)
//         .map(movie => {
//             return createMarkup(movie);
//         }); //[randomIndex]

//     // console.log(randomMovie)

//     // const { id, markup } = randomMovie;
//     // wrapperForRender.innerHTML = markup;

//     setTimeout(() => {
//         wrapperForRender.innerHTML = randomMovie;
//         console.log('timeout');
//         // modalController({
//         //     modal: '.modal1',
//         //     btnOpen: '.js-newhero-open-modal-tr',
//         //     btnClose: '.modalclose',
//         // });

//     }, 3000);
// }

// const swiper = new Swiper('.swiper', {
//     // Optional parameters
//     direction: 'horizontal',
//     loop: true,
//     autoplay: {
//         delay: 5000,
//         disableOnInteraction: false, //cont after click
//     }
// });
