import TMDBApiService from './tmdb-api.js';

const modalController = ({ modal, btnOpen, btnClose, time = 300 }) => {
  const buttonElems = document.querySelectorAll(btnOpen);
  const modalElem = document.querySelector(modal);
  let player;

  modalElem.style.cssText = `
    display: flex;
    visibility: hidden;
    opacity: 0;
    transition: opacity ${time}ms ease-in-out;
  `;

  const closeModal = event => {
    const target = event.target;

    if (
      target === modalElem ||
      (btnClose && target.closest(btnClose)) ||
      event.code === 'Escape'
    ) {
      modalElem.style.opacity = 0;

      setTimeout(() => {
        modalElem.style.visibility = 'hidden';
        if (player) {
          player.stopVideo();
        }
      }, time);

      window.removeEventListener('keydown', closeModal);
    }
  };

  const openModal = () => {
    getListMovie(569094);
    modalElem.style.visibility = 'visible';
    modalElem.style.opacity = 1;
    window.addEventListener('keydown', closeModal);

    if (player) {
      player.playVideo();
    }
  };

  buttonElems.forEach(btn => {
    btn.addEventListener('click', openModal);
  });

  modalElem.addEventListener('click', closeModal);

  const myService = new TMDBApiService();

  // Загрузка API YouTube Player и создание плеера
  function loadYoutubePlayerAPI() {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = createPlayer;
  }

  function getListMovie(id) {
    myService
      .fetchMovieVideoById(id)
      .then(resp => {
        if (resp) {
          // Если трейлер найден, показываем плеер
          console.log('это мое', resp);
        } else {
          // Если трейлер не найден, показываем сообщение об ошибке
          const errorModalElem = document.createElement('div');
          errorModalElem.classList.add('modal__error');
          errorModalElem.innerHTML = `
          <p>
            OOPS... <br />
            We are very sorry! <br />
            But we couldn’t find the trailer.
          </p>
          <img src="../images/oops.jpg" alt="error" />
        `;
          modalElem.appendChild(errorModalElem);
        }
      })
      .catch(e => console.log(e));
  }

  function createPlayer() {
    player = new window.YT.Player('youtube-player', {
      width: '600', // Укажите требуемую ширину
      height: '350', // Укажите требуемую высоту
      videoId: 'rdyoLs85dO0', // Идентификатор воспроизведения
      playerVars: {
        autoplay: 0,
        controls: 1,
        disablekb: 1,
        fs: 0,
        iv_load_policy: 3,
        rel: 0,
      },
      events: {
        onReady: onPlayerReady,
      },
    });
  }

  function onPlayerReady(event) {
    // Видео готово к воспроизведению
  }

  loadYoutubePlayerAPI();
};

modalController({
  modal: '.modal1',
  btnOpen: '.section__button1',
  btnClose: '.modal__close',
});
