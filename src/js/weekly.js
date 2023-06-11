import TMDBApiService from './tmdb-api';
import getFilmCard from './film-card';
//import getGenres from './get-genres';

const myService = new TMDBApiService();
const weeklyGallery = document.querySelector('.weekly-gallery');

weeklyGallery.addEventListener('click', hendlerOpenModalWindow);

function hendlerOpenModalWindow(evt) {
  console.log(evt.target.getAttribute('film-id'), 'Це id фільму');
}

renderGalleryWeekly();

function renderGalleryWeekly() {
  myService
    .fetchTrendingWeekMovies()
    .then(resp => {
      const movies = resp.data.results;
      console.log(movies); //отримуємо першу сторінку трендов тижня (20шт)

      // отримуємо масив з 3х рендомних індексів
      const indexes = rendomIndex(movies.length - 1);
      // отримуємо масив з 3х фильмів.
      const weeklyMovies = [];

      indexes.forEach(index => {
        const movie = movies[index];
        weeklyMovies.push(movie);
      });

      function createMarkup(arr) {
        return weeklyMovies
          .map(a => getFilmCard(a, x => String(Math.round(x * 2) / 2)))
          .join('');
      }

      weeklyGallery.innerHTML = createMarkup(weeklyMovies);
      console.log(weeklyMovies);
    })
    .catch(e => console.error(e));
}

function rendomIndex(x) {
  const rendomIndexes = [];
  for (let i = 0; rendomIndexes.length < 3; i++) {
    const num = Math.floor(Math.random() * x);

    if (!rendomIndexes.includes(num)) {
      rendomIndexes.push(num);
    }
  }
  return rendomIndexes;
}
