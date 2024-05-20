const canvas=document.getElementById("canvas")
let canvas_height
let imgFondo;
const imgWidth = 256;
const imgHeight = 192; 

function preload() {
  imgFondo = loadImage('assets/escenario.png');

}

function setup() {
  createCanvas(imgWidth, imgHeight, P2D,canvas);
  canvas_height= (canvas. clientWidth / width) * height
  canvas.style.setProperty('height', `${canvas_height}px`, 'important')

  

}

function draw() {
  let centerX = 0;
  let centerY = 0;
  image(imgFondo, centerX, centerY);

}

function windowResized() {
  //resizeCanvas(windowWidth, windowHeight);
  canvas.style.removeProperty("height")
  canvas_height= (canvas. clientWidth / width) * height
  canvas.style.setProperty('height', `${canvas_height}px`, 'important')
}
