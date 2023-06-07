const t={switch:document.querySelector(".toggle-switch"),totop:document.querySelector(".totop")};new IntersectionObserver((e,o)=>{e.forEach(e=>{e.target===t.switch&&(t.totop.style.display=e.isIntersecting?"none":"inline-block")})},{root:null,rootMargin:"50px",threshold:1}).observe(t.switch);
//# sourceMappingURL=catalog.00021a0e.js.map
