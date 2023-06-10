// import TMDBApiService from './tmdb-api'
import getGenres from "./get-genres";
import getFilmCard from './film-card';
import {
    saveToLibrary,
    getLibraryList,
    isInLibrary,
    removeFromLibrary,
} from './local-storage';

const arrayGenres = getGenres();
console.log(arrayGenres)

const listCards = document.querySelector('.js-liblist');
const selectWrapper = document.querySelector('#library-filter');


// function renderMovieCards() {
// }


function createMarkupInSelect(item) {
    return `
    <option value="${item.name}">${item.name}</option>
    `
}

function renderMarkupInSelect() {
    const gotGenre = arrayGenres.map(genre => createMarkupInSelect(genre)).join('');
    selectWrapper.innerHTML = gotGenre;
}