import createMarkupModalPoster from './modal-card';
import TMDBApiService from './tmdb-api';
import testData from '../testcatalog.json';

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
    const { data } = await myService.fetchMovieById(id);

    refs.modalPoster.innerHTML = createMarkupModalPoster(data);
    refs.backdrop.classList.remove('is-hidden');
    refs.modalPoster.classList.remove('is-hidden');
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onEscKeyPress);
    document.addEventListener('click', onBackdropClick);
    console.log('before', id);
    changeBtnLibrary(id);
    document
      .querySelector('.modal-card-btn')
      .addEventListener('click', event => {
        console.log('есть собітие');
        const el = event.target.closest('[film-id]');
        console.log(el);
        if (el) {
          id = Number(el.getAttribute('film-id'));
          console.log('>>>>', id);
          if (isInLibrary(id)) {
            console.log('remove', id);
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
  console.log('changeBtnLibrary', isInLibrary(filmsId), filmsId);
  if (isInLibrary(filmsId)) {
    console.log('Remove from Library');
    document.querySelector('.modal-card-btn').textContent =
      'Remove from Library';
  } else {
    document.querySelector('.modal-card-btn').textContent = 'Add to Library';
  }
}

//  --------------------------------------- CLOSING MODAL ---------------------------------------------

function closeModal() {
  refs.backdrop.classList.add('is-hidden');
  refs.modalPoster.classList.add('is-hidden');
  document.body.style.overflow = 'auto';
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
