import getGenres from './get-genres';

export default function getUpcomingFilm(array) {
    const randomIndex = Math.floor(Math.random() * 15);
    const randomMovie = array
        .filter(movie => movie.backdrop_path !== null)
        .map(movie => {
            const movieMarkup = `
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
                    <div class="up-wrap-btn">
                        <button type="button" class="up-btn" data-movie-id="${movie.id}">Add to my library</button>
                    </div>
                </div>;`;
            return {
                id: movie.id,
                markup: movieMarkup
            }
        })[randomIndex];

    return randomMovie;
}