document.addEventListener('DOMContentLoaded', function() {
    // Implementar CSP
    const cspMeta = document.createElement('meta');
    cspMeta.httpEquiv = 'Content-Security-Policy';
    cspMeta.content = 'default-src \'self\'; script-src \'self\' \'unsafe-inline\' \'unsafe-eval\'; style-src \'self\' \'unsafe-inline\'; img-src \'self\' data:; connect-src \'self\'; font-src \'self\';';
    document.head.appendChild(cspMeta);

    // Cargar el menú con validación
    fetch('menu.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            // Validar que el contenido no sea vacío
            if (!data.trim()) {
                throw new Error('Empty menu content');
            }
            // Sanitizar el contenido
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');
            document.getElementById('menu-placeholder').innerHTML = doc.body.innerHTML;
            
            // Implementar seguridad para el menú
            const hamburger = document.getElementById('hamburger');
            const navLinks = document.getElementById('nav-links');
            if (hamburger && navLinks) {
                let lastClickTime = 0;
                const CLICK_THRESHOLD = 500; // 500ms
                
                hamburger.addEventListener('click', () => {
                    const now = Date.now();
                    if (now - lastClickTime < CLICK_THRESHOLD) return;
                    lastClickTime = now;
                    
                    navLinks.classList.toggle('open');
                    hamburger.classList.toggle('open');
                });
            }
        })
        .catch(error => {
            console.error('Error al cargar el menú:', error);
            // Mostrar mensaje de error al usuario
            const errorElement = document.createElement('div');
            errorElement.style.cssText = 'color: #ff0000; text-align: center; margin: 1rem 0;';
            errorElement.textContent = 'Error loading menu. Please try again later.';
            document.body.appendChild(errorElement);
        });

    // Cambiar el texto de h2 al mes actual
    const monthNames = [
        "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
        "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
    ];
    const currentMonth = new Date().getMonth();
    document.getElementById("current-month").textContent = monthNames[currentMonth];
});
