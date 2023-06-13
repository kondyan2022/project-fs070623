import TMDBApiService from './tmdb-api';
import getFilmCard from './film-card';
import getFiveStar from './fivezerostar';

import { openModalCard } from './modal-poster';
//import getGenres from './get-genres';

const myService = new TMDBApiService();
const weeklyGallery = document.querySelector('.weekly-gallery');

weeklyGallery.addEventListener('click', hendlerOpenModalWindow);

function hendlerOpenModalWindow(evt) {
  const el = evt.target.closest('[film-id]');
  if (el) {
    openModalCard(el.getAttribute('film-id'));
  }
}

renderGalleryWeekly();

function renderGalleryWeekly() {
  myService
    .fetchTrendingWeekMovies()
    .then(resp => {
      const movies = resp.data.results;

      const indexes = rendomIndx(movies.length - 1);
      const weeklyMovies = [];

      indexes.forEach(index => {
        const movie = movies[index];
        weeklyMovies.push(movie);
      });

      function createMarkup(arr) {
        return weeklyMovies.map(a => getFilmCard(a, getFiveStar)).join('');
      }

      weeklyGallery.innerHTML = createMarkup(weeklyMovies);
    })
    .catch(e => console.error(e));
}

function rendomIndx(x) {
  const moviesIndx = [];

  while (moviesIndx.length < 3) {
    const num = Math.floor(Math.random() * x);

    if (moviesIndx.includes(num)) {
      continue;
    } else {
      moviesIndx.push(num);
    }
  }
  return moviesIndx;
}
