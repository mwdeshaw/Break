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
        // if (this.isOutOfBounds(this.pos.y)) {
            //decided to handle the remove logic in game, this may change...
        // }
    }

    distanceFormula(pos1, pos2) {
        return Math.sqrt(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2));
    };

    isCollidedWith(otherObj) {
        const centerDist = this.distanceFormula(this.pos, otherObj.pos);
        return centerDist < (this.radius + otherObject.radius)
    }

    isOutOfBounds(posY) {
        if (posY > 800 ) {
            return true
        } else {
            return false;
        };
    };

    randomRotation() {
        let radians = Math.random() * Math.PI * 2;
        return { x: Math.cos(radians), y: Math.sin(radians) };
    }

};

export default MovingObject;