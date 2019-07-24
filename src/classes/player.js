import MovingObject from './moving_object';
import Ball from './ball';
const PLAYER_HEIGHT = 30;
const PLAYER_WIDTH = 120;

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

    // setKeyInputs(input, key) {
    //     this.vel.x += input[0];
    // };

    move(deltaTime) {
        let newDistanceX = this.vel.x * deltaTime;
        this.pos.x = this.pos.x + newDistanceX;
    };

    draw(ctx) {
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
        ctx.restore();
    };

    // collidesWith(otherObj) {
    //     if (otherObj instanceof Ball) {
    //        if (otherObj.dir.x > 0) {
    //            otherObj.dir.x = -otherObj.dir.x;
    //        } else {
    //            otherObj.dir.x = otherObj.dir.x;
    //        }
    //         if (otherObj.dir.y > 0) {
    //             otherObj.dir.y = otherObj.dir.y;
    //         } else {
    //             otherObj.dir.x = -otherObj.dir.x;
    //         }
    //         otherObj.speed = -Math.abs(otherObj.speed) * 1.05;
    //         return true;
    //     };
    // };

    collidesWith(otherObj) {
        if (otherObj instanceof Ball) {
            otherObj.dir.x = -Math.abs(otherObj.dir.x);
            otherObj.dir.y = -Math.abs(otherObj.dir.y);
            otherObj.vel.y = -Math.abs(otherObj.vel.y) * 1.1;
            return true;
        };
    };


    rightWallCollision() {
        this.vel.x = -Math.abs(this.vel.x);
        return true;
    }

    leftWallCollision() {
        this.vel.x = Math.abs(this.vel.x);
        return true;
    }

};

export default Player;