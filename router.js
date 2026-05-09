// Simple navigation helper for static site
(function() {
    'use strict';
    
    // Ensure all links work properly
    function initializeNavigation() {
        const links = document.querySelectorAll('a[href^="/"]');
        
        links.forEach(link => {
            const href = link.getAttribute('href');
            
            // Add title if missing
            if (!link.hasAttribute('title')) {
                const text = link.textContent.trim();
                if (text) {
                    link.setAttribute('title', text);
                }
            }
            
            // Ensure proper navigation - let browser handle it naturally
            link.addEventListener('click', function(e) {
                // Prevent blank pages
                if (!href || href === '#' || href === 'javascript:void(0)') {
                    e.preventDefault();
                    window.location.href = '/';
                    return;
                }
                
                // For clean URLs, let Vercel rewrites handle the routing
                // No need to prevent default - browser navigation works fine
            });
        });
    }
    
    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeNavigation);
    } else {
        initializeNavigation();
    }
    
    // Handle any navigation errors
    window.addEventListener('error', function(e) {
        if (window.location.href.includes('about:blank')) {
            console.warn('Navigation error detected, redirecting to home');
            window.location.href = '/';
        }
    });
    
})();