document.addEventListener("DOMContentLoaded", function () {
    const shareButton = document.querySelector(".share-instagram");

    shareButton.addEventListener("click", function (e) {
        e.preventDefault();

        const shareContainer = document.querySelector(".share-container");

        html2canvas(shareContainer, {
            useCORS: true,
            scale: 2
        }).then(canvas => {
            canvas.toBlob(blob => {
                const formData = new FormData();
                formData.append("image", blob);

                // Subir la imagen a Imgur
                fetch("https://api.imgur.com/3/image", {
                    method: "POST",
                    headers: {
                        "Authorization": "Client-ID TU_CLIENT_ID_AQUÍ"
                    },
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
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
            }, "image/jpeg");
        });
    });
});