var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},e={},a={},o=t.parcelRequired7c6;null==o&&((o=function(t){if(t in e)return e[t].exports;if(t in a){var o=a[t];delete a[t];var r={id:t,exports:{}};return e[t]=r,o.call(r.exports,r,r.exports),r.exports}var i=Error("Cannot find module '"+t+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(t,e){a[t]=e},t.parcelRequired7c6=o),o("faBfA"),o("h5Hr7"),o("bUb57"),o("eEHR3");var r=o("9MaFa"),i=o("7274P");function l(t){let e=Math.round(t);return[,,,,,].fill(0).map((t,a)=>e-2*(a+1)>=0?'<div class="star"></div>':e-2*(a+1)+1==0?'<div class="star-half"></div>':'<div class="star-outline"></div>').join("")}const n=new r.default,s=document.querySelector(".weekly-gallery");s.addEventListener("click",function(t){console.log(t.target.getAttribute("film-id"),"Це id фільму")}),n.fetchTrendingWeekMovies().then(t=>{let e=t.data.results;console.log(e);let a=function(t){let e=[];for(;e.length<3;){let a=Math.floor(Math.random()*t);e.includes(a)||(e.push(a),console.log(e))}return e}(e.length-1),o=[];a.forEach(t=>{let a=e[t];o.push(a)}),s.innerHTML=o.map(t=>(0,i.default)(t,l)).join(""),console.log(o)}).catch(t=>console.error(t));var r=o("9MaFa"),d=o("2rpgd");const c=(t,e)=>{try{let a=JSON.stringify(e);localStorage.setItem(t,a)}catch(e){console.error(`Error saving ${t} to localStorage:`,e)}},p=t=>{try{let e=localStorage.getItem(t);return e?JSON.parse(e):void 0}catch(e){console.error(`Error loading ${t} from localStorage:`,e);return}},u=document.querySelector(".js-upcoming-wrapper"),g=new r.default;g.fetchUpcomingMovies().then(t=>{let e=t.data,a={pageCurrent:e.page,totalResults:e.total_results,results:e.results},o=a.results;if(o.length>0){!function(t){let e=t.filter(t=>null!==t.backdrop_path).map(t=>`
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
                <td class="upcoming-data-get">${(0,d.default)().filter(({id:e})=>t.genre_ids.includes(e)).map(({name:t})=>t).slice(0,2).join(", ")}</td>
            </tr>
        </table>
        <p class="upcoming-about">About</p>
        <p class="upcoming-about-descr">${t.overview}</p>
        <button type="button" class="up-btn" data-movie-id="${t.id}">Add to my library</button>
    </div>
    `)[Math.floor(15*Math.random())];u.innerHTML=e}(o);let t=document.querySelector(".up-btn");t.addEventListener("click",t=>{let e=t.target,a=t.target.dataset.movieId,r=o.find(t=>t.id==a);(function(t){let e=p("moviesData")||[];return 1===e.filter(({id:e})=>e==t).length})(a)?(function(t){let e=p("moviesData")||[];c("moviesData",e.filter(({id:e})=>e!=t))}(a),e.textContent="Add to my library"):(function({id:t,title:e,poster_path:a,genre_ids:o,release_date:r,vote_average:i}){let l=p("moviesData")||[];l.filter(({id:e})=>e==t).length||(l.push({id:t,title:e,poster_path:a,genre_ids:o,release_date:r,vote_average:i}),c("moviesData",l))}(r),e.textContent="Remove from my library")})}else 0===o.length&&(u.innerHTML='<p class="upcoming-error">OOPS... We are very sorry! Upcoming this month not found.</p>')}).catch(t=>console.error(t)),o("38Z3Q"),o("I2Abx"),o("6fsAg"),o("epHO8");
//# sourceMappingURL=index.4d5ca563.js.map
