class Piece {

    pieces = {
        "O": [
            [0, 0], [0, 1], [1, 0], [1, 1]
        ],
        "I": [
            [0, 0], [0, 1], [0, 2], [0, 3]
        ],
        "S": [
            [0, 0], [0, 1], [1, 1], [1, 2]
        ],
        "Z": [
            [0, 0], [1, 0], [1, 1], [2, 1]
        ],
        "L": [
            [0, 0], [0, 1], [0, 2], [1, 2]
        ],
        "J": [
            [0, 0], [1, 0], [2, 0], [2, 1]
        ],
        "T": [
            [0, 0], [1, 0], [2, 0], [1, 1]
        ]
    }

    constructor(config) {
        this.id = null

        this.hitbox = []

        this.typePiece = null

        // The piece can move when is created, it's free!
        this.isLocked = false

        this.x = config.x
        this.y = config.y
        this.build()
        this.sprite = new Sprite({
            piece: this,
            src: "/assets/" + this.typePiece + ".png"
        })

        // This is for knwo the animation duration! 
        this.movingProgressRemaining = 0;
    }

    movePiece(direction) {

        if(this.movingProgressRemaining == 0){
            switch (direction) {
                case 'left':
                    if (this.x > 0) {
                        this.x--
                    }
                    break;
                case 'right':
                    if (this.x < 9) {
                        this.x++
                    }
                    break;
    
                default:
                    break;
            }
            this.movingProgressRemaining = 4
        }else{
            this.movingProgressRemaining --
        }
    }

    getRandomPiece() {
        const keys = Object.keys(this.pieces);
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        return randomKey//"Z";;//this.pieces[randomKey];
    }

    build() {
        this.typePiece = this.getRandomPiece()
        this.hitbox = this.pieces[this.typePiece]
        //console.log("build", this.typePiece, this.hitbox)
    }

    draw(ctx) {
        this.sprite.draw(ctx)
    }

    drop(map) {
        //if(this.canDrop(map)){
        this.y = this.y + 1
        //}
        //this.x = x - 32

    }

    canMove(map, direction) {
        let canMove = true

        //console.log(this.typePiece, this.hitbox, this.pieces[this.typePiece])

        this.pieces[this.typePiece].forEach(element => {

            let x_dropped = this.x
            let y_dropped = this.y

            switch (direction) {
                case 'left':
                    x_dropped--
                    break;
                case 'right':
                    x_dropped++
                    break;
                case 'drop':
                    y_dropped++
                    break;

                default:
                    return
                    break;
            }



            let newX = x_dropped + element[0]
            let newY = y_dropped + element[1]

            
            console.log("validation limit",newX,  map.maxX)
            if (newX < 0 || newX > 9) {
                console.log("dont move for limit",newX)
                canMove = false
            }

            //console.log("actual for2:",map[newX][newY])
            //try {
            console.log("direction:", direction, newX, newY)
            if (canMove && map[newX][newY] != 0) {//X
                //console.log("dont drop", newX, newY, map[newX][newY], candrop)
                canMove = false
            }
            //} catch (error) {
            //    canMove = false
            //}

        });
        //console.log("no more drop!",candrop)
        return canMove
    }

}