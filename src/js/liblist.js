import getGenres from "./get-genres";
import getFilmCard from './film-card';
// import SlimSelect from 'slim-select';
// import "slim-select/dist/slimselect.css";
import { getLibraryList } from './local-storage';
import getFiveStar from './fivezerostar.js';
import '../sass/_fivestar.scss';

const refs = {
    listCards: document.querySelector('.js-liblist'),
    selectWrapper: document.querySelector('#library-filter'),
    wrapperForMessage: document.querySelector('.js-lib-content-wrap'),
    option: document.querySelector('.js-lib-select'),
    btnLoadMore: document.querySelector('.js-load-more')
}

const arrayGenres = getGenres(); // console.log(arrayGenres)
const getMovies = getLibraryList(); //list from local storage

const perPageMovies = 9; //quantity of cards shown
let gotMovies = 9; //getMovies.length;

/**-----------------------------------------------------------------------
 * function by create markup for function renderMarkUpInSelect()
 * @param {*object} item 
 * @returns markup
 */
function createMarkupInSelect(item) {
    return `
    <option class="lib-option" value="${item.id}">${item.name}</option>
    `
}

/**-----------------------------------------------------------------------
 * function by render genre of movie to select
 */
function renderMarkupInSelect() {
    const gotGenre = arrayGenres.map(genre =>
        createMarkupInSelect(genre)).join('');
    // refs.selectWrapper.innerHTML = gotGenre;
    refs.selectWrapper.insertAdjacentHTML('beforeend', gotGenre)
    // window.addEventListener('DOMContentLoader', () => {
    //     new SlimSelect({
    //         select: refs.selectWrapper,
    //         data: '.js-lib-wrap-select'
    //     })
    // })
}

/**-----------------------------------------------------------------------
 * function by render data(movie) from array to card
 * @param {*array} list 
 */
function renderMovieInCards(list) {
    // refs.listCards.innerHTML = list
    //     .map(film => { getFilmCard(film, x => String(Math.round(x * 2) / 2)) })
    //     .join('');
    refs.listCards.innerHTML = list
        .map(film => getFilmCard(film, getFiveStar))
        .join('');
}

/**-----------------------------------------------------------------------
 * function to show cards and select
 */
function showContent() {
    // if (getMovies.length > 0) {
    //     renderMarkupInSelect();
    //     if (getMovies.length <= perPageMovies) {
    //         refs.btnLoadMore.style.display = 'none';
    //     }
    //     // renderMovieInCards(getMovies);
    // } else {
    //     refs.selectWrapper.style.visibility = 'hidden';
    //     refs.wrapperForMessage.innerHTML = '<p class="lib-error">OOPS... We are very sorry! You dont have any movies at your library.</p >  <a href="./catalog.html" class="lib-btn-search-movie">Search movie</a>';
    // }
    if (getMovies.length > 0) {
        renderMarkupInSelect();
        const startMovies = getMovies.slice(0, perPageMovies);
        renderMovieInCards(startMovies);

        if (getMovies.length <= perPageMovies) {
            refs.btnLoadMore.style.display = 'none';
        } else {
            refs.btnLoadMore.style.display = 'block';
            gotMovies = perPageMovies;
        }
    } else {
        refs.selectWrapper.style.visibility = 'hidden';
        refs.wrapperForMessage.innerHTML = '<p class="lib-error">OOPS... We are very sorry! You dont have any movies at your library.</p >  <a href="./catalog.html" class="lib-btn-search-movie">Search movie</a>';
        refs.btnLoadMore.style.display = 'none';
    }
}

// calling a function
showContent();

/**-----------------------------------------------------------------------
 * adds handler on the select
 */
refs.selectWrapper.addEventListener('change', () => {
    const selectedGenre = Number(refs.selectWrapper.value);

    const filteredGotMovies = getMovies.filter(({ genre_ids }) =>
        genre_ids.includes(selectedGenre)
    )
    let optionValue = refs.option.value;

    // if (optionValue !== "all") {
    //     renderMovieInCards(filteredGotMovies);
    // } else if (optionValue === "all") {
    //     renderMovieInCards(getMovies);
    // } else {
    //     console.log('');
    // }

    if (optionValue === "all") {
        renderMovieInCards(getMovies);
    } else {
        renderMovieInCards(filteredGotMovies);
    }

    // if (filteredGotMovies.length < 0) {
    //     showMessage();
    // }

    if (filteredGotMovies.length > 0) {
        filteredGotMovies.map(movie => {
            const movieCard = getFilmCard(); //getFilmCard(movie, stars);
            refs.listCards.appendChild(movieCard);
        })
    } else {
        showMessage();
    }
})

/**-----------------------------------------------------------------------
 * function to show the message and button 'Search movie'
 */
function showMessage() {
    // refs.listCards.innerHTML = '';
    refs.selectWrapper.style.visibility = 'hidden';
    const messageMarkup = '<p class="lib-error">No movies in the selected genre!</p> <a href="./catalog.html" class="lib-btn-search-movie">Search movie</a>';
    refs.wrapperForMessage.innerHTML = messageMarkup;
    refs.btnLoadMore.style.display = 'none';
}

//---------------------load more------------------------------------------

refs.btnLoadMore.addEventListener('click', () => {
    const nextMovies = getMovies.slice(gotMovies, gotMovies + perPageMovies); //13, 13+9
    console.log(nextMovies);
    renderNextLoadCard(nextMovies);
    gotMovies += perPageMovies;

    if (gotMovies >= getMovies.length) {
        refs.btnLoadMore.style.display = 'none';
    }
})

function renderNextLoadCard(arr) {
    const loadNext = arr
        .map(film => getFilmCard(film, getFiveStar))
        .join('');
    refs.listCards.insertAdjacentHTML('beforeend', loadNext);
}
