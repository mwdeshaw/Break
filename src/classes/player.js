import MovingObject from './moving_object';
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
        super(pos, { x: 0, y: 0 }, PLAYER_RADIUS)
        this.lives = lives;
        this.color = randomColor();
    };

    setKeyInputs(input) {
        if (this.pos.x < 0) {
            this.pos.x = 0;
            this.vel.x = 0;
        } else if ((this.pos.x + this.radius * 3) > 1200) {
            this.pos.x = 1200 - (this.radius * 3);
            this.vel.x = 0;
        } else {
            this.vel.x += input[0];
            this.vel.y += input[1];
        };
    };

    draw(ctx) {
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.pos.x, this.pos.y, this.radius * 3, this.radius);
        ctx.restore();
    };


    deathAnimation(ctx) {
        //likely will have image here later for death...
        this.draw(ctx);
        // ctx.clearRec(this.pos.x, this.pos.y, this.radius * 3, this.radius);
        this.lives -= 1;
        if (this.lives === 0) {
            return "Game Over!"
        } else {
            this.draw(ctx);
        }
    };



    //inciorporating the above into the game class
    //ball management
};

export default Player;