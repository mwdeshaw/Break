

class GVIEW {
    constructor(game){
        this.game = game;
        this.input = {
            a: [-30, 0],
            d: [30, 0],
            space: [0, -45]
        };
    }

    keyHandler() {      
        document.addEventListener("keydown", event => {
            this.handleKey(event, true);
        });
        document.addEventListener("keyup", event => {
            this.handleKey(event, false);
        });
    }

    handleKey(event, down) {
        let input = this.input;

        switch (event.keyCode) {
            case 65:
                if (input.a !== down) {
                    this.game.player.setKeyInputs(input.a, Object.keys(input)[0]);
                    this.game.balls[0].handleBallRelease(input.a, Object.keys(input)[0])
                }
                break;
            case 68:
                if (input.d !== down) {
                    this.game.player.setKeyInputs(input.d, Object.keys(input)[1]);
                    this.game.balls[0].handleBallRelease(input.d, Object.keys(input)[1])
                }
                break;
            case 32:
                if (input.space !== down) {
                    this.game.balls[0].handleBallRelease(input.space, Object.keys(input)[2])
                }
                break;
            default:
                break;
        }
        // this.input = input;
    }

    start() {
        this.keyHandler();
        this.lastTime = new Date();
        requestAnimationFrame(this.animate.bind(this))
    }

    animate() {
        const deltaT = (new Date() - this.lastTime) / 1000;
        this.game.singleMove(deltaT)
        this.game.draw();
        this.lastTime = new Date();
        requestAnimationFrame(this.animate.bind(this))
    }

}

export default GVIEW;