class Mina {
    constructor(x, y, img) {
        this.x = x;
        this.y = y;
        this.img = img;
        this.triggered = false;  // Puedes dejar esta propiedad si planeas usarla en el futuro
    }

    draw() {
        image(this.img, this.x, this.y, cellWidth, cellHeight);
    }

    update() {
        // Actualmente vacío, ya que no hay funcionalidad de interacción
    }

    // Puedes dejar estos métodos vacíos o comentados si planeas añadir funcionalidad más adelante
    checkForZombies() {
        // Funcionalidad para más adelante
    }

    explode() {
        // Funcionalidad para más adelante
    }
}
