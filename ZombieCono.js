class ZombieCono {
    constructor(imagen, velocidad, salud) {
        this.x = 200;
        this.y;
        this.velocidad = velocidad;
        this.salud = salud;
        this.imagen = imagen;
        this.numeroFila = Math.floor(Math.random() * 5);
    }

    mover() {
        /*con este switch determino el número
        de fila en el que se posicionará el zombie,
        manipulando la variable "y" del zombie*/
        switch (this.numeroFila) {
            case 0:
                this.y = 0;
                console.log('fila 1');
                break;
            case 1:
                this.y = 25;
                console.log('fila 2');
                break;
            case 2:
                this.y = 55;
                console.log('fila 3');
                break;
            case 3:
                this.y = 80;
                console.log('fila 4');
                break;
            case 4:
                this.y = 120;
                console.log('fila 5');
                break;
        }

        this.x -= this.velocidad
        image(this.imagen, this.x, this.y);
    }

    atacar() {
        // Lógica para ataque del zombie
    }
}