let song, button, amp;
let volHistory = [];
const playBtn = document.getElementById('play-btn');
const albumInfoWrapper = document.querySelector('.album-info-wrapper');
const leftIcon = document.querySelector('#header-icon-left')
const rightIcon = document.querySelector('#header-icon-right')

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

// if run on desktop, create 2 more sketches to run behind spinning icons
if (window.innerWidth > 1000) {
  let left = ( sketch ) => {

    sketch.preload = () => {
      song = sketch.loadSound('../assets/music/talkin_to_jesus.mp3')
    }

    sketch.setup = () => {
      let cnv = sketch.createCanvas(250, 250);
      cnv.parent(leftIcon);
      console.log("assigned to right icon")
      cnv.position(-78.5, -77, 'absolute')
      sketch.angleMode(sketch.DEGREES); // Change the mode to DEGREES
    
      amp = new p5.Amplitude();
    }

    sketch.draw = () => {
      sketch.background(0, 100);
      let vol = amp.getLevel();
      volHistory.push(vol);
      // init circle size
      let circleSize = 40;

      // add beat bump
      if (vol > 0.2) {
        circleSize = sketch.map(vol, 0.2, 0.4, 40, 50)
      } 

      // start from center
      sketch.translate(sketch.width/2, sketch.height/2)
      sketch.beginShape();
      let blue = sketch.map(vol, 0.1, 0.3, 50, 255);
      sketch.fill(200, 100, blue);
      for (let i = 0; i < 360; i++) {
        sketch.stroke(200, 100, blue);
        let r = sketch.map(volHistory[i], 0, 1, circleSize, 200);
        let x = r * sketch.cos(i);
        let y = r * sketch.sin(i);
        sketch.vertex(x, y);
      }
      sketch.endShape();

      // let bump = map(vol, 0, 0.5, 1, 1.5);
      // headerIconLeft.style.transform = `scale(${String(bump)})`

      if(volHistory.length > 360) {
        volHistory.splice(0,1);
      }
    }
  }

  let leftSketch = new p5(left);

  let right = ( sketch ) => {

    sketch.setup = () => {
      let cnv = sketch.createCanvas(250, 250);
      cnv.parent(rightIcon)
      console.log("assigned to right icon")
      cnv.style('right', '-78.5px')
      cnv.style('top', '-77px')
      cnv.style('position', 'absolute')
      sketch.angleMode(sketch.DEGREES); // Change the mode to DEGREES
    
      amp = new p5.Amplitude();
    }

    sketch.draw = () => {
      sketch.background(0, 100);
      let vol = amp.getLevel();
      volHistory.push(vol);
      // init circle size
      let circleSize = 40;

      // add beat bump
      if (vol > 0.2) {
        circleSize = sketch.map(vol, 0.2, 0.4, 40, 50)
      } 

      // start from center
      sketch.translate(sketch.width/2, sketch.height/2)
      sketch.beginShape();
      let blue = sketch.map(vol, 0.1, 0.3, 50, 255);
      sketch.fill(200, 100, blue);
      for (let i = 0; i < 360; i++) {
        sketch.stroke(200, 100, blue);
        let r = sketch.map(volHistory[i], 0, 1, circleSize, 200);
        let x = r * sketch.cos(i);
        let y = r * sketch.sin(i);
        sketch.vertex(x, y);
      }
      sketch.endShape();

      // let bump = map(vol, 0, 0.5, 1, 1.5);
      // headerIconLeft.style.transform = `scale(${String(bump)})`

      if(volHistory.length > 360) {
        volHistory.splice(0,1);
      }
    }
  }
  let rightSketch = new p5(right);



// if on mobile, only run middle
} else {

  let middle = ( sketch ) => {

    sketch.preload = () => {
      song = sketch.loadSound('../assets/music/talkin_to_jesus.mp3')
    }
  
    sketch.setup = () => {
      let cnv = sketch.createCanvas(250, 250);
      cnv.parent(albumInfoWrapper)
      cnv.position(10, 150, 'absolute')
      sketch.angleMode(sketch.DEGREES); // Change the mode to DEGREES
    
      amp = new p5.Amplitude();
    }
  
    sketch.draw = () => {
      sketch.background(0, 100);
      let vol = amp.getLevel();
      volHistory.push(vol);
      // init circle size
      let circleSize = 40;
  
      // add beat bump
      // if (vol > 0.15) {
      //   circleSize = map(vol, 0.15, 0.4, 30, 50)
      // } 
  
      // start from center
      sketch.translate(sketch.width/2, sketch.height/2)
      sketch.beginShape();
      let blue = sketch.map(vol, 0.1, 0.3, 50, 255);
      sketch.fill(200, 100, blue);
      for (let i = 0; i < 360; i++) {
        sketch.stroke(200, 100, blue);
        let r = sketch.map(volHistory[i], 0, 1, circleSize, 200);
        let x = r * sketch.cos(i);
        let y = r * sketch.sin(i);
        sketch.vertex(x, y);
      }
      sketch.endShape();
  
      // let bump = map(vol, 0, 0.5, 1, 1.5);
      // headerIconLeft.style.transform = `scale(${String(bump)})`
  
      if(volHistory.length > 360) {
        volHistory.splice(0,1);
      }
    }
  }
  
  let middleSketch = new p5(middle);
}
