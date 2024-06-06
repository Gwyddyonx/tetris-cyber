const main = function(){

    const element = document.querySelector(".game-container")

    const game = new Game({
        element: element
    })

    game.init();  // Inicia el bucle del juego


}

main()
