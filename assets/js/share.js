document.addEventListener("DOMContentLoaded", function () {
    const shareButton = document.querySelector(".share-instagram");

    shareButton.addEventListener("click", function (e) {
        e.preventDefault();

        const shareContainer = document.querySelector(".share-container");

        html2canvas(shareContainer, {
            useCORS: true,
            scale: 2
        }).then(canvas => {
            const imageData = canvas.toDataURL("image/jpeg").split(',')[1]; // Convertir a Base64

            fetch("https://api.imgur.com/3/image", {
                method: "POST",
                headers: {
                    "Authorization": "Client-ID 40a39c4ed11b2b7",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ image: imageData })
            })
            .then(response => response.json())
            .then(data => {
                console.log(data); // Para depurar en la consola
                if (data.success) {
                    const imageUrl = data.data.link;
                    window.location.href = `https://www.instagram.com/stories/create/?media=${imageUrl}`;
                } else {
                    alert("Error uploading image.");
                }
            })
            .catch(error => {
                console.error("Upload error:", error);
                alert("Failed to upload image.");
            });
        });
    });
});