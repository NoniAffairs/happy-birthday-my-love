const music = document.getElementById('bgMusic');

function toggleMusic() {
  if (music.paused) {
    music.play();
  } else {
    music.pause();
  }
}
