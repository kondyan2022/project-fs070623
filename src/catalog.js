import './js/load-genres';

import './js/totop';
import './js/header';
import './js/hero';
import './js/search';
import './js/modal-poster';
import './js/modal-trailer';
import './js/ourteam';
import './js/footer';

import getFiveStar from './js/fivezerostar';
document.querySelector('.film-card-stars').innerHTML = getFiveStar(5);
//example for getFilmCardnpm

// import dataFromApi from './testcatalog.json';

// import getFilmCard from './js/film-card';
// const { results } = dataFromApi;

// ref = document.querySelector('.container.catalog');5
// console.log(ref);

// ref.innerHTML = results
//   .map(a => getFilmCard(a, x => String(Math.round(x * 2) / 2)))
//   .join('');
