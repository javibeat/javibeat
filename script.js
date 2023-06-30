function toggleMenu() {
  const menu = document.querySelector('.menu');
  menu.classList.toggle('active');
}

const toTopLink = document.getElementById('toTop');
window.addEventListener('scroll', function() {
  if (window.pageYOffset > 100) {
    toTopLink.classList.add('show');
  } else {
    toTopLink.classList.remove('show');
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('.section');
  const menuLinks = document.querySelectorAll('.menu a');

  function scrollToSection(e) {
    e.preventDefault();
    const targetSection = document.querySelector(this.hash);
    window.scrollTo({
      top: targetSection.offsetTop,
      behavior: 'smooth'
    });
  }

  menuLinks.forEach(function (link) {
    link.addEventListener('click', scrollToSection);
  });

  window.addEventListener('scroll', function () {
    const currentScrollPos = window.pageYOffset || document.documentElement.scrollTop;
    sections.forEach(function (section) {
      const sectionTop = section.offsetTop - 50;
      const sectionBottom = sectionTop + section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (currentScrollPos >= sectionTop && currentScrollPos < sectionBottom) {
        menuLinks.forEach(function (link) {
          link.classList.toggle('active', link.hash === '#' + sectionId);
        });
      }
    });
  });

  const toTopLink = document.getElementById('toTop');

  toTopLink.addEventListener('click', function (event) {
    event.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    scrollTo(target, 500);
  });

  function scrollTo(target, duration) {
    const targetPosition = target.offsetTop;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const ease = easeInOutCubic(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, ease);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function easeInOutCubic(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t * t + b;
      t -= 2;
      return c / 2 * (t * t * t + 2) + b;
    }

    requestAnimationFrame(animation);
  }

  const grid = document.querySelector('.row');
  const masonry = new Masonry(grid, {
    itemSelector: '.column',
    columnWidth: '.column',
    percentPosition: true
  });
});

let player;
function onYouTubeIframeAPIReady() {
  const youtubeVideoIds = ['h7eWqTOjt4s', 'SU8Y13_IepI', 'N2GOHUJCxAQ'];

  youtubeVideoIds.forEach(function(videoId, index) {
    new YT.Player('youtube-player' + (index + 1), {
      videoId: videoId,
      playerVars: {
        autoplay: 0,
        controls: 1,
        modestbranding: 1,
      },
    });
  });
}
