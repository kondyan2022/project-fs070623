!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},r={},o=e.parcelRequired7c6;null==o&&((o=function(e){if(e in t)return t[e].exports;if(e in r){var o=r[e];delete r[e];var a={id:e,exports:{}};return t[e]=a,o.call(a.exports,a,a.exports),a.exports}var i=Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){r[e]=t},e.parcelRequired7c6=o),o("8ERGB"),o("3qT3v"),o("i8Q71");var a=(o("kK94C"),o("kK94C"));let i=({modal:e,btnOpen:t,btnClose:r,time:o=300})=>{let i;let n=document.querySelectorAll(t),l=document.querySelector(e);l.style.cssText=`
    display: flex;
    visibility: hidden;
    opacity: 0;
    transition: opacity ${o}ms ease-in-out;
  `;let s=e=>{let t=e.target;(t===l||r&&t.closest(r)||"Escape"===e.code)&&(l.style.opacity=0,setTimeout(()=>{l.style.visibility="hidden",i&&i.stopVideo()},o),window.removeEventListener("keydown",s)),document.body.classList.remove("modal-open")},d=async e=>{let t=e.target.closest("[film-id]");try{var r;let e=await (r=t.getAttribute("film-id"),new Promise((e,t)=>{c.fetchMovieVideoById(r).then(r=>{if(r){console.log(r);let t=function({data:{results:e}}){let t=e.filter(({type:e})=>"Trailer"===e).sort(({published_at:e},{published_at:t})=>e-t);if(t)return t[0].key}(r);e(t)}else{let e=document.createElement("div");e.classList.add("modal__error"),e.innerHTML=`
            <p class="error-message">
              OOPS... <br />
              We are very sorry! <br />
              But we couldn’t find the trailer.
            </p>
            <img class="error-image" src="../images/oops.jpg" alt="error" />
          `,l.appendChild(e),t(Error("Trailer not found"))}}).catch(e=>t(e))}));l.style.visibility="visible",l.style.opacity=1,window.addEventListener("keydown",s),i&&i.loadVideoById(e),document.body.classList.add("modal-open")}catch(e){console.log(e)}};n.forEach(e=>{e.addEventListener("click",d)}),l.addEventListener("click",s);let c=new a.default;function p(e){i=new window.YT.Player("youtube-player",{width:"600",height:"350",videoId:e,playerVars:{autoplay:0,controls:1,disablekb:1,fs:0,iv_load_policy:3,rel:0},events:{onReady:u}})}function u(e){}!function(){let e=document.createElement("script");e.src="https://www.youtube.com/iframe_api";let t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t),window.onYouTubeIframeAPIReady=p}()};var n=o("jMVtP");document.querySelector(".newhero-content-wrapper");let l=document.querySelector(".newhero-render-wrapper"),s=new a.default;s.fetchTrendingDayMovies().then(e=>{let t=e.data,r={pageCurrent:t.page,totalResults:t.total_results,results:t.results},o=r.results;if(o.length>0){(function(e){let t=e.filter(e=>null!==e.backdrop_path).map(e=>{let t=(console.log(e.overview),`
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
    `);return{overview:e.overview,markup:t}})[Math.floor(15*Math.random())],{overview:r,markup:o}=t;setTimeout(()=>{l.innerHTML=o,i({modal:".modal1",btnOpen:".js-newhero-open-modal-tr",btnClose:".modalclose"})},3e3)})(o),l.addEventListener("click",e=>{console.log(e.currentTarget,e.target),console.log(e.currentTarget),e.target===document.querySelector(".js-newhero-open-mod-det")&&(console.log("button DETAILS"),l.addEventListener("click",e=>{let t=evt.target.closest("[film-id]");t&&openModalCard(t.getAttribute("film-id"))}))});return}}).catch(e=>console.error(e));var a=o("kK94C"),d=o("b3pWk"),n=o("jMVtP"),c=o("cbbxM");let p=new a.default,u=document.querySelector(".weekly-gallery");u.addEventListener("click",function(e){let t=e.target.closest("[film-id]");t&&(0,c.openModalCard)(t.getAttribute("film-id"))}),p.fetchTrendingWeekMovies().then(e=>{let t=e.data.results,r=function(e){let t=[];for(;t.length<3;){let r=Math.floor(Math.random()*e);t.includes(r)||t.push(r)}return t}(t.length-1),o=[];r.forEach(e=>{let r=t[e];o.push(r)}),u.innerHTML=o.map(e=>(0,d.default)(e,n.default)).join("")}).catch(e=>console.error(e));var a=o("kK94C"),m=o("lwvvG"),g=o("4LMMA");let h=document.querySelector(".js-upcoming-wrapper"),w=new a.default;w.fetchUpcomingMovies().then(e=>{let t=e.data,r={pageCurrent:t.page,totalResults:t.total_results,results:t.results},o=r.results;o.length>0?(function(e){let t=e.filter(e=>null!==e.backdrop_path).map(e=>{let t=`
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
    `;return{id:e.id,markup:t}})[Math.floor(15*Math.random())];console.log(t);let{id:r,markup:o}=t;h.innerHTML=o;let a=document.querySelector(".up-btn");(0,g.isInLibrary)(r)?(console.log((0,g.isInLibrary)(r)),a.textContent="Remove from my library"):(console.log("not"),a.textContent="Add to my library")}(o),h.addEventListener("click",e=>{if(console.log(e.currentTarget,e.target),console.log(e.currentTarget),e.target===document.querySelector(".up-btn")){let t=e.target,r=e.target.dataset.movieId,a=o.find(e=>e.id==r);(0,g.isInLibrary)(r)?((0,g.removeFromLibrary)(r),t.textContent="Add to my library"):((0,g.saveToLibrary)(a),t.textContent="Remove from my library")}})):0===o.length&&(h.innerHTML='<p class="upcoming-error">OOPS... We are very sorry! Upcoming this month not found.</p>')}).catch(e=>console.error(e)),o("cbbxM"),o("guHir"),o("7hKzD")}();
//# sourceMappingURL=index.d1bfe648.js.map
