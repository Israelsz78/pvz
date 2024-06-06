class Repetidora {
    constructor(x, y, img) {
        this.name = 'Repetidora';
        this.x = x;
        this.y = y;
        this.img = img;
        this.attackInterval = 2000; // Intervalo de disparo de 1 segundo
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
            bullet.x += 1.5; // La misma velocidad reducida que la Lanzaguisante
        });
        this.bullets = this.bullets.filter(bullet => bullet.x < width);
    }

    shoot() {
        // Añade dos nuevas balas a la lista, utilizando la imagen para las balas
        this.bullets.push({ x: this.x + 30, y: this.y + 4, img: imgBala });
        this.bullets.push({ x: this.x + 45, y: this.y + 4, img: imgBala }); // Segunda bala
    }
}
