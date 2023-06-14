var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},e={},r={},a=t.parcelRequired7c6;null==a&&((a=function(t){if(t in e)return e[t].exports;if(t in r){var a=r[t];delete r[t];var o={id:t,exports:{}};return e[t]=o,a.call(o.exports,o,o.exports),o.exports}var n=Error("Cannot find module '"+t+"'");throw n.code="MODULE_NOT_FOUND",n}).register=function(t,e){r[t]=e},t.parcelRequired7c6=a),a("faBfA"),a("h5Hr7"),a("bUb57");var o=a("9MaFa"),n=a("I2Abx"),i=a("bEw54");const l=document.querySelector(".newhero-content-wrapper"),s=document.querySelector(".newhero-render-wrapper");function d(t){console.log(t.target.getAttribute("film-id"),"Це id фільму")}const c=new o.default;c.fetchTrendingDayMovies().then(t=>{let e=t.data,r={pageCurrent:e.page,totalResults:e.total_results,results:e.results},a=r.results;if(a.length>0){(function(t){let e=t.filter(t=>null!==t.backdrop_path).map(t=>{let e=`
    <div class="swiper">
        <div class="swiper-wrapper">
            <div class="swiper-slide newhero-content-wrapper">
                    <div class="newhero-thumb">
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
                        <p class="newhero-about-descr">${t.overview}</p>
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
        </div>
    `;return{id:t.id,markup:e}})[Math.floor(15*Math.random())],{id:r,markup:a}=e;setTimeout(()=>{s.innerHTML=a,(0,n.modalController)({modal:".modal1",btnOpen:".js-newhero-open-modal-tr",btnClose:".modalclose"})},3e3)})(a),s.addEventListener("click",t=>{console.log(t.currentTarget,t.target),console.log(t.currentTarget),t.target===document.querySelector(".js-newhero-open-mod-det")&&(console.log("button DETAILS"),l.addEventListener("click",d))});return}}).catch(t=>console.error(t));var o=a("9MaFa"),p=a("7274P"),i=a("bEw54");a("I2Abx");var u=a("38Z3Q");const g=new o.default,m=document.querySelector(".weekly-gallery");m.addEventListener("click",function(t){let e=t.target.closest("[film-id]");e&&(0,u.openModalCard)(e.getAttribute("film-id"))}),g.fetchTrendingWeekMovies().then(t=>{let e=t.data.results,r=function(t){let e=[];for(;e.length<3;){let r=Math.floor(Math.random()*t);e.includes(r)||e.push(r)}return e}(e.length-1),a=[];r.forEach(t=>{let r=e[t];a.push(r)}),m.innerHTML=a.map(t=>(0,p.default)(t,i.default)).join("")}).catch(t=>console.error(t));var o=a("9MaFa"),h=a("2rpgd");const w=(t,e)=>{try{let r=JSON.stringify(e);localStorage.setItem(t,r)}catch(e){console.error(`Error saving ${t} to localStorage:`,e)}},b=t=>{try{let e=localStorage.getItem(t);return e?JSON.parse(e):void 0}catch(e){console.error(`Error loading ${t} from localStorage:`,e);return}};function v(t){let e=b("moviesData")||[];return 1===e.filter(({id:e})=>e==t).length}const f=document.querySelector(".js-upcoming-wrapper"),y=new o.default;y.fetchUpcomingMovies().then(t=>{let e=t.data,r={pageCurrent:e.page,totalResults:e.total_results,results:e.results},a=r.results;a.length>0?(function(t){let e=t.filter(t=>null!==t.backdrop_path).map(t=>{let e=`
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
    `;return{id:t.id,markup:e}})[Math.floor(15*Math.random())];console.log(e);let{id:r,markup:a}=e;f.innerHTML=a;let o=document.querySelector(".up-btn");v(r)?(console.log(v(r)),o.textContent="Remove from my library"):(console.log("not"),o.textContent="Add to my library")}(a),f.addEventListener("click",t=>{if(console.log(t.currentTarget,t.target),console.log(t.currentTarget),t.target===document.querySelector(".up-btn")){let e=t.target,r=t.target.dataset.movieId,o=a.find(t=>t.id==r);v(r)?(function(t){let e=b("moviesData")||[];w("moviesData",e.filter(({id:e})=>e!=t))}(r),e.textContent="Add to my library"):(function({id:t,title:e,poster_path:r,genre_ids:a,release_date:o,vote_average:n}){let i=b("moviesData")||[];i.filter(({id:e})=>e==t).length||(i.push({id:t,title:e,poster_path:r,genre_ids:a,release_date:o,vote_average:n}),w("moviesData",i))}(o),e.textContent="Remove from my library")}})):0===a.length&&(f.innerHTML='<p class="upcoming-error">OOPS... We are very sorry! Upcoming this month not found.</p>')}).catch(t=>console.error(t)),a("38Z3Q"),a("I2Abx"),a("6fsAg"),a("epHO8");
//# sourceMappingURL=index.f8d122c4.js.map
