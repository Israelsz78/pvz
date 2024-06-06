class Lanzaguisante {
    constructor(x, y, img) {
        this.name = 'lanzaguisantes';
        this.x = x;
        this.y = y;
        this.img = img;
        this.attackInterval = 1000; // Cada segundo
        this.lastAttackTime = millis();
        this.isVisible = true;
        this.fila = 0;
        this.columna = 0;
        this.xBall = x + 30;
        this.yBall = y + 7;
        this.vida = 800;
    }

    draw() {
        if (this.isVisible) {
            image(this.img, this.x, this.y, cellWidth, cellHeight);
        }
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

    shoot() {
        this.xBall += 1;
        fill('#18f423')
        strokeWeight(1);
        ellipse(this.xBall, this.yBall, 10, 10);
    }
}
