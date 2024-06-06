class ZombieNormal {
  constructor(imagen, velocidad, salud) {
    this.x = 200;
    this.y;
    this.velocidad = velocidad;
    this.salud = salud;
    this.imagen = imagen;
    this.numeroFila = Math.floor(Math.random() * 5);
    this.golpes = 0;
    this.isVisible = true;
    this.atacando = false;
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
        this.y = 107;
        break;
      case 4:
        this.y = 139;
        break;
    }

    if (!this.atacando) {
      this.x -= this.velocidad;
    }
    if (this.isVisible) {
      image(this.imagen, this.x, this.y);
    }
  }

  atacar(planta) {
    planta.vida--;
    console.log(planta.vida);
  }
}

