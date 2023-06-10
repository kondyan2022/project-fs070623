// import saveToLocalStorage from './local-storage';
// import loadFromLocalStorage from './local-storage';

// import removeFromLocalStorage from './local-storage';
// import addListLibrary from './local-storage';
// import moviesDataUpdate from './local-storage';
import getGenres from "./get-genres";


const arrayGenres = getGenres();
console.log(arrayGenres)

const listCards = document.querySelector('.js-liblist');
const selectWrapper = document.querySelector('#library-filter');

function createMarkupInSelect(item) {
    return `
    <option value="${item.name}">${item.name}</option>
    `
}

function renderMarkupInSelect() {
    const gotGenre = arrayGenres.map(genre => createMarkupInSelect(genre)).join('');
    selectWrapper.innerHTML = gotGenre;
}

renderMarkupInSelect()

function renderMovieCards() {

}

