import MovingObject from './moving_object';
import Ball from './ball';
const STARTING_LIVES = 3;
// const PLAYER_SPEED = 150;
const PLAYER_RADIUS = 30;

const randomColor = () => {
    const digs = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 3; i++) {
        color += digs[Math.floor((Math.random() * 16))];
    }
    return color;
};

class Player extends MovingObject {
    constructor(pos, lives = STARTING_LIVES) {
        super(pos, { x: 0, y: 0 })
        this.lives = lives;
        this.color = randomColor();
        this.radius = Math.floor(Math.sqrt((Math.pow(PLAYER_RADIUS, 2)) + (Math.pow(PLAYER_RADIUS * 3, 2))));
    //rectangular game piece operates differently from collisions than circles
    };

    setKeyInputs(input, key) {
        this.vel.x += input[0];
        this.vel.y += input[1];
    };

    draw(ctx) {
        const rad = PLAYER_RADIUS;
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.pos.x, this.pos.y, rad * 3, rad);
        ctx.restore();
    };

    collidesWith(otherObj) {
        if (otherObj instanceof Ball) {
            otherObj.bounce(); 
        };
    };

    wallCollision() {
        this.vel.x = -this.vel.x;
        return true;
    };

    deathAnimation(ctx) {
        //likely will have image here later for death...
        this.draw(ctx);
        this.lives -= 1;
        if (this.lives === 0) {
            return "Game Over!"
        } else {
            this.draw(ctx);
        }
    };

};

export default Player;