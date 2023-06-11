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
   let searchInput = '';
   let searchYear = '';


   ref.input.addEventListener('input', onInput);
   function onInput (element) {
        ref.deleteBtnInput.classList.remove('cataloge-btn-delete')
        const valueInp = element.target.value.trim();
        console.log(valueInp);
        if(valueInp === '') {
       Notiflix.Notify.info('');
       ref.deleteBtnInput.classList.add('cataloge-bnt-delete');
       ref.oopsNotFind.classList.add('oops-not-find-hide');
       ref.choseMovie.classList.remove('choose-movie-hide');
        }
    }

    ref.form.addEventListener('submit', onSubmit);



function onSubmit(e) {
    e.preventDefault();
    searchInput = e.currentTarget.elements.SearchQuery.value.trim();
    searchYear = e.currentTarget.elements.selectYear.value;

    if(searchInput == '') {
        ref.choseMovie.classList.remove('choose-movie-hide');
        newElement.innerHTML = results
        .map(a => getFilmCard(a, x =>
            String(Math.round(x * 2) / 2)))
            .join('')
    } else {
        const catalogURL = `https://api.themoviedb.org/3/search/movie?query=${searchInput}&include_adult=false&language=en-US&release_date.gte=${searchYear}&page=1`;

        newElement.innerHTML = '';
        ref.choseMovie.classList.add('choose-movie-hide');
        ref.oopsNotFind.classList.add('oops-not-find-hide');
        ref.deleteBtnInput.classList.add('cataloge-bnt-delete');

        getFilmCard()
        ref.form.reset()
    }
    }

//Видаляємо з
ref.deleteBtnInput.addEventListener('click', deleteValueInput);

async function deleteValueInput (el) {
el.preventDefault()
ref.form.reset()
ref.deleteBtnInput.classList.add('cataloge-btn-delete');
ref.choseMovie.classList.add('choose-movie-hide');
ref.oopsNotFind.classList.add('oops-not-find-hide');
// const  catalogTrend = 'https://api.themoviedb.org/3/trending/all/week?page=1';
newElement.innerHTML = results
        .map(a => getFilmCard(a,x=>
            String(Math.round(x * 2) / 2)))
            .join('')
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
console.log('pagination:', pagination)
let pageForPagination = 1;

console.log('pageForPagination:', pageForPagination)

pagination.on('afterMove', (event) => {
    const currentPage = event.page;
   pageForPagination = currentPage;  
  console.log(currentPage);

  
});
console.log('pageForPagination:', pageForPagination)

