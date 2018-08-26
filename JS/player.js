const playerHTML = document.querySelector('.player__video');
const playVideo = document.querySelector('.player__start');

playVideo.addEventListener('click', e => {
    e.preventDefault();
    console.log(playerHTML.readyState);
    playerHTML.play();
});