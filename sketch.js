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

  let gridStartX = imgWidth * 0.03; // Inicia a un 25% del ancho de la imagen
  let gridStartY = imgHeight * 0.13; // Inicia a un 25% del alto de la imagen
  let gridWidth = imgWidth * 0.91; // El ancho de la cuadrícula es el 50% del ancho de la imagen
  let gridHeight = imgHeight * 0.83; // El alto de la cuadrícula es el 50% del alto de la imagen

  let cellWidth = gridWidth / 9; // Usa gridWidth para calcular el ancho de las celdas
  let cellHeight = gridHeight / 5; // Usa gridHeight para calcular el alto de las celdas

  stroke(0); // Color del borde de la cuadrícula, blanco para este ejemplo
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 5; j++) {
      let x = gridStartX + i * cellWidth; // Ajusta la posición x basándose en gridStartX
      let y = gridStartY + j * cellHeight; // Ajusta la posición y basándose en gridStartY
      noFill();
      rect(x, y, cellWidth, cellHeight);
    }
  }
}


function windowResized() {
  //resizeCanvas(windowWidth, windowHeight);
  canvas.style.removeProperty("height")
  canvas_height= (canvas. clientWidth / width) * height
  canvas.style.setProperty('height', `${canvas_height}px`, 'important')
}

function mouseClicked() {
  let gridStartX = imgWidth * 0.03;
  let gridStartY = imgHeight * 0.13;
  let gridWidth = imgWidth * 0.91;
  let gridHeight = imgHeight * 0.83;

  let cellWidth = gridWidth / 9;
  let cellHeight = gridHeight / 5;
  
  // Calcular en qué columna y fila se hizo clic teniendo en cuenta gridStartX y gridStartY
  let column = Math.floor((mouseX - gridStartX) / cellWidth);
  let row = Math.floor((mouseY - gridStartY) / cellHeight);
  
  // Asegurarse de que el clic esté dentro de los límites de la cuadrícula
  if (mouseX >= gridStartX && mouseX < gridStartX + gridWidth &&
      mouseY >= gridStartY && mouseY < gridStartY + gridHeight) {
    console.log(`Clic en la celda: fila ${row}, columna ${column}`);
  }
}

