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

    draw(ctx) {

        /*if (!this.isnextFrameAvailable()) {
            return false
        }*/

        const x = this.piece.x * 48
        const y = this.piece.y * 48

        const [frameX, frameY] = [0, 0]

        if(this.isLoaded){
            /*console.log("draw",this.image,
            frameX * 48, frameY * 48,
            48, 48,
            x, y,
            48, 48)*/
            ctx.drawImage(this.image,
                frameX * 48, frameY * 48,
                192, 192,
                x, y,
                192, 192
            )
        }

    }
}