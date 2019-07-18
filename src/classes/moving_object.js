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

    distanceFormula(pos1, pos2) {
        return Math.sqrt(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2));
    };


    isCollided(otherObj) {
        const centerDist = this.distanceFormula(this.pos, otherObj.pos);
        return centerDist < (this.radius + otherObject.radius)
    }

}

export default MovingObject;