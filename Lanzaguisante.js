class Lanzaguisante {
    constructor(x, y, img) {
        this.name = 'Lanzaguisante';
        this.x = x;
        this.y = y;
        this.img = img;
        this.attackInterval = 1500; // Intervalo de disparo de 1.5 segundos
        this.lastAttackTime = millis(); // Tiempo desde el último disparo
        this.isVisible = true;
        this.fila = 0;
        this.columna = 0;
        this.bullets = []; // Arreglo para las balas
        this.vida = 800;
    }

    draw() {
        if (this.isVisible) {
            image(this.img, this.x, this.y, cellWidth, cellHeight);
            // Dibuja cada bala
            this.bullets.forEach(bullet => {
                fill('#18f423');
                strokeWeight(1);
                ellipse(bullet.x, bullet.y, 10, 10);
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
            bullet.x += 1.5; // Aumenta la posición x de la bala
        });
        // Elimina las balas fuera de la pantalla
        this.bullets = this.bullets.filter(bullet => bullet.x < width);
    }

    shoot() {
        // Añade una nueva bala a la lista
        this.bullets.push({ x: this.x + 30, y: this.y + 7 });
    }
}
