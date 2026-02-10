/* Obsidian Noir - Master Interactions 2026 */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Custom Cursor
    const cursor = document.createElement('div');
    const cursorDot = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursorDot.className = 'custom-cursor-dot';
    document.body.appendChild(cursor);
    document.body.appendChild(cursorDot);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
    });

    // Cursor hover effects
    const updateInteractiveElements = () => {
        const interactive = document.querySelectorAll('a, button, .gallery-item, .btn-noir, .nav-link');
        interactive.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(2.5)';
                cursor.style.background = 'rgba(255, 255, 255, 0.1)';
                cursor.style.borderColor = 'transparent';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.background = 'transparent';
                cursor.style.borderColor = 'var(--accent)';
            });
        });
    };

    // 2. Scroll Reveal
    const reveal = () => {
        const reveals = document.querySelectorAll('.reveal');
        reveals.forEach(el => {
            const windowHeight = window.innerHeight;
            const revealTop = el.getBoundingClientRect().top;
            const revealPoint = 100;
            if (revealTop < windowHeight - revealPoint) {
                el.classList.add('active');
            }
        });
    };

    // 3. Component Loader & Initializer
    const loadComponent = async (url, id) => {
        try {
            const r = await fetch(url);
            const d = await r.text();
            const el = document.getElementById(id);
            if (el) {
                el.innerHTML = d;
                if (id === 'menu-placeholder') markActiveLink();
            }
        } catch (e) {
            console.error('Error loading component:', e);
        }
    };

    const markActiveLink = () => {
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        const links = document.querySelectorAll('.nav-link');
        links.forEach(link => {
            if (link.getAttribute('href') === currentPath) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
        updateInteractiveElements(); // Re-bind hover for dynamic menu
    };

    // 4. Global UI Logic
    const initGlobal = () => {
        // Month updater
        const monthEl = document.getElementById("current-month");
        if (monthEl) {
            const months = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
            monthEl.textContent = months[new Date().getMonth()];
        }

        // Floating WA (matching style)
        if (!document.querySelector('.floating-wa')) {
            const wa = document.createElement('a');
            wa.href = 'https://wa.me/971585324519';
            wa.className = 'floating-wa';
            wa.target = '_blank';
            wa.innerHTML = '<i class="fab fa-whatsapp"></i>';
            wa.style.cssText = 'position:fixed; bottom:40px; right:40px; width:60px; height:60px; background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:100px; display:flex; align-items:center; justify-content:center; color:white; font-size:24px; z-index:900; backdrop-filter:blur(20px); transition:all 0.3s ease;';
            wa.addEventListener('mouseenter', () => wa.style.borderColor = 'var(--accent)');
            wa.addEventListener('mouseleave', () => wa.style.borderColor = 'var(--border-subtle)');
            document.body.appendChild(wa);
        }
    };

    // Execution Sequence
    window.addEventListener('scroll', reveal);
    loadComponent('menu.html', 'menu-placeholder').then(() => markActiveLink());
    loadComponent('footer.html', 'footer-placeholder').then(() => updateInteractiveElements());

    initGlobal();
    reveal();
    updateInteractiveElements();
});
