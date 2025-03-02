document.addEventListener("DOMContentLoaded", function () {
    const shareButton = document.querySelector(".share-instagram");

    shareButton.addEventListener("click", function (e) {
        e.preventDefault();

        const shareContainer = document.querySelector(".share-container");

        html2canvas(shareContainer, {
            useCORS: true,
            scale: 2
        }).then(canvas => {
            const imageData = canvas.toDataURL("image/jpeg").replace(/^data:image\/jpeg;base64,/, ""); // Convertir a Base64 limpio

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
                console.log("Imgur API Response:", data); // Para depuración
                if (data.success) {
                    const imageUrl = data.data.link;
                    console.log("Uploaded Image URL:", imageUrl); // Verificar URL de imagen subida
                    window.location.href = `https://www.instagram.com/stories/create/?media=${imageUrl}`;
                } else {
                    alert(`Error uploading image: ${data.data.error}`);
                }
            })
            .catch(error => {
                console.error("Upload error:", error);
                alert("Failed to upload image.");
            });
        }).catch(error => {
            console.error("Canvas rendering error:", error);
            alert("Error rendering the image.");
        });
    });
});