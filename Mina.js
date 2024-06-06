class Mina {
    constructor(x, y, img) {
        this.name = 'Mina';
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
