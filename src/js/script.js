import Aos from "aos";
import "aos/dist/aos.css"

// init AOS animation
Aos.init({
  duration: 1000,
  offset: 100,
});


/**
 * Toggle the visibility of the navigation bar based on scroll direction.
 * - When scrolling down, the navbar hides (slides up).
 * - When scrolling up or at the top, the navbar is shown (slides down).
 */
const nav = document.querySelector('.header__nav');
let lastScrollTop = window.scrollY;

const handleScroll = () => {
    const currentScroll = window.scrollY;

    if(currentScroll <= 0) {
        nav.classList.remove('hide'); 
    } else if(currentScroll > lastScrollTop) {
        nav.classList.add('hide');
    } else {
        nav.classList.remove('hide'); 
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
}

window.addEventListener('scroll', handleScroll);


/**
 * Add click event listeners to navigation links to toggle the 'active' class.
 * - Removes 'active' class from all navigation links.
 * - Adds 'active' class to the clicked link.
 * 
 * This provides visual feedback to indicate the currently selected section.
 */
const navLinks = document.querySelectorAll('.header__nav a');
const sections = document.querySelectorAll('section[id]');

function setActiveLinkOnClick() {
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });
}


/**
 * Update the 'active' class on navigation links based on current scroll position.
 * - Iterates through each section to determine if it is in the viewport.
 * - If a section is currently visible, its corresponding navigation link receives the 'active' class.
 * 
 * This enables scroll-based navigation highlighting (scroll spy effect).
 */
function setActiveLinkOnScroll() {
  let scrollY = window.scrollY;

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 100;
    const sectionId = current.getAttribute('id');

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

setActiveLinkOnClick();
window.addEventListener('scroll', setActiveLinkOnScroll);
