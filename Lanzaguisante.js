class Lanzaguisante {
    constructor(x, y, img) {
        this.name = 'Lanzaguisante';
        this.x = x;
        this.y = y;
        this.img = img;
        this.attackInterval = 1600; // Intervalo de disparo de 1.5 segundos
        this.lastAttackTime = millis(); // Tiempo desde el último disparo
        this.isVisible = true;
        this.fila = 0;
        this.columna = 0;
        this.bullets = []; // Arreglo para las balas
        this.vida = 250;
    }

    draw() {
        if (this.isVisible) {
            image(this.img, this.x, this.y, cellWidth, cellHeight);
            // Dibuja cada bala usando la imagen imgBala
            this.bullets.forEach(bullet => {
                image(imgBala, bullet.x, bullet.y, 10, 10); // Usa la imagen de la bala
            });
        }
    }

    update() {
        let currentTime = millis();
        if (currentTime - this.lastAttackTime >= this.attackInterval) {
            this.shoot();
            this.lastAttackTime = currentTime; // Actualiza el tiempo del último disparo
        }
        // Mueve cada bala y verifica si aún está en la pantalla
        this.bullets.forEach(bullet => {
            bullet.x += 1.5; // Ajusta la velocidad de la bala
        });
        // Elimina las balas fuera de la pantalla
        this.bullets = this.bullets.filter(bullet => bullet.x < width);
    }

    shoot() {
        // Añade una nueva bala a la lista
        this.bullets.push({ x: this.x + 30, y: this.y + 3, img: imgBala }); // Asegura usar la imagen para la bala
    }
}
