const refs = {
  toggleSwitch: document.querySelector('.toggle-switch'),
  checkbox: document.querySelector('.checkbox'),
  body: document.querySelector('body'),
  slider: document.querySelector('.slider'),
};
setTimeout(() => {
  refs.toggleSwitch.style.opacity = 1;
}, 500);

function setTheme(theme) {
  if (theme === 'light') {
    refs.body.classList.add('js-light-theme');

    refs.checkbox.checked = true;
  } else {
    refs.body.classList.remove('js-light-theme');
    refs.checkbox.checked = false;
    refs.slider.style.transition = '';
  }
}

function onChangeToggle() {
  if (refs.checkbox.checked) {
    setTheme('light');
    localStorage.setItem('theme', 'light');
  } else {
    setTheme('dark');
    localStorage.setItem('theme', 'dark');
  }
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  setTheme(savedTheme);
} else {
  setTheme('dark');
}

refs.toggleSwitch.addEventListener('click', onChangeToggle);
