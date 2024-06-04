class Nuez {
    constructor(x, y, img) {
        this.x = x;
        this.y = y;
        this.img = img;
        this.attackInterval = 1000; // Cada segundo
        this.lastAttackTime = millis();
        this.isVisible = true;
        this.fila = 0;
        this.columna = 0;
    }

    draw() {
        if (this.isVisible) {
            image(this.img, this.x, this.y, cellWidth, cellHeight);
        }
    }

    update() {
        // Actualizar estado de la Nuez, por ejemplo, manejar daño
    }
}
