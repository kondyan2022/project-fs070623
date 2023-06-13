//  -------------------------------------------- IMPORTS -------------------------------------------------

import TMDBApiService from './tmdb-api';
// import getGenres from './get-genres';
// import dataFromApi from '../testcatalog.json';
// import {
//   saveToLibrary,
//   removeFromLibrary,
//   getLibraryList,
//   isInLibrary,
// } from './local-storage';

//  ------------------------------------------ VARIABLES --------------------------------------------------

const refs = {
  openModal: document.querySelector('.film-card'),
  closeModal: document.querySelector('.modal-close-btn'),
  Backdrop: document.querySelector('.backdrop'),
  ModalCont: document.querySelector('.modal-poster-container'),
  // cardsfilm: document.querySelector(''),
  FilmBtn: document.querySelector('.modal-card-btn'),
  libraryList: document.querySelector('.library-list'),
  // cardList: document.querySelector(''),
};

// ------------------------------------------ OPENING MODAL --------------------------------------------------

// if (refs.openModal) {
//   refs.openModal.addEventListener('click', createModal);
// }

// //   Для того, щоб все це спрацьовувало, треба на сторінках (HOME, CATALOG)
// //   додати в розмітці карточкам клас "film-card" як у відповідному файлі

// function createModal(event) {
//   const selectedMovie = event.target.closest('li');
//   selectedMovieId = Number(selectedMovie.getAttribute('data-id'));
//   refs.closeModal.addEventListener('click', closeModalDescr);

//   createMarkup(selectedMovieId);

//   openModalCard();
// }

const myService = new TMDBApiService();

async function openModalCard(id) {
  try {
    const { data } = await myService.fetchMovieById(id);
    console.log('modal', data);
    document.querySelector('.modal-poster').innerHTML = createMarkup(data);
    document.querySelector('.backdrop').classList.remove('is-hidden');
    document.querySelector('.modal-poster').classList.remove('is-hidden');
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onEscBtnPress);
    document.addEventListener('click', onBackdropClick);
    document.getElementById('modal-close-btn').addEventListener('click', () => {
      closeModal();
    });
  } catch (error) {
    console.error(error);
  }
}

// ------------------------------------------- CREATING MARKUP ---------------------------------------------

function createMarkup(movie) {
  console.log(movie);
  return `
  <div class="modal-film-container">
  <button id="modal-close-btn" class="close-button">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="close-icon">
    <path d="M18 6L6 18M6 6l12 12"></path>
  </svg>
</button>
            <img class= "modal-img"
                srcset="
                    https:/image.tmdb.org/t/p/w342/${movie.poster_path} 342w,
                    https:/image.tmdb.org/t/p/w500/${movie.poster_path} 500w,
                    https:/image.tmdb.org/t/p/w780/${movie.poster_path} 780w,
                    https:/image.tmdb.org/t/p/original/${
                      movie.poster_path
                    } 2000w
                "
                sizes="(min-width:1280px) 375px,
                (min-width:768px) 294px,
                (min-width:320px) 248px,
                "
                src="https:/image.tmdb.org/t/p/original/${movie.poster_path}"
                alt="${movie.title}"
            />
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
                <td class="modal-card-data-get"> убрал </td>
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
// ${getGenres()
//                   .filter(({ id }) => movie.genre_ids.includes(id))
//                   .map(({ name }) => name)
//                   .slice(0, 2)
//                   .join(', ')}
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

//  --------------------------------------- CLOSING MODAL ---------------------------------------------

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
// openModalCard(603692);
