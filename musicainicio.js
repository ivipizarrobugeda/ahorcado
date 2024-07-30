'use strict'

const music = document.getElementById('background-music');

function playMusic() {
    if (music.paused) {
        music.play();
    }
}

window.onload = () => {
    music.play();
    music.addEventListener('ended', () => {
        music.pause(); 
        music.currentTime = 0; 
    });
};