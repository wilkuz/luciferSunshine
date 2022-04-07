let song, button, amp;
let volHistory = [];
const playBtn = document.getElementById('play-btn');
const albumInfoWrapper = document.querySelector('.album-info-wrapper');

function preload() {
  song = loadSound('../assets/music/Jennifer_Aniston.mp3')
}

function setup() {
    let cnv = createCanvas(250, 250);
    cnv.parent(albumInfoWrapper)
    cnv.position(10, 150, 'absolute')
    angleMode(DEGREES); // Change the mode to DEGREES
    
    amp = new p5.Amplitude();
  }
  
function draw() {
  background(0, 100);
  let vol = amp.getLevel();
  volHistory.push(vol);
  // init circle size
  let circleSize = 40;

  // add beat bump
  // if (vol > 0.15) {
  //   circleSize = map(vol, 0.15, 0.4, 30, 50)
  // } 

  // start from center
  translate(width/2, height/2)
  beginShape();
  let blue = map(vol, 0.1, 0.3, 50, 255);
  fill(200, 100, blue);
  for (let i = 0; i < 360; i++) {
    stroke(200, 100, blue);
    let r = map(volHistory[i], 0, 1, circleSize, 200);
    let x = r * cos(i);
    let y = r * sin(i);
    vertex(x, y);
  }
  endShape();

  // let bump = map(vol, 0, 0.5, 1, 1.5);
  // headerIconLeft.style.transform = `scale(${String(bump)})`

  if(volHistory.length > 360) {
    volHistory.splice(0,1);
  }
}

playBtn.addEventListener('click', () => {
  if (playBtn.classList.contains('playing')) {
    song.pause();
    playBtn.innerText = "PLAY"
    playBtn.classList.add('paused');
    playBtn.classList.remove('playing');
  } else if (playBtn.classList.contains('paused')) {
    song.play();
    playBtn.innerText = "PAUSE"
    playBtn.classList.add('playing');
    playBtn.classList.remove('paused');
  }
})