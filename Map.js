class Map {
    constructor(config) {

        // Defaul size of map = 10x20 pieces boxes
        this.maxX = 9;
        this.maxY = 19;
        this.map = [];
        this.startMap()
        //console.log("initialize map")

    }

    startMap() {
        for (let index = 0; index <= this.maxX; index++) {
            this.map[index] = []
            for (let indexY = 0; indexY <= this.maxY; indexY++) {
                this.map[index][indexY] = 0;
            }
        }

        //console.log("themap:", this.map)
    }

    safePiece(piece) {
        // set of the cell for the main point(0,0)
        //this.map[piece.x][piece.y] = 0
        // set on 0 for the all hitbox
        piece.hitbox.forEach(element => {
            let newX = piece.x + element[0]
            let newY = piece.y + element[1]

            // for out of map!
            if (newX > this.maxX || newY > this.maxY) {
                return
            }
            //console.log("map-hitbox:",newX,newY)
            this.map[newX][newY] = 1

        });
        let asd= 0/0

    }
}