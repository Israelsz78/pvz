const canvas = document.getElementById("canvas")
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
let imgPlanta1Selected, imgPlanta2Selected, imgPlanta3Selected, imgPlanta4Selected, imgPlanta5Selected;
let imgSol;
let zombieNormal, zombieCono, zombieCubo, zombieYeti;
let zombies = [];
let zombie;
let numeroAleatorio;
let imgActualSeguirCursor = null;
 

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
  imgPlanta1Selected = loadImage('assets/iconoEnojadaSelected.png');
  imgPlanta2Selected = loadImage('assets/iconoGirasolSelected.png');
  imgPlanta3Selected = loadImage('assets/iconoLanzaguisantesSelected.png');
  imgPlanta4Selected = loadImage('assets/iconoMinaSelected.png');
  imgPlanta5Selected = loadImage('assets/iconoNuezSelected.png');
  imgSol = loadImage('assets/iconoSol.png');
  zombieNormal = loadImage('assets/zombieNormal.png');
  zombieCono = loadImage('assets/zombieCono.png');
  zombieCubo = loadImage('assets/zombieCubo.png');
  zombieYeti = loadImage('assets/zombieYeti.png');

}

function setup() {
  createCanvas(imgWidth, imgHeight, P2D, canvas);
  smooth();
  canvas_height = (canvas.clientWidth / width) * height
  canvas.style.setProperty('height', `${canvas_height}px`, 'important')

  imagenesDePlantas = {
    "Repetidora": imgPlanta1,
    "Girasol": imgPlanta2,
    "Lanzaguisante": imgPlanta3,
    "Mina": imgPlanta4,
    "Nuez": imgPlanta5
  }

  

  numeroAleatorio = Math.floor(Math.random() * 4);
  zombies = [zombieNormal, zombieCono, zombieCubo, zombieYeti];
  zombie = new Zombie(zombies[numeroAleatorio], 0.06, 100);
};

function draw() {
  background(255);
  let centerX = 0;
  let centerY = 0;
  image(imgFondo, centerX, centerY);

  image(imgSol, 19, -1, 17, 17);
  image(planta1, 129, 0, 41, 26);
  image(planta2, 39, -2, 29, 27);
  image(planta3, 68, -4, 25, 31);
  image(planta4, 91, -2, 25, 29);
  image(planta5, 116, -8, 25, 32);

  image(plantaSeleccionada === "Repetidora" ? imgPlanta1Selected : planta1, 129, 0, 41, 26);
  image(plantaSeleccionada === "Girasol" ? imgPlanta2Selected : planta2, 39, -2, 29, 27);
  image(plantaSeleccionada === "Lanzaguisante" ? imgPlanta3Selected : planta3, 68, -4, 25, 31);
  image(plantaSeleccionada === "Mina" ? imgPlanta4Selected : planta4, 91, -2, 25, 29);
  image(plantaSeleccionada === "Nuez" ? imgPlanta5Selected : planta5, 116, -8, 25, 32);




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

  let scaleFactor = 0.9;
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
  if (imgActualSeguirCursor) {
    image(imgActualSeguirCursor, mouseX - 10, mouseY - 9, 27, 33);  // Asumiendo un tamaño fijo que puedes ajustar
  }


  zombie.mover();
}


function windowResized() {
  canvas.style.removeProperty("height")
  canvas_height = (canvas.clientWidth / width) * height
  canvas.style.setProperty('height', `${canvas_height}px`, 'important')
}

function mouseClicked() {
  if (mouseX >= 144 && mouseX <= 129 + 41 && mouseY >= 0 && mouseY <= 26) {
    if (plantaSeleccionada === "Repetidora") {
      plantaSeleccionada = null;
      imgActualSeguirCursor = null;  
    } else {
      plantaSeleccionada = "Repetidora";
      imgActualSeguirCursor = imgPlanta1; 
    }
    plantaColocada = false;
    console.log("Seleccionaste la planta Repetidora");
  }


    if (mouseX >= 39 && mouseX <= 39 + 29 && mouseY >= -2 && mouseY <= -2 + 27) {
    if (plantaSeleccionada === "Girasol") {
      plantaSeleccionada = null;
      imgActualSeguirCursor = null;  
    } else {
      plantaSeleccionada = "Girasol";
      imgActualSeguirCursor = imgPlanta2; 
    }
    plantaColocada = false;
    console.log("Seleccionaste la planta Girasol");
  }

   if (mouseX >= 68 && mouseX <= 68 + 25 && mouseY >= -4 && mouseY <= -4 + 31) {
    if (plantaSeleccionada === "Lanzaguisante") {
      plantaSeleccionada = null;
      imgActualSeguirCursor = null;  
    } else {
      plantaSeleccionada = "Lanzaguisante";
      imgActualSeguirCursor = imgPlanta3; 
    }
    plantaColocada = false;
    console.log("Seleccionaste la planta Lanzaguisante");
  }

   if (mouseX >= 91 && mouseX <= 91 + 25 && mouseY >= -2 && mouseY <= -2 + 29) {
    if (plantaSeleccionada === "Mina") {
      plantaSeleccionada = null;
      imgActualSeguirCursor = null;  
    } else {
      plantaSeleccionada = "Mina";
      imgActualSeguirCursor = imgPlanta4; 
    }
    plantaColocada = false;
    console.log("Seleccionaste la planta Mina");
  }

  if (mouseX >= 116 && mouseX <= 116 + 25 && mouseY >= -8 && mouseY <= -8 + 32) {
    if (plantaSeleccionada === "Nuez") {
      plantaSeleccionada = null;
      imgActualSeguirCursor = null;  
    } else {
      plantaSeleccionada = "Nuez";
      imgActualSeguirCursor = imgPlanta5; 
    }
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
      plantaSeleccionada = null;
      imgActualSeguirCursor = null;  // Dejar de seguir al cursor después de colocar la planta
    }
  }
}