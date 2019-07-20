import Ball from './ball';

const randomColor = () => {
    const digs = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 3; i++) {
        color += digs[Math.floor((Math.random() * 16))];
    }
    return color;
};

const powerUps = ["multiball", "invinciball", "bomb", "wreckingBall", "longerBat", "tinyBat"]; //
const blockTypes = ["regular", "brick", "concrete"];
class Block {
    constructor(pos, width, height, type, powerUp) {
        this.pos = pos;
        this.width = width;
        this.height = height;
        this.color = randomColor();
        this.type = type;
        this.powerUp = powerUp;
    }

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

}

export default Block;