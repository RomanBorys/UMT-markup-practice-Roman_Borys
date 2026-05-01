(function () {
  'use strict';

  var burgers = document.querySelectorAll('.burger');
  var menu = document.getElementById('mobile-menu');
  var overlay = document.querySelector('.mobile-menu__overlay');

  if (!menu || !overlay) return;

  function openMenu() {
    menu.classList.add('is-open');
    overlay.classList.add('is-open');
    document.body.classList.add('no-scroll');
    burgers.forEach(function (b) {
      b.setAttribute('aria-expanded', 'true');
    });
  }

  function closeMenu() {
    menu.classList.remove('is-open');
    overlay.classList.remove('is-open');
    document.body.classList.remove('no-scroll');
    burgers.forEach(function (b) {
      b.setAttribute('aria-expanded', 'false');
    });
  }

  burgers.forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (menu.classList.contains('is-open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  });

  overlay.addEventListener('click', closeMenu);

  document.querySelectorAll('.mobile-menu__link').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  var ctaBtn = document.querySelector('.mobile-menu__cta');
  if (ctaBtn) {
    ctaBtn.addEventListener('click', closeMenu);
  }
})();
