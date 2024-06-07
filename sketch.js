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
let zombieNormal, zombieCono, zombieCubo, zombieYeti, zombieBandera;
let zombie;
let numeroAleatorio;
let imgActualSeguirCursor = null;
let zombiesCreados = [];
var periodoT = 8000;
var registroT;
let puntos = 200;
let costosPlantas;
let spriteSheetSol;
let sol;
let soles = [];
let tiempoEntreSoles = 10000;
let ultimoTiempoSol = 0;
let gridStartX, gridStartY, gridWidth, gridHeight, cellWidth, cellHeight;
let spriteSheetGirasol;
let girasolBrillando;
let spriteSheetGirasolNormal;
let spriteSheetRepetidora;
let spriteSheetNuez;
let spriteSheetLanzaguisante;
let spriteSheetMina;
let spriteSheetZombieNormal;
let spriteSheetZombieCubo;
let spriteSheetZombieCono;
let spriteSheetZombieYeti;
let spriteSheetZombieBandera;
let girasol;
let ultimosUsos;
let cooldowns;
let carrito;
let carritos = [];
let zombiesAtacando = [];
let imgBala;
let nuezDañada;
let nuezMuyDañada;
let explosion;
let balaImpactada;
let imgGameOver;

function preload() {
  imgFondo = loadImage('assets/escenario.png');
  planta1 = loadImage('assets/iconoEnojada.png');
  planta2 = loadImage('assets/iconoGirasol.png');
  planta3 = loadImage('assets/iconoLanzaguisante.png');
  planta4 = loadImage('assets/iconoMina.png');
  planta5 = loadImage('assets/iconoNuez.png');
  spriteSheetRepetidora = loadImage('assets/Repetidora.png');
  spriteSheetGirasolNormal = loadImage('assets/Girasolbrillando.png');
  spriteSheetLanzaguisante = loadImage('assets/Lanzaguisante.png');
  spriteSheetMina = loadImage('assets/Mina.png');
  spriteSheetNuez = loadImage('assets/Nuez.png');
  imgPlanta1Selected = loadImage('assets/iconoEnojadaSelected.png');
  imgPlanta2Selected = loadImage('assets/iconoGirasolSelected.png');
  imgPlanta3Selected = loadImage('assets/iconoLanzaguisantesSelected.png');
  imgPlanta4Selected = loadImage('assets/iconoMinaSelected.png');
  imgPlanta5Selected = loadImage('assets/iconoNuezSelected.png');
  imgSol = loadImage('assets/iconoSol.png');
  spriteSheetZombieNormal = loadImage('assets/zombienormal.png');
  spriteSheetZombieCono = loadImage('assets/zombiecaracono.png');
  spriteSheetZombieCubo = loadImage('assets/zombiecaracubo.png');
  spriteSheetZombieYeti = loadImage('assets/zombieyeti.png');
  spriteSheetSol = loadImage('assets/sol.png');
  spriteSheetGirasol = loadImage('assets/Girasolbrillando.png');
  spriteSheetZombieBandera = loadImage('assets/zombiebandera.png');
  carrito = loadImage('assets/carrito.png')
  imgGameOver = loadImage('assets/gameover.png');
}

function setup() {
  createCanvas(imgWidth, imgHeight, P2D, canvas);
  smooth();
  pixelDensity(1);

  canvas_height = (canvas.clientWidth / width) * height
  canvas.style.setProperty('height', `${canvas_height}px`, 'important')

  sol = spriteSheetSol.get(0, 0, 26, 26);
  girasolBrillando = spriteSheetGirasol.get(365, 158, 87, 95);
  imgPlanta2 = spriteSheetGirasolNormal.get(28, 57, 89, 91)
  imgPlanta1 = spriteSheetRepetidora.get(3, 2, 28, 31);
  imgPlanta5 = spriteSheetNuez.get(1, 1, 26, 30);
  imgPlanta3 = spriteSheetLanzaguisante.get(0, 1, 27, 31);
  imgPlanta4 = spriteSheetMina.get(123, 2, 28, 24);
  zombieNormal = spriteSheetZombieNormal.get(4, 12, 27, 44);
  zombieCubo = spriteSheetZombieCubo.get(4, 6, 29, 50);
  zombieCono = spriteSheetZombieCono.get(4, 2, 27, 54);
  zombieYeti = spriteSheetZombieYeti.get(103, 2, 40, 65);
  zombieBandera = spriteSheetZombieBandera.get(2, 4, 37, 52);
  imgBala = spriteSheetLanzaguisante.get(78, 43, 10, 10);
  nuezDañada = spriteSheetNuez.get(0, 33, 27, 30);
  nuezMuyDañada = spriteSheetNuez.get(1, 64, 26, 28);
  explosion = spriteSheetMina.get(0, 40, 53, 46);
  balaImpactada = spriteSheetLanzaguisante.get(100, 40, 13, 15);



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
  cooldowns = {
    "Repetidora": 10000,
    "Girasol": 5000,
    "Lanzaguisante": 5000,
    "Mina": 10000,
    "Nuez": 20000
  };

  ultimosUsos = {
    "Repetidora": 0,
    "Girasol": 0,
    "Lanzaguisante": 0,
    "Mina": 0,
    "Nuez": 0
  };

  cBack = color(255);
  registroT = millis();

  gridStartX = imgWidth * 0.03;
  gridStartY = imgHeight * 0.13;
  gridWidth = imgWidth * 0.91;
  gridHeight = imgHeight * 0.83;
  cellWidth = gridWidth / 9;
  cellHeight = gridHeight / 5;

  carritos[0] = new Carro(carrito, -15, 10, 0, 3);
  carritos[1] = new Carro(carrito, -15, 40, 1, 3);
  carritos[2] = new Carro(carrito, -15, 73, 2, 3);
  carritos[3] = new Carro(carrito, -15, 103, 3, 3);
  carritos[4] = new Carro(carrito, -15, 133, 4, 3);
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

    //comenté esta linea para que desapareciera la plata cuando el zombie lo tocara
    //image(planta.img, imgX, imgY, imgWidthScaled, imgHeightScaled);
  }
  if (imgActualSeguirCursor) {
    image(imgActualSeguirCursor, mouseX - 10, mouseY - 9, 27, 33);
  }

  var tAct = millis();
  var difT = tAct - registroT;
  if (difT >= periodoT) {
    dibujarZombie();
    registroT = tAct;
  }

  plantasColocadas.forEach(planta => {
    planta.draw();
    planta.update();
  });

  zombiesCreados.forEach((zombie) => {
    zombie.mover();

  });



  let tiempoActual = millis();
  if (tiempoActual - ultimoTiempoSol > tiempoEntreSoles) {
    generarSolAleatorio();
    ultimoTiempoSol = tiempoActual;
  }

  soles.forEach((sol, index) => {
    if (!sol.recolectado) {
      if (sol.y < sol.finalY) {
        sol.y += 0.4;
        image(sol.img, sol.x, sol.y, sol.Width, sol.Height);
      } else if (!sol.timeFinalReached) {
        sol.timeFinalReached = millis()
      }

    }
  });


  soles = soles.filter(sol => {
    if (sol.moviéndose) {
      let moveX = (sol.targetX - sol.x) * 0.1;
      let moveY = (sol.targetY - sol.y) * 0.1;
      sol.x += moveX;
      sol.y += moveY;

      if (Math.abs(sol.x - sol.targetX) < 1 && Math.abs(sol.y - sol.targetY) < 1) {
        sol.recolectado = true;
        puntos += 25;
        return false;
      }
    }

    if (!sol.recolectado || sol.moviéndose) {
      image(sol.img, sol.x, sol.y, sol.Width, sol.Height);
    }
    if (!sol.recolectado && sol.timeFinalReached && (millis() - sol.timeFinalReached > 5000)) {
      return false;
    }
    return true;
  });


  //detectar colision
  for (let zombie of zombiesCreados) {
    for (let planta of plantasColocadas) {
      if (zombie.x <= planta.x + 10 && zombie.x >= planta.x - 12 && zombie.numeroFila === planta.fila && planta.name != 'mina') {
        zombiesAtacando.push(zombie);
        zombie.atacando = true;
        zombie.atacar(planta);
        if (planta.vida === 0) {
          verificarZombiesAtacando();
          quitarPlanta(planta);
          zombie.atacando = false;
        }
      }
    }
  }

  //ciclo anidador para verificar si hay zombies en la misma fila de la planta --CHECAR BIEN!!!!!
  for (let planta of plantasColocadas) {
    for (let zombie of zombiesCreados) {
      if (planta.fila === zombie.numeroFila) {
        planta.hayZombies = true;

        if (planta.name === 'Lanzaguisante' || planta.name === 'Repetidora') {
          for (let bullet of planta.bullets) {
            if (bullet.x >= zombie.x) {
              bullet.tocoZombie = true;
              zombie.vida--;
              console.log(zombie.vida);
            }
          }
        }
      }
    }
  }


  for (let zombie of zombiesCreados) {
    if (zombie.vida === 0) {
      quitarZombie(zombie);
    }
  }

  // Colisión entre mina y zombies
  for (let planta of plantasColocadas) {
    for (let zombie of zombiesCreados) {
      // Verificar primero si es una mina y manejar esa situación
      if (planta.name === 'Mina' && zombie.x <= planta.x + 10 && zombie.x >= planta.x - 10 && zombie.numeroFila === planta.fila) {
        verificarZombiesCercanos(zombie);
        planta.explode(); // Llama al método explode en vez de quitarPlanta
        quitarZombie(zombie);  // Eliminar el zombie
      }
      // Ahora manejar el caso de las demás plantas que no son minas
      else if (planta.name !== 'Mina' && zombie.x <= planta.x + 10 && zombie.x >= planta.x - 10 && zombie.numeroFila === planta.fila) {
        zombiesAtacando.push(zombie);
        zombie.atacando = true;
        zombie.atacar(planta);
        if (planta.vida <= 0) {
          verificarZombiesAtacando();
          quitarPlanta(planta);
          zombie.atacando = false;
        }
      }
    }
  }




  for (let carrito of carritos) {
    carrito.draw();
  }

  //colision entre zombies y carritos
  for (let zombie of zombiesCreados) {
    for (let carrito of carritos) {
      if (zombie.x <= carrito.x + 10 && zombie.numeroFila === carrito.numeroFila && !carrito.arrancar) {
        carrito.arrancar = true;
      }
    }
  }

  //si un el carrito ya fue tocado, entonces empezará a arrancar
  for (let carrito of carritos) {
    if (carrito.arrancar) {
      carrito.run();
    }
  }

  // si el carrito está se sale de la pantalla, se elimina del array (deja de existir)
  for (let carrito of carritos) {
    if (carrito.x >= width) {
      eliminarCarrito(carrito);
    }
  }

  //cada que un carrito toque un zombie, los mata
  for (let carrito of carritos) {
    for (let zombie of zombiesCreados) {
      if (carrito.x + 10 >= zombie.x && zombie.numeroFila === carrito.numeroFila && carrito.arrancar) {
        quitarZombie(zombie);
      }
    }
  }

  tiempoActual = millis();

  if (tiempoActual < ultimosUsos["Girasol"] + cooldowns["Girasol"]) {
    tint(100);
  } else {
    noTint();
  }
  image(planta2, 39, -2, 29, 27);

  if (tiempoActual < ultimosUsos["Repetidora"] + cooldowns["Repetidora"]) {
    tint(100);
  } else {
    noTint();
  }
  image(planta1, 129, 0, 41, 26);

  if (tiempoActual < ultimosUsos["Lanzaguisante"] + cooldowns["Lanzaguisante"]) {
    tint(100);
  } else {
    noTint();
  }
  image(planta3, 68, -4, 25, 31);

  if (tiempoActual < ultimosUsos["Mina"] + cooldowns["Mina"]) {
    tint(100);
  } else {
    noTint();
  }
  image(planta4, 91, -2, 25, 29);

  if (tiempoActual < ultimosUsos["Nuez"] + cooldowns["Nuez"]) {
    tint(100);
  } else {
    noTint();
  }
  image(planta5, 116, -8, 25, 32);
  noTint();

  for (let zombie of zombiesCreados) {
    if (zombie.x <= -24) {
      image(imgGameOver, 45, 10, 170, 170);
      noLoop();
    }
  }
}

function generarSolAleatorio() {
  let column = Math.floor(Math.random() * 9);
  let row = Math.floor(Math.random() * 5);
  let x = gridStartX + column * cellWidth;
  let finalY = gridStartY + row * cellHeight * 0.5;
  let initialY = -15;

  soles.push({
    img: sol,
    x: x,
    y: initialY,
    finalY: finalY,
    recolectado: false,
    width: cellWidth * 0.3,
    height: cellHeight * 0.3
  });
}

function windowResized() {
  canvas.style.removeProperty("height")
  canvas_height = (canvas.clientWidth / width) * height
  canvas.style.setProperty('height', `${canvas_height}px`, 'important')
}

function mouseClicked() {
  console.log("Mouse X:", mouseX, "Mouse Y:", mouseY);
  const plantas = [
    { nombre: "Repetidora", xMin: 143, xMax: 168, yMin: 0, yMax: 23 },
    { nombre: "Girasol", xMin: 43, xMax: 67, yMin: 0, yMax: 23 },
    { nombre: "Lanzaguisante", xMin: 68, xMax: 93, yMin: 0, yMax: 23 },
    { nombre: "Mina", xMin: 94, xMax: 115, yMin: -2, yMax: 23 },
    { nombre: "Nuez", xMin: 116, xMax: 140, yMin: -8, yMax: 23 }
  ];

  for (let planta of plantas) {
    if (mouseX >= planta.xMin && mouseX <= planta.xMax && mouseY >= planta.yMin && mouseY <= planta.yMax) {
      if (millis() - ultimosUsos[planta.nombre] < cooldowns[planta.nombre]) {
        console.log(planta.nombre + " está en cooldown. Espera " + ((cooldowns[planta.nombre] - (millis() - ultimosUsos[planta.nombre])) / 1000).toFixed(1) + " segundos.");
        return;
      }
      if (plantaSeleccionada === planta.nombre) {
        plantaSeleccionada = null;
        imgActualSeguirCursor = null;
      } else {
        if (puntos >= costosPlantas[planta.nombre]) {
          plantaSeleccionada = planta.nombre;
          imgActualSeguirCursor = imagenesDePlantas[planta.nombre];
          ultimosUsos[planta.nombre] = millis();
        } else {
          console.log("No tienes suficientes puntos para colocar una " + planta.nombre + ".");
        }
      }
      plantaColocada = false;
      return;
    }
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

  if (mouseX > gridStartX && mouseX < gridStartX + gridWidth && mouseY > gridStartY && mouseY < gridStartY + gridHeight) {
    if (plantaSeleccionada && !celdasOcupadas[celdaKey] && puntos >= costosPlantas[plantaSeleccionada]) {
      let x = gridStartX + column * cellWidth;
      let y = gridStartY + row * cellHeight;
      let planta = eval(`new ${plantaSeleccionada}(x, y, imagenesDePlantas[plantaSeleccionada.split(" ").join("")]);`);

      //pongo esta condicional para que el sol brille
      if (plantaSeleccionada === "Girasol") {
        planta = new Girasol(x, y, imgPlanta2, girasolBrillando);
      }

      if (plantaSeleccionada === "Nuez") {
        planta = new Nuez(x, y, imgPlanta5, nuezDañada, nuezMuyDañada);
      }

      if (planta) {
        //le asigno a cada planta su numero de fila y columna;
        planta.fila = row;
        planta.columna = column;
        plantasColocadas.push(planta);
        celdasOcupadas[celdaKey] = true;
        puntos -= costosPlantas[plantaSeleccionada];    // Aplicar cooldown solo después de colocar la plant
        plantaSeleccionada = null;
        imgActualSeguirCursor = null;
        console.log(celdaKey);
        console.log(celdasOcupadas)
      }
    }
  }
}


function dibujarZombie() {
  numeroAleatorio = Math.floor(Math.random() * 4);
  let newZombie;
  switch (numeroAleatorio) {
    case 0:
      newZombie = new ZombieNormal(zombieNormal, 0.06, 100);
      break;
    case 1:
      newZombie = new ZombieCono(zombieCono, 0.06, 100);
      break;
    case 2:
      newZombie = new ZombieCubo(zombieCubo, 0.06, 100);
      break;
    case 3:
      newZombie = new ZombieYeti(zombieYeti, 0.06, 100);
      break;
  }
  zombiesCreados.push(newZombie);
}

function mouseMoved() {
  soles.forEach(sol => {
    if (mouseX >= sol.x && mouseX <= sol.x + cellWidth &&
      mouseY >= sol.y && mouseY <= sol.y + cellHeight && !sol.recolectado) {
      sol.recolectado = true;
      sol.moviéndose = true;
      sol.targetX = 19;
      sol.targetY = -1;
    }
  });
}

function quitarPlanta(planta) {
  planta.isVisible = false;
  let IndexPlantRemove = plantasColocadas.findIndex(plant => plant === planta);
  plantasColocadas.splice(IndexPlantRemove, 1);

  //la celda que ocupaba la planta se pasa a "desocupada" o "false"
  let celdaKey = `r${planta.fila}c${planta.columna}`;
  celdasOcupadas[celdaKey] = false;
}

function quitarZombie(zombie) {
  zombie.isVisible = false;
  let indexZombie = zombiesCreados.findIndex(zomb => zomb === zombie);
  zombiesCreados.splice(indexZombie, 1);
}

function verificarZombiesCercanos(zombieExplotado) {
  for (let zombie of zombiesCreados) {
    /*si un zombie está cercano al zombie explotado*/
    if (zombie.x >= zombieExplotado.x - 100 && zombie.x <= zombieExplotado.x + 100 && zombie.numeroFila === zombieExplotado.numeroFila) {
      quitarZombie(zombie);
    }
  }
}

function eliminarCarrito(carrito) {
  let indexCarrito = carritos.findIndex(car => car === carrito);
  carritos.splice(indexCarrito, 1);
}

function verificarZombiesAtacando() {
  /*si más de un zombie atacó la misma planta, cuando se coman la planta todos los zombies que atacaron
  seguirán caminando*/
  for (zombie of zombiesAtacando) {
    zombie.atacando = false;
  }

  //se eliminan todos los zombies que fueron guardados en el array (se vacía el array).
  zombiesAtacando.splice(0, zombiesAtacando.length);
  console.log(zombiesAtacando);
}