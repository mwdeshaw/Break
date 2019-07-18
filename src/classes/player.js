import MovingObject from './moving_object';
const STARTING_LIVES = 3;
const PLAYER_SPEED = 30;
const PLAYER_RADIUS = 30;

class Player extends MovingObject {
    constructor(pos, lives = STARTING_LIVES) {
        this.lives = lives;
        
    }


    
}


module.exports = Player;