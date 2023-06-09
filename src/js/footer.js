const refs = {
  openModal: document.querySelector('#open-team-modal')
}

refs.openModal.addEventListener('click', onOpenModalClick);

function onOpenModalClick(e) {
  e.preventDefault()

  console.log('hello');
}