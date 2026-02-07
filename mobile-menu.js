// Helper function to close the menu and update body class
// It fetches the mobileMenu element itself, so it can be called from anywhere.
function _performCloseMenuActions() {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu && mobileMenu.classList.contains('menu-open')) {
        mobileMenu.classList.remove('menu-open');
        document.body.classList.remove('mobile-menu-active-on-body');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu'); // Keep this for the toggle logic

    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', () => {
            const isOpen = mobileMenu.classList.toggle('menu-open');
            document.body.classList.toggle('mobile-menu-active-on-body', isOpen);
            // If opening the menu, ensure header is not hidden (relevant if header-scroll.js is active)
            if (isOpen) {
                const header = document.getElementById('page-header');
                if (header) {
                    header.classList.remove('header-hidden');
                }
            }
        });

        // Close mobile menu when a nav link is clicked
        const navLinks = mobileMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                _performCloseMenuActions();
            });
        });
    }
});

// Make closeMobileMenu globally available for inline onclick in language buttons
// also toggle body class
function closeMobileMenu() {
    _performCloseMenuActions();
}
