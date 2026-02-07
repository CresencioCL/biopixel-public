document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('page-header');
    if (!header) return;

    let lastScrollTop = 0;
    const scrollThreshold = 5; // Minimum scroll change to trigger action

    window.addEventListener('scroll', () => {
        // Prevent header hiding if mobile menu is active
        if (document.body.classList.contains('mobile-menu-active-on-body')) {
            header.classList.remove('header-hidden'); // Ensure header is visible
            lastScrollTop = window.pageYOffset || document.documentElement.scrollTop; // Update scroll top to prevent jumpiness when menu closes
            return;
        }

        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (Math.abs(scrollTop - lastScrollTop) <= scrollThreshold) {
            return; // Not enough scroll to trigger
        }

        if (scrollTop > lastScrollTop && scrollTop > header.offsetHeight) {
            // Scrolling Down and past the header height
            header.classList.add('header-hidden');
        } else {
            // Scrolling Up or at the top
            header.classList.remove('header-hidden');
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
    }, false);
});
