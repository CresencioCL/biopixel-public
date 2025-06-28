document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuButton && mobileMenu) {
    menuButton.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('menu-open');
      document.body.classList.toggle('mobile-menu-active-on-body', isOpen);
    });

    // Close mobile menu when a nav link is clicked
    const navLinks = mobileMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (mobileMenu.classList.contains('menu-open')) {
          mobileMenu.classList.remove('menu-open');
          document.body.classList.remove('mobile-menu-active-on-body');
        }
      });
    });
  }
});

// Make closeMobileMenu globally available for inline onclick in language buttons
// also toggle body class
function closeMobileMenu() {
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenu && mobileMenu.classList.contains('menu-open')) {
    mobileMenu.classList.remove('menu-open');
    document.body.classList.remove('mobile-menu-active-on-body');
  }
}
