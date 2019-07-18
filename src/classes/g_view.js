

class GVIEW {
    constructor(game){
        this.game = game;
    }

    start() {
        this.lastTime = 0;
        this.game.draw();
        requestAnimationFrame(this.animate.bind(this))
    }

    animate(time) {
        const deltaT = time - this.lastTime;
        this.game.singleMove(deltaT)
        this.game.draw();
        requestAnimationFrame(this.animate.bind(this))
    }

}

export default GVIEW;