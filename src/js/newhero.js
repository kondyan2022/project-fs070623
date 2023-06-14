import TMDBApiService from './tmdb-api';
// import getGenres from './get-genres';
// import {
//     saveToLibrary,
//     getLibraryList,
//     isInLibrary,
//     removeFromLibrary,
// } from './local-storage';


function createMarkup(movie) {
    return `
        <div class="newhero-content-wrapper">
            <div class="newhero-thumb">
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
                    class="newhero-image"
                    width="1280"
                    height="720"
                />
            </div>
            <h2 class="newhero-movie-title">${movie.title}</h2>
            <div>STARS</div>
            <p class="newhero-about-descr">${movie.overview}</p>
            <div class="newhero-wrap-btn">
                <button type="button" class="newhero-btn js-newhero-open-modal-tr">Watch trailer</button>
            </div>
            <div class="newhero-wrap-btn">
                <button type="button" class="newhero-btn js-newhero-open-mod-det">More details</button>
            </div>
        </div>
    `
}

const wrapperContent = document.querySelector('.newhero-content-wrapper');
const wrapperForRender = document.querySelector('.newhero-render-wrapper')
//----------------- modal-------------------------------------------------------


function hendlerOpenModalWindow(evt) {
    console.log(evt.target.getAttribute('film-id'), 'Це id фільму');
}
//------------------------------------------------------------------------

const serviceTrendingDaysMovies = new TMDBApiService();

serviceTrendingDaysMovies
    .fetchTrendingDayMovies()
    .then((resp) => {
        console.log("Day", resp)

        const data = resp.data;
        const datasTrendDay = {
            pageCurrent: data.page,
            totalResults: data.total_results,
            results: data.results
        }
        const arrayResults = datasTrendDay.results; //array with results
        //------------------------
        if (arrayResults.length > 0) {
            renderToMarkup(arrayResults);

            wrapperForRender.addEventListener('click', (e) => {
                console.log(e.currentTarget, e.target)
                console.log(e.currentTarget)
                if (e.target === document.querySelector('.js-newhero-open-modal-tr')) {
                    console.log("button TRAILER")
                    /// open modal with trailer
                    wrapperContent.addEventListener('click', hendlerOpenModalWindow);
                } else if (e.target === document.querySelector('.js-newhero-open-mod-det')) {
                    /// open modal with details 
                    console.log('button DETAILS')
                    ///???????????????????????????
                    wrapperContent.addEventListener('click', () => {
                        console.log(evt.target.getAttribute('film-id'), 'Це id фільму')
                    });
                    //?????????????????????????????
                }
            })
        }
        // else if (arrayResults.length === 0) {
        //     wrapperForRender.innerHTML = '<p class="upcoming-error">OOPS... We are very sorry! Upcoming this month not found.</p>'
        // }
    })
    .catch((e) => console.error(e));

function renderToMarkup(array) {
    const randomIndex = getRandomIndex();
    const randomMovie = array
        .filter(movie => movie.backdrop_path !== null)
        .map(movie => {
            const movieMarkup = createMarkup(movie);
            return {
                id: movie.id,
                markup: movieMarkup
            }
        })[randomIndex];

    console.log(randomMovie)

    const { id, markup } = randomMovie;
    // const btnSaveToLocalStorage = document.querySelector('.up-btn');
    // if (isInLibrary(id)) {
    //     console.log(isInLibrary(id))
    //     btnSaveToLocalStorage.textContent = "Remove from my library";
    // } else {
    //     console.log("not")
    //     btnSaveToLocalStorage.textContent = "Add to my library";
    // }
    if (arrayResults.length > 0) {
        wrapperForRender.innerHTML = markup;
        return
    }
}

function getRandomIndex() {
    return Math.floor(Math.random() * 15);
}