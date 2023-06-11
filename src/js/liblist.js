// import TMDBApiService from './tmdb-api'
import getGenres from "./get-genres";
import getFilmCard from './film-card';
import SlimSelect from 'slim-select';

// import dataFromApi from '../testcatalog.json';

import {
    saveToLibrary,
    getLibraryList,
    isInLibrary,
    removeFromLibrary,
} from './local-storage';

// const { results } = dataFromApi;

const arrayGenres = getGenres();
console.log(arrayGenres)

const listCards = document.querySelector('.js-liblist');
const selectWrapper = document.querySelector('#library-filter');
const wrapperForMessage = document.querySelector('.js-lib-content-wrap')



function createMarkupInSelect(item) {
    return `
    <option class="lib-option" value="${item.id}">${item.name}</option>
    `
}

function renderMarkupInSelect() {
    const gotGenre = arrayGenres.map(genre => createMarkupInSelect(genre)).join('');
    selectWrapper.innerHTML = gotGenre;
    // new SlimSelect({
    //     select: selectWrapper,
    //     data: '.js-lib-wrap-select'
    // })
}

const getMovies = getLibraryList(); //list from local storage

function renderMovieInCards() {
    listCards.innerHTML = getMovies
        .map(film => getFilmCard(film, x => String(Math.round(x * 2) / 2)))
        .join('');
}

function showContent() {
    if (getMovies.length > 0) {
        renderMarkupInSelect();
        renderMovieInCards();
    } else {
        selectWrapper.style.visibility = 'hidden';
        wrapperForMessage.innerHTML = '<p class="lib-error">OOPS... We are very sorry! You dont have any movies at your library.</p > ';
    }
}

showContent();


//----------handler for select

selectWrapper.addEventListener('change', () => {
    selectedGenre = selectWrapper.value;
    console.log(selectedGenre);

    const filteredGotMovies = getMovies.filter(movie => {
        arrayGenres
            .filter(({ id }) => movie.genre_ids.includes(id))
            .map(({ name }) => name);
        return arrayGenres.includes(parseInt(selectedGenre));
    });

    // const filteredGotMovies = getMovies.filter(movie => {
    //     return movie.genre_ids.includes(parseInt(selectedGenre));
    // });


    listCards.innerHTML = '';

    if (filteredGotMovies.length > 0) {
        // filteredGotMovies.forEach(movie => {
        //     const movieCard = getFilmCard(movie, stars);
        //     listCards.appendChild(movieCard);
        // })
        filteredGotMovies.map(movie => {
            const movieCard = getFilmCard(movie, stars); //<= here arg will be (movie, stars)

            listCards.appendChild(movieCard);
        })
    } else {
        selectWrapper.style.visibility = 'hidden';
        // const messageMarkup = '<p class="lib-error">No movies in the selected genre!</p> <button type="button" class="lib-btn-search-movie">Search movie</button>';
        const messageMarkup = '<p class="lib-error">No movies in the selected genre!</p> <a href="./catalog.html" class="lib-btn-search-movie">Search movie</a>';

        wrapperForMessage.innerHTML = messageMarkup;

        // const btnSearchMovie = document.querySelector('.lib-btn-search-movie');
        // btnSearchMovie.addEventListener('click', (evt) => {
        //     console.log('click');
        //     selectWrapper.style.visibility = 'visibile';
        //     wrapperForMessage.innerHTML = '';
        //     showContent();
        // })
    }
})

