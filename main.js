const main = function(){

    const element = document.querySelector(".game-container")

    const game = new Game({
        element: element
    })

    game.init()
}

main()
