import getFilmCard from './film-card.js';
import TMDBApiService from './tmdb-api.js';
import dataFormApi from '../testcatalog.json';
const { results } = dataFormApi;
import Notiflix from 'notiflix';
import Pagination from 'tui-pagination';
import getFiveStar from './fivezerostar.js';
import { openModalCard } from './modal-poster.js';
// import 'tui-pagination/dist/tui-pagination.css';

const ref = {
  form: document.querySelector('.cataloge-search-form'),
  input: document.querySelector('.cataloge-search-input'),
  selectYear: document.getElementById('selectYear'),
  deleteBtnInput: document.querySelector('.cataloge-btn-delete'),
  searchBtn: document.getElementById('searchBtn'),
  // oopsNotFind: document.querySelector('.oops-not-find'),
  // choseMovie: document.querySelector('.choose-movie'),
};

const newElement = document.querySelector('.catalog-list-gallery');
const myService = new TMDBApiService();

//    слухач на блок з картинками
newElement.addEventListener('click', handleFilmCardClick);

function handleFilmCardClick(event) {
  const el = event.target.closest('[film-id]');
  if (el) {
    openModalCard(el.getAttribute('film-id'));
  }
}

//Фільми тижня
function showTrendingMovies() {
  myService
    .fetchTrendingWeekMovies()
    .then(response => {
      const trendingMovies = response.data.results;
      displayMovies(trendingMovies);
    })
    .catch(error => {
      console.error(error);
    });
}
showTrendingMovies();

function displayMovies(movies) {
  if (movies.length === 0) {
    Notiflix.Notify.info('No trending movies found');
  } else {
    newElement.innerHTML = movies
      .map(a => getFilmCard(a, getFiveStar))
      .join('');
  }
}

ref.input.addEventListener('input', onInput);

function onInput(element) {
  ref.deleteBtnInput.classList.remove('btn-hide');
  const valueInp = element.target.value.trim();

  if (valueInp === '') {
    showTrendingMovies();
    ref.deleteBtnInput.classList.add('btn-hide');
    refs.paginationElem.classList.add('tui-pagination');
    newElement.innerHTML = '';
  }
}

ref.form.addEventListener('submit', onSubmit);

let searchInput = '';
let searchYear = '';
let currentPage = 1;

function onSubmit(e) {
  e.preventDefault();

  searchInput = e.target.elements.SearchQuery.value.trim();
  searchYear = e.target.elements.selectYear.value;
  if (searchInput === '') {
    Notiflix.Notify.info('Введіть ключове слово для пошуку фільму');
    return;
  }
  if (searchYear === '') {
    myService.releaseYear = null;
  } else {
    myService.releaseYear = searchYear;
  }
  myService.searchQuery = searchInput;
  myService
    .fetchSearchMovies()
    .then(res => {
      const movies = res.data.results;
      if (movies.length === 0) {
        Notiflix.Notify.failure('Фільми не знайдені');
        ref.deleteBtnInput.classList.add('btn-hide');
      } else {
        displayMovies(movies);
        const {
          page: currentPage,
          total_results: totalResults,
          total_pages: totalPages,
        } = res.data;

        pagination.reset(totalResults);
      }
    })
    .catch(error => {
      console.error(error);
    });
}

ref.deleteBtnInput.addEventListener('click', deleteValueInput);

async function deleteValueInput(el) {
  el.preventDefault();
  ref.form.reset();
  ref.deleteBtnInput.classList.add('btn-hide');

  try {
    const response = await myService.fetchTrendingWeekMovies();
    const trendingMovies = response.data.results;
    displayMovies(trendingMovies);
  } catch (error) {
    console.error(error);
  }
}
// ПАГІНАЦІЯ
const refs = {
  paginationElem: document.querySelector('.tui-pagination'),
};

const options = {
  totalItems: 20,
  itemsPerPage: 20,
  visiblePages: 3,
  centerAlign: true,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  //
  template: {
    page: '<a href="#" class="tui-page-btn">{{page}}</a>',
    currentPage:
      '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<a href="#" class="tui-page-btn tui-{{type}} custom-class-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{page}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}} custom-class-{{type}}" hidden>' +
      '<span class="tui-ico-{{type}}">{{type}}d</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip custom-class-{{type}}">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
};

const pagination = new Pagination(refs.paginationElem, options);
pagination.reset = function (totalItems) {
  // this._view._buttons.prevMore.hidden = false;
  // this._view._buttons.first.hidden = false;
  // this._view._buttons.last.hidden = false;
  // this._view._buttons.nextMore.hidden = false;
  this.__proto__.reset.call(this, totalItems);
  console.log(this);
  if (this._getLastPage() <= this._options.visiblePages) {
    this._view._containerElement.lastChild.hidden = true;
  } else if (this._getLastPage() === this._options.visiblePages + 1) {
    this._view._containerElement.lastChild.hidden = false;
    this._view._containerElement.lastChild.previousSibling.previousSibling.hidden = true;
  } else {
    this._view._containerElement.lastChild.hidden = false;
    this._view._containerElement.lastChild.previousSibling.previousSibling.hidden = false;
  }
  this._view._buttons.first.textContent = 1;
  this._view._buttons.last.textContent = this._getLastPage();
  console.log(this);
};

let pageForPagination = 0;

pagination.on('afterMove', async function (event) {
  const currentPage = event.page;
  pageForPagination = currentPage;
  try {
    const res = await myService.fetchSearchMovies(pageForPagination);
    const movies = res.data.results;
    displayMovies(movies);

    console.log(pagination._view._buttons.prevMore.hidden);
  } catch (error) {
    console.log(error);
  }
});
pagination.on('afterMove', function (event) {
  const currentPage = event.page;
  console.log(pagination._options.itemsPerPage);
  if (pagination._options.visiblePages >= pagination._getLastPage()) {
    pagination._view._buttons.prevMore.hidden = true;
    pagination._view._buttons.first.hidden = true;
    pagination._view._buttons.last.hidden = true;
    pagination._view._buttons.nextMore.hidden = true;
  } else if (
    pagination._options.visiblePages + 1 ===
    pagination._getLastPage()
  ) {
    pagination._view._buttons.prevMore.hidden = true;
    pagination._view._buttons.nextMore.hidden = true;
    pagination._view._buttons.first.hidden = currentPage <= 2;
    pagination._view._buttons.last.hidden =
      currentPage >= pagination._getLastPage() - 1;
    console.log(pagination._view._buttons);
  } else {
    pagination._view._buttons.prevMore.hidden =
      currentPage < pagination._options.visiblePages + 1;
    pagination._view._buttons.first.hidden =
      currentPage < pagination._options.visiblePages;
    pagination._view._buttons.last.hidden =
      pagination._getLastPage() - currentPage <
      pagination._options.visiblePages - 1;
    pagination._view._buttons.nextMore.hidden =
      pagination._getLastPage() - currentPage <
      pagination._options.visiblePages;
  }
});
