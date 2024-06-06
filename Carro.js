class Carro {
    constructor(imagen, x, y, numeroFila, velocidad) {
        this.imagen = imagen;
        this.x = x;
        this.y = y;
        this.numeroFila = numeroFila;
        this.velocidad = velocidad;
        this.arrancar = false;
    }

    draw() {
        image(this.imagen, this.x, this.y);
    }

    run() {
        if (this.arrancar) {
            this.x += this.velocidad;
        }
    }
}