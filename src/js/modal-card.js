import getGenres from './get-genres';
export default function createMarkupModalPoster({
  id,
  poster_path,
  title,
  vote_average,
  vote_count,
  popularity,
  overview,
  genre_ids,
}) {
  const noPoster = new URL('../images/no-poster.png', import.meta.url);
  return `
<div class="backdrop">
  <div class="modal-poster">
    <div class="modal-film-container">
      <button id="modal-close-btn" class="close-button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="close-icon"
        >
          <path d="M18 6L6 18M6 6l12 12"></path>
        </svg>
      </button>
      <img
        class="modal-img"
        srcset="
          https://image.tmdb.org/t/p/w342/${poster_path}      342w,
          https://image.tmdb.org/t/p/w500/${poster_path}      500w,
          https://image.tmdb.org/t/p/w780/${poster_path}      780w,
          https://image.tmdb.org/t/p/original/${poster_path} 2000w
        "
        sizes="(min-width:1280px) 375px,
                      (min-width:768px) 294px,
                      (min-width:320px) 248px, 100vw
                      "
        src="${noPoster}"
        alt="${title}"
      />

      <div class="modal-card">
        <h2 class="modal-card-movie-title">${title}</h2>
        <div class="modal-attributes">
          <ul class="modal-attributes-title-list">
            <li class="modal-card-title">Vote / Votes</li>
            <li class="modal-card-title">Popularity</li>
            <li class="modal-card-title">Genre</li>
          </ul>
          <ul class="modal-attributes-data-list">
            <li class="modal-card-data-average">
              <span class="modal-card-average">${vote_average}</span>/<span
                class="modal-card-count"
                >${vote_count}</span
              >
            </li>
            <li class="modal-card-data-get">
              ${Number(popularity).toFixed(1)}
            </li>
            <li class="modal-card-data-get">
              ${getGenres()
                .filter(({ id }) => Array(genre_ids).includes(id))
                .map(({ name }) => name)
                .slice(0, 3)
                .join(', ')}
            </li>
          </ul>
        </div>
        <p class="modal-card-about">ABOUT</p>
        <p class="modal-card-about-descr">${overview}</p>

      <div class="modal-card-btn-wrap">
      <button type="button" class="modal-card-btn" data-movie-id="${id}">
        Add to my library
      </button>
      </div>
      </div>
    </div>
  </div>
</div>
`;
}

// import getGenres from './get-genres';

// export default function createMarkupModalPoster({
//   id,
//   poster_path,
//   title,
//   vote_average,
//   vote_count,
//   popularity,
//   overview,
//   genre_ids,
// }) {
//   const noPoster = new URL('../images/no-poster.png', import.meta.url);
//   return `<div class="backdrop">
//   <div class="modal-poster">
//     <div class="modal-film-container">
//       <button id="modal-close-btn" class="close-button">
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           stroke-width="2"
//           stroke-linecap="round"
//           stroke-linejoin="round"
//           class="close-icon"
//         >
//           <path d="M18 6L6 18M6 6l12 12"></path>
//         </svg>
//       </button>
//       <img
//         class="modal-img"
//         srcset="
//           https://image.tmdb.org/t/p/w342/${poster_path}      342w,
//           https://image.tmdb.org/t/p/w500/${poster_path}       500w,
//           https://image.tmdb.org/t/p/w780/${poster_path}       780w,
//           https://image.tmdb.org/t/p/original/${poster_path}  2000w
//         "
//         sizes="(min-width:1280px) 375px,
//                       (min-width:768px) 294px,
//                       (min-width:320px) 248px, 100vw
//                       "
//         src="${noPoster}"
//         alt="${title}"
//       />

//       <div class="modal-card">
//         <h2 class="modal-card-movie-title">${title}</h2>
//         <div class="modal-attributes">
//           <ul class="modal-attributes-list">
//             <li class="modal-card-data">Vote / Votes</li>
//             <li class="modal-card-data-average">
//               <span class="modal-card-average">${vote_average}</span>/<span
//                 class="modal-card-count"
//                 >${vote_count}</span
//               >
//             </li>
//             <li class="modal-card-data">Popularity</li>
//             <li class="modal-card-data-get">${Number(popularity).toFixed(
//               1
//             )}</li>
//             <li class="modal-card-data">Genre</li>
//             <li class="modal-card-data-get">${getGenres()
//               .filter(({ id }) => Array(genre_ids).includes(id))
//               .map(({ name }) => name)
//               .slice(0, 3)
//               .join(', ')}</li>
//           </ul>
//         </div>
//       </div>

//       <p class="modal-card-about">About</p>
//       <p class="modal-card-about-descr">${overview}
//       </p>
//       <div class="modal-card-btn-wrap">
//       <button type="button" class="modal-card-btn" data-movie-id="${id}">
//           Add to my library
//         </button>
//       </div>
//     </div>
//   </div>
// </div>
// `;
// }