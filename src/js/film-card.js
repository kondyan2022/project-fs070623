import getGenres from './get-genres';
export default function getFilmCard(
  { id, title, poster_path, genre_ids, release_date, vote_average },
  getStatrs
) {
  const stars = getStatrs(vote_average);
  return `<div class="film-card" film-id="${id}">
  <img
    srcset="
      https://image.tmdb.org/t/p/w342/${poster_path}      342w,
      https://image.tmdb.org/t/p/w500/${poster_path}      500w,
      https://image.tmdb.org/t/p/w780/${poster_path}      780w,
      https://image.tmdb.org/t/p/original/${poster_path} 2000w
    "
    sizes="(min-width:1280px) 395px,
          (min-width:768px) 224px,
          (min-width:320px) 280px,
          100vw"
    src="https://image.tmdb.org/t/p/w342/${poster_path}"
    alt="${title}"
    class="film-card-poster"
    film-id="${id}"
    loading="lazy"
    width="500"
    height="750"
  />
  <div class="film-card-textblock">
    <h3 class="film-card-title">${title}</h3>
    <p class="film-card-genre">${getGenres()
      .filter(({ id }) => genre_ids.includes(id))
      .map(({ name }) => name)
      .slice(0, 2)
      .join(', ')} | ${release_date.slice(0, 4)}</p>
  </div>
  <div class="film-card-stars">${stars}</div>
</div>`;
}
