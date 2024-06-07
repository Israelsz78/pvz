class Girasol {
    constructor(x, y, img, imgActive) {
        this.name = 'Girasol';
        this.x = x;
        this.y = y;
        this.img = img;
        this.imgActive = imgActive;
        this.currentImage = img;  
        this.lastProducedSol = millis();
        this.produceSolInterval = 3000;
        this.activeDuration = 500;
        this.lastActiveTime = 0;
        this.isVisible = true;
        this.fila = 0;
        this.columna = 0;
        this.vida = 250;
    }

    draw() {
        if (this.currentImage && this.isVisible) {
            image(this.currentImage, this.x, this.y, cellWidth, cellHeight);
        }
    }

    update() {
        let currentTime = millis();
        if (currentTime - this.lastProducedSol > this.produceSolInterval) {
            this.generateSol();
            this.lastProducedSol = currentTime;
            this.currentImage = this.imgActive;
            this.lastActiveTime = currentTime;
        }
        if (currentTime - this.lastActiveTime > this.activeDuration && this.currentImage === this.imgActive) {
            this.currentImage = this.img;
        }
    }

    generateSol() {
        let solX = this.x + cellWidth / 2 - (cellWidth * 0.3 / 2);
        let solY = this.y;
        soles.push({
            img: spriteSheetSol.get(0, 0, 26, 26),
            x: solX,
            y: solY,
            finalY: this.y + 10,
            recolectado: false,
            width: cellWidth * 0.3,
            height: cellHeight * 0.3
        });
    }
}
