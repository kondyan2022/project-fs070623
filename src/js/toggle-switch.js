const refs = {
  toggleSwitch: document.querySelector('.toggle-switch'),
  checkbox: document.querySelector('.checkbox'),
  body: document.querySelector('body'),
  logo: document.querySelector('.logo-title'),
  navigation: document.querySelector('.header-nav'),
  slider: document.querySelector('.slider'),
};

function setTheme(theme) {
  if (theme === 'light') {
    refs.body.classList.add('js-light-theme');
    refs.logo.classList.add('js-light-theme-logo');
    refs.navigation.classList.add('js-light-theme-text');
    refs.checkbox.checked = true;
  } else {
    refs.body.classList.remove('js-light-theme');
    refs.logo.classList.remove('js-light-theme-logo');
    refs.navigation.classList.remove('js-light-theme-text');
    refs.checkbox.checked = false;
  }
}

function handleToggle() {
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
}

refs.toggleSwitch.addEventListener('click', handleToggle);
