class Repetidora {
    constructor(x, y, img) {
        this.x = x;
        this.y = y;
        this.img = img;
        this.lastShootTime = millis();
        this.shootInterval = 500; // dispara cada 0.5 segundos
    }

    draw() {
        image(this.img, this.x, this.y, cellWidth, cellHeight);
    }

    update() {
        let currentTime = millis();
        if (currentTime - this.lastShootTime > this.shootInterval) {
            this.shoot();
            this.lastShootTime = currentTime;
        }
    }

    shoot() {
        // Añadir lógica para disparar guisantes
        console.log("Repetidora dispara guisantes!");
    }
}
