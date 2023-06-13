export default function generateMarkup(movies) {
    return movies.map(({ original_name, name, original_title, overview, backdrop_path, vote_average, id }) => {
      return `
      <div class="swiper-slide">
        <div class="image-overlay"></div> 
          <img src="https://image.tmdb.org/t/p/original/${backdrop_path}" alt="${overview}" loading="lazy" class="hero_img" />
	          <div class="hero-block">
		          <div class="hero_title">
			          <h1 class="hero_first-title">${name || original_name || original_title}</h1>
		          </div>
		          <div class="hero_star">${vote_average} stars</div>
              <div class="hero_discr">
                <p class="hero_descr-api">${overview}</p>
		          </div> 
              <button type="button">Watch trailer</button> 
              <button type="button">More details</button> </div>
        </div>`;
    }).join('');
  }









