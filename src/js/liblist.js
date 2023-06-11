// import TMDBApiService from './tmdb-api'
import getGenres from "./get-genres";
import getFilmCard from './film-card';

import dataFromApi from '../testcatalog.json';

import {
    saveToLibrary,
    getLibraryList,
    isInLibrary,
    removeFromLibrary,
} from './local-storage';

const { results } = dataFromApi;

const arrayGenres = getGenres();
console.log(arrayGenres)

const listCards = document.querySelector('.js-liblist');
const selectWrapper = document.querySelector('#library-filter');
const wrapperForMessage = document.querySelector('.js-lib-content-wrap')


function createMarkupInSelect(item) {
    return `
    <option value="${item.name}">${item.name}</option>
    `
}

function renderMarkupInSelect() {
    const gotGenre = arrayGenres.map(genre => createMarkupInSelect(genre)).join('');
    selectWrapper.innerHTML = gotGenre;
}


const getMovies = getLibraryList(); //list from local storage

function renderMovieInCards() {
    // getMovies.forEach(movie => {
    //     const dataCard = getFilmCard(movie);
    //     listCards.insertAdjacentHTML('beforeend', dataCard)
    // })
    listCards.innerHTML = results
        .map(film => getFilmCard(film, x => String(Math.round(x * 2) / 2)))
        .join('');
}

if (getMovies.length > 0) {
    renderMarkupInSelect();
    renderMovieInCards()
} else (
    wrapperForMessage.innerHTML = '<p class="lib-error">OOPS... We are very sorry! You dont have any movies at your library.</p > '
)

//----------handler for select

selectWrapper.addEventListener('change', () => {
    selectedGenre = selectWrapper.value;
    console.log(selectedGenre);

    const filteredGotMovies = getMovies.filter(movie => {
        arrayGenres
            .filter(({ id }) => movie.genre_ids.includes(id))
            .map(({ name }) => name);

        console.log(arrayGenres)

        return arrayGenres.includes(selectedGenre);

    });

    listCards.innerHTML = '';

    if (filteredGotMovies.length > 0) {
        // filteredGotMovies.forEach(movie => {
        //     const movieCard = getFilmCard(movie, stars);

        //     listCards.appendChild(movieCard);
        // })
        filteredGotMovies.map(movie => {
            const movieCard = getFilmCard(movie, stars);

            listCards.appendChild(movieCard);
        })
    } else {
        wrapperForMessage.innerHTML = '<p class="lib-error">No movies in the selected genre!</p > '
    }
})