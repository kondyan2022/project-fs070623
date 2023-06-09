import TMDBApiService from './tmdb-api';

const myService = new TMDBApiService();
console.log(myService);

const weeklyGallery = document.querySelector('.weekly-gallery');
console.log(weeklyGallery);

myService
  .fetchTrendingWeekMovies()
  .then(resp => console.log('Week', resp))
  .catch(e => console.error(e));
