!function(){var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},e={},r={},o=t.parcelRequired7c6;null==o&&((o=function(t){if(t in e)return e[t].exports;if(t in r){var o=r[t];delete r[t];var a={id:t,exports:{}};return e[t]=a,o.call(a.exports,a,a.exports),a.exports}var n=Error("Cannot find module '"+t+"'");throw n.code="MODULE_NOT_FOUND",n}).register=function(t,e){r[t]=e},t.parcelRequired7c6=o),o("8ERGB"),o("3qT3v"),o("i8Q71");var a=o("kK94C"),n=o("ijwS8"),i=o("jMVtP"),l=o("cbbxM");document.querySelector(".newhero-content-wrapper");let s=document.querySelector(".newhero-render-wrapper"),d=new a.default;d.fetchTrendingDayMovies().then(t=>{let e=t.data,r={pageCurrent:e.page,totalResults:e.total_results,results:e.results},o=r.results;if(o.length>0){(function(t){let e=t.filter(t=>null!==t.backdrop_path).map(t=>{let e=(console.log(t.id),`
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
    `);return{overview:t.overview,markup:e}})[Math.floor(15*Math.random())],{overview:r,markup:o}=e;setTimeout(()=>{s.innerHTML=o,(0,n.modalController)({modal:".modal1",btnOpen:".js-newhero-open-modal-tr",btnClose:".modal__close"})},3e3)})(o),s.addEventListener("click",t=>{console.log(t.currentTarget,t.target),console.log(t.currentTarget),t.target===document.querySelector(".js-newhero-open-mod-det")&&(console.log("button DETAILS"),s.addEventListener("click",t=>{let e=t.target.closest("[film-id]");console.log("found",e),e&&(0,l.openModalCard)(e.getAttribute("film-id"))}))});return}}).catch(t=>console.error(t));var a=o("kK94C"),p=o("b3pWk"),i=o("jMVtP");o("ijwS8");var l=o("cbbxM");let c=new a.default,u=document.querySelector(".weekly-gallery");u.addEventListener("click",function(t){let e=t.target.closest("[film-id]");e&&(0,l.openModalCard)(e.getAttribute("film-id"))}),c.fetchTrendingWeekMovies().then(t=>{let e=t.data.results,r=function(t){let e=[];for(;e.length<3;){let r=Math.floor(Math.random()*t);e.includes(r)||e.push(r)}return e}(e.length-1),o=[];r.forEach(t=>{let r=e[t];o.push(r)}),u.innerHTML=o.map(t=>(0,p.default)(t,i.default)).join("")}).catch(t=>console.error(t));var a=o("kK94C"),m=o("lwvvG"),g=o("4LMMA");let h=document.querySelector(".js-upcoming-wrapper"),w=new a.default;w.fetchUpcomingMovies().then(t=>{let e=t.data,r={pageCurrent:e.page,totalResults:e.total_results,results:e.results},o=r.results;o.length>0?(function(t){let e=t.filter(t=>null!==t.backdrop_path).map(t=>{let e=`
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
    `;return{id:t.id,markup:e}})[Math.floor(15*Math.random())];console.log(e);let{id:r,markup:o}=e;h.innerHTML=o;let a=document.querySelector(".up-btn");(0,g.isInLibrary)(r)?(console.log((0,g.isInLibrary)(r)),a.textContent="Remove from my library"):(console.log("not"),a.textContent="Add to my library")}(o),h.addEventListener("click",t=>{if(console.log(t.currentTarget,t.target),console.log(t.currentTarget),t.target===document.querySelector(".up-btn")){let e=t.target,r=t.target.dataset.movieId,a=o.find(t=>t.id==r);(0,g.isInLibrary)(r)?((0,g.removeFromLibrary)(r),e.textContent="Add to my library"):((0,g.saveToLibrary)(a),e.textContent="Remove from my library")}})):0===o.length&&(h.innerHTML='<p class="upcoming-error">OOPS... We are very sorry! Upcoming this month not found.</p>')}).catch(t=>console.error(t)),o("cbbxM"),o("ijwS8"),o("guHir"),o("7hKzD")}();
//# sourceMappingURL=index.c4afa1b0.js.map
