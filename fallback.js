// Fallback navigation for when router fails
(function() {
    'use strict';
    
    // Ensure all links have proper fallbacks
    function ensureLinkFallbacks() {
        const links = document.querySelectorAll('a[href^="/"]');
        
        links.forEach(link => {
            const href = link.getAttribute('href');
            
            // Add click handler as fallback
            link.addEventListener('click', function(e) {
                // If href is empty or just "/", prevent blank page
                if (!href || href === '#' || href === 'javascript:void(0)') {
                    e.preventDefault();
                    window.location.href = '/';
                    return;
                }
                
                // Ensure proper navigation
                if (href.startsWith('/') && !href.startsWith('//')) {
                    // Let the browser handle normal navigation
                    // This prevents about:blank issues
                    return true;
                }
            });
            
            // Add title if missing
            if (!link.hasAttribute('title')) {
                const text = link.textContent.trim();
                if (text) {
                    link.setAttribute('title', text);
                }
            }
        });
    }
    
    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', ensureLinkFallbacks);
    } else {
        ensureLinkFallbacks();
    }
    
    // Handle navigation errors
    window.addEventListener('error', function(e) {
        console.warn('Navigation error detected, falling back to home');
        if (window.location.href.includes('about:blank')) {
            window.location.href = '/';
        }
    });
    
})();