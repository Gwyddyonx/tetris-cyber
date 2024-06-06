class Sprite {

    constructor(config) {

        this.piece = config.piece
        this.image = new Image()
        this.image.src = config.src
        this.image.onload = () => {
            this.isLoaded = true
        }

        // Default animations
        this.animations = {
            "default": [
                [0, 0], [0, 1]
            ]

        }

    }

    draw(ctx, color) {

        /*if (!this.isnextFrameAvailable()) {
            return false
        }*/

        const x = this.piece.x * 48
        const y = this.piece.y * 48

        if (this.isLoaded) {

            let borderWidth = 1;
            let offset = borderWidth * 1;
            const cellSize = 48;

            this.piece.hitbox.forEach(element => {
                let newX = this.piece.x * cellSize + element[0] * cellSize
                let newY = this.piece.y * cellSize + element[1] * cellSize

                ctx.fillStyle = '#2C3751';
                ctx.fillRect(newX - borderWidth, newY - borderWidth, cellSize + offset, cellSize + offset);
                console.log('draw-border',newX - borderWidth, newY - borderWidth, cellSize + offset, cellSize + offset)
                console.log('draw-piece',newX, newY, cellSize, cellSize)

                ctx.fillStyle = color;
                ctx.fillRect(newX, newY, cellSize, cellSize);

            });


        }

    }
}