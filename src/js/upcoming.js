import TMDBApiService from './tmdb-api';
import getGenres from './get-genres';
import {
    saveToLibrary,
    getLibraryList,
    isInLibrary,
    removeFromLibrary,
} from './local-storage';

const wrapperForRender = document.querySelector('.js-upcoming-wrapper');
const serviceUpcoming = new TMDBApiService();

function creatMarkup(movie) {
    return `
    <div class="upcoming-left-wrap">
        <div class="up-thumb">
            <img
                srcset="
                    https://image.tmdb.org/t/p/w300/${movie.backdrop_path}      300w,
                    https://image.tmdb.org/t/p/w780/${movie.backdrop_path}      780w,
                    https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}      1280w,
                    https://image.tmdb.org/t/p/original/${movie.backdrop_path}  3840w
                "
                sizes="(min-width: 320px) 498px,
                        (min-width: 768px) 704px,
                        (min-width: 1280px) 805px,
                        100vw"
                src="https://image.tmdb.org/t/p/w300/${movie.backdrop_path}"
                alt="${movie.title}"
                class="upcoming-image"
                width="1280"
                height="720"
            />
        </div>
    </div>
    <div class="upcoming-right-wrap">
        <h2 class="upcoming-movie-title">${movie.title}</h2>
        <table class="upcoming-table">
            <tr class="upcoming-tab-row">
                <td class="upcoming-data">Release date</td>
                <td class="upcom-data-release">${movie.release_date}</td>
            </tr>
            <tr class="upcoming-tab-row">
                <td class="upcoming-data">Vote / Votes</td>
                <td class="upcoming-data-average">
                    <span class="up-average">${movie.vote_average}</span>/<span class="up-count">${movie.vote_count}</span>
                </td>
            </tr>
            <tr class="upcoming-tab-row">
                <td class="upcoming-data">Popularity</td>
                <td class="upcoming-data-get">${movie.popularity.toFixed(1)}</td>
            </tr>
            <tr class="upcoming-tab-row">
                <td class="upcoming-data">Genre</td>
                <td class="upcoming-data-get">${getGenres()
            .filter(({ id }) => movie.genre_ids.includes(id))
            .map(({ name }) => name)
            .slice(0, 2)
            .join(', ')}</td>
            </tr>
        </table>
        <p class="upcoming-about">About</p>
        <p class="upcoming-about-descr">${movie.overview}</p>
        <button type="button" class="up-btn" data-movie-id="${movie.id}">Add to my library</button>
    </div>
    `
}


serviceUpcoming
    .fetchUpcomingMovies()
    .then((resp) => {
        const data = resp.data;
        const datasUpcoming = {
            pageCurrent: data.page,
            totalResults: data.total_results,
            results: data.results
        }
        const arrayResults = datasUpcoming.results;//array with results
        if (arrayResults.length > 0) {
            renderToMarkup(arrayResults);
            wrapperForRender.addEventListener('click', (e) => {
                console.log(e.currentTarget, e.target)
                console.log(e.currentTarget)
                if (e.target === document.querySelector('.up-btn')) {
                    // console.log("buuuuuton")
                    const button = e.target;
                    const movieId = e.target.dataset.movieId;
                    const getMovie = arrayResults.find((movie) => movie.id == movieId);
                    if (isInLibrary(movieId)) {
                        removeFromLibrary(movieId);
                        button.textContent = "Add to my library";
                        // console.log("remove");
                    } else {
                        saveToLibrary(getMovie);
                        button.textContent = "Remove from my library";
                        // console.log("save");
                    }
                }
            })
        } else if (arrayResults.length === 0) {
            wrapperForRender.innerHTML = '<p class="upcoming-error">OOPS... We are very sorry! Upcoming this month not found.</p>'
        }
    })
    .catch((e) => console.error(e));

function renderToMarkup(array) {
    const randomIndex = getRandomIndex();
    const randomMovie = array
        .filter(movie => movie.backdrop_path !== null)
        .map(movie => {
            const movieMarkup = creatMarkup(movie);
            return {
                id: movie.id,
                markup: movieMarkup
            }
        })[randomIndex];
    console.log(randomMovie)
    const { id, markup } = randomMovie;
    wrapperForRender.innerHTML = markup;
    const btnSaveToLocalStorage = document.querySelector('.up-btn');
    if (isInLibrary(id)) {
        console.log(isInLibrary(id))
        btnSaveToLocalStorage.textContent = "Remove from my library";
    } else {
        console.log("not")
        btnSaveToLocalStorage.textContent = "Add to my library";
    }
}
function getRandomIndex() {
    return Math.floor(Math.random() * 15);
}
