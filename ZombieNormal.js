class ZombieNormal {
  constructor(imagen, velocidad, salud) {
    this.x = 200;
    this.y;
    this.velocidad = velocidad;
    this.salud = salud;
    this.imagen = imagen;
    this.numeroFila = Math.floor(Math.random() * 5);
    this.golpes = 0;

    if (this.numeroFila === 0) {
      console.log('zombie fila 1');
    }
    if (this.numeroFila === 1) {
      console.log('zombie fila 2');
    }
    if (this.numeroFila === 2) {
      console.log('zombie fila 3');
    }
    if (this.numeroFila === 3) {
      console.log('zombie fila 4');
    }
    if (this.numeroFila === 4) {
      console.log('zombie fila 5');
    }
  }

  mover() {
    /*con este switch determino el número
    de fila en el que se posicionará el zombie,
    manipulando la variable "y" del zombie*/
    switch (this.numeroFila) {
      case 0:
        this.y = 12;
        break;
      case 1:
        this.y = 47;
        break;
      case 2:
        this.y = 80;
        break;
      case 3:
        this.y = 110;
        break;
      case 4:
        this.y = 139;
        break;
    }

    this.x -= this.velocidad;
    image(this.imagen, this.x, this.y);
  }

  atacar() {
    this.golpes++;
    console.log(this.golpes);
  }
}

