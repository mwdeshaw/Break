import MovingObj from './moving_object';

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
        this.initialDir = this.initialRotation();
        // this.dir = this.randomRotation();
        this.spinSpeed = Math.random() * 60 + 30;
    }

    //check to see if it can be kept simple
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

    collideWith(otherObj) {
        if (otherObj instanceof Player) {
            this.ball.bounce();
            return true;
        } else {
            return false;
        }
    };

    initialRotation() {
        let rads = 90 * (Math.PI / 180); //assuming a 90 degree start
        return { x: Math.cos(radians), y: Math.sin(radians) };
    }

    rotate(deltaTime) {
        let angle = -this.spinSpeed * (Math.PI / 180) * deltaTime;
        let vector = [this.dir.x, this.dir.y];

        var cos = Math.cos(angle);
        var sin = Math.sin(angle);

        this.dir.x = Math.round(10000 * (vector[0] * cos - vector[1] * sin)) / 10000;
        this.dir.y = Math.round(10000 * (vector[0] * sin + vector[1] * cos)) / 10000;
    }

    handleBallRelease(input) {
        this.vel.x += input[0];
        this.vel.y += input[1];
    };

    move(deltaTime) {
        super.move(deltaTime);
        this.rotate();
    };

};

export default Ball;