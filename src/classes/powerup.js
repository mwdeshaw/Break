import MovingObject from './moving_object';

const POWERUP_RADIUS = 30;

const randomColor = () => {
    const digs = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 3; i++) {
        color += digs[Math.floor((Math.random() * 16))];
    }
    return color;
};

class Powerup extends MovingObject{
    constructor(pos, type) {
        super(pos, { x: 0, y: 0 }, POWERUP_RADIUS)
        this.type = type;
        this.color = randomColor();
    };
    
    draw(ctx) {
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, true);
        ctx.fill();
        ctx.restore();
    };

    initiateMove() {
        debugger
        this.vel.y += 100;
    }

    move(deltaTime) {
        debugger
        let newDistanceY = this.vel.y * deltaTime;
        this.pos.y = this.pos.y + newDistanceY;
    }

}

export default Powerup;