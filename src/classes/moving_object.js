// const FRAME_RATE = 1000 / 60;

class MovingObject {
    constructor(pos, vel, radius) {
        this.pos = pos;
        this.vel = vel;
        this.radius = radius;
    };

    move(deltaTime) {
        let newDistanceX = this.vel.x * deltaTime;
        let newDistanceY = this.vel.y * deltaTime;
        this.pos.x = this.pos.x + newDistanceX;
        this.pos.y = this.pos.y + newDistanceY;
        console.log(this.pos.x);
        console.log(this.pos.y);
    }

    
}

export default MovingObject;