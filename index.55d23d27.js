!function(){var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},e={},o={},a=t.parcelRequired7c6;null==a&&((a=function(t){if(t in e)return e[t].exports;if(t in o){var a=o[t];delete o[t];var l={id:t,exports:{}};return e[t]=l,a.call(l.exports,l,l.exports),l.exports}var r=Error("Cannot find module '"+t+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(t,e){o[t]=e},t.parcelRequired7c6=a),a("8ERGB"),a("3qT3v"),a("i8Q71"),a("gVa74");var l=a("kK94C"),r=a("b3pWk");function i(t){let e=Math.round(t);return[,,,,,].fill(0).map((t,o)=>e-2*(o+1)>=0?'<div class="star"></div>':e-2*(o+1)+1==0?'<div class="star-half"></div>':'<div class="star-outline"></div>').join("")}let n=new l.default,s=document.querySelector(".weekly-gallery");s.addEventListener("click",function(t){console.log(t.target.getAttribute("film-id"),"Це id фільму")}),n.fetchTrendingWeekMovies().then(t=>{let e=t.data.results;console.log(e);let o=function(t){let e=[];for(;e.length<3;){let o=Math.floor(Math.random()*t);e.includes(o)||(e.push(o),console.log(e))}return e}(e.length-1),a=[];o.forEach(t=>{let o=e[t];a.push(o)}),s.innerHTML=a.map(t=>(0,r.default)(t,i)).join(""),console.log(a)}).catch(t=>console.error(t));var l=a("kK94C"),c=a("lwvvG");a("eL2pK");let d=(t,e)=>{try{let o=JSON.stringify(e);localStorage.setItem(t,o)}catch(e){console.error(`Error saving ${t} to localStorage:`,e)}},p=t=>{try{let e=localStorage.getItem(t);return e?JSON.parse(e):void 0}catch(e){console.error(`Error loading ${t} from localStorage:`,e);return}},u=document.querySelector(".js-upcoming-wrapper"),g=new l.default;console.log(g),g.fetchUpcomingMovies().then(t=>{console.log("Upcoming",t);let e=t.data;console.log(e);let o={pageCurrent:e.page,totalResults:e.total_results,results:e.results};console.log(o);let a=o.results;if(a.length>0){(function(t){let e=Math.floor(15*Math.random()),o=t.filter(t=>null!==t.backdrop_path).map(t=>`
    <div class="upcoming-left-wrap">
        <div class="up-thumb">
            <img 
                srcset="
                    https:/image.tmdb.org/t/p/w342/${t.poster_path} 342w,
                    https:/image.tmdb.org/t/p/w500/${t.backdrop_path} 500w,
                    https:/image.tmdb.org/t/p/w780/${t.backdrop_path} 780w,
                    https:/image.tmdb.org/t/p/original/${t.backdrop_path} 2000w
                "
                sizes="(min-width: 320px),
                    (min-width: 768px),
                    (min-width: 1280px),
                "
                src="https:/image.tmdb.org/t/p/original/${t.backdrop_path}" 
                alt="${t.title}"
                class="upcoming-image"
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
        <button type="button" class="up-btn" data-movie-id="${t.id}">Add to my library</button>
    </div>
    `)[e];console.log(e),u.innerHTML=o})(a);let t=document.querySelector(".up-btn");t.addEventListener("click",t=>{let e=t.target,o=t.target.dataset.movieId,l=a.find(t=>t.id==o);console.log(l),function(t){let e=p("moviesData")||[];return 1===e.filter(({id:e})=>e==t).length}(o)?(function(t){let e=p("moviesData")||[];d("moviesData",e.filter(({id:e})=>e!=t))}(o),e.textContent="Add to my library",console.log("remove")):(function({id:t,title:e,poster_path:o,genre_ids:a,release_date:l,vote_average:r}){let i=p("moviesData")||[];i.filter(({id:e})=>e==t).length||(i.push({id:t,title:e,poster_path:o,genre_ids:a,release_date:l,vote_average:r}),d("moviesData",i))}(l),e.textContent="Remove from my library",console.log("save"))})}else 0===a.length&&(u.innerHTML='<p class="upcoming-error">OOPS... We are very sorry! Upcoming this month not found.</p>')}).catch(t=>console.error(t)),a("cbbxM"),a("ijwS8"),a("guHir"),a("7hKzD")}();
//# sourceMappingURL=index.55d23d27.js.map
