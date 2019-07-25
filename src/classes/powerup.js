import MovingObject from './moving_object';
// import extraLife from 
// import multiBall from 
// import shorterPaddle from 
// import longerPaddle from 


const POWERUP_RADIUS = 30;

const randomColor = () => {
    const digs = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 3; i++) {
        color += digs[Math.floor((Math.random() * 16))];
    }
    return color;
};

// const POWERUPS = ["extraLife", "multiBall", "shorterPaddle", "longerPaddle"];

class Powerup extends MovingObject{
    constructor(pos, type) {
        super(pos, { x: 0, y: 0 }, POWERUP_RADIUS)
        this.type = type;
        this.color = randomColor();
    };
    
    // draw(ctx) {
    //     let img = new Image();
    //     switch(this.type) {
    //         case "extraLife":
    //             img.src = extraLife;
    //             break;
    //         case "multiBall":
    //             img.src = multiBall;
    //             break;
    //         case "shorterPaddle":
    //             img.src = shorterPaddle;
    //             break;
    //         case "longerPaddle":
    //             img.src = longerPaddle;
    //             break;
    //     }
    //     ctx.save();
    //     ctx.drawImage(img, this.pos.x, this.pos.y, this.radius, this.radius);
    //     ctx.restore();
    // }


    draw(ctx) {
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, true);
        ctx.fill();
        ctx.restore();
    };

    initiateMove() {
        this.vel.y += 200;
    }

    move(deltaTime) {
        let newDistanceY = this.vel.y * deltaTime;
        this.pos.y = this.pos.y + newDistanceY;
    }

}

export default Powerup;