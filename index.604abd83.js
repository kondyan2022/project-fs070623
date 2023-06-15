var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},o={},r=e.parcelRequired7c6;null==r&&((r=function(e){if(e in t)return t[e].exports;if(e in o){var r=o[e];delete o[e];var a={id:e,exports:{}};return t[e]=a,r.call(a.exports,a,a.exports),a.exports}var i=Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){o[e]=t},e.parcelRequired7c6=r),r("faBfA"),r("h5Hr7"),r("bUb57");var a=(r("9MaFa"),r("9MaFa"));const i=({modal:e,btnOpen:t,btnClose:o,time:r=300})=>{let i;let n=document.querySelectorAll(t),s=document.querySelector(e);s.style.cssText=`
    display: flex;
    visibility: hidden;
    opacity: 0;
    transition: opacity ${r}ms ease-in-out;
  `;let l=e=>{let t=e.target;(t===s||o&&t.closest(o)||"Escape"===e.code)&&(s.style.opacity=0,setTimeout(()=>{s.style.visibility="hidden",i&&i.stopVideo()},r),window.removeEventListener("keydown",l)),document.body.classList.remove("modal-open")},d=async e=>{let t=e.target.closest("[film-id]");try{var o;let e=await (o=t.getAttribute("film-id"),new Promise((e,t)=>{c.fetchMovieVideoById(o).then(o=>{if(o){console.log(o);let t=function({data:{results:e}}){let t=e.filter(({type:e})=>"Trailer"===e).sort(({published_at:e},{published_at:t})=>e-t);if(t)return t[0].key}(o);e(t)}else{let e=document.createElement("div");e.classList.add("modal__error"),e.innerHTML=`
            <p class="error-message">
              OOPS... <br />
              We are very sorry! <br />
              But we couldn’t find the trailer.
            </p>
            <img class="error-image" src="../images/oops.jpg" alt="error" />
          `,s.appendChild(e),t(Error("Trailer not found"))}}).catch(e=>t(e))}));s.style.visibility="visible",s.style.opacity=1,window.addEventListener("keydown",l),i&&i.loadVideoById(e),document.body.classList.add("modal-open")}catch(e){console.log(e)}};n.forEach(e=>{e.addEventListener("click",d)}),s.addEventListener("click",l);let c=new a.default;function p(e){i=new window.YT.Player("youtube-player",{width:"600",height:"350",videoId:e,playerVars:{autoplay:0,controls:1,disablekb:1,fs:0,iv_load_policy:3,rel:0},events:{onReady:u}})}function u(e){}!function(){let e=document.createElement("script");e.src="https://www.youtube.com/iframe_api";let t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t),window.onYouTubeIframeAPIReady=p}()};var n=r("bEw54");document.querySelector(".newhero-content-wrapper");const s=document.querySelector(".newhero-render-wrapper"),l=new a.default;l.fetchTrendingDayMovies().then(e=>{let t=e.data,o={pageCurrent:t.page,totalResults:t.total_results,results:t.results},r=o.results;if(r.length>0){(function(e){let t=e.filter(e=>null!==e.backdrop_path).map(e=>{let t=(console.log(e.overview),`
        <div class="swiper-wrapper">
            <div class="swiper-slide newhero-content-wrapper">
                    <div class="newhero-thumb">
                        <img
                            srcset="
                                https://image.tmdb.org/t/p/w300/${e.backdrop_path}      300w,
                                https://image.tmdb.org/t/p/w780/${e.backdrop_path}      780w,
                                https://image.tmdb.org/t/p/w1280/${e.backdrop_path}      1280w,
                                https://image.tmdb.org/t/p/original/${e.backdrop_path}  3840w
                            "
                            sizes="(min-width: 320px) 772px,
                                    (min-width: 768px) 768px,
                                    (min-width: 1280px) 1280px,
                                    100vw"
                            src="https://image.tmdb.org/t/p/w300/${e.backdrop_path}"
                            alt="${e.title}"
                            class="newhero-image"
                            width="1280"
                            height="720"
                        />
                    </div>

                    <div class="newhero-movie-inform-wrap">
                        <h1 class="newhero-movie-title">${e.title}</h1>
                        <div class="newhero-stars">${(0,n.default)(e.vote_average)}</div>
                        <p class="newhero-about-descr">${e.overview.substring(0,190)}...</p>
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
    `);return{overview:e.overview,markup:t}})[Math.floor(15*Math.random())],{overview:o,markup:r}=t;setTimeout(()=>{s.innerHTML=r,i({modal:".modal1",btnOpen:".js-newhero-open-modal-tr",btnClose:".modalclose"})},3e3)})(r),s.addEventListener("click",e=>{console.log(e.currentTarget,e.target),console.log(e.currentTarget),e.target===document.querySelector(".js-newhero-open-mod-det")&&(console.log("button DETAILS"),s.addEventListener("click",e=>{let t=evt.target.closest("[film-id]");t&&openModalCard(t.getAttribute("film-id"))}))});return}}).catch(e=>console.error(e));var a=r("9MaFa"),d=r("7274P"),n=r("bEw54"),c=r("38Z3Q");const p=new a.default,u=document.querySelector(".weekly-gallery");u.addEventListener("click",function(e){let t=e.target.closest("[film-id]");t&&(0,c.openModalCard)(t.getAttribute("film-id"))}),p.fetchTrendingWeekMovies().then(e=>{let t=e.data.results,o=function(e){let t=[];for(;t.length<3;){let o=Math.floor(Math.random()*e);t.includes(o)||t.push(o)}return t}(t.length-1),r=[];o.forEach(e=>{let o=t[e];r.push(o)}),u.innerHTML=r.map(e=>(0,d.default)(e,n.default)).join("")}).catch(e=>console.error(e));var a=r("9MaFa"),m=r("2rpgd"),g=r("b5rV1");const h=document.querySelector(".js-upcoming-wrapper"),w=new a.default;w.fetchUpcomingMovies().then(e=>{let t=e.data,o={pageCurrent:t.page,totalResults:t.total_results,results:t.results},r=o.results;r.length>0?(function(e){let t=e.filter(e=>null!==e.backdrop_path).map(e=>{let t=`
    <div class="upcoming-left-wrap">
        <div class="up-thumb">
            <img
                srcset="
                    https://image.tmdb.org/t/p/w300/${e.backdrop_path}      300w,
                    https://image.tmdb.org/t/p/w780/${e.backdrop_path}      780w,
                    https://image.tmdb.org/t/p/w1280/${e.backdrop_path}      1280w,
                    https://image.tmdb.org/t/p/original/${e.backdrop_path}  3840w
                "
                sizes="(min-width: 320px) 498px,
                        (min-width: 768px) 704px,
                        (min-width: 1280px) 805px,
                        100vw"
                src="https://image.tmdb.org/t/p/w300/${e.backdrop_path}"
                alt="${e.title}"
                class="upcoming-image"
                width="1280"
                height="720"
            />
        </div>
    </div>
    <div class="upcoming-right-wrap">
        <h2 class="upcoming-movie-title">${e.title}</h2>
        <table class="upcoming-table">
            <tr class="upcoming-tab-row">
                <td class="upcoming-data">Release date</td>
                <td class="upcom-data-release">${e.release_date}</td>
            </tr>
            <tr class="upcoming-tab-row">
                <td class="upcoming-data">Vote / Votes</td>
                <td class="upcoming-data-average">
                    <span class="up-average">${e.vote_average}</span>/<span class="up-count">${e.vote_count}</span>
                </td>
            </tr>
            <tr class="upcoming-tab-row">
                <td class="upcoming-data">Popularity</td>
                <td class="upcoming-data-get">${e.popularity.toFixed(1)}</td>
            </tr>
            <tr class="upcoming-tab-row">
                <td class="upcoming-data">Genre</td>
                <td class="upcoming-data-get">${(0,m.default)().filter(({id:t})=>e.genre_ids.includes(t)).map(({name:e})=>e).slice(0,2).join(", ")}</td>
            </tr>
        </table>
        <p class="upcoming-about">About</p>
        <p class="upcoming-about-descr">${e.overview}</p>
        <div class="up-wrap-btn">
            <button type="button" class="up-btn" data-movie-id="${e.id}">Add to my library</button>
        </div>
        </div>
    `;return{id:e.id,markup:t}})[Math.floor(15*Math.random())];console.log(t);let{id:o,markup:r}=t;h.innerHTML=r;let a=document.querySelector(".up-btn");(0,g.isInLibrary)(o)?(console.log((0,g.isInLibrary)(o)),a.textContent="Remove from my library"):(console.log("not"),a.textContent="Add to my library")}(r),h.addEventListener("click",e=>{if(console.log(e.currentTarget,e.target),console.log(e.currentTarget),e.target===document.querySelector(".up-btn")){let t=e.target,o=e.target.dataset.movieId,a=r.find(e=>e.id==o);(0,g.isInLibrary)(o)?((0,g.removeFromLibrary)(o),t.textContent="Add to my library"):((0,g.saveToLibrary)(a),t.textContent="Remove from my library")}})):0===r.length&&(h.innerHTML='<p class="upcoming-error">OOPS... We are very sorry! Upcoming this month not found.</p>')}).catch(e=>console.error(e)),r("38Z3Q"),r("6fsAg"),r("epHO8");
//# sourceMappingURL=index.604abd83.js.map
