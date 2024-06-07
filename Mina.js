class Mina {
    constructor(x, y, img) {
        this.name = 'Mina';
        this.x = x;
        this.y = y;
        this.img = img;
        this.isVisible = true;
        this.fila = 0;
        this.columna = 0;
        this.isExploding = false;  
        this.explosionStartTime = 0;
        this.explosionDuration = 1300; 
    }

    explode() {
        this.isExploding = true;
        this.explosionStartTime = millis()
    }

    draw() {
        if (this.isVisible && !this.isExploding) {
            image(this.img, this.x, this.y, cellWidth, cellHeight);
        }
        if (this.isExploding) {
            let elapsedTime = millis() - this.explosionStartTime;
            if (elapsedTime < this.explosionDuration) {
                let scaleFactor = 1.5; 
                let newWidth = cellWidth * scaleFactor;
                let newHeight = cellHeight * scaleFactor;
                let offsetX = (cellWidth - newWidth) / 2; 
                let offsetY = (cellHeight - newHeight) / 2; 
                image(explosion, this.x + offsetX, this.y + offsetY, newWidth, newHeight);
            } else {
                this.isExploding = false;
                this.isVisible = false;  
                quitarPlanta(this); 
            }
        }
    }

    update(){

    }

    checkForZombies(){

    }

    
}