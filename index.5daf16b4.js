var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},e={},a={},r=t.parcelRequired7c6;null==r&&((r=function(t){if(t in e)return e[t].exports;if(t in a){var r=a[t];delete a[t];var o={id:t,exports:{}};return e[t]=o,r.call(o.exports,o,o.exports),o.exports}var l=Error("Cannot find module '"+t+"'");throw l.code="MODULE_NOT_FOUND",l}).register=function(t,e){a[t]=e},t.parcelRequired7c6=r),r("faBfA"),r("h5Hr7"),r("bUb57"),r("eEHR3");var o=r("9MaFa"),l=r("7274P"),n=r("bEw54");r("I2Abx");var i=r("38Z3Q");const s=new o.default,d=document.querySelector(".weekly-gallery");d.addEventListener("click",function(t){let e=t.target.closest("[film-id]");e&&(0,i.openModalCard)(e.getAttribute("film-id"))}),s.fetchTrendingWeekMovies().then(t=>{let e=t.data.results,a=function(t){let e=[];for(;e.length<3;){let a=Math.floor(Math.random()*t);e.includes(a)||e.push(a)}return e}(e.length-1),r=[];a.forEach(t=>{let a=e[t];r.push(a)}),d.innerHTML=r.map(t=>(0,l.default)(t,n.default)).join("")}).catch(t=>console.error(t));var o=r("9MaFa"),c=r("2rpgd");const p=(t,e)=>{try{let a=JSON.stringify(e);localStorage.setItem(t,a)}catch(e){console.error(`Error saving ${t} to localStorage:`,e)}},u=t=>{try{let e=localStorage.getItem(t);return e?JSON.parse(e):void 0}catch(e){console.error(`Error loading ${t} from localStorage:`,e);return}};function g(t){let e=u("moviesData")||[];return 1===e.filter(({id:e})=>e==t).length}const m=document.querySelector(".js-upcoming-wrapper"),h=new o.default;h.fetchUpcomingMovies().then(t=>{let e=t.data,a={pageCurrent:e.page,totalResults:e.total_results,results:e.results},r=a.results;r.length>0?(function(t){let e=t.filter(t=>null!==t.backdrop_path).map(t=>{let e=`
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
                <td class="upcoming-data-get">${(0,c.default)().filter(({id:e})=>t.genre_ids.includes(e)).map(({name:t})=>t).slice(0,2).join(", ")}</td>
            </tr>
        </table>
        <p class="upcoming-about">About</p>
        <p class="upcoming-about-descr">${t.overview}</p>
        <div class="up-wrap-btn">
            <button type="button" class="up-btn" data-movie-id="${t.id}">Add to my library</button>
        </div>
        </div>
    `;return{id:t.id,markup:e}})[Math.floor(15*Math.random())];console.log(e);let{id:a,markup:r}=e;m.innerHTML=r;let o=document.querySelector(".up-btn");g(a)?(console.log(g(a)),o.textContent="Remove from my library"):(console.log("not"),o.textContent="Add to my library")}(r),m.addEventListener("click",t=>{if(console.log(t.currentTarget,t.target),console.log(t.currentTarget),t.target===document.querySelector(".up-btn")){let e=t.target,a=t.target.dataset.movieId,o=r.find(t=>t.id==a);g(a)?(function(t){let e=u("moviesData")||[];p("moviesData",e.filter(({id:e})=>e!=t))}(a),e.textContent="Add to my library"):(function({id:t,title:e,poster_path:a,genre_ids:r,release_date:o,vote_average:l}){let n=u("moviesData")||[];n.filter(({id:e})=>e==t).length||(n.push({id:t,title:e,poster_path:a,genre_ids:r,release_date:o,vote_average:l}),p("moviesData",n))}(o),e.textContent="Remove from my library")}})):0===r.length&&(m.innerHTML='<p class="upcoming-error">OOPS... We are very sorry! Upcoming this month not found.</p>')}).catch(t=>console.error(t)),r("38Z3Q"),r("I2Abx"),r("6fsAg"),r("epHO8");
//# sourceMappingURL=index.5daf16b4.js.map
