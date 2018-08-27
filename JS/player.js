const player = document.querySelector('.player');
const playerVideo = document.querySelector('.player__video');
const btnStartBig = document.querySelector('.player__start-center');
const btnStartSmall = document.querySelector('.player__start-small');
//const btnStartSmall = ;
playerVideo.volume = 1;
changeButtonPosition('.player__soundback-mark', 100);
player.addEventListener('click', (e) => {
  onPlayerReady();
  console.log(e);
  if (
    e.target.classList.contains('player__start-use') ||
    e.target.classList.contains('player__video')
  ) {
    if (playerVideo.paused) {
      // если видео остановлено, запускаем
      playerVideo.play();
      btnStartBig.style.display = 'none';
      btnStartSmall.setAttribute('height', '1rem');
      btnStartSmall.firstElementChild.setAttribute('xlink:href', 'img/sprite.svg#pause');
    } else {
      playerVideo.pause();
      btnStartBig.style.display = 'block';
      btnStartSmall.setAttribute('height', '2.5rem');
      btnStartSmall.firstElementChild.setAttribute('xlink:href', 'img/sprite.svg#play');
    }
  }

  if (e.target.classList.contains('player__playback')) {
    e.preventDefault();
    const bar = e.target; //  или e.currentTarget
    console.log(bar.getBoundingClientRect().width);
    const newButtonPosition = e.pageX - bar.getBoundingClientRect().x;
    const clickedPercents = (newButtonPosition / bar.getBoundingClientRect().width) * 100;
    const newPlayerTime = (playerVideo.duration / 100) * clickedPercents;
    playerVideo.currentTime = newPlayerTime;
    changeButtonPosition('.player__playback-mark', clickedPercents);
  }

  if (e.target.classList.contains('player__soundback')) {
    e.preventDefault();
    const bar = e.target; //  или e.currentTarget
    console.log(bar.getBoundingClientRect().width);
    const newButtonPosition = e.pageX - bar.getBoundingClientRect().x;
    const clickedPercents = (newButtonPosition / bar.getBoundingClientRect().width) * 100;
    const newPlayerTime = (1 / 100) * clickedPercents;
    playerVideo.volume = newPlayerTime;
    changeButtonPosition('.player__soundback-mark', clickedPercents);
  }
});


function onPlayerReady() {
  const duration = playerVideo.duration;
  let interval;

  clearInterval(interval);
  interval = setInterval(() => {
    const completed = playerVideo.currentTime;
    const percents = (completed / duration) * 100;

    changeButtonPosition('.player__playback-mark', percents);
  }, 1000);
}

function changeButtonPosition(selectr, percents) {
  document.querySelector(selectr).style.left = percents + '%';
}