const canvas=document.getElementById("canvas")
let canvas_height
let imgFondo;
const imgWidth = 256;
const imgHeight = 192; 
let planta1, planta2, planta3, planta4, planta5;
let plantaSeleccionada = null;
let startX = 28;  // Inicio de los iconos en el eje X
let startY = 0; 

function preload() {
  imgFondo = loadImage('assets/escenario.png');
  planta1 = loadImage('assets/iconoEnojada.png');
  planta2 = loadImage('assets/iconoGirasol.png');
  planta3 = loadImage('assets/iconoLanzaguisante.png');
  planta4 = loadImage('assets/iconoMina.png');
  planta5 = loadImage('assets/iconoNuez.png');
  

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

   // Inicio de los iconos en el eje Y

  // Dibujar cada planta
  image(planta1, 129, 0, 41, 26);
  image(planta2, 39, -2, 29, 27);
  image(planta3, 68, -4, 25, 31);
  image(planta4, 91, -2, 25, 29);
  image(planta5, 116, -8, 25, 32);


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
  if (mouseX >= 129 && mouseX <= 129 + 41 && mouseY >= 0 && mouseY <= 26) {
    plantaSeleccionada = "Repetidora";
    console.log("Seleccionaste la planta Repetidora");
  } else if (mouseX >= 39 && mouseX <= 39 + 29 && mouseY >= -2 && mouseY <= -2 + 27) {
    plantaSeleccionada = "Girasol";
    console.log("Seleccionaste la planta Girasol");
  } else if (mouseX >= 68 && mouseX <= 68 + 25 && mouseY >= -4 && mouseY <= -4 + 31) {
    plantaSeleccionada = "Lanzaguisante";
    console.log("Seleccionaste la planta Lanzaguisante");
  } else if (mouseX >= 91 && mouseX <= 91 + 25 && mouseY >= -2 && mouseY <= -2 + 29) {
    plantaSeleccionada = "Mina";
    console.log("Seleccionaste la planta Mina");
  } else if (mouseX >= 116 && mouseX <= 116 + 25 && mouseY >= -8 && mouseY <= -8 + 32) {
    plantaSeleccionada = "Nuez";
    console.log("Seleccionaste la planta Nuez");
  }
  
  let gridStartX = imgWidth * 0.03;
  let gridStartY = imgHeight * 0.13;
  let gridWidth = imgWidth * 0.91;
  let gridHeight = imgHeight * 0.83;

  let cellWidth = gridWidth / 9;
  let cellHeight = gridHeight / 5;

  let column = Math.floor((mouseX - gridStartX) / cellWidth);
  let row = Math.floor((mouseY - gridStartY) / cellHeight);

  if (plantaSeleccionada && mouseX >= gridStartX && mouseX < gridStartX + gridWidth &&
      mouseY >= gridStartY && mouseY < gridStartY + gridHeight) {
    console.log(`Has colocado ${plantaSeleccionada} en la fila ${row}, columna ${column}`);
  }
}




