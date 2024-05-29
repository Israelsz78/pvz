class ZombieYeti {
    constructor(imagen, velocidad, salud) {
        this.x = 200;
        this.y;
        this.velocidad = velocidad;
        this.salud = salud;
        this.imagen = imagen;
        this.numeroFila = Math.floor(Math.random() * 5);
        if (this.numeroFila === 3) {
            console.log('fila 4');
        }
    }

    mover() {
        /*con este switch determino el número
        de fila en el que se posicionará el zombie,
        manipulando la variable "y" del zombie*/
        switch (this.numeroFila) {
            case 0:
                this.y = -9;
                break;
            case 1:
                this.y = 56;
                break;
            case 2:
                this.y = 125;
                break;
            case 3:
                this.y = 86;
                break;
            case 4:
                this.y = 120;
                break;
        }

        this.x -= this.velocidad
        image(this.imagen, this.x, this.y);
    }

    atacar() {
        // Lógica para ataque del zombie
    }
}