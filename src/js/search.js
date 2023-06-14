import getFilmCard from './film-card.js';  
import TMDBApiService from './tmdb-api.js' 
import dataFormApi from '../testcatalog.json';
const {results} = dataFormApi;
import Notiflix from 'notiflix';
import Pagination from 'tui-pagination';
// import 'tui-pagination/dist/tui-pagination.css';

const ref = {
    form: document.querySelector('.cataloge-search-form'),
    input: document.querySelector('.cataloge-search-input'),
    selectYear: document.getElementById('selectYear'),
    deleteBtnInput: document.querySelector('.cataloge-btn-delete'),
    searchBtn: document.getElementById('searchBtn'),
    // oopsNotFind: document.querySelector('.oops-not-find'),
    // choseMovie: document.querySelector('.choose-movie'),
    }

   const newElement = document.querySelector('.catalog-list-gallery');
   const myService = new TMDBApiService();
   

//    слухач на блок з картинками
newElement.addEventListener('click', handleFilmCardClick);

function handleFilmCardClick(event) {
  const clickedFilmCard = event.target.closest('.film-card');
  
  if (clickedFilmCard) {
    // Обробка кліку на блок "film-card"
    console.log(clickedFilmCard.getAttribute('.film-card'))
  }
}


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
      Notiflix.Notify.info('No trending movies found');
    } else {
      newElement.innerHTML = movies
        .map((movie) => getFilmCard(movie, (x) => String(Math.round(x * 2) / 2)))
        .join('');
    }
  }
 
ref.input.addEventListener('input', onInput);

   function onInput (element) {
        ref.deleteBtnInput.classList.remove('btn-hide')
        const valueInp = element.target.value.trim();
        console.log(valueInp);
        if(valueInp === '') {
       Notiflix.Notify.info('Please, enter the name of the movie');
       ref.deleteBtnInput.classList.add('btn-hide');
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
      myService.fetchSearchMovies()
          .then((res) => {
              const movies = res.data.results;
              if (movies.length === 0) {
                  Notiflix.Notify.failure('Фільми не знайдені');
                  ref.deleteBtnInput.classList.add('btn-hide');
              } else {
                  displayMovies(movies);
                  currentPage = res.data.page;
                  const totalPages = res.data.total_pages;
                  pagination.reset({
                    })

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
ref.deleteBtnInput.classList.add('btn-hide');

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
     visiblePages: 4,
     page: 1,
     centerAlign: false,
     firstItemClassName: 'tui-first-child',
     lastItemClassName: 'tui-last-child',
}


const pagination = new Pagination(refs.paginationElem, options);

let pageForPagination = 0;

pagination.on('afterMove', async (event) => {
    const currentPage = event.page;
   pageForPagination = currentPage;  
   try {
    const res = await myService.fetchSearchMovies(pageForPagination)
    const movies = res.data.results;
    displayMovies(movies);
    scrollToTop();
   } catch (error){
    console.log(error);
   }
  });

  function scrollToTop(){
    window.scrollTo({
        top:0,
        behavior: 'smooth'
    });
  }


