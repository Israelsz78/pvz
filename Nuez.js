class Nuez {
    constructor(x, y, img, imgDañada, imgMuyDañada) {
        this.name = 'Nuez';
        this.x = x;
        this.y = y;
        this.img = img;
        this.imgDañada = imgDañada;       
        this.imgMuyDañada = imgMuyDañada; 
        this.attackInterval = 1000; 
        this.lastAttackTime = millis();
        this.isVisible = true;
        this.fila = 0;
        this.columna = 0;
        this.atacando = false;
        this.vida = 2500;
    }

    draw() {
        if (this.isVisible) {
            let imgActual = this.img; 
            if (this.vida <= 750) { 
                imgActual = this.imgMuyDañada;
            } else if (this.vida <= 1500) { 
                imgActual = this.imgDañada;
            }

            image(imgActual, this.x, this.y, cellWidth, cellHeight);
        }
    }

    update() {
        
    }

    atacar(damage) {
        this.vida -= damage; 
        console.log("Vida restante: ", this.vida);
    }
}
