class Nuez {
    constructor(x, y, img) {
        this.x = x;
        this.y = y;
        this.img = img;
        this.health = 100; // Suponiendo que la Nuez tiene una cantidad de salud
    }

    draw() {
        image(this.img, this.x, this.y, cellWidth, cellHeight);
    }

    update() {
        // Actualizar estado de la Nuez, por ejemplo, manejar daño
    }
}
