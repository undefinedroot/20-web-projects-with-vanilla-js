const musicContainerEl = document.getElementById('music-container'),
  playBtnEl = document.getElementById('play'),
  prevBtnEl = document.getElementById('prev'),
  nextBtnEl = document.getElementById('next'),
  audioEl = document.getElementById('audio'),
  progressEl = document.getElementById('progress'),
  progressContainerEl = document.getElementById('progress-container'),
  titleEl = document.getElementById('title'),
  coverEl = document.getElementById('cover');

// Song titles
const songs = ['hey', 'summer', 'ukulele'];

// Keep track of song
let songIndex = 2;

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Update songdetails
function loadSong(song) {
  titleEl.innerText = song;
  audioEl.src = `music/${song}.mp3`;
  coverEl.src = `images/${song}.jpg`;
}

// Play song
function playSong() {
  musicContainerEl.classList.add('play');
  playBtnEl.querySelector('i.fas').classList.remove('fa-play');
  playBtnEl.querySelector('i.fas').classList.add('fa-pause');
  audioEl.play();
}

// Pause song
function pauseSong() {
  musicContainerEl.classList.remove('play');
  playBtnEl.querySelector('i.fas').classList.remove('fa-pause');
  playBtnEl.querySelector('i.fas').classList.add('fa-play');
  audioEl.pause();
}

// Previous song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// Next song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// Update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;

  const progressPercent = (currentTime / duration) * 100;

  progressEl.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgress(e) {
  const width = this.clientWidth; /* get width of progressContainerEl  */
  const clickX = e.offsetX; /* get position where clicked */
  const duration = audio.duration;

  audioEl.currentTime = (clickX / width) * duration;
}

// Eventlistners, note: the function for pauseSong and playSong can both be refactored into one
playBtnEl.addEventListener('click',
  () => (
    musicContainerEl.classList.contains('play')
      ? pauseSong()
      : playSong()));

// Change song, if you are passing a function as callback, no (),
// if you are using a function inside a callback, use ()
prevBtnEl.addEventListener('click', prevSong);
nextBtnEl.addEventListener('click', nextSong);

// Time/song update
audioEl.addEventListener('timeupdate', updateProgress);

// Click on progressbar
progressContainerEl.addEventListener('click', setProgress);

// Song ends
audioEl.addEventListener('ended', nextSong);