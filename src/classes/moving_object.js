const FRAME_RATE = 1000 / 60;

class MovingObject {
    constructor(pos, vel, radius) {
        this.pos = pos ? pos : { x: 600, y: 840 };
        this.vel = vel ? vel : { x: 0, y: 0 }
        this.radius = radius;
    };
    
    move(deltaTime) {
        const velocityScale = deltaTime / FRAME_RATE;
        let offsetX = this.vel.x * velocityScale;
        let offsetY = this.vel.offsetY * velocityScale;
        this.pos.x = this.pos.x + offsetX;
        this.pos.y = this.pos.y + offsetY;
    }


}

module.exports = MovingObject;