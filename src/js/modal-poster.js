import createMarkupModalPoster from './modal-card';
import TMDBApiService from './tmdb-api';
import testData from '../testcatalog.json';
import { totopOn, totopOff } from './totop';

import {
  saveToLibrary,
  removeFromLibrary,
  getLibraryList,
  isInLibrary,
} from './local-storage';

//  ------------------------------------------ VARIABLES --------------------------------------------------

const refs = {
  backdrop: document.querySelector('.backdrop'),
  modalPoster: document.querySelector('.modal-poster'),
};

// ------------------------------------------ OPENING MODAL --------------------------------------------------

const myService = new TMDBApiService();

export async function openModalCard(id) {
  try {
    totopOff();
    const { data } = await myService.fetchMovieById(id);
    data.genre_ids = data.genres.map(({ id }) => id);
    refs.modalPoster.innerHTML = createMarkupModalPoster(data);
    refs.backdrop.classList.remove('is-hidden');
    refs.modalPoster.classList.remove('is-hidden');
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onEscKeyPress);
    document.addEventListener('click', onBackdropClick);
    changeBtnLibrary(id);
    document
      .querySelector('.modal-card-btn')
      .addEventListener('click', function (event) {
        const el = event.target.closest('[film-id]');

        if (el) {
          id = Number(el.getAttribute('film-id'));
          if (isInLibrary(id)) {
            removeFromLibrary(id);
          } else {
            saveToLibrary(data);
          }
          changeBtnLibrary(id);
        }
      });
    document.getElementById('modal-close-btn').addEventListener('click', () => {
      closeModal();
    });
  } catch (error) {
    console.error(error);
  }
}

// ------------------------------ ADDING & REMOVING FROM LIBRARY --------------------------------------

function changeBtnLibrary(filmsId) {
  if (isInLibrary(filmsId)) {
    document.querySelector('.modal-card-btn').textContent =
      'Remove from Library';
  } else {
    document.querySelector('.modal-card-btn').textContent = 'Add to Library';
  }
}

//  --------------------------------------- CLOSING MODAL ---------------------------------------------

function closeModal() {
  const curForm = refs.modalPoster.firstChild;
  const film_id = refs.modalPoster.firstChild.getAttribute('film-id');
  const myEvent = new CustomEvent('removeCard', { detail: { film_id } });

  if (!isInLibrary(film_id)) {
    document.dispatchEvent(myEvent);
  }

  refs.backdrop.classList.add('is-hidden');
  refs.modalPoster.classList.add('is-hidden');
  document.body.style.overflow = 'auto';
  totopOn();
  document.removeEventListener('keydown', onEscKeyPress);
  document.removeEventListener('click', onBackdropClick);
}

function onEscKeyPress(event) {
  if (event.code === 'Escape') {
    closeModal();
  }
}

function onBackdropClick(event) {
  if (event.target === refs.backdrop) {
    closeModal();
  }
}
