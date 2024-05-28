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
                
                break;
            case 1:
                this.y = 25;
                
                break;
            case 2:
                this.y = 55;
                
                break;
            case 3:
                this.y = 80;
                
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