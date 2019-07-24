import MovingObj from './moving_object';
import Player from './player';
import Block from './blocks';

const BALL_RADIUS = 20;

const randomColor = () => {
    const digs = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 3; i++) {
        color += digs[Math.floor((Math.random() * 16))];
    }
    return color;
};

class Ball extends MovingObj {
    constructor(pos, initialFlag = false) {
        super(pos, { x: 0, y: 0 }, BALL_RADIUS);
        this.color = randomColor();
        this.dir = { x: 0, y: 0 }
        this.initialFlag = initialFlag;
        this.speed = 100;
    };

    draw(ctx) {
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, true);
        ctx.fill();
        ctx.restore();
    };

    collidesWith(otherObj) {
        if (otherObj instanceof Block) {
            this.dir.y = -this.dir.y;
            return true;
        } else {
            return false;
        };
    };


    rightWallCollision() {
        this.dir.x = -(this.dir.x);
        return true;
    }

    leftWallCollision() {
        this.dir.x = -(this.dir.x);
        return true;
    }

    topWallCollision() {
        this.dir.y = -(this.dir.y);
        return true;
    }

    handleBallRelease(input, key) {
        if (!this.initialFlag && key !== "space") {
            this.dir.x += input[0];
            this.dir.y += input[1];
        } else if (key === "space" && this.dir.y === 0) {
            this.dir.x /= 100;
            this.dir.y = -1;
            // this.initialRotation();
        }
    };

    move(deltaTime) {
        let newDistanceX;
        let newDistanceY;
        if (this.initialFlag) {
            newDistanceX = this.speed * deltaTime * this.dir.x;
            newDistanceY = this.speed * deltaTime * this.dir.y;
        } else {
            newDistanceX = deltaTime * this.dir.x;
            newDistanceY = deltaTime * this.dir.y;
        }
        this.pos.x = this.pos.x + newDistanceX;
        this.pos.y = this.pos.y + newDistanceY;

    };
};

export default Ball;