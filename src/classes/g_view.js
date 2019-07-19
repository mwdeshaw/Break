

class GVIEW {
    constructor(game){
        this.game = game;
        this.input = {
            a: [-45, 0],
            d: [45, 0],
            space: [0, -90]
        };
        // this.initialFlag = false;
        //you will need a flag to change the flag
    }

    keyHandler() {      
        document.addEventListener("keydown", event => {
            this.handleKey(event, true);
        });
        document.addEventListener("keyup", event => {
            this.handleKey(event, false);
        });
    }

    //set initial flag on the ball 

    handleKey(event, down) {
        let input = this.input;
        if (!this.game.ball[0].initialFlag) {
            switch (event.keyCode) {
                case 65:
                    if (input.a !== down) {
                        this.game.player[0].setKeyInputs(input.a, Object.keys(this.input)[0]);
                        this.game.ball[0].handleBallRelease(input.a, Object.keys(this.input)[0]);
                    }
                    break;
                case 68:
                    if (input.d !== down) {
                        this.game.player[0].setKeyInputs(input.d, this.initialFlag);
                        this.game.ball[0].handleBallRelease(input.d, Object.keys(this.input)[1]);
                    }
                    break;
                case 32:
                    if (input.space !== down) {
                        this.game.ball[0].initialFlag = true;
                        this.game.ball[0].handleBallRelease(input.space, Object.keys(this.input)[2]);
                    }
                    break;
                default:
                    break;
                }
        } else {
            switch (event.keyCode) {
                case 65:
                    if (input.a !== down) {
                        this.game.player[0].setKeyInputs(input.a, Object.keys(this.input)[0]);
                    }
                    break;
                case 68:
                    if (input.d !== down) {
                        this.game.player[0].setKeyInputs(input.d, Object.keys(this.input)[1]);
                    }
                    break;
                default:
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