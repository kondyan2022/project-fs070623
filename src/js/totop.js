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
      refs.totop.style.display = ent.isIntersecting ? 'none' : 'flex';
    }
  });
}, options);

export function totopOn() {
  observer.observe(refs.switch);
  refs.totop.style.display = 'flex';
}

export function totopOff() {
  observer.unobserve(refs.switch);
  refs.totop.style.display = 'none';
}
refs.totop.addEventListener('click', e => {
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });

  // window.scrollBy({

  //   top: cardHeight * 2,
  //   behavior: 'smooth',
  // });
});

totopOn();
