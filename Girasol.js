class Girasol {
    constructor(x, y, img) {
        this.x = x;
        this.y = y;
        this.img = img;
        this.lastProducedSol = millis(); 
        this.produceSolInterval = 2000; 
    }

    draw() {
        image(this.img, this.x, this.y, cellWidth, cellHeight); 
    }

    update() {
        let currentTime = millis();
        if (currentTime - this.lastProducedSol > this.produceSolInterval) {
            this.generateSol();
            this.lastProducedSol = currentTime; 
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
