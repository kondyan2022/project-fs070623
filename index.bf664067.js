!function(){var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},i={},r=e.parcelRequired7c6;null==r&&((r=function(e){if(e in t)return t[e].exports;if(e in i){var r=i[e];delete i[e];var l={id:e,exports:{}};return t[e]=l,r.call(l.exports,l,l.exports),l.exports}var n=Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}).register=function(e,t){i[e]=t},e.parcelRequired7c6=r),r("8ERGB"),r("3qT3v"),r("i8Q71");var l=r("kK94C");let n=new l.default,o=document.querySelector(".weekly-gallery");o.addEventListener("click",function(e){console.log(e.target.getAttribute("film-id"),"Це id фільму")}),n.fetchTrendingWeekMovies().then(e=>{let t=e.data.results;console.log(t);let i=function(e){let t=[];for(let i=0;i<3;i++)t.push(Math.floor(Math.random()*e));return t}(t.length-1),r=[];i.forEach(e=>{let i=t[e];r.push(i)}),o.innerHTML=r.map(e=>(function({id:e,title:t,poster_path:i,genre_ids:r,release_date:l,vote_average:n},o){let a=o(n);return`<div class="film-card" film-id="${e}">
  <img
    srcset="
      https://image.tmdb.org/t/p/w342/${i}      342w,
      https://image.tmdb.org/t/p/w500/${i}      500w,
      https://image.tmdb.org/t/p/w780/${i}      780w,
      https://image.tmdb.org/t/p/original/${i} 2000w
    "
    sizes="(min-width:1280px) 395px,
          (min-width:768px) 224px,
          (min-width:320px) 280px,
          100vw"
    src="https://image.tmdb.org/t/p/w342/${i}"
    alt="${t}"
    class="film-card-poster"
    film-id="${e}"
    loading="lazy"
    width="500"
    height="750"
  />
  <div class="film-card-textblock">
    <h3 class="film-card-title">${t}</h3>
    <p class="film-card-genre">${(function(){let{genres:e}=JSON.parse(localStorage.getItem("genres"))??{genres:[]};return e})().filter(({id:e})=>r.includes(e)).map(({name:e})=>e).slice(0,2).join(", ")} | ${l.slice(0,4)}</p>
  </div>
  <div class="film-card-stars">${a}</div>
</div>`})(e,e=>String(Math.round(2*e)/2))).join(""),console.log(r)}).catch(e=>console.error(e)),r("cbbxM"),r("ijwS8"),r("guHir"),r("7hKzD")}();
//# sourceMappingURL=index.bf664067.js.map
