import MovingObject from './moving_object';
import Ball from './ball';
const PLAYER_SPEED = 150;
const PLAYER_HEIGHT = 30;
const PLAYER_WIDTH = 90;

const randomColor = () => {
    const digs = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 3; i++) {
        color += digs[Math.floor((Math.random() * 16))];
    }
    return color;
};

class Player extends MovingObject {
    constructor(pos) {
        super(pos, { x: 0, y: 0 })
        this.color = randomColor();
        this.width = PLAYER_WIDTH;
        this.height = PLAYER_HEIGHT;
    };

    setKeyInputs(input, key) {
            this.vel.x += input[0];
            this.vel.y += input[1];
    };

    draw(ctx) {
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
        ctx.restore();
    };

    collidesWith(otherObj) {
        if (otherObj instanceof Ball) {
            otherObj.bounce(); 
        };
    };

    wallCollision() {
        this.vel.x = -this.vel.x;
        return true;
    };

};

export default Player;