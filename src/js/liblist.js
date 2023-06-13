import getGenres from './get-genres';
import getFilmCard from './film-card';
import SlimSelect from 'slim-select';
import '../sass/_upcoming.scss'
import 'slim-select/dist/slimselect.css';
import { getLibraryList } from './local-storage';
import getFiveStar from './fivezerostar.js';
import '../sass/_fivestar.scss';

const refs = {
    listCards: document.querySelector('.js-liblist'),
    selectWrapper: document.querySelector('#library-filter'),
    generalWrapperSelect: document.querySelector('.js-lib-wrap-select'),
    wrapperForMessage: document.querySelector('.js-lib-content-wrap'),
    btnLoadMore: document.querySelector('.js-load-more')
};
const arrayGenres = getGenres(); // console.log(arrayGenres)
let arrayFilter = [];
let currentCard = 0;
const getMovies = getLibraryList(); //list from local storage

//------------------------------------------------------------------------
refs.listCards.addEventListener('click', hendlerOpenModalWindow);

function hendlerOpenModalWindow(evt) {
    console.log(evt.target.getAttribute('film-id'), 'Це id фільму');
}

/**-----------------------------------------------------------------------
 * function by create markup for function renderMarkUpInSelect()
 * @param {*object} item
 * @returns markup
 */
function createMarkupInSelect(item) {
    return `
    <option class="lib-option lib-spec" value="${item.id}">${item.name}</option>
    `;
}
/**-----------------------------------------------------------------------
 * function by render genre of movie to select
 */
function renderMarkupInSelect() {
    const gotGenre = arrayGenres
        .map(genre => createMarkupInSelect(genre))
        .join('');
    // refs.selectWrapper.innerHTML = gotGenre;
    refs.selectWrapper.insertAdjacentHTML('beforeend', gotGenre);
}

//------------------------------------------------------------------------

renderMarkupInSelect();

//------------------------------------------------------------------------
// used library slim-select

let select = new SlimSelect({
    select: refs.selectWrapper,
    events: {
        afterChange: x => {
            onNewSelect(x);
        }
    },
    settings: {
        placeholderText: 'Genre',
        showSearch: false,
    }
});

//---------------------------------------------------------------------
renderSavedFilm()

function renderSavedFilm() {
    if (getMovies.length > 0) {
        createPaginationMarkUp(getMovies, currentCard);
    } else {
        refs.wrapperForMessage.innerHTML = '<p class="lib-error">OOPS... <br>We are very sorry!</br> You dont have any movies at your library.</p >  <div class="lib-wrap-btn"><a href="./catalog.html" class="lib-btn-search-movie">Search movie</a></div>';
        refs.btnLoadMore.style.display = 'none';

        refs.generalWrapperSelect.innerHTML = '';
    }
}

refs.btnLoadMore.addEventListener('click', onLoadMore);

function onLoadMore() {
    renderSavedFilm()
    if (select.getSelected()[0] === 'all') {
        createPaginationMarkUp(getMovies, currentCard);
    } else {
        createPaginationMarkUp(arrayFilter, currentCard);
    }
}

function paginationSavedCards(array, firstPosition, quantityCard) {
    const shownMovies = array.slice(firstPosition, firstPosition + quantityCard);
    currentCard = firstPosition + shownMovies.length;
    const isMore = array.length > currentCard; //false or true
    return {
        listHTML: shownMovies
            .map(film => {
                return getFilmCard(film, getFiveStar);
            })
            .join(''),
        hasMore: isMore,
    };
}

function createPaginationMarkUp(array, lastCard) {
    const { listHTML, hasMore } = paginationSavedCards(array, lastCard, 9);
    refs.listCards.insertAdjacentHTML('beforeend', listHTML);

    refs.btnLoadMore.style.display = hasMore ? 'block' : 'none';
}

function onNewSelect(genreId) {
    currentCard = 0;
    refs.listCards.innerHTML = '';

    if (String(genreId[0].value) === 'all') {
        arrayFilter = [];
        createPaginationMarkUp(getMovies, currentCard);
    } else if (String(genreId[0].value) !== 'all') {
        arrayFilter = getMovies.filter(({ genre_ids }) =>
            genre_ids.includes(Number(genreId[0].value))
        );
        createPaginationMarkUp(arrayFilter, currentCard);
        if (arrayFilter.length === 0) {
            showMessage();
        }
    }
}

/**-----------------------------------------------------------------------
 * function to show the message and button 'Search movie'
 */
function showMessage() {
    refs.listCards.innerHTML = '';
    refs.selectWrapper.style.visibility = 'hidden';

    const messageMarkup =
        '<li class="lib-item-message"><p class="lib-error">No movies in the selected genre!</p> <div class="lib-wrap-btn"><a href="./catalog.html" class="lib-btn-search-movie">Search movie</a></div></li>';
    refs.listCards.innerHTML = messageMarkup;
    // refs.wrapperForMessage.insertAdjacentHTML('beforeend', messageMarkup)
    refs.btnLoadMore.style.display = 'none';
}

