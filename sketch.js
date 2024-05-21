const canvas=document.getElementById("canvas")
let canvas_height
let imgFondo;
const imgWidth = 256;
const imgHeight = 192; 
let planta1, planta2, planta3, planta4, planta5;
let plantaSeleccionada = null;
let startX = 28;
let startY = 0; 
let imgPlanta1, imgPlanta2, imgPlanta3, imgPlanta4, imgPlanta5;
let imagenesDePlantas;
let plantasColocadas = []; 
let celdasOcupadas = {};
let plantaColocada = false;


function preload() {
  imgFondo = loadImage('assets/escenario.png');
  planta1 = loadImage('assets/iconoEnojada.png');
  planta2 = loadImage('assets/iconoGirasol.png');
  planta3 = loadImage('assets/iconoLanzaguisante.png');
  planta4 = loadImage('assets/iconoMina.png');
  planta5 = loadImage('assets/iconoNuez.png');
  imgPlanta1 = loadImage('assets/plantaEnojada.png'); 
  imgPlanta2 = loadImage('assets/plantaGirasol.png');
  imgPlanta3 = loadImage('assets/plantaLanzaguisante.png');
  imgPlanta4 = loadImage('assets/plantaMina.png');
  imgPlanta5 = loadImage('assets/plantaNuez.png');

}

function setup() {
  createCanvas(imgWidth, imgHeight, P2D,canvas);
  smooth();
  canvas_height= (canvas. clientWidth / width) * height
  canvas.style.setProperty('height', `${canvas_height}px`, 'important')
imagenesDePlantas = {
  "Repetidora": imgPlanta1,
  "Girasol": imgPlanta2,
  "Lanzaguisante": imgPlanta3,
  "Mina": imgPlanta4,
  "Nuez": imgPlanta5
}
};

function draw() {
  background(255);

  let centerX = 0;
  let centerY = 0;
  image(imgFondo, centerX, centerY);

  image(planta1, 129, 0, 41, 26);
  image(planta2, 39, -2, 29, 27);
  image(planta3, 68, -4, 25, 31);
  image(planta4, 91, -2, 25, 29);
  image(planta5, 116, -8, 25, 32);


  let gridStartX = imgWidth * 0.03; 
  let gridStartY = imgHeight * 0.13; 
  let gridWidth = imgWidth * 0.91; 
  let gridHeight = imgHeight * 0.83; 

  let cellWidth = gridWidth / 9;
  let cellHeight = gridHeight / 5; 

  stroke(0); 
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 5; j++) {
      let x = gridStartX + i * cellWidth;
      let y = gridStartY + j * cellHeight;
      noFill();
      rect(x, y, cellWidth, cellHeight);
    }
  }

  let scaleFactor = 1;
  for (let planta of plantasColocadas) {
    let imgWidthScaled = cellWidth * scaleFactor;
    let imgHeightScaled = cellHeight * scaleFactor;
    let imgX = planta.x + (cellWidth - imgWidthScaled) / 2;
    let imgY = planta.y + (cellHeight - imgHeightScaled) / 2;

    if (planta.img === imgPlanta4) {
      imgY += 7;
      imgX += 2; 
  }
    image(planta.img, imgX, imgY, imgWidthScaled, imgHeightScaled);
  }
}


function windowResized() {
  canvas.style.removeProperty("height")
  canvas_height= (canvas. clientWidth / width) * height
  canvas.style.setProperty('height', `${canvas_height}px`, 'important')
}

function mouseClicked() {
  if (mouseX >= 144 && mouseX <= 129 + 41 && mouseY >= 0 && mouseY <= 26) {
    plantaSeleccionada = "Repetidora";
    plantaColocada = false;
    console.log("Seleccionaste la planta Repetidora");
  } else if (mouseX >= 39 && mouseX <= 39 + 29 && mouseY >= -2 && mouseY <= -2 + 27) {
    plantaSeleccionada = "Girasol";
    plantaColocada = false;
    console.log("Seleccionaste la planta Girasol");
  } else if (mouseX >= 68 && mouseX <= 68 + 25 && mouseY >= -4 && mouseY <= -4 + 31) {
    plantaSeleccionada = "Lanzaguisante";
    plantaColocada = false;
    console.log("Seleccionaste la planta Lanzaguisante");
  } else if (mouseX >= 91 && mouseX <= 91 + 25 && mouseY >= -2 && mouseY <= -2 + 29) {
    plantaSeleccionada = "Mina";
    plantaColocada = false;
    console.log("Seleccionaste la planta Mina");
  } else if (mouseX >= 116 && mouseX <= 116 + 25 && mouseY >= -8 && mouseY <= -8 + 32) {
    plantaSeleccionada = "Nuez";
    plantaColocada = false;
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

  
   let celdaKey = `r${row}c${column}`;

   if (plantaSeleccionada && !plantaColocada && !celdasOcupadas[celdaKey] && 
    mouseX >= gridStartX && mouseX < gridStartX + gridWidth &&
    mouseY >= gridStartY && mouseY < gridStartY + gridHeight) {
  let imgPlanta = imagenesDePlantas[plantaSeleccionada];
  if (imgPlanta) { 
    let x = gridStartX + column * cellWidth + (cellWidth - imgPlanta.width) / 2;
    let y = gridStartY + row * cellHeight + (cellHeight - imgPlanta.height) / 2;
    plantasColocadas.push({ img: imgPlanta, x: x, y: y });
    celdasOcupadas[celdaKey] = true;
    plantaColocada = true;
    console.log(`Has colocado ${plantaSeleccionada} en la fila ${row}, columna ${column}`);
  }
} else if (celdasOcupadas[celdaKey]) {
  console.log(`La celda fila ${row}, columna ${column} ya está ocupada.`);
}
}