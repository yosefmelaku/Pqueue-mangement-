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
        
        // Handle navigation clicks
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="/"]');
            if (link && !link.hasAttribute('target')) {
                e.preventDefault();
                const href = link.getAttribute('href');
                this.navigate(href);
            }
        });
        
        // Handle initial load
        this.handleRoute(window.location.pathname);
    }
    
    navigate(path) {
        if (window.location.pathname !== path) {
            window.history.pushState({}, '', path);
        }
        this.handleRoute(path);
    }
    
    handleRoute(path) {
        // Normalize path
        if (path !== '/' && path.endsWith('/')) {
            path = path.slice(0, -1);
        }
        
        const targetPage = this.routes[path] || this.routes['/'];
        
        // Only navigate if we're not already on the target page
        const currentPage = this.getCurrentPage();
        if (currentPage !== targetPage) {
            window.location.href = path;
        }
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