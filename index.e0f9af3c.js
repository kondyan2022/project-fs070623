var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},e={},a={},r=t.parcelRequired7c6;null==r&&((r=function(t){if(t in e)return e[t].exports;if(t in a){var r=a[t];delete a[t];var o={id:t,exports:{}};return e[t]=o,r.call(o.exports,o,o.exports),o.exports}var n=Error("Cannot find module '"+t+"'");throw n.code="MODULE_NOT_FOUND",n}).register=function(t,e){a[t]=e},t.parcelRequired7c6=r),r("faBfA"),r("h5Hr7"),r("bUb57");var o=r("9MaFa"),n=r("I2Abx"),i=r("bEw54"),s=r("38Z3Q");document.querySelector(".js-newhero-open-modal-tr");const l=document.querySelector(".newhero-render-wrapper"),d=new o.default;d.fetchTrendingDayMovies().then(t=>{let e=t.data,a={pageCurrent:e.page,totalResults:e.total_results,results:e.results},r=a.results;if(r.length>0){(function(t){let e=t.filter(t=>null!==t.backdrop_path).map(t=>{let e=`
        <div class="swiper-wrapper">
          <div class="swiper-slide newhero-content-wrapper" film-id="${t.id}">
            <div class="newhero-thumb" >
                <img
                    srcset="
                        https://image.tmdb.org/t/p/w300/${t.backdrop_path}      300w,
                        https://image.tmdb.org/t/p/w780/${t.backdrop_path}      780w,
                        https://image.tmdb.org/t/p/w1280/${t.backdrop_path}      1280w,
                        https://image.tmdb.org/t/p/original/${t.backdrop_path}  3840w
                    "
                    sizes="(min-width: 320px) 772px,
                            (min-width: 768px) 768px,
                            (min-width: 1280px) 1280px,
                            100vw"
                    src="https://image.tmdb.org/t/p/w300/${t.backdrop_path}"
                    alt="${t.title}"
                    class="newhero-image"
                    width="1280"
                      height="720"
                />
            </div>

            <div class="newhero-movie-inform-wrap">
                <h1 class="newhero-movie-title">${t.title}</h1>
                <div class="newhero-stars">${(0,i.default)(t.vote_average)}</div>
                <p class="newhero-about-descr">${t.overview.substring(0,200)}...</p>
                <div class="newh-wrap-buttons">
                    <div class="newhero-wrap-btn-api-one newh-wrap-trailer">
                        <button type="button" class="newhero-btn-api-one js-newhero-open-modal-tr">Watch trailer</button>
                    </div>
                    <div class="newhero-wrap-btn-api-two newh-wrap-detail">
                        <button type="button" class="newhero-btn-api-two js-newhero-open-mod-det">More details</button>
                    </div>
                  </div>
              </div>
          </div>
      </div>
    `;return{markup:e}})[Math.floor(15*Math.random())],{markup:a}=e;setTimeout(()=>{l.innerHTML=a,(0,n.modalController)({modal:".modal1",btnOpen:".js-newhero-open-modal-tr",btnClose:".modal__close"})},3e3)})(r);return}}).catch(t=>console.error(t)),l.addEventListener("click",function(t){if(t.target===document.querySelector(".js-newhero-open-mod-det")){let e=t.target.closest("[film-id]");e&&(0,s.openModalCard)(e.getAttribute("film-id"))}});var o=r("9MaFa"),p=r("7274P"),i=r("bEw54");r("I2Abx");var s=r("38Z3Q");const c=new o.default,u=document.querySelector(".weekly-gallery");u.addEventListener("click",function(t){let e=t.target.closest("[film-id]");e&&(0,s.openModalCard)(e.getAttribute("film-id"))}),c.fetchTrendingWeekMovies().then(t=>{let e=t.data.results,a=function(t){let e=[];for(;e.length<3;){let a=Math.floor(Math.random()*t);e.includes(a)||e.push(a)}return e}(e.length-1),r=[];a.forEach(t=>{let a=e[t];r.push(a)}),u.innerHTML=r.map(t=>(0,p.default)(t,i.default)).join("")}).catch(t=>console.error(t));var o=r("9MaFa"),m=r("2rpgd"),g=r("b5rV1");const h=document.querySelector(".js-upcoming-wrapper"),b=new o.default;b.fetchUpcomingMovies().then(t=>{let e=t.data,a={pageCurrent:e.page,totalResults:e.total_results,results:e.results},r=a.results;r.length>0?(function(t){let e=t.filter(t=>null!==t.backdrop_path).map(t=>{let e=`
    <div class="upcoming-left-wrap">
        <div class="up-thumb">
            <img
                srcset="
                    https://image.tmdb.org/t/p/w300/${t.backdrop_path}      300w,
                    https://image.tmdb.org/t/p/w780/${t.backdrop_path}      780w,
                    https://image.tmdb.org/t/p/w1280/${t.backdrop_path}      1280w,
                    https://image.tmdb.org/t/p/original/${t.backdrop_path}  3840w
                "
                sizes="(min-width: 320px) 498px,
                        (min-width: 768px) 704px,
                        (min-width: 1280px) 805px,
                        100vw"
                src="https://image.tmdb.org/t/p/w300/${t.backdrop_path}"
                alt="${t.title}"
                class="upcoming-image"
                width="1280"
                height="720"
            />
        </div>
    </div>
    <div class="upcoming-right-wrap">
        <h2 class="upcoming-movie-title">${t.title}</h2>
        <table class="upcoming-table">
            <tr class="upcoming-tab-row">
                <td class="upcoming-data">Release date</td>
                <td class="upcom-data-release">${t.release_date}</td>
            </tr>
            <tr class="upcoming-tab-row">
                <td class="upcoming-data">Vote / Votes</td>
                <td class="upcoming-data-average">
                    <span class="up-average">${t.vote_average}</span>/<span class="up-count">${t.vote_count}</span>
                </td>
            </tr>
            <tr class="upcoming-tab-row">
                <td class="upcoming-data">Popularity</td>
                <td class="upcoming-data-get">${t.popularity.toFixed(1)}</td>
            </tr>
            <tr class="upcoming-tab-row">
                <td class="upcoming-data">Genre</td>
                <td class="upcoming-data-get">${(0,m.default)().filter(({id:e})=>t.genre_ids.includes(e)).map(({name:t})=>t).slice(0,2).join(", ")}</td>
            </tr>
        </table>
        <p class="upcoming-about">About</p>
        <p class="upcoming-about-descr">${t.overview}</p>
        <div class="up-wrap-btn">
            <button type="button" class="up-btn" data-movie-id="${t.id}">Add to my library</button>
        </div>
        </div>
    `;return{id:t.id,markup:e}})[Math.floor(15*Math.random())];console.log(e);let{id:a,markup:r}=e;h.innerHTML=r;let o=document.querySelector(".up-btn");(0,g.isInLibrary)(a)?(console.log((0,g.isInLibrary)(a)),o.textContent="Remove from my library"):(console.log("not"),o.textContent="Add to my library")}(r),h.addEventListener("click",t=>{if(console.log(t.currentTarget,t.target),console.log(t.currentTarget),t.target===document.querySelector(".up-btn")){let e=t.target,a=t.target.dataset.movieId,o=r.find(t=>t.id==a);(0,g.isInLibrary)(a)?((0,g.removeFromLibrary)(a),e.textContent="Add to my library"):((0,g.saveToLibrary)(o),e.textContent="Remove from my library")}})):0===r.length&&(h.innerHTML='<p class="upcoming-error">OOPS... We are very sorry! Upcoming this month not found.</p>')}).catch(t=>console.error(t)),r("38Z3Q"),r("I2Abx"),r("6fsAg"),r("epHO8");
//# sourceMappingURL=index.e0f9af3c.js.map
