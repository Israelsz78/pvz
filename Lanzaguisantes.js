class Lanzaguisantes {
    constructor(x, y, img) {
        this.x = x;
        this.y = y;
        this.img = img;
        this.attackInterval = 1000; // Cada segundo
        this.lastAttackTime = millis();
    }

    draw() {
        image(this.img, this.x, this.y, cellWidth, cellHeight);
    }

    update() {
        this.handleAttack();
    }

    handleAttack() {
        let currentTime = millis();
        if (currentTime - this.lastAttackTime > this.attackInterval) {
            this.shoot();
            this.lastAttackTime = currentTime;
        }
    }

    hidePlant() {

    }

    shoot() {
        // Añadir lógica para disparar guisantes
    }
}
