!function(){var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},e={},a={},r=t.parcelRequired7c6;null==r&&((r=function(t){if(t in e)return e[t].exports;if(t in a){var r=a[t];delete a[t];var i={id:t,exports:{}};return e[t]=i,r.call(i.exports,i,i.exports),i.exports}var o=Error("Cannot find module '"+t+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(t,e){a[t]=e},t.parcelRequired7c6=r),r("8ERGB"),r("3qT3v"),r("i8Q71"),r("kFyhi");var i=r("kK94C"),o=r("b3pWk"),n=r("jMVtP");r("ijwS8");var l=r("cbbxM");let d=new i.default,s=document.querySelector(".weekly-gallery");s.addEventListener("click",function(t){let e=t.target.closest("[film-id]");e&&(0,l.openModalCard)(e.getAttribute("film-id"))}),d.fetchTrendingWeekMovies().then(t=>{let e=t.data.results,a=function(t){let e=[];for(;e.length<3;){let a=Math.floor(Math.random()*t);e.includes(a)||e.push(a)}return e}(e.length-1),r=[];a.forEach(t=>{let a=e[t];r.push(a)}),s.innerHTML=r.map(t=>(0,o.default)(t,n.default)).join("")}).catch(t=>console.error(t));var i=r("kK94C"),c=r("4LMMA"),p=r("lwvvG");let u=document.querySelector(".js-upcoming-wrapper"),m=new i.default;(async function(){try{let t=await m.fetchUpcomingMovies(),e=t.data,a=e.results;if(a.length>0){let t=await function(t){let e=t.filter(t=>null!==t.backdrop_path).map(t=>{let e=`
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
                            <td class="upcoming-data-get">${(0,p.default)().filter(({id:e})=>t.genre_ids.includes(e)).map(({name:t})=>t).slice(0,2).join(", ")}</td>
                        </tr>
                    </table>
                    <p class="upcoming-about">About</p>
                    <p class="upcoming-about-descr">${t.overview}</p>
                    <div class="up-wrap-btn">
                        <button type="button" class="up-btn" data-movie-id="${t.id}">Add to my library</button>
                    </div>
                </div>`;return{id:t.id,markup:e}})[Math.floor(15*Math.random())];return e}(a),{id:e,markup:r}=t;u.innerHTML=r;let i=document.querySelector(".up-btn");(0,c.isInLibrary)(e)?i.textContent="Remove from my library":i.textContent="Add to my library",u.addEventListener("click",t=>{if(t.target===document.querySelector(".up-btn")){let e=t.target,r=t.target.dataset.movieId,i=a.find(t=>t.id==r);(0,c.isInLibrary)(r)?((0,c.removeFromLibrary)(r),e.textContent="Add to my library"):((0,c.saveToLibrary)(i),e.textContent="Remove from my library")}})}else 0===a.length&&(u.innerHTML='<p class="upcoming-error">OOPS... We are very sorry! Upcoming this month not found.</p>')}catch(t){console.error(t)}})(),r("cbbxM"),r("ijwS8"),r("guHir"),r("7hKzD")}();
//# sourceMappingURL=index.188cd698.js.map
