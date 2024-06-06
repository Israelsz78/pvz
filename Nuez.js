class Nuez {
    constructor(x, y, img) {
        this.name = 'nuez';
        this.x = x;
        this.y = y;
        this.img = img;
        this.attackInterval = 1000; // Cada segundo
        this.lastAttackTime = millis();
        this.isVisible = true;
        this.fila = 0;
        this.columna = 0;
        this.atacando = false;
    }

    draw() {
        if (this.isVisible) {
            image(this.img, this.x, this.y, cellWidth, cellHeight);
        }
    }

    update() {

    }

    atacar() {
        this.golpes++;
        console.log(this.golpes);
    }
}
