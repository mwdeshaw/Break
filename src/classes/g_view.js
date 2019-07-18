

class GVIEW {
    constructor(game){
        this.game = game;
        this.input = {
            a: false,
            d: false
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
                    input.a = down;
                }
                break;
            case 68:
                if (input.d !== down) {
                    input.d = down;
                }
                break;
            default:
                break;
        }

        this.input = input;
    }

    start() {
        this.keyHandler()
        this.lastTime = 0;
        // this.game.draw();
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