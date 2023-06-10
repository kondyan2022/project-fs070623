import TMDBApiService from './tmdb-api';
import getGenres from './get-genres';

const wrapperForRender = document.querySelector('.js-upcoming-wrapper');
const serviceUpcoming = new TMDBApiService();

console.log(serviceUpcoming);

serviceUpcoming
    .fetchUpcomingMovies()
    .then((resp) => {
        console.log("Upcoming", resp);

        const data = resp.data;
        console.log(data);

        const datasUpcoming = {
            pageCurrent: data.page,
            totalResults: data.total_results,
            results: data.results
        }
        console.log(datasUpcoming)

        const arrayResults = datasUpcoming.results;

        if (arrayResults.length > 0) {
            renderToMarkup(arrayResults)
        } else if (arrayResults.length === 0) {
            wrapperForRender.innerHTML = '<p class="upcoming-error">OOPS... We are very sorry! Upcoming this month not found.</p>'
        }
    })
    .catch((e) => console.error(e));


function creatMarkup(movie) {
    return `
    <div class="upcoming-left-wrap">
        <div class="up-thumb">
            <img 
                srcset="
                    https:/image.tmdb.org/t/p/w342/${movie.poster_path} 342w,
                    https:/image.tmdb.org/t/p/w500/${movie.backdrop_path} 500w,
                    https:/image.tmdb.org/t/p/w780/${movie.backdrop_path} 780w,
                    https:/image.tmdb.org/t/p/original/${movie.backdrop_path} 2000w
                "
                sizes="(min-width: 320px),
                    (min-width: 768px),
                    (min-width: 1280px),
                "
                src="https:/image.tmdb.org/t/p/original/${movie.backdrop_path}" 
                alt="${movie.title}"
                class="upcoming-image"
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
        <button type="button" class="up-btn">Add to my library</button>
    </div>
    `
}

function renderToMarkup(array) {
    const randomIndex = getRandomIndex();
    const randomMovie = array
        .filter(movie => movie.backdrop_path !== null)
        .map(movie => creatMarkup(movie))[randomIndex];

    console.log(randomIndex);

    wrapperForRender.innerHTML = randomMovie;
}

function getRandomIndex() {
    return Math.floor(Math.random() * 15);
}

