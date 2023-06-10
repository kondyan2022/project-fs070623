// import TMDBApiService from './tmdb-api';
// import getFilmCard from './film-card';
// import dataFromApi from '../testcatalog.json';

// const myService = new TMDBApiService();
// const { results } = dataFromApi;
// console.log(results);

// const weeklyGallery = document.querySelector('.weekly-gallery');
// const weeklyList = document.querySelector('.weekly-list');

// weeklyList.innerHTML = results
//   .map(a => getFilmCard(a, x => String(Math.round(x * 2) / 2)))
//   .join('');

//renderGalleryWeekly();

// function renderGalleryWeekly() {
//   myService
//     .fetchTrendingWeekMovies()
//     .then(resp => console.log('Week', resp))
//     .catch(e => console.error(e));

//   weeklyList.innerHTML = createMarkupWeekly(results);
// }
// function createMarkupWeekly(arr) {
//   return arr
//     .map(
//       (
//         { id, title, poster_path, genre_ids, release_date, vote_average },
//         getStatrs
//       ) => getFilmCard
//     )
//     .join('');
// }

// myService
//   .fetchTrendingWeekMovies()
//   .then((resp) => console.log("Week", resp))
//   .catch((e) => console.error(e));

//example for getFilmCard

// import dataFromApi from './testcatalog.json';

// import getFilmCard from './js/film-card';
// const { results } = dataFromApi;

// ref = document.querySelector('.container.catalog');
// console.log(ref);

// ref.innerHTML = results
//   .map(a => getFilmCard(a, x => String(Math.round(x * 2) / 2)))
//   .join('');
