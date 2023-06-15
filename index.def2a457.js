var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},e={},r={},a=t.parcelRequired7c6;null==a&&((a=function(t){if(t in e)return e[t].exports;if(t in r){var a=r[t];delete r[t];var o={id:t,exports:{}};return e[t]=o,a.call(o.exports,o,o.exports),o.exports}var n=Error("Cannot find module '"+t+"'");throw n.code="MODULE_NOT_FOUND",n}).register=function(t,e){r[t]=e},t.parcelRequired7c6=a),a("faBfA"),a("h5Hr7"),a("bUb57");var o=a("9MaFa"),n=a("I2Abx"),i=a("bEw54"),l=a("38Z3Q");document.querySelector(".newhero-content-wrapper");const s=document.querySelector(".newhero-render-wrapper"),d=new o.default;d.fetchTrendingDayMovies().then(t=>{let e=t.data,r={pageCurrent:e.page,totalResults:e.total_results,results:e.results},a=r.results;if(a.length>0){(function(t){let e=t.filter(t=>null!==t.backdrop_path).map(t=>{let e=(console.log(t.id),`
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
                        <p class="newhero-about-descr">${t.overview.substring(0,190)}...</p>
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
    `);return{overview:t.overview,markup:e}})[Math.floor(15*Math.random())],{overview:r,markup:a}=e;setTimeout(()=>{s.innerHTML=a,(0,n.modalController)({modal:".modal1",btnOpen:".js-newhero-open-modal-tr",btnClose:".modal__close"})},3e3)})(a),s.addEventListener("click",t=>{console.log(t.currentTarget,t.target),console.log(t.currentTarget),t.target===document.querySelector(".js-newhero-open-mod-det")&&(console.log("button DETAILS"),s.addEventListener("click",t=>{let e=t.target.closest("[film-id]");console.log("found",e),e&&(0,l.openModalCard)(e.getAttribute("film-id"))}))});return}}).catch(t=>console.error(t));var o=a("9MaFa"),p=a("7274P"),i=a("bEw54");a("I2Abx");var l=a("38Z3Q");const c=new o.default,u=document.querySelector(".weekly-gallery");u.addEventListener("click",function(t){let e=t.target.closest("[film-id]");e&&(0,l.openModalCard)(e.getAttribute("film-id"))}),c.fetchTrendingWeekMovies().then(t=>{let e=t.data.results,r=function(t){let e=[];for(;e.length<3;){let r=Math.floor(Math.random()*t);e.includes(r)||e.push(r)}return e}(e.length-1),a=[];r.forEach(t=>{let r=e[t];a.push(r)}),u.innerHTML=a.map(t=>(0,p.default)(t,i.default)).join("")}).catch(t=>console.error(t));var o=a("9MaFa"),m=a("2rpgd"),g=a("b5rV1");const h=document.querySelector(".js-upcoming-wrapper"),w=new o.default;w.fetchUpcomingMovies().then(t=>{let e=t.data,r={pageCurrent:e.page,totalResults:e.total_results,results:e.results},a=r.results;a.length>0?(function(t){let e=t.filter(t=>null!==t.backdrop_path).map(t=>{let e=`
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
    `;return{id:t.id,markup:e}})[Math.floor(15*Math.random())];console.log(e);let{id:r,markup:a}=e;h.innerHTML=a;let o=document.querySelector(".up-btn");(0,g.isInLibrary)(r)?(console.log((0,g.isInLibrary)(r)),o.textContent="Remove from my library"):(console.log("not"),o.textContent="Add to my library")}(a),h.addEventListener("click",t=>{if(console.log(t.currentTarget,t.target),console.log(t.currentTarget),t.target===document.querySelector(".up-btn")){let e=t.target,r=t.target.dataset.movieId,o=a.find(t=>t.id==r);(0,g.isInLibrary)(r)?((0,g.removeFromLibrary)(r),e.textContent="Add to my library"):((0,g.saveToLibrary)(o),e.textContent="Remove from my library")}})):0===a.length&&(h.innerHTML='<p class="upcoming-error">OOPS... We are very sorry! Upcoming this month not found.</p>')}).catch(t=>console.error(t)),a("38Z3Q"),a("I2Abx"),a("6fsAg"),a("epHO8");
//# sourceMappingURL=index.def2a457.js.map
