import TMDBApiService from './tmdb-api';
// import getGenres from './get-genres';
import {
    saveToLibrary,
    isInLibrary,
    removeFromLibrary,
} from './local-storage';
import getUpcomingFilm from './get-upcoming';

const wrapperForRender = document.querySelector('.js-upcoming-wrapper');
const serviceUpcoming = new TMDBApiService();

serviceShowUpcoming()
async function serviceShowUpcoming() {
    try {
        const resp = await serviceUpcoming.fetchUpcomingMovies();
        const data = resp.data;
        const arrayResults = data.results;//array with results

        if (arrayResults.length > 0) {
            const upcomingFilm = await getUpcomingFilm(arrayResults)
            const { id, markup } = upcomingFilm;
            wrapperForRender.innerHTML = markup;
            const btnSaveToLocalStorage = document.querySelector('.up-btn');
            isInLibrary(id) ? btnSaveToLocalStorage.textContent = "Remove from my library" : btnSaveToLocalStorage.textContent = "Add to my library";
            //event
            wrapperForRender.addEventListener('click', (e) => {
                if (e.target === document.querySelector('.up-btn')) {
                    const button = e.target;
                    const movieId = e.target.dataset.movieId;
                    const getMovie = arrayResults.find((movie) => movie.id == movieId);
                    if (isInLibrary(movieId)) {
                        removeFromLibrary(movieId);
                        button.textContent = "Add to my library";
                    } else {
                        saveToLibrary(getMovie);
                        button.textContent = "Remove from my library";
                    }
                }
            })
        } else if (arrayResults.length === 0) {
            wrapperForRender.innerHTML = '<p class="upcoming-error">OOPS... We are very sorry! Upcoming this month not found.</p>'
        }
    } catch (e) { console.error(e) };
}
