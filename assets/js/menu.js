document.addEventListener('DOMContentLoaded', function() {
    // Cargar el menú
    fetch('menu.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('menu-placeholder').innerHTML = data;

            // Obtener referencias a los elementos del menú
            const hamburger = document.getElementById('hamburger');
            const navLinks = document.getElementById('nav-links');

            // Añadir evento de clic al menú de hamburguesa después de cargar el menú
            if (hamburger && navLinks) {
                hamburger.addEventListener('click', () => {
                    navLinks.classList.toggle('open');
                    hamburger.classList.toggle('open');
                });
            }
        })
        .catch(error => console.error('Error al cargar el menú:', error));
});
