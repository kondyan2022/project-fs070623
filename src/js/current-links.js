const currentUrl = window.location.href;
const links = document.querySelectorAll(
  '.header-nav-list a, .mobile-menu-list a'
);

links.forEach(function (link) {
  if (link.href === currentUrl) {
    link.classList.add('current');
  } else {
    link.classList.remove('current');
  }
});
