class ZombieYeti {
    constructor(imagen, velocidad, salud) {
        this.x = 200;
        this.y;
        this.velocidad = velocidad;
        this.salud = salud;
        this.imagen = imagen;
        this.numeroFila = Math.floor(Math.random() * 5);
        this.isVisible = true;
        this.atacando = false;
        this.golpes = 0;
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
                this.y = 28;
                break;
            case 2:
                this.y = 60;
                break;
            case 3:
                this.y = 86;
                break;
            case 4:
                this.y = 120;
                break;
        }

        if (!this.atacando) {
            this.x -= this.velocidad
        }
        if (this.isVisible) {
            image(this.imagen, this.x, this.y);
        }
    }

    atacar() {
        this.golpes++;
        console.log(this.golpes);
    }
}