// Simple client-side router for smooth navigation
class SimpleRouter {
    constructor() {
        this.routes = {
            '/': 'index.html',
            '/home': 'index.html',
            '/dashboard': 'index.html',
            '/register': 'registration.html',
            '/registration': 'registration.html',
            '/queue': 'Queue.html',
            '/status': 'Queue.html',
            '/contact': 'contact.html',
            '/support': 'contact.html'
        };
        
        this.init();
    }
    
    init() {
        // Handle browser back/forward buttons
        window.addEventListener('popstate', (e) => {
            this.handleRoute(window.location.pathname);
        });
        
        // Handle navigation clicks - FIXED to prevent about:blank
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="/"]');
            if (link && !link.hasAttribute('target') && !link.hasAttribute('download')) {
                // Only prevent default for internal navigation
                const href = link.getAttribute('href');
                if (href && href.startsWith('/') && !href.startsWith('//')) {
                    e.preventDefault();
                    this.navigate(href);
                }
            }
        });
        
        // Handle initial load
        this.handleRoute(window.location.pathname);
    }
    
    navigate(path) {
        // Ensure path is valid
        if (!path || path === '#') {
            return;
        }
        
        // For deployment, use full page navigation instead of SPA
        window.location.href = path;
    }
    
    handleRoute(path) {
        // This method is kept for future SPA implementation
        // Currently using full page navigation for better compatibility
    }
    
    getCurrentPage() {
        const path = window.location.pathname;
        if (path.includes('registration')) return 'registration.html';
        if (path.includes('queue') || path.includes('Queue')) return 'Queue.html';
        if (path.includes('contact')) return 'contact.html';
        return 'index.html';
    }
}

// Initialize router when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new SimpleRouter());
} else {
    new SimpleRouter();
}