import Player from '@vimeo/player';
var throttle = require('lodash.throttle');

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);

setCurrentTime();

player.on('timeupdate', throttle(onTimeUpdate, 500));

function onTimeUpdate(event) {
  console.log(event.seconds);
  const time = event.seconds;
  localStorage.setItem('videoplayer-current-time', time);
}

function setCurrentTime() {
  const savedCurrentTime = localStorage.getItem('videoplayer-current-time');

  if (savedCurrentTime) {
    player.setCurrentTime(savedCurrentTime);
  }
}
