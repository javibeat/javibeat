document.addEventListener("DOMContentLoaded", function () {
    // Verificar que el botón funciona correctamente
    document.getElementById("join-btn").addEventListener("click", function () {
        console.log("Botón clickeado: Redirigiendo a DJ Classes...");
    });

    // Generar el código QR con enlace a DJ Classes
    new QRCode(document.getElementById("qr-code"), {
        text: "https://javibeat.com/djclasses.html",
        width: 128,
        height: 128
    });

    // Función para compartir en Instagram
    document.getElementById("share-instagram").addEventListener("click", function () {
        html2canvas(document.querySelector(".share-card")).then(canvas => {
            canvas.toBlob(blob => {
                const file = new File([blob], "dj-experience.png", { type: "image/png" });

                if (navigator.canShare && navigator.canShare({ files: [file] })) {
                    navigator.share({
                        files: [file],
                        title: "BECOME A TRUE DJ 🎧",
                        text: "🔥 Learn to mix with vinyl & turntables – no sync, just pure skill! Limited spots available!",
                        url: "https://javibeat.com/djclasses.html"
                    }).catch(console.error);
                } else {
                    alert("Sharing is not supported on this browser.");
                }
            });
        });
    });
});