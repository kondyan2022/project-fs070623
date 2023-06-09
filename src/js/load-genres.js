import TMDBApiService from './tmdb-api';

const { date } = JSON.parse(localStorage.getItem('genres')) ?? { date: 0 };
if ((Date.now() - date) / 86400000 > 1) {
  const myService = new TMDBApiService();
  myService
    .fetchGenres()
    .then(({ data: { genres } }) => {
      localStorage.setItem(
        'genres',
        JSON.stringify({ date: Date.now(), genres })
      );
    })
    .catch(e => console.error(e));
}
