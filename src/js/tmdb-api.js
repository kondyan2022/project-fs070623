import axios from 'axios';
const key =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NTAwNDA2MjQ0OWNlZGYyOTlkNDg4YmEwOTYwN2NmMCIsInN1YiI6IjY0N2YyMjVlOTM4MjhlMDBmOWQ5MDkwYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ceVszIuLrQRtXQoXFqHvHHwDyDl7RIua5Il818rGd8I';
export default class TMDBApiService {
  searchString;
  releaseYear;
  currentPage;
  totalPages;
  itemsPerPage = 20;
  totalItems;
  myAxios;
  constructor() {
    this.searchString = '';
    this.currentPage = 1;
    this.myAxios = axios.create({
      baseURL: 'https://api.themoviedb.org/3/',
      headers: {
        accept: 'application/json',
        // Authorization: `Bearer ${keyApi}`,
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NTAwNDA2MjQ0OWNlZGYyOTlkNDg4YmEwOTYwN2NmMCIsInN1YiI6IjY0N2YyMjVlOTM4MjhlMDBmOWQ5MDkwYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ceVszIuLrQRtXQoXFqHvHHwDyDl7RIua5Il818rGd8I',
      },
    });
  }

  get searchQuery() {
    return this.searchString;
  }
  set searchQuery(newSearchQuery) {
    this.searchString = String(newSearchQuery).split(/ {1,}/).join('+');
    this.currentPage = 1;
  }
  get searchYear() {
    return this.releaseYear;
  }
  set searchYear(newSearchYear) {
    this.releaseYear = String(newSearchYear);
    this.currentPage = 1;
  }
  get totalItems() {
    return this.totalItems;
  }

  async fetchGenres() {
    return await this.myAxios('genre/movie/list', {
      params: { language: 'en' },
    });
  }
  async fetchTrendingDayMovies() {
    return await this.myAxios('trending/movie/day', {
      params: { language: 'en-US' },
    });
  }
  async fetchTrendingWeekMovies() {
    return await this.myAxios('trending/movie/week', {
      params: { language: 'en-US' },
    });
  }
  async fetchTrendingWeekPageMovies() {
    const response = await this.myAxios('trending/movie/week', {
      params: {
        language: 'en-US',
        page: this.currentPage,
      },
    });
    this.totalPages = response.data.total_pages;
    this.currentPage = response.data.page;
    this.totalItems = response.data.total_results;
    return response;
  }

  async fetchSearchMovies() {
    const response = await this.myAxios('search/movie', {
      params: {
        query: this.searchString,
        include_adult: false,
        language: 'en-US',
        primary_release_year: this.releaseYear,
        page: this.currentPage,
        region: 'US',
      },
    });
    this.totalPages = response.data.total_pages;
    this.currentPage = response.data.page;
    this.totalItems = response.data.total_results;
    return response;
  }

  async fetchMovieById(id) {
    return await this.myAxios(`movie/${id}`, {
      params: { language: 'en-US' },
    });
  }

  async fetchMovieVideoById(id) {
    return await this.myAxios(`movie/${id}/videos`, {
      params: { language: 'en-US' },
    });
  }

  async fetchUpcomingMovies(page = 1) {
    return await this.myAxios('movie/upcoming', {
      params: {
        language: 'en-US',
        page: page,
        region: 'US',
      },
    });
  }
}
// // HOW TO USE
// const myService = new TMDBApiService(key);
// console.log(myService);
// //
// myService
//   .fetchGenres()
//   .then((resp) => console.log("Genres", resp))
//   .catch((e) => console.error(e));
// myService
//   .fetchTrendingDayMovies()
//   .then((resp) => console.log("Day", resp))
//   .catch((e) => console.error(e));

// myService
//   .fetchTrendingWeekMovies()
//   .then((resp) => console.log("Week", resp))
//   .catch((e) => console.error(e));

// myService
//   .fetchMovieById(569094)
//   .then((resp) => console.log("MoveId", resp))
//   .catch((e) => console.error(e));
// myService
//   .fetchMovieVideoById(569094)
//   .then((resp) => console.log("youtube", resp))
//   .catch((e) => console.error(e));

// myService.searchString = "john";
// myService
//   .fetchSearchMovies(3)
//   .then((resp) => console.log("search", resp))
//   .catch((e) => console.error(e));

// myService
//   .fetchUpcomingMovies(1)
//   .then((resp) => console.log("Upcoming", resp))
//   .catch((e) => console.error(e));

// setTimeout(() => console.log(myService), 5000);

// Приклад використання для пошуку
// myService.searchString = 'john';
// myService
//   .fetchSearchMovies() // як параметр можно передати сторінку по замовченню перша
//   .then(resp => console.log('search', resp))
//   .catch(e => console.error(e));
// myService
//   .fetchSearchMovies(3)
//   .then(resp => console.log('search', resp))
//   .catch(e => console.error(e));
// myService.searchYear = 2023;
// console.log(myService);
// myService
//   .fetchSearchMovies()
//   .then(resp => console.log('search', resp))
//   .catch(e => console.error(e));
