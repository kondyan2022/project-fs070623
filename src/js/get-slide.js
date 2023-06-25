import getFiveStar from './fivezerostar.js';
import '../sass/_fivestar.scss';

export default function getSlideMarkup(array) {
    return array
        .filter(movie => movie.backdrop_path !== null)
        .map(movie => {
            return `
        <div class="swiper-slide" film-id="${movie.id}">
            <div class="newhero-thumb" >
                <img
                    srcset="
                        https://image.tmdb.org/t/p/w300/${movie.backdrop_path}       300w,
                        https://image.tmdb.org/t/p/w780/${movie.backdrop_path}       780w,
                        https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}      1280w,
                        https://image.tmdb.org/t/p/original/${movie.backdrop_path}   3840w
                    "
                    sizes="(min-width: 320px) 772px,
                            (min-width: 768px) 768px,
                            (min-width: 1280px) 1280px,
                            100vw"
                    src="https://image.tmdb.org/t/p/w300/${movie.backdrop_path}"
                    alt="${movie.title}"
                    class="newhero-image swiper-img"
                    width="1280"
                    height="720"
                />
            </div>
            <div class="newhero-inform-wrap">
                <h1 class="newhero-movie-title">${movie.title.substring(0, 25)}</h1>
                <div class="newhero-stars">${getFiveStar(movie.vote_average)}</div>
                <p class="newhero-about">${movie.overview.substring(0, 170)}...</p>
                <div class="newh-wrap-buttons">
                    <div class="newh-wrap-trailer">
                        <button type="button" class="newhero-modal-trailer js-newhero-modal-trailer" data-modal-trigger>Watch trailer</button>
                    </div>
                    <div class="newh-wrap-detail">
                        <button type="button" class="newhero-modal-detail js-newhero-modal-detail">More details</button>
                    </div>
                </div>
            </div>
        </div>
    `}).join('');
}


