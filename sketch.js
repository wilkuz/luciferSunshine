let song, button, amp;
let volHistory = [];
const playBtn = document.getElementById('play-btn');

function preload() {
  song = loadSound('../assets/music/Jennifer_Aniston.mp3')
}

function setup() {
    createCanvas(300, 300);
    
    angleMode(DEGREES); // Change the mode to DEGREES

    amp = new p5.Amplitude();
  }
  
function draw() {
  background(0, 100);
  let vol = amp.getLevel();
  volHistory.push(vol);
  let circleSize = 25;
  if (vol > 0.15) {
    circleSize = map(vol, 0.15, 0.4, 30, 50)
  } 
  translate(width/2, height/2)
  noFill();
  beginShape();
  let blue = map(vol, 0.1, 0.3, 50, 255);
  for (let i = 0; i < 360; i++) {
    stroke(200, 100, blue);
    let r = map(volHistory[i], 0, 1, circleSize, 300);
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
    playBtn.classList.add('paused');
    playBtn.classList.remove('playing');
  } else if (playBtn.classList.contains('paused')) {
    song.play();
    playBtn.classList.add('playing');
    playBtn.classList.remove('paused');
  }
})

