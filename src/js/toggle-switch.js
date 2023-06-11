const refs = {
  toggleSwitch: document.querySelector('.toggle-switch'),
  checkbox: document.querySelector('.checkbox'),
  body: document.querySelector('body'),
  logo: document.querySelector('.logo-title'),
  navigation: document.querySelector('.header-nav'),
};

function setTheme(theme) {
  if (theme === 'dark') {
    refs.body.classList.add('js-light-theme');
    refs.logo.classList.add('js-light-theme-logo');
    refs.navigation.classList.add('js-light-theme-logo');
    refs.checkbox.checked = true;
  } else {
    refs.body.classList.remove('js-light-theme');
    refs.logo.classList.remove('js-light-theme-logo');
    refs.navigation.classList.remove('js-light-theme-logo');
    refs.checkbox.checked = false;
  }
}

function handleToggle() {
  if (refs.checkbox.checked) {
    setTheme('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    setTheme('light');
    localStorage.setItem('theme', 'light');
  }
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  setTheme(savedTheme);
}

refs.toggleSwitch.addEventListener('change', handleToggle);
