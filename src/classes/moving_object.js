
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
        return Math.sqrt(Math.pow(pos1, 2) + Math.pow(pos2, 2));
    };
    // distanceFormula(pos1, pos2) {
    //     return Math.sqrt(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2));
    // };

    objToObjCollision(otherObj) {
           const dx =  this.pos.x - otherObj.pos.x;
           const dy = this.pos.y - otherObj.pos.y;
           const dist = this.distanceFormula(dx, dy);
           return dist < (this.radius + otherObj.radius);
        //    const angleTo = (this.angle + math.atan2(dx, dy) / 3.1415 * 180.0) % 360 d
    };
        
//     }
//     if((angle_to > 135 and angle_to < 225) or(angle_to > 0 and angle_to < 45) or(angle_to > 315 and angle_to < 360)):
// if distance <= circle.rad / 2. + ((rect.height / 2.0) * (1. + 0.5 * abs(math.sin(angle_to * math.pi / 180.)))):
//     return True
// else:
// if distance <= circle.rad / 2. + ((rect.width / 2.0) * (1. + 0.5 * abs(math.cos(angle_to * math.pi / 180.)))):
//     return True
// return False


    // isCollidedWith(otherObj) {
    //     //you need to use a different algo for this guy 
    //     const centerDist = this.distanceFormula(this.pos, otherObj.pos);
    //     return centerDist < (this.radius + otherObj.radius);
    // };

};

export default MovingObject;