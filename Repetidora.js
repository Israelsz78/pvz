class Repetidora {
    constructor(x, y, img) {
        this.x = x;
        this.y = y;
        this.img = img;
        this.attackInterval = 1000; // Cada segundo
        this.lastAttackTime = millis();
        this.isVisible = true;
    }

    draw() {
        if (this.isVisible) {
            image(this.img, this.x, this.y, cellWidth, cellHeight);
        }
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
