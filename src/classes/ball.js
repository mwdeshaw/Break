import MovingObj from './moving_object';
import Player from './player';

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
    constructor(pos) {
        super(pos, { x: 0, y: 0 }, BALL_RADIUS);
        this.color = randomColor();
        this.dir = { x: 0, y: 0 }
        // this.spinSpeed = Math.random() * 60 + 30;
        // this.player = player;
    }

    draw(ctx) {
        let rotateDir = Math.atan(this.dir.y / this.dir.x);
        ctx.save();
        ctx.translate(this.pos.x, this.pos.y);
        ctx.rotate(rotateDir);
        ctx.translate(-this.pos.x, -this.pos.y)
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, true);
        ctx.fill();
        ctx.restore();
    };

    collidesWith(otherObj) {
        if (otherObj instanceof Player && this.dir.x !== 0 && this.dir.y !== 0) {
            this.bounce();
            return true;
        } else {
            return false;
        }
    };

    wallCollision() {
        this.bounce();
        return true;
    }

    bounce() {
        this.dir.y = -this.dir.y; 
        this.vel.x = -this.vel.x;
        this.vel.y = -this.vel.y;
        console.log(this.vel);
    };

    initialRotation() {
        let rads = 90 * (Math.PI / 180); //assuming a 90 degree start
        this.dir.x = Math.cos(rads);
        this.dir.y = Math.sin(rads);
    };

    rotate(deltaTime) {
        if (this.dir.y !== 0) {
            let angle = -this.spinSpeed * (Math.PI / 180) * deltaTime;
            let vector = [this.dir.x, this.dir.y];

            var cos = Math.cos(angle);
            var sin = Math.sin(angle);

            this.dir.x = Math.round(10000 * (vector[0] * cos - vector[1] * sin)) / 10000;
            this.dir.y = Math.round(10000 * (vector[0] * sin + vector[1] * cos)) / 10000;
        }
    }

    handleBallRelease(input, key, bool) {
        if (!bool && key !== "space") {
            this.vel.x += input[0];
            this.vel.y += input[1];
        } else if (key === "space" && this.dir.x === 0 && this.dir.y === 0) {
            this.vel.x += input[0];
            this.vel.y += input[1];
            this.initialRotation();
        }
    };

    move(deltaTime) {
        super.move(deltaTime);
        this.rotate(deltaTime);
    };

};

export default Ball;