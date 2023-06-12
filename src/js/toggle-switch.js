const refs = {
  toggleSwitch: document.querySelector('.toggle-switch'),
  checkbox: document.querySelector('.checkbox'),
  body: document.querySelector('body'),
  slider: document.querySelector('.slider'),
};

function setTheme(theme) {
  if (theme === 'light') {
    refs.body.classList.add('js-light-theme');
    refs.checkbox.checked = true;
    setTimeout(() => {
      refs.slider.style.transition =
        'transform 400ms cubic-bezier(0.4, 0, 0.2, 1)';
    }, 500);
  } else {
    refs.body.classList.remove('js-light-theme');
    refs.checkbox.checked = false;
    refs.slider.style.transition = '';
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
  // Set initial state based on saved theme
  setTheme(savedTheme);
} else {
  // Set initial state based on default theme
  setTheme('dark');
}

refs.toggleSwitch.addEventListener('change', handleToggle);
