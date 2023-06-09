import TMDBApiService from './tmdb-api'

const wrapperForRender = document.querySelector('.js-upcoming-wrapper');
const serviceUpcoming = new TMDBApiService();

console.log(serviceUpcoming);

serviceUpcoming
    .fetchUpcomingMovies(1) // () here transmitted a random number of total_results
    .then((resp) => {
        console.log("Upcoming", resp);

        // const currentDate = new Date();
        // const currentDay = currentDate.getDate();
        // const currentMonth = currentDate.getMonth() + 1;
        // const currentYear = currentDate.getFullYear();
        // const nowDate = `'${currentYear}-${currentMonth}-${currentDay}'`;
        // console.log(currentDay, currentMonth, currentYear)
        // console.log(nowDate)

        const data = resp.data;
        console.log(data);

        // const dates = data.dates;
        // const pageCurrent = data.page;
        // const totalPages = data.total_pages;
        // const totalResults = data.total_results;
        // const results = data.results;

        const datasUpcoming = {
            // datesMax: data.dates.maximum,
            // datesMin: data.dates.minimum,
            // image: data.backdrop_path,
            pageCurrent: data.page,
            totalResults: data.total_results,
            results: data.results
        }
        console.log(datasUpcoming)

        const arrayResults = datasUpcoming.results;

        // if (nowDate >= datasUpcoming.datesMin && nowDate <= datasUpcoming.maximum) {}
        if (arrayResults.length >= 0) {
            renderToMarkup(arrayResults, datasUpcoming.totalResults)
        } else if (arrayResults = []) {
            wrapperForRender.innerHTML = '<p class="upcoming-error">OOPS... We are very sorry! Upcoming this month not found.</p>'
        }
    })
    .catch((e) => console.error(e));


function creatMarkup(movie) {
    return `
    <div class="upcoming-left-wrap">
        <picture>
            <source
                srcset="https:/image.tmdb.org/t/p/w342/${movie.backdrop_path}" 
                media="(min-width: 320px)" />
            <source
                srcset="https:/image.tmdb.org/t/p/w780/${movie.backdrop_path}" 
                media="(min-width: 768px)" />
            <source
                srcset="https:/image.tmdb.org/t/p/original/${movie.backdrop_path}" 
                media="(min-width: 1280px)" />
            <img
                src="https:/image.tmdb.org/t/p/original/${movie.backdrop_path}" 
                alt="${movie.title}" 
                width="805"
                height="458"
                />
        </picture>
    </div>
    <div class="upcoming-right-wrap">
        <h2 class="upcoming-movie-title">${movie.title}</h2>
        <table class="upcoming-table">
            <tr class="upcoming-tab-row">
                <td class="upcoming-data">Release date</td>
                <td class="upcoming-data">${movie.release_date}</td>
            </tr>
            <tr class="upcoming-tab-row">
                <td class="upcoming-data">Vote / Votes</td>
                <td class="upcoming-data">${movie.vote_average}/${movie.vote_count}</td>
            </tr>
            <tr class="upcoming-tab-row">
                <td class="upcoming-data">Popularity</td>
                <td class="upcoming-data">${movie.popularity}</td>
            </tr>
            <tr class="upcoming-tab-row">
                <td class="upcoming-data">Genre</td>
                <td class="upcoming-data">${movie.genre_ids}</td>
            </tr>
        </table>
        <p class="upcoming-about">About</p>
        <p class="upcoming-about-descr">${movie.overview}</p>
        <button type="button" class="btn">Add to my library</button>
    </div>
    `
}

function renderToMarkup(array, results) {
    const randomIndex = getRandomIndex(results);

    // const movieRendering = array.map(movie => creatMarkup(movie)).join('');
    // wrapperForRender.innerHTML = movieRendering;

    const randomMovie = array.map(movie => creatMarkup(movie))[randomIndex];
    console.log(randomMovie);
    console.log(randomIndex);

    // .join('');
    wrapperForRender.innerHTML = randomMovie;
}

function getRandomIndex(number) {
    return Math.floor(Math.random() * number);
}