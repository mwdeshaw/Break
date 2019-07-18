import MovingObject from './moving_object';
const STARTING_LIVES = 3;
const PLAYER_SPEED = 150;
const PLAYER_RADIUS = 30;

const randomColor = () => {
    const digs = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 3; i++) {
        color += digs[Math.floor((Math.random() * 16))];
    }
    return color;
};

class Player extends MovingObject {
    constructor(pos, lives = STARTING_LIVES) {
        super(pos, { x: 0, y: 0 }, PLAYER_RADIUS)
        this.lives = lives;
        this.speed = 0;
        this.color = randomColor();
        this.inputs = {};
    }

    setKeyInputs(inputs) {
        debugger
        this.inputs = inputs;
        if (inputs.d || inputs.a) {
            this.speed = PLAYER_SPEED;
        } else {
            this.speed = 0;
        }
    }

    draw(ctx) {
        console.log("drawn!")
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.pos.x, this.pos.y, this.radius * 3, this.radius);
        ctx.restore();
    }
}

export default Player;