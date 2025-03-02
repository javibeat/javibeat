document.addEventListener("DOMContentLoaded", function () {
    const shareButton = document.querySelector(".share-instagram");

    shareButton.addEventListener("click", function (e) {
        e.preventDefault();

        // Selecciona el contenedor del diseño a capturar
        const shareContainer = document.querySelector(".share-container");

        // Usa html2canvas para capturar el diseño como imagen
        html2canvas(shareContainer, {
            useCORS: true, // Para evitar problemas con imágenes externas
            scale: 2 // Aumenta la calidad de la imagen
        }).then(canvas => {
            canvas.toBlob(blob => {
                const file = new File([blob], "djclasses-story.jpg", { type: "image/jpeg" });

                // Crear un objeto URL para la imagen
                const url = URL.createObjectURL(file);

                // Abrir Instagram con el intent de compartir
                window.location.href = `https://www.instagram.com/stories/create/?media=${url}`;
            }, "image/jpeg");
        });
    });
});