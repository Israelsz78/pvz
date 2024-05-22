class Zombie {
  constructor(tipo, velocidad, salud) {
    this.posicion = 200;
    this.velocidad = velocidad;
    this.salud = salud;
    this.tipo = tipo;
  }

  mover() {
    this.posicion -= this.velocidad
    image(this.tipo, this.posicion, 100);
  }

  atacar() {
    // Lógica para ataque del zombie
  }
}

