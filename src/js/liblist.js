import getGenres from './get-genres';
import getFilmCard from './film-card';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { getLibraryList } from './local-storage';
import getFiveStar from './fivezerostar.js';
import '../sass/_fivestar.scss';

const refs = {
    listCards: document.querySelector('.js-liblist'),
    selectWrapper: document.querySelector('#library-filter'),
    wrapperForMessage: document.querySelector('.js-lib-content-wrap'),
    btnLoadMore: document.querySelector('.js-load-more'),
};

const arrayGenres = getGenres(); // console.log(arrayGenres)
let arrayFilter = [];
let currentCard = 0;
const getMovies = getLibraryList(); //list from local storage

const perPageMovies = 9; //quantity of cards shown
let gotMovies = 9; //getMovies.length;

// //  * adds handler on the select
// refs.selectWrapper.addEventListener('change', onSelect);

/**-----------------------------------------------------------------------
 * function by create markup for function renderMarkUpInSelect()
 * @param {*object} item
 * @returns markup
 */
function createMarkupInSelect(item) {
    return `
    <option class="lib-option" value="${item.id}">${item.name}</option>
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

/**-----------------------------------------------------------------------
 * function by render data(movie) from array to card
 * @param {*array} list
 */
function renderMovieInCards(list) {
    refs.listCards.innerHTML = list
        .map(film => getFilmCard(film, getFiveStar))
        .join('');
}

/**-----------------------------------------------------------------------
 * function to show cards and select
 */
// function showContent() {
//   if (getMovies.length > 0) {
//     renderMarkupInSelect();

//     renderMovieInCards(getMovies); //???

//     //use older pagination

//     // const startMovies = getMovies.slice(0, perPageMovies);
//     // renderMovieInCards(startMovies);

//     // if (getMovies.length <= perPageMovies) {
//     //     refs.btnLoadMore.style.display = 'none';
//     // } else {
//     //     refs.btnLoadMore.style.display = 'block';
//     //     // gotMovies = perPageMovies;
//     // }

//     //----------test use pagination----------
//     // const { markupPage, isMore } = paginationSavedCards(getMovies, perPageMovies);
//     // // refs.listCards.innerHtml = markupPage;

//     // renderMovieInCards(markupPage)

//     // if (isMore) {
//     //     refs.btnLoadMore.style.display = 'block';
//     // } else {
//     //     refs.btnLoadMore.style.display = 'none';
//     // }
//     //---------------------------------------
//   } else {
//     refs.selectWrapper.style.visibility = 'hidden';
//     refs.wrapperForMessage.innerHTML =
//       '<p class="lib-error">OOPS... We are very sorry! You dont have any movies at your library.</p >  <a href="./catalog.html" class="lib-btn-search-movie">Search movie</a>';
//     refs.btnLoadMore.style.display = 'none';
//   }
// }

/**-----------------------------------------------------------------------
 * adds handler on the select
 */
// refs.selectWrapper.addEventListener('change', onSelect);

// function onSelect() {
//   const selectedGenre = Number(refs.selectWrapper.value);

//   const filteredGotMovies = getMovies.filter(({ genre_ids }) =>
//     genre_ids.includes(selectedGenre)
//   );
//   const optionValue = refs.selectWrapper.value;
//   console.log(optionValue);

//   if (optionValue === 'all') {
//     renderMovieInCards(getMovies);
//   } else if (filteredGotMovies.length > 0) {
//     renderMovieInCards(filteredGotMovies);
//   } else {
//     showMessage();
//   }
// }

// calling a function
// showContent();

/**-----------------------------------------------------------------------
 * function to show the message and button 'Search movie'
 */
function showMessage() {
    // refs.listCards.innerHTML = '';
    // refs.selectWrapper.style.visibility = 'hidden';
    const messageMarkup =
        '<p class="lib-error">No movies in the selected genre!</p> <a href="./catalog.html" class="lib-btn-search-movie">Search movie</a>';
    refs.wrapperForMessage.innerHTML = messageMarkup;
    refs.btnLoadMore.style.display = 'none';
}

//---------------------load more------------------------------------------
// refs.btnLoadMore.addEventListener('click', onLoadMore);

//     () => {
//     const nextMovies = getMovies.slice(gotMovies, gotMovies + perPageMovies);
//     // console.log(nextMovies);
//     renderNextLoadCard(nextMovies);
//     gotMovies += perPageMovies;

//     if (gotMovies >= getMovies.length) {
//         refs.btnLoadMore.style.display = 'none';
//     }
// })
// function renderNextLoadCard(arr) {
//     const loadNext = arr
//         .map(film => getFilmCard(film, getFiveStar))
//         .join('');
//     refs.listCards.insertAdjacentHTML('beforeend', loadNext);
// }
//------------------------------------------------------------------------
renderMarkupInSelect();
// library slim-select


let select = new SlimSelect({
    select: refs.selectWrapper,
    events: {
        afterChange: x => {
            onNewSelect(x);
        },
        // beforeOpen: () => {
        //     console.log('before open')
        // },
        // afterOpen: () => {
        //     console.log('after open')
        // },
        // beforeClose: () => {
        //     console.log('before close')
        // },
        // afterClose: () => {
        //     console.log('after close')
        // },
    },
});

//---------------------PAGINATION-------------------------------------

refs.btnLoadMore.addEventListener('click', onLoadMore);

function onLoadMore() {
    console.log(select.getSelected()[0], currentCard);
    if (select.getSelected()[0] === 'all') {
        createPaginationMarkUp(getMovies, currentCard);
    } else {
        createPaginationMarkUp(arrayFilter, currentCard);
    } //   createPaginationMarkUp(array, lastCard);
}

// function paginationSavedCards(array, quantityCard) {

//     const sliceMovies = gotMovies + quantityCard;
//     const shownMovies = array.slice(gotMovies, sliceMovies);

//     const isMore = array.length > sliceMovies; //false ar true

//     return {
//         markupPage: shownMovies
//             .map(film => getFilmCard(film, getFiveStar))
//             .join(''),
//         hasMore: isMore
//     }

// }

function paginationSavedCards(array, firstPosition, quantityCard) {
    //   const sliceMovies = firstPosition + quantityCard;
    const shownMovies = array.slice(firstPosition, firstPosition + quantityCard);
    console.log(shownMovies);
    currentCard = firstPosition + shownMovies.length;
    const isMore = array.length > currentCard; //false ar true
    console.log(currentCard, array.length);
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
    console.log(genreId);
    currentCard = 0;
    refs.listCards.innerHTML = '';
    if (String(genreId[0].value) === 'all') {
        arrayFilter = [];
        console.log('all ok');
        createPaginationMarkUp(getMovies, currentCard);
    } else {
        arrayFilter = getMovies.filter(({ genre_ids }) =>
            genre_ids.includes(Number(genreId[0].value))
        );
        createPaginationMarkUp(arrayFilter, currentCard);
    }
}

select.setSelected('all');
