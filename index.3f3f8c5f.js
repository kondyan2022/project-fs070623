!function(){var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},e={},r={},a=t.parcelRequired7c6;null==a&&((a=function(t){if(t in e)return e[t].exports;if(t in r){var a=r[t];delete r[t];var o={id:t,exports:{}};return e[t]=o,a.call(o.exports,o,o.exports),o.exports}var i=Error("Cannot find module '"+t+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(t,e){r[t]=e},t.parcelRequired7c6=a),a("8ERGB"),a("3qT3v"),a("i8Q71");var o=a("kK94C"),i=a("ijwS8"),n=a("jMVtP"),l=a("cbbxM");let s=200;document.querySelector(".js-newhero-open-modal-tr");let d=document.querySelector(".newhero-render-wrapper"),p=new o.default;p.fetchTrendingDayMovies().then(t=>{let e=t.data,r={pageCurrent:e.page,totalResults:e.total_results,results:e.results},a=r.results;if(a.length>0){(function(t){let e=t.filter(t=>null!==t.backdrop_path).map(t=>{let e=(t.title.innerText,t.title.length>25&&(s=170),`
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
                <h1 class="newhero-movie-title">${t.title.substring(0,25)}</h1>
                <div class="newhero-stars">${(0,n.default)(t.vote_average)}</div>
                <p class="newhero-about-descr">${t.overview.substring(0,s)}...</p>
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
    `);return{markup:e}})[Math.floor(15*Math.random())],{markup:r}=e;setTimeout(()=>{d.innerHTML=r,(0,i.modalController)({modal:".modal1",btnOpen:".js-newhero-open-modal-tr",btnClose:".modal__close"})},3e3)})(a);return}}).catch(t=>console.error(t)),d.addEventListener("click",function(t){if(t.target===document.querySelector(".js-newhero-open-mod-det")){let e=t.target.closest("[film-id]");e&&(0,l.openModalCard)(e.getAttribute("film-id"))}});var o=a("kK94C"),c=a("b3pWk"),n=a("jMVtP");a("ijwS8");var l=a("cbbxM");let u=new o.default,m=document.querySelector(".weekly-gallery");m.addEventListener("click",function(t){let e=t.target.closest("[film-id]");e&&(0,l.openModalCard)(e.getAttribute("film-id"))}),u.fetchTrendingWeekMovies().then(t=>{let e=t.data.results,r=function(t){let e=[];for(;e.length<3;){let r=Math.floor(Math.random()*t);e.includes(r)||e.push(r)}return e}(e.length-1),a=[];r.forEach(t=>{let r=e[t];a.push(r)}),m.innerHTML=a.map(t=>(0,c.default)(t,n.default)).join("")}).catch(t=>console.error(t));var o=a("kK94C"),h=a("lwvvG"),g=a("4LMMA");let w=document.querySelector(".js-upcoming-wrapper"),b=new o.default;b.fetchUpcomingMovies().then(t=>{let e=t.data,r={pageCurrent:e.page,totalResults:e.total_results,results:e.results},a=r.results;a.length>0?(function(t){let e=t.filter(t=>null!==t.backdrop_path).map(t=>{let e=`
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
                <td class="upcoming-data-get">${(0,h.default)().filter(({id:e})=>t.genre_ids.includes(e)).map(({name:t})=>t).slice(0,2).join(", ")}</td>
            </tr>
        </table>
        <p class="upcoming-about">About</p>
        <p class="upcoming-about-descr">${t.overview}</p>
        <div class="up-wrap-btn">
            <button type="button" class="up-btn" data-movie-id="${t.id}">Add to my library</button>
        </div>
        </div>
    `;return{id:t.id,markup:e}})[Math.floor(15*Math.random())],{id:r,markup:a}=e;w.innerHTML=a;let o=document.querySelector(".up-btn");(0,g.isInLibrary)(r)?o.textContent="Remove from my library":o.textContent="Add to my library"}(a),w.addEventListener("click",t=>{if(t.target===document.querySelector(".up-btn")){let e=t.target,r=t.target.dataset.movieId,o=a.find(t=>t.id==r);(0,g.isInLibrary)(r)?((0,g.removeFromLibrary)(r),e.textContent="Add to my library"):((0,g.saveToLibrary)(o),e.textContent="Remove from my library")}})):0===a.length&&(w.innerHTML='<p class="upcoming-error">OOPS... We are very sorry! Upcoming this month not found.</p>')}).catch(t=>console.error(t)),a("cbbxM"),a("ijwS8"),a("guHir"),a("7hKzD")}();
//# sourceMappingURL=index.3f3f8c5f.js.map
