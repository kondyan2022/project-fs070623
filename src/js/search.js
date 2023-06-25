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

        pagination.myReset(totalResults);

        // console.log(`Total pages: ${totalPages}`);
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
      '<a href="#" class="tui-page-btn tui-{{type}} custom-class-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}} custom-class-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
};

const pagination = new Pagination(refs.paginationElem, options);
pagination.tuiRefs = {
  first: refs.paginationElem.querySelector('.tui-first'),
  last: refs.paginationElem.querySelector('.tui-last'),
  next: refs.paginationElem.querySelector('.tui-next'),
  prev: refs.paginationElem.querySelector('.tui-prev'),
  start: refs.paginationElem.querySelector('.tui-first-child'),
  end: refs.paginationElem.querySelector('.tui-last-child'),
};
pagination.myReset = async function (totalItems) {
  this.reset(totalItems);
  console.log(totalItems, this);
};

//=====================================================

pagination.on('afterMove', async event => {
  const currentPage = event.page;
  pageForPagination = currentPage;
  try {
    const res = await myService.fetchSearchMovies(pageForPagination);
    const movies = res.data.results;
    displayMovies(movies);
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
