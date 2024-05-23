class Game {

    constructor(config) {
        this.element = config.element
        this.canvas = this.element.querySelector(".game-canvas")
        this.ctx = this.canvas.getContext("2d")
        this.currentPiece = null
        // Frame rate setup
        this.frameRate = config.frameRate || 10
        this.actualFrame = 0

        this.map = new Map()
        this.gameOver = false

        this.directionInput = new DirectionInput()
        this.directionInput.init()
    }

    gameLoop() {
        const step = () => {

            //console.log("new Frame!!!")

            // Game Logic!
            if (this.isnextFrameAvailable()) {// For drop automatic

                if (this.currentPiece.isLocked) {

                    this.newPiece()
                }

                // Drop Piece

                //console.log("gamemap:",this.map)

                // Draw current Piece! "dropping"

                if (this.currentPiece.canMove(this.map.map,"drop")) {
                    this.currentPiece.drop(this.map.map)
                } else {
                    // Safe positions on map and new piece
                    this.map.safePiece(this.currentPiece)

                    // See if is game Over
                    this.isLossGame()

                    // New piece
                    this.currentPiece = new Piece({
                        x: 4,
                        y: 0,
                    })
                }

                // Draw Map
                //this.map.setPiece(this.currentPiece)
                //this.map.draw()

            }

            // Movement Logic!
            let new_direction = this.directionInput.getDirection()
            if(this.currentPiece.canMove(this.map.map,new_direction)){
                this.currentPiece.movePiece(new_direction)
            }

            //safe Piece after the move (this is not necesary???)
            //this.map.safePiece(this.currentPiece)

            // Clear ctx to render a new frame
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.drawRules(this.ctx, this.map)

            this.currentPiece.draw(this.ctx)


            if (this.gameOver) {
                //alert("GameOver");
                console.log("gameOver")
            } else {
                requestAnimationFrame(() => {
                    step()
                })

            }


        }

        this.newPiece()
        step();

    }

    drawRules(ctx, map) {

        const cellSize = 48;

        const gridWidth = cellSize * 10;
        const gridHeight = cellSize * 20;

        ctx.strokeStyle = '#19202c46';
        ctx.lineWidth = 1;

        for (let i = 0; i <= map.maxX; i++) {
            for (let j = 0; j <= map.maxY; j++) {
                if (map.map[i][j] === 1) {
                    let borderWidth = 1;
                    let offset = borderWidth * 1;

                    ctx.fillStyle = '#2C3751';
                    ctx.fillRect((i * cellSize) - borderWidth, (j * cellSize) - borderWidth, cellSize + offset, cellSize + offset);

                    ctx.fillStyle = '#151A26';
                    ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
                }
            }
        }

        for (let x = 0; x <= gridWidth; x += cellSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, gridHeight);
            ctx.stroke();
        }

        for (let y = 0; y <= gridHeight; y += cellSize) {

            // draw the Loss line
            if (y == cellSize) {
                ctx.strokeStyle = '#450A0A';
            } else {
                ctx.strokeStyle = '#19202c46';
            }
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(gridWidth, y);
            ctx.stroke();
        }
    }

    isnextFrameAvailable() {
        this.actualFrame++
        if (this.actualFrame > this.frameRate) {
            this.actualFrame = 0
            return true
        }

        return false

    }

    init() {
        console.log("init")
        this.gameLoop()
    }

    newPiece() {
        this.currentPiece = new Piece({
            x: 4,
            y: 0,
        })

    }

    isLossGame() {
        for (let index = 0; index < this.map.maxX; index++) {

            console.log(this.map.map)
            if (this.map.map[index][0] === 1) {
                this.gameOver = true
            }
        }
    }

}