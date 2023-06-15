import { totopOn, totopOff } from './totop';

const refs = {
  teamModal: document.querySelector('.backdrop-team-modal'),
  openTeamModal: document.querySelector('#open-team-modal'),
};

refs.openTeamModal.addEventListener('click', onOpenModalClick);

function onOpenModalClick(e) {
  e.preventDefault();
  totopOff();
  refs.teamModal.classList.toggle('is-hidden');

  if (!refs.teamModal.classList.contains('hidden')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }
}
