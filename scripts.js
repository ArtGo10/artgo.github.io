const nav = document.getElementById('nav');
const navContent = document.querySelector('.nav-content');
const navBtn = document.querySelector('.nav-mobile-btn');
const navLinks = Array.from(document.querySelectorAll('.nav-content-link'));
const pageLinks = Array.from(document.querySelectorAll('.page-link'));
const animatedBlock = Array.from(document.querySelectorAll('.animated'));
const barItems = Array.from(document.querySelectorAll('.bar-fill'));

let bottomOfNav = nav.offsetTop + nav.offsetHeight;

function toggleNav() {
  navContent.classList.toggle('nav-content-opened');
}

window.addEventListener('scroll', () => {
  animatedBlock.forEach(block => {
    const slideInAt = window.scrollY + window.innerHeight;
    const blockBottom = block.offsetTop + block.offsetHeight;
    if (slideInAt > blockBottom) {
      let blockAnimation = block.dataset.animation;
      block.classList.add(blockAnimation);
      block.style.animationDelay = block.dataset.delay;
      if (block.classList.contains('skills')) {
        setTimeout(() => {
          barItems.forEach(item => {
            item.style.width = item.parentNode.querySelector('.bar-span').innerHTML;
          });
        }, 1000);
      }
    }
  });

  navLinks.forEach(link => {
    let topOfPageSection = document.getElementById(link.dataset.dest).offsetTop;
    if (window.scrollY >= topOfPageSection) {
      document.querySelector('.active-link').classList.remove('active-link');
      link.classList.add('active-link');
    }
  });

  window.scrollY >= bottomOfNav ? nav.classList.add('nav-fixed') : nav.classList.remove('nav-fixed');
});

pageLinks.forEach(link => link.addEventListener('click', () => {
  window.scrollTo({
    top: document.getElementById(link.dataset.dest).offsetTop,
    behavior: "smooth"
  });
}));

navBtn.addEventListener('click', toggleNav);
