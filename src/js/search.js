import getFilmCard from './film-card.js';  // розмітку HTML для відображення карточки фільму.
import TMDBApiService from './tmdb-api.js' // пошук фільмів 

import dataFormApi from '../testcatalog.json';
const {results} = dataFormApi;

import Notiflix from 'notiflix';

import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

const ref = {
    form: document.querySelector('.cataloge-search-form'),
    input: document.querySelector('.cataloge-search-input'),
    selectYear: document.getElementById('selectYear'),
    deleteBtnInput: document.querySelector('.cataloge-btn-delete'),
    searchBtn: document.getElementById('searchBtn'),
    oopsNotFind: document.querySelector('.oops-not-find'),
    choseMovie: document.querySelector('.choose-movie'),
    }

   const newElement = document.querySelector('.catalog-list-gallery');
   const myService = new TMDBApiService();

//Фільми тижня
myService.fetchTrendingWeekMovies()
  .then((response) => {
    const trendingMovies = response.data.results;
    displayMovies(trendingMovies);
  })
  .catch((error) => {
    console.error(error);
  });


  function displayMovies(movies) {
    if (movies.length === 0) {
      // Показати повідомлення, що трендові фільми тижня не знайдено
      Notiflix.Notify.info('No trending movies found');
    } else {
      newElement.innerHTML = movies
        .map((movie) => getFilmCard(movie, (x) => String(Math.round(x * 2) / 2)))
        .join('');
    }
  }
 
ref.input.addEventListener('input', onInput);

   function onInput (element) {
        ref.deleteBtnInput.classList.remove('cataloge-btn-delete')
        const valueInp = element.target.value.trim();
        console.log(valueInp);
        if(valueInp === '') {
       Notiflix.Notify.info('Please, enter the name of the movie');
       ref.deleteBtnInput.classList.add('btn-hide');
       ref.oopsNotFind.classList.add('oops-not-find-hide');
       ref.choseMovie.classList.remove('choose-movie-hide');
       refs.paginationElem.classList.add('tui-pagination');
       newElement.innerHTML = "";
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
      myService.fetchSearchMovies(1)
          .then((res) => {
              const movies = res.data.results;
              if (movies.length === 0) {
                  Notiflix.Notify.failure('Фільми не знайдені');
                  ref.choseMovie.classList.add('choose-movie-hide');
                  ref.oopsNotFind.classList.add('oops-not-find-hide');
                  ref.deleteBtnInput.classList.add('cataloge-bnt-delete');
              } else {
                  displayMovies(movies);
                  currentPage = 1;
                  totalPages = res.data.total_pages;
                  pagination.reset(totalPages)

                  console.log(`Total pages: ${totalPages}`)
              }
          })
          .catch((error) => {
              console.error(error);
          });
  }


ref.deleteBtnInput.addEventListener('click', deleteValueInput);

async function deleteValueInput (el) {
el.preventDefault()
ref.form.reset()
ref.deleteBtnInput.classList.add('cataloge-btn-delete');
ref.choseMovie.classList.add('choose-movie-hide');
ref.oopsNotFind.classList.add('oops-not-find-hide');
// const  catalogTrend = 'https://api.themoviedb.org/3/trending/all/week?page=1';
// newElement.innerHTML = results
//         .map(a => getFilmCard(a,x=>
//             String(Math.round(x * 2) / 2)))
//             .join('')
try {
    const response = await myService.fetchTrendingWeekMovies()
    const trendingMovies = response.data.results;
    displayMovies(trendingMovies);
} catch (error){
    console.error(error)
}

}







// ПАГІНАЦІЯ
const refs = {
    paginationElem: document.querySelector('.tui-pagination'),
}


const options = { 
     totalItems: 1000,
     itemsPerPage: 20,
     visiblePages: 6,
     page: 1,
     centerAlign: false,
     firstItemClassName: 'tui-first-child',
     lastItemClassName: 'tui-last-child',
     template: {
         page: '<a href="#" class="tui-page-btn">{{page}}</a>',
         currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
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
             '</a>'
     }
}


const pagination = new Pagination(refs.paginationElem, options);

let pageForPagination = 1;

pagination.on('afterMove', async (event) => {
    const currentPage = event.page;
   pageForPagination = currentPage;  
   try {
    const res = await myService.fetchUpcomingMovies(pageForPagination)
    const movies = res.data.results;
    displayMovies(movies);
   } catch (error){
    console.log(error);
   }
  });


