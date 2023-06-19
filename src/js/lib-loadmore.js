// import getFilmCard from './film-card';
// import getFiveStar from './fivezerostar.js';

// const refs = {
//     listCards: document.querySelector('.js-liblist'),
//     btnLoadMore: document.querySelector('.js-load-more')
// };
// /**----------------------------------------------
//  *
//  * @param {*array} array
//  * @param {*number} firstPosition
//  * @param {*number} quantityCard
//  * @returns object {listHTML, hasMore}
//  */
// export function paginationSavedCards(array, firstPosition, quantityCard) {
//     const shownMovies = array.slice(firstPosition, firstPosition + quantityCard);
//     currentCard = firstPosition + shownMovies.length;
//     const isMore = array.length > currentCard; //false or true
//     return {
//         listHTML: shownMovies
//             .map(film => {
//                 return getFilmCard(film, getFiveStar);
//             })
//             .join(''),
//         hasMore: isMore,
//     };
// }
// /**----------------------------------------------
//  * function for render pagination
//  * @param {*array} array
//  * @param {*number} lastCard
//  */
// export function createPaginationMarkUp(array, lastCard) {
//     const { listHTML, hasMore } = paginationSavedCards(array, lastCard, 9);
//     refs.listCards.insertAdjacentHTML('beforeend', listHTML);

//     refs.btnLoadMore.style.display = hasMore ? 'block' : 'none';
// }

