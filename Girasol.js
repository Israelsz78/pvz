class Girasol {
    constructor(x, y, img) {
        this.x = x;
        this.y = y;
        this.img = img;
        this.lastProducedSol = millis(); // Guardar el momento en que se crea o produce el último sol
        this.produceSolInterval = 2000; // Intervalo para producir soles (24 segundos)
    }

    draw() {
        image(this.img, this.x, this.y, cellWidth, cellHeight); // Asumiendo que cellWidth y cellHeight son globales
    }

    update() {
        let currentTime = millis();
        if (currentTime - this.lastProducedSol > this.produceSolInterval) {
            this.generateSol();
            this.lastProducedSol = currentTime; // Actualizar el último tiempo de generación
        }
    }

    generateSol() {
        // Código para generar un sol en la posición del girasol
        let solX = this.x + cellWidth / 2;  // Asumiendo que queremos que aparezca cerca del girasol
        let solY = this.y + cellHeight;     // Posición y un poco abajo del girasol
        soles.push({
            img: spriteSheetSol.get(0, 0, 26, 26), // Asumiendo que tienes una sprite sheet para los soles
            x: solX,
            y: solY,
            finalY: solY + 10,  // Hacer que caiga un poco
            recolectado: false,
            width: cellWidth * 0.3,  // Tamaño del sol
            height: cellHeight * 0.3
        });
    }
}
