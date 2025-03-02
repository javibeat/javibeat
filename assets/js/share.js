document.addEventListener("DOMContentLoaded", function () {
    function isInstagram() {
        return navigator.userAgent.includes("Instagram");
    }

    if (isInstagram()) {
        document.body.setAttribute("instagram-view", "true");
    }
});