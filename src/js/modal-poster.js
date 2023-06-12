//  -------------------------------------------- IMPORTS -------------------------------------------------

import TMDBApiService from './tmdb-api';
import dataFromApi from '../testcatalog.json';
import {
  saveToLibrary,
  removeFromLibrary,
  getLibraryList,
  isInLibrary,
} from './local-storage';

//  ------------------------------------------ VARIABLES --------------------------------------------------

const refs = {
  openModal: document.querySelector('.film-card'),
  closeModal: document.querySelector('.modal-close-btn'),
  Backdrop: document.querySelector('.backdrop'),
  ModalCont: document.querySelector('.modal-poster-container'),
  // cardsfilm: document.querySelector(''),
  FilmBtn: document.querySelector('.film__button'),
  libraryList: document.querySelector('.library-list'),
  // cardList: document.querySelector(''),
};

// ------------------------------------------ OPENING MODAL --------------------------------------------------

if (refs.openModal) {
  refs.openModal.addEventListener('click', createModal);
}

//   Для того, щоб все це спрацьовувало, треба на сторінках (HOME, CATALOG)
//   додати в розмітці карточкам клас "film-card" як у відповідному файлі

function createModal(event) {
  const selectedMovie = event.target.closest('li');
  selectedMovieId = Number(selectedMovie.getAttribute('data-id'));
  refs.closeModal.addEventListener('click', closeModalDescr);

  createMarkup(selectedMovieId);

  openModalCard();
}

function openModalCard(event) {
  refs.Backdrop.classList.remove('is-hidden');
  refs.ModalCont.classList.remove('is-hidden');
  document.body.style.overflow = 'hidden';
  document.addEventListener('keydown', onEscBtnPress);
  document.addEventListener('click', onBackdropClick);
}

//   ------------------------------ ADDING & REMOVING FROM LIBRARY --------------------------------------

function AddFilmToLibrary() {
  const filmsId2 = filmBtn.dataset.id;
  if (getMovieFromLibrary(selectedMovieId)) {
    removeMovieFromLibrary(selectedMovieId);
    filmBtn.innerHTML = 'Add to Library';
  } else {
    addMovieToLibrary(selectedMovieId);
    filmBtn.innerHTML = 'Remove from Library';
  }
}

function changeBtnLibrary(filmsId, filmBtn) {
  if (getMovieFromLibrary(filmsId)) {
    filmBtn.innerHTML = 'Remove from Library';
  } else {
    filmBtn.innerHTML = 'Add to Library';
  }
}

// ------------------------------------------- CREATING MARKUP ---------------------------------------------

function createMarkup(movie) {
  return `
    <div class="modal-card-left-wrap">
        <div class="modal-card-thumb">
            <img
                srcset="
                    https:/image.tmdb.org/t/p/w342/${movie.poster_path} 342w,
                    https:/image.tmdb.org/t/p/w500/${movie.backdrop_path} 500w,
                    https:/image.tmdb.org/t/p/w780/${movie.backdrop_path} 780w,
                    https:/image.tmdb.org/t/p/original/${
                      movie.backdrop_path
                    } 2000w
                "
                sizes="(min-width: 320px),
                    (min-width: 768px),
                    (min-width: 1280px),
                "
                src="https:/image.tmdb.org/t/p/original/${movie.backdrop_path}"
                alt="${movie.title}"
                class="modal-card-image"
            />
        </div>
    </div>
    <div class="umodal-card-right-wrap">
        <h2 class="modal-card-movie-title">${movie.title}</h2>
        <table class="modal-card-table">
            <tr class="modal-card-tab-row">
                <td class="modal-card-data">Vote / Votes</td>
                <td class="modal-card-data-average">
                    <span class="modal-card-average">${
                      movie.vote_average
                    }</span>/<span class="modal-card-count">${
    movie.vote_count
  }</span>
                </td>
            </tr>
            <tr class="modal-card-tab-row">
                <td class="modal-card-data">Popularity</td>
                <td class="modal-card-data-get">${movie.popularity.toFixed(
                  1
                )}</td>
            </tr>
            <tr class="modal-card-tab-row">
                <td class="modal-card-data">Genre</td>
                <td class="modal-card-data-get">${getGenres()
                  .filter(({ id }) => movie.genre_ids.includes(id))
                  .map(({ name }) => name)
                  .slice(0, 2)
                  .join(', ')}</td>
            </tr>
        </table>
        <p class="modal-card-about">About</p>
        <p class="modal-card-about-descr">${movie.overview}</p>
        <button type="button" class="modal-card-btn" data-movie-id="${
          movie.id
        }">Add to my library</button>
    </div>
    `;
}

//  --------------------------------------- CLOSING MODAL ---------------------------------------------

document.getElementById('modal-close-btn').addEventListener('click', () => {
  closeModal();
});

function closeModal() {
  refs.Backdrop.classList.add('is-hidden');
  refs.ModalCont.classList.add('is-hidden');
  document.body.style.overflow = 'auto';
  document.removeEventListener('keydown', onEscBtnPress);
  document.removeEventListener('click', onBackdropClick);
}

//  on escape ----------------------

// function onEscBtnPress(e) {
//     if (e.code === 'Escape') {
//       closeModalDescr();
//     }
//   }

//   //  on clicking elsewhere ---------

//   function onBackdropClick(e) {
//     if (e.target === refs.Backdrop) {
//       closeModalDescr();
//     }
//   }

//   //  on button -------------------

//   document.getElementById('modal-close-btn').addEventListener('click', () => {
//     closeModal();
//   });

//   function closeModalDescr(e) {
//     refs.Backdrop.classList.add('is-hidden');
//     refs.ModalCont.classList.add('is-hidden');
//     document.body.style.overflow = 'scroll';
//     document.removeEventListener('keydown', onEscBtnPress);
//     document.removeEventListener('click', onBackdropClick);
//     document.removeEventListener('click', AddFilmToLibrary);
//     if (refs.libraryList) {
//       renderLibraryData();
//       refs.cardList = document.querySelector('.films');
//       if (refs.cardList) refs.cardList.addEventListener('click', createModal)
//     }
//   }

//   --------------------------------------- NOTES ------------------------------------------------------

// -------------------------------------- CREATING MARKUP ALTERNATIVES ----------------------------------------

//   function createMarkup({
//     id,
//     poster_path,
//     title,
//     overview,
//     popularity,
//     vote_average,
//     vote_count,
//     genres,
//   }) {
//     const getMoviePoster = getPoster(poster_path);
//     function getPoster(poster_path) {
//       if (poster_path === null || !poster_path) {
//         return `src='${comingSoonImg}'`;
//       }
//       return `srcset="
//                   https://image.tmdb.org/t/p/w500/${poster_path} 500w,
//                   https://image.tmdb.org/t/p/w300/${poster_path} 342w,
//                   https://image.tmdb.org/t/p/w185/${poster_path} 185w"
//           src="https://image.tmdb.org/t/p/w500/${poster_path}"

//           " sizes=" (min-width: 768px) 500px, (min-width: 480px) 342px, (min-width: 320px) 185px, 100vw"
//       `;
//     }

//   return `<div class="modal-film__container" data-id=${id}>
//   <button class="modal-film__close">
//     <svg width="18" height="18" class="modal-film__close-icon">
//     <use href="${sprite}#icon-cross-closed"></use>
// </svg>
//   </button>
//   <img ${getMoviePoster} loading="lazy" alt="movie-poster" class="modal-film__img" />
//   <div class="modal-film__card">
//     <h2 class="modal-film__title">${title}</h2>
//     <div class="modal-film__blok">
//       <ul class="modal-film__list attribute">
//         <li class="modal-film__link">Vote / Votes</li>
//         <li class="modal-film__link">Popularity</li>
//         <li class="modal-film__link">Genre</li>
//       </ul>

//       <ul class="modal-film__list">
//         <li class="modal-film__link-item item-votes">
//           <div class="vote">${vote_average}</div>
//           &nbsp;/&nbsp;
//           <div class="votes">${vote_count}</div>
//         </li>
//         <li class="modal-film__link-item popularity">${popularity}</li>
//         <li class="modal-film__link-item genres">${genres
//           .map(g => g.name)
//           .join(', ')}</li>
//       </ul>
//     </div>
//     <h3 class="modal-film__about">ABOUT</h3>
//     <p class="modal-film__about-txt">${overview}
//     </p>
//     <button class="btn" id="mylibrary" data-action="add">Add to my library</button>`;
// }

//  ---------------------------------------- OR ELSE ------------------------------------------------------
//  ------------------------------------------------- OR ELSE ----------------------------------------------------

// function createFilmMarkup(data) {
//   if (data) {
//     const {
//       original_title,
//       id,
//       genre_names,
//       release_date,
//       vote_average,
//       poster_path,
//       overview,
//       popularity,
//       vote_count,
//     } = data;

//     //   if (poster_path) {
//     //     posterPath = `${IMG_BASE_URL}${IMG_W400}${poster_path}`;
//     //   } else {
//     //     posterPath = 'https://i.ibb.co/C0LFwTh/OIF.jpg';
//     //   }

//     return `<li class='film-list' data-id='${id}'>
//             <ul class='film-list__list'>
//             <li class='film-list__img'>
//               <img
//                 src='${imgScrSet}'
//                 alt='${original_title}'
//                 loading='lazy'
//               />
//               </li>
//               <li class='film-list__info'>
//               <h2 class='film-list__title'>${original_title}</h2>
//               <div class="film-list__char">
//                 <div class="film-list__title_text">
//                   <p>Vote / Votes</p>
//                   <p>Popularity</p>
//                   <p class='film-list__title_text'>Genre</p>
//                 </div>
//                 <div  class="film-list__title_char">
//                   <p class='film-list__text_average'><span  class='film-list__average'>${vote_average}</span>  /  <span  class='film-list__average'>${vote_count}</span></p>
//                   <p class='film-list__text'>${popularity}</p>
//                   <p class='film-list__text'>${genresList}</p>
//                 </div>
//               </div>
//               <div class='film-list__about'>
//               <p class='film-list__title_text-about'>ABOUT</p>
//               <p class='film-list__text-about'>${overview}</p>
//                </div>
//                <div class="film__button-border">
//                <button type="button" class="film__button">Add to my library</button>
//            </div>
//           </li>
//         </ul>
//     </li>`;
//   }
// }

// ------------------------------------------ CLOSE MODAL -----------------------------------------------

// document.getElementById('modal-close-btn').addEventListener('click', () => {
//     closeModal();
//   });

// ------------------------------- SEARCH MOVIE ---------------------------------

// import TMDBApiService from './tmdb-api';
// function show(id) {
//   const myService = new TMDBApiService(key);
//   myService;
//     .fetchMovieById(569094)
//         .then((resp) => {
//             ref = document.querySelector(.box);
//             ref.innerHNML=func(resp)
//             ref.classList.To
//             ref.addEventListener

//          })
//     .catch((e) => console.error(e));
// }
// show(569094)

// ----------------------- GET FILM CARD ----------------------------------

// import dataFromApi from './testcatalog.json';

// import getFilmCard from './js/film-card';
// import {
//   saveToLibrary,
//   getLibraryList,
//   isInLibrary,
//   removeFromLibrary,
// } from './js/local-storage';

// const { results } = dataFromApi;

// ref = document.querySelector('.container.catalog');
// console.log(ref);

// // ref.innerHTML = results
// //   .map(a => getFilmCard(a, x => String(Math.round(x * 2) / 2)))
// //   .join('');
