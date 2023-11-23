var audio = document.getElementById('audio-element');
var playlist = document.getElementById('playlist');
var tracks = [
  'C:/Jects/Online Music Player/y2mate.com - Migos Trade Bars In Culture 3 Stamped Freestyle With The LA Leakers  Freestyle 111.mp3',
  'C:/Jects/Online Music Player/y2mate.com - J Hus  Who Told You Official Audio ft Drake.mp3',
  'C:/Jects/Online Music Player/y2mate.com - J Hus  Militerian ft Naira Marley Official Music Video.mp3',
  'C:/Jects/Online Music Player/y2mate.com - Central Cee x Dave  Sprinter Music Video.mp3'
  // ...add more tracks here
];
var currentTrackIndex = 0;

function togglePlayPause() {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
  updatePlayPauseButton(!audio.paused);
}

function updatePlayPauseButton(isPlaying) {
  var playPauseButton = document.getElementById('play-pause');
  playPauseButton.innerText = isPlaying ? 'Pause' : 'Play';
}

function playNextTrack() {
  currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
  changeTrack(tracks[currentTrackIndex], playlist.children[currentTrackIndex]);
}

function playPreviousTrack() {
  currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
  changeTrack(tracks[currentTrackIndex], playlist.children[currentTrackIndex]);
}

function changeTrack(source, element) {
    var fileName = extractFileName(source);
    audio.src = source;
    audio.play();
    updatePlayPauseButton(true);
    updatePlaylistHighlight(element);
  }
  
  function extractFileName(path) {
    // Extract the file name without the extension
    var startIndex = path.lastIndexOf('/') + 1;
    var endIndex = path.lastIndexOf('.');
    return path.substring(startIndex, endIndex);
  }
  

function updatePlaylistHighlight(element) {
  if (element) {
    Array.from(playlist.children).forEach(li => li.classList.remove('playing'));
    element.classList.add('playing');
  }
}

audio.addEventListener('ended', playNextTrack);

audio.addEventListener('timeupdate', function () {
  var progressBar = document.getElementById('progress');
  var percentage = Math.floor((100 / audio.duration) * audio.currentTime);
  progressBar.style.width = percentage + '%';
});

// Clear existing playlist items
playlist.innerHTML = '';

// Dynamically add playlist items
tracks.forEach((track, index) => {
    var li = document.createElement('li');
    var fileName = extractFileName(track);
    li.textContent = fileName;
    li.addEventListener('click', function () {
      currentTrackIndex = index;
      changeTrack(tracks[currentTrackIndex], this);
    });
    playlist.appendChild(li);
  });
  
// Your existing JavaScript code

audio.addEventListener('timeupdate', function () {
    var waveform = document.querySelector('.waveform');
    var scale = 0.5 + (audio.currentTime / audio.duration) * 0.5; // Adjust the multiplier based on preference
    waveform.style.transform = 'scaleY(' + scale + ')';
  });
  

