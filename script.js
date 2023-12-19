// script.js
document.addEventListener('DOMContentLoaded', function() {
    var player = document.getElementById('audio-player');
    var playButton = document.getElementById('play-button');
    var pauseButton = document.getElementById('pause-button');
    var playlist = document.getElementById('playlist');
    var tracks = playlist.getElementsByTagName('li');
    var currentTrack = 0;

    // Cargar la primera canción
    player.src = tracks[currentTrack].getAttribute('data-src');

    playButton.addEventListener('click', function() {
        player.play();
    });

    pauseButton.addEventListener('click', function() {
        player.pause();
    });

    for (var i = 0; i < tracks.length; i++) {
        tracks[i].addEventListener('click', function() {
            for (var j = 0; j < tracks.length; j++) {
                tracks[j].classList.remove('active');
            }
            this.classList.add('active');
            player.src = this.getAttribute('data-src');
            player.play();
        });
    }
});