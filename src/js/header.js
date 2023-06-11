const refs = {
  openMenu: document.querySelector('[data-menu-open]'),
  closeMenu: document.querySelector('[data-menu-close]'),
  body: document.querySelector('body'),
  menu: document.querySelector('[data-menu]'),
};

refs.openMenu.addEventListener('click', openMenu);
refs.closeMenu.addEventListener('click', closeMenu);

function openMenu() {
  refs.menu.classList.add('is-open');
  refs.body.classList.toggle('no-scroll');
}

function closeMenu(e) {
  if (e.target === refs.closeMenu) {
    refs.menu.classList.remove('is-open');
  }
}

// Close the mobile menu on wider screens if the device orientation changes
window.matchMedia('(min-width: 768px)').addEventListener('change', e => {
  if (!e.matches) {
    return;
  }
  refs.menu.classList.remove('is-open');
});

// add class 'active' current page

const currentUrl = window.location.href;
const links = document.querySelectorAll(
  '.header-nav-list a, .mobile-menu-list a'
);

links.forEach(function (link) {
  if (link.href === currentUrl) {
    link.classList.add('current');
  }
});

////////////light-theme/////////////

const toggleSwitch = document.querySelector('.toggle-switch');
const checkbox = document.querySelector('.checkbox');
const header = document.querySelector('body');

function setTheme(theme) {
  if (theme === 'light') {
    console.log('light-theme');
    // header.classList.add('light-theme');
    checkbox.checked = true;
  } else {
    //   header.classList.remove('light-theme');
    checkbox.checked = false;
  }
}

function handleToggle() {
  if (checkbox.checked) {
    setTheme('light');
    localStorage.setItem('theme', 'light');
  } else {
    setTheme('dark');
    localStorage.setItem('theme', 'dark');
  }
}

// Check the user's preference from localStorage on page load
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  setTheme(savedTheme);
}

// Add event listener for toggle switch change
toggleSwitch.addEventListener('change', handleToggle);
