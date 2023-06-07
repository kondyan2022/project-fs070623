const refs = {
  switch: document.querySelector('.toggle-switch'),
  totop: document.querySelector('.totop'),
};

let options = {
  root: null,
  rootMargin: '50px',
  threshold: 1.0,
};
let observer = new IntersectionObserver((entieres, observer) => {
  entieres.forEach(ent => {
    if (ent.target === refs.switch) {
      refs.totop.style.display = ent.isIntersecting ? 'none' : 'inline-block';
    }
  });
}, options);
observer.observe(refs.switch);
