import getFilmCard from './film-card.js';
import TMDBApiService from './tmdb-api.js';
import Notiflix from 'notiflix';
import Pagination from 'tui-pagination';
import getFiveStar from './fivezerostar.js';
import { openModalCard } from './modal-poster.js';

const myService = new TMDBApiService();

const refs = {
  galleryList: document.querySelector('.catalog-list-gallery'),
  form: document.querySelector('.cataloge-search-form'),
  deleteBtn: document.querySelector('.cataloge-btn-delete'),
  input: document.querySelector('.cataloge-search-input'),
};

//======================Відкриття модального вікна з постером ============================/

refs.galleryList.addEventListener('click', hendlerOpenModalWindow);

function hendlerOpenModalWindow(evt) {
  const el = evt.target.closest('[film-id]');
  if (el) {
    openModalCard(el.getAttribute('film-id'));
  }
}

// -----------------Pagination---------------//

const paganationElem = document.querySelector('.tui-pagination');

const options = {
  totalItems: 1000,
  itemsPerPage: 20,
  visiblePages: 4,
  centerAlign: true,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage:
      '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
};

const paganation = new Pagination(paganationElem, options);

//---------------------Рендерим трендові фільми тижня-------------------------//

renderGalleryWeekly(1);

function renderGalleryWeekly(page) {
  myService.currentPage = page;
  myService
    .fetchTrendingWeekPageMovies()
    .then(resp => {
      const movies = resp.data.results;

      if (page === 1) {
        paganation.reset(myService.totalItems);
      }
      if (movies.length === 0) {
        Notiflix.Notify.info('No trending movies found');
      } else {
        refs.galleryList.innerHTML = createMarkup(movies);
      }
    })
    .catch(e => console.error(e));
}

//================ Розмітка галлереї ====================
function createMarkup(movies) {
  return movies.map(a => getFilmCard(a, getFiveStar)).join('');
}

//=====================================================

paganation.on('afterMove', event => {
  const currentPage = event.page;

  if (myService.searchString || myService.releaseYear) {
    myService.currentPage = currentPage;

    myService
      .fetchSearchMovies()
      .then(resp => {
        const movies = resp.data.results;

        if (currentPage === 1) {
          paganation.reset(myService.totalItems);
        }

        refs.galleryList.innerHTML = createMarkup(movies);
      })
      .catch(e => console.error(e));
  } else {
    renderGalleryWeekly(currentPage);
  }
});

//================ handlerSubmitForm ===============/

refs.form.addEventListener('submit', handlerSubmitForm);

function handlerSubmitForm(evt) {
  evt.preventDefault();
  const searchWord = evt.target.SearchQuery.value.trim();
  const searchYear = evt.target.SearchYear.value;

  myService.searchString = searchWord;
  myService.searchYear = searchYear;

  if (searchWord === '') {
    Notiflix.Notify.warning('Enter the search data in the input box, please');
    return;
  }

  myService
    .fetchSearchMovies()
    .then(resp => {
      const movies = resp.data.results;

      if (myService.currentPage === 1) {
        paganation.reset(myService.totalItems);
      }
      refs.galleryList.innerHTML = createMarkup(movies);
    })
    .catch(e => console.error(e));
}

// ============== delateBtn ==================//

refs.input.addEventListener('input', handlerInput);
refs.deleteBtn.addEventListener('click', handlerDelateSearch);

function handlerInput(evt) {
  const result = evt.target.value.trim();
  if (result) {
    refs.deleteBtn.classList.remove('btn-hide');
  } else {
    refs.deleteBtn.classList.add('btn-hide');
  }
}
////================  Чистимо ввод крестиком ==============//

function handlerDelateSearch(evt) {
  refs.input.value = '';
  refs.deleteBtn.classList.add('btn-hide');
}
