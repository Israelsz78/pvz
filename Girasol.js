class Girasol {
    constructor(x, y, img, imgActive) {
        this.x = x;
        this.y = y;
        this.img = img;
        this.imgActive = imgActive;
        this.currentImage = img;  // iniciar con la imagen por defecto
        this.lastProducedSol = millis();
        this.produceSolInterval = 2000;
        this.activeDuration = 500;
        this.lastActiveTime = 0;
        
    }

    draw() {
        if (this.currentImage) {
            image(this.currentImage, this.x, this.y, cellWidth, cellHeight);
        } else {
            console.log("no currentImage to draw");
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
