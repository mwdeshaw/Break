

class GVIEW {
    constructor(game){
        this.game = game;
        this.input = {
            a: [-45, 0],
            d: [45, 0],
            space: [0, -45]
        };
        this.initialFlag = false;
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
        if (!this.initialFlag) {
            switch (event.keyCode) {
                case 65:
                    if (input.a !== down) {
                        this.game.player.setKeyInputs(input.a, Object.keys(this.input)[0], this.initialFlag);
                        this.game.balls[0].handleBallRelease(input.a, this.initialFlag)
                    }
                    break;
                case 68:
                    if (input.d !== down) {
                        this.game.player.setKeyInputs(input.d, this.initialFlag);
                        this.game.balls[0].handleBallRelease(input.d, Object.keys(this.input)[1], this.initialFlag)
                    }
                    break;
                case 32:
                    if (input.space !== down) {
                        this.initialFlag = true;
                        this.game.balls[0].handleBallRelease(input.space, Object.keys(this.input)[2], this.initialFlag)
                    }
                    break;
                default:
                    break;
                }
        } else {
            switch (event.keyCode) {
                case 65:
                    if (input.a !== down) {
                        this.game.player.setKeyInputs(input.a, Object.keys(this.input)[0], this.initialFlag);
                    }
                    break;
                case 68:
                    if (input.d !== down) {
                        this.game.player.setKeyInputs(input.d, Object.keys(this.input)[1], this.initialFlag);
                    }
                    break;
            }
        }

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