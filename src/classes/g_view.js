class GVIEW {
    constructor(game){
        this.game = game;
    }

    start() {
        this.game.draw();
    }
}

module.exports = GVIEW;