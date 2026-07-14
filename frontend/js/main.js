// ==========================================
// MOBILE MENU TOGGLE
// ==========================================

function setupMobileMenu() {
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (!menuBtn || !mobileMenu) return;

    const navLinks = mobileMenu.querySelectorAll('a');

    // Toggle menu visibility using the active class
    menuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        mobileMenu.classList.toggle('active');
        
        // Dynamic icon swap if you want to change the burger to an 'X'
        const icon = menuBtn.querySelector('i');
        if (icon) {
            if (mobileMenu.classList.contains('active')) {
                icon.className = 'fas fa-xmark';
            } else {
                icon.className = 'fas fa-bars-staggered';
            }
        }
    });

    // Close mobile menu when a link inside it is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            resetMenuIcon();
        });
    });

    // Close mobile menu when clicking anywhere outside of the header/menu
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.header') && !e.target.closest('#mobileMenu')) {
            mobileMenu.classList.remove('active');
            resetMenuIcon();
        }
    });

    // Helper to revert the icon back to the staggered menu look
    function resetMenuIcon() {
        const icon = menuBtn.querySelector('i');
        if (icon) {
            icon.className = 'fas fa-bars-staggered';
        }
    }
}