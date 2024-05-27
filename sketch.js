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
let zombiesCreados = [];
var periodoT = 5000;
var registroT;
let puntos = 900;
let costosPlantas;

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
  pixelDensity(1);
  
  canvas_height = (canvas.clientWidth / width) * height
  canvas.style.setProperty('height', `${canvas_height}px`, 'important')

  imagenesDePlantas = {
    "Repetidora": imgPlanta1,
    "Girasol": imgPlanta2,
    "Lanzaguisante": imgPlanta3,
    "Mina": imgPlanta4,
    "Nuez": imgPlanta5
  }

   costosPlantas = {
    "Repetidora": 200,
    "Girasol": 50,
    "Lanzaguisante": 100,
    "Mina": 25,
    "Nuez": 50
  };

  

  

  numeroAleatorio = Math.floor(Math.random() * 4);
  zombies = [zombieNormal, zombieCono, zombieCubo, zombieYeti];
  zombie = new Zombie(zombies[numeroAleatorio], 0.06, 100);

  cBack = color(255);
  registroT = millis();
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

  fill(255);
  textSize(13); 
  stroke(0);
  strokeWeight(3);
  text(puntos, 16, 24); 

  stroke(0);
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 5; j++) {
      let x = gridStartX + i * cellWidth;
      let y = gridStartY + j * cellHeight;
      noFill();
      //rect(x, y, cellWidth, cellHeight);

      let celdaKey = `r${j}c${i}`;
      
      if (plantaSeleccionada && mouseX > x && mouseX < x + cellWidth && mouseY > y && mouseY < y + cellHeight && !celdasOcupadas[celdaKey]) {
        let imgPlanta = imagenesDePlantas[plantaSeleccionada];
        tint(255, 200);
        image(imgPlanta, x, y, cellWidth, cellHeight);
        noTint();
    }
}
}

        noTint();

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
  var tAct = millis();
  var difT = tAct - registroT;
  if (difT >= periodoT) {
    dibujarZombie();
    registroT = tAct;
  }

  zombiesCreados.forEach((zombie) => {
    zombie.mover();
  })
}


function windowResized() {
  canvas.style.removeProperty("height")
  canvas_height = (canvas.clientWidth / width) * height
  canvas.style.setProperty('height', `${canvas_height}px`, 'important')
}

function mouseClicked() {
  if (mouseX >= 129 && mouseX <= 129 + 41 && mouseY >= 0 && mouseY <= 26) {
    if (plantaSeleccionada === "Repetidora") {
      plantaSeleccionada = null;
      imgActualSeguirCursor = null;
    } else {
      if (puntos >= costosPlantas["Repetidora"]) {
        plantaSeleccionada = "Repetidora";
        imgActualSeguirCursor = imagenesDePlantas["Repetidora"];
      } else {
        console.log("No tienes suficientes puntos para colocar una Repetidora.");
      }
    }
    plantaColocada = false;
    console.log("Puntos restantes: " + puntos);
}

  


  if (mouseX >= 39 && mouseX <= 39 + 29 && mouseY >= -2 && mouseY <= -2 + 27) {
    if (plantaSeleccionada === "Girasol") {
      plantaSeleccionada = null;
      imgActualSeguirCursor = null;
    } else {
      if (puntos >= costosPlantas["Girasol"]) {
        plantaSeleccionada = "Girasol";
        imgActualSeguirCursor = imagenesDePlantas["Girasol"];
      } else {
        console.log("No tienes suficientes puntos para colocar un girasol.");
      }
    }
    plantaColocada = false;
    console.log("Puntos restantes: " + puntos);
}


  if (mouseX >= 68 && mouseX <= 68 + 25 && mouseY >= -4 && mouseY <= -4 + 31) {
    if (plantaSeleccionada === "Lanzaguizante") {
      plantaSeleccionada = null;
      imgActualSeguirCursor = null;
    } else {
      if (puntos >= costosPlantas["Lanzaguisante"]) {
        plantaSeleccionada = "Lanzaguisante";
        imgActualSeguirCursor = imagenesDePlantas["Lanzaguisante"];
      } else {
        console.log("No tienes suficientes puntos para colocar un Lanzaguisante.");
      }
    }
    plantaColocada = false;
    console.log("Puntos restantes: " + puntos);
}


  if (mouseX >= 91 && mouseX <= 91 + 25 && mouseY >= -2 && mouseY <= -2 + 29) {
    if (plantaSeleccionada === "Mina") {
      plantaSeleccionada = null;
      imgActualSeguirCursor = null;
    } else {
      if (puntos >= costosPlantas["Mina"]) {
        plantaSeleccionada = "Mina";
        imgActualSeguirCursor = imagenesDePlantas["Mina"];
      } else {
        console.log("No tienes suficientes puntos para colocar una Mina.");
      }
    }
    plantaColocada = false;
    console.log("Puntos restantes: " + puntos);
}


  if (mouseX >= 116 && mouseX <= 116 + 25 && mouseY >= -8 && mouseY <= -8 + 32) {
    if (plantaSeleccionada === "Nuez") {
      plantaSeleccionada = null;
      imgActualSeguirCursor = null;
    } else {
      if (puntos >= costosPlantas["Nuez"]) {
        plantaSeleccionada = "Nuez";
        imgActualSeguirCursor = imagenesDePlantas["Nuez"];
      } else {
        console.log("No tienes suficientes puntos para colocar una Nuez.");
      }
    }
    plantaColocada = false;
    console.log("Puntos restantes: " + puntos);
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

  if (mouseX >= gridStartX && mouseX < gridStartX + gridWidth && mouseY >= gridStartY && mouseY < gridStartY + gridHeight) {
    if (plantaSeleccionada && !celdasOcupadas[celdaKey]) {
      if (puntos >= costosPlantas[plantaSeleccionada]) { // Verifica si tienes suficientes puntos
        let x = gridStartX + column * cellWidth + (cellWidth - imagenesDePlantas[plantaSeleccionada].width) / 2;
        let y = gridStartY + row * cellHeight + (cellHeight - imagenesDePlantas[plantaSeleccionada].height) / 2;
        plantasColocadas.push({ img: imagenesDePlantas[plantaSeleccionada], x: x, y: y });
        celdasOcupadas[celdaKey] = true;
        puntos -= costosPlantas[plantaSeleccionada]; // Deduce los puntos aquí, después de confirmar la colocación
        console.log(`Has colocado ${plantaSeleccionada} en la fila ${row}, columna ${column}. Puntos restantes: ${puntos}`);
        plantaSeleccionada = null;
        imgActualSeguirCursor = null; // Dejar de seguir al cursor después de colocar la planta
        plantaColocada = true;
      } else {
        console.log("No tienes suficientes puntos para colocar esta planta.");
      }
    }
}
}
function dibujarZombie() {
  numeroAleatorio = Math.floor(Math.random() * 4);
  let newZombie = new Zombie(zombies[numeroAleatorio], 0.06, 100)
  zombiesCreados.push(newZombie);
}

document.addEventListener("click", (e) => {
  console.log('x: ' + e.clientX);
  console.log('y: ' + e.clientY);
});