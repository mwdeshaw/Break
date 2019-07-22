# [Break!](https://mwdeshaw.github.io/Break/)

![splash page](https://github.com/mwdeshaw/Break/blob/master/dist/style/splash.png)

Break! is a frontend Javascript application that brings new meaning to the traditional coffee break. Break! puts you in control of a paddle, where you have three lives and one goal, to clear the entire area of blocks. Games are fast, but the gameplay is addictive. Do you have what it takes to Break! the cut?

## Features
Break! has many features, all of which contribute to a great user experience:

* #### Interactive user interface: Power up the ui and play the game with the press of a button. 
* #### Fast-paced fun: Single-level design with three lives. Lose all of your lives or win the game? Press start and play again.
* #### Real ball physics: The ball movement will keep you on your toes, guarenteed

## Requirements
* Node ```v10.13.1```

## Run Break! locally:
1. Clone github repo

2. Install the dependencies and packages:
  ```
  npm install
  ```
  
 3. Activate the webpack:
 ```
 npm start
 ```
 
4.  Open the index.html
  ```
  open index.html
  ```
  
 5. Start playing Break!
 
## About the Project
Break was designed and built over the course of five days. A proposal was drafted, which described the idea and the timeline for adding all of the features, from ui design to ball physics. The timeline was then systematically followed to create an aesthetic and functional app. The idea was based on a popular computer game I played during my childhood, Magic Ball, where the goal was to clear the entire board of blocks.

The gameplay sound assets come from [here](https://opengameart.org/content/3-ping-pong-sounds-8-bit-style). The Game Boy startup sound is from an mp3 file made from [this](https://www.youtube.com/watch?v=3bCT3YxZfAY) video. Some inspiration for the css Game Boy implementation comes from [here](https://baumannzone.github.io/gameboy-css/).

## The Technology
![game page](https://github.com/mwdeshaw/Break/blob/master/dist/style/gameStart.png)

### Frontend
Break! was built using vanilla Javascript. The user interface is created with pure HTML/CSS, while event listeners are used to make the ui come to life. 

#### User Interface
Break!'s user interface was created to reflect the purpose of the app, to play and to entertain! The design is based off Nintendo's Game Boy Advance. The ui is not only aesthetic, but also functional. One cannot play the game until he or she turns the interface on! The functionality of the interface was created using event listeners.

Here is some of this code:

```javascript
    const defScreen = document.getElementById("default");
    const powerBtn = document.getElementById("power-btn");
    powerBtn.onclick = () => {
        defScreen.setAttribute("class", "active");
        const startScreen = document.getElementById('start-screen');
        startScreen.setAttribute("class", "active");

        const light = document.getElementById('power-lt');
        light.setAttribute("class", "active");

        const screenText = document.querySelector(".start-text");
        const instructions = document.querySelector(".instructions");
        const controlsList = document.querySelector(".controls-list");

        screenText.classList.add("end");
        const startBtn = document.getElementById("start-game");
        setTimeout(() => {
            const audio = document.getElementById("gameboySound");
            audio.currentTime = 0;
            audio.play();
            instructions.classList.add("end");
            controlsList.classList.add("end");
            startBtn.setAttribute("class", "active");
        }, 3000);

        startBtn.onclick = () => {
            startScreen.removeAttribute("class");
            instructions.classList.remove("end");
            controlsList.classList.remove("end");
            screenText.classList.remove("end");
            const canvas = document.getElementById("board");
            const ctx = canvas.getContext("2d");
            const game = new Game(ctx);
            new GView(game).start();
        };

```
Note the numerous event listeners. The order, and functions including setTimeout() ensure one can only play the game after the ui is "fired-up." The event listeners also give the ability to start a new game every time the start button is pressed.

#### Controls

![controls](https://github.com/mwdeshaw/Break/blob/master/dist/style/Screen%20Shot%202019-07-21%20at%208.59.28%20PM.png)

The game only requires three keys, the space bar, the a key, and the d key. The functionality of these keys is achieved through two event listeners, shown here, as well as a custom key handler:
```javascript
    keyHandler() {   
        document.addEventListener("keydown", event => {
            this.handleKey(event, true);
        });
        document.addEventListener("keyup", event => {
            this.handleKey(event, false);
        });
    };
```
The event listeners above sense for key presses and call the handleKey() function. They also stops the event's popagation on "keyup".

#### Gameplay Physics:
![gameplay](https://github.com/mwdeshaw/Break/blob/master/dist/style/Screen%20Shot%202019-07-21%20at%208.39.46%20PM.png)

Physics drove the creation of the ball and its functionality, from spin and rotation, to direction vectors. Some of the code that allowed for the ball's realistic behavior is here:

```javascript
    constructor(pos) {
        super(pos, { x: 0, y: 0 }, BALL_RADIUS);
        this.dir = { x: 0, y: 0 }
        this.spinSpeed = Math.random() * 60 + 30;
        this.initialFlag = false;
    };
end
```

The ball's initial velocity and direction were placed at { x: 0, y: 0 }, so it would not move until the force of the player acted on it by means of the spacebar. Spin was achieved through this.spinSpeed, and this spin helped determine the ball's rotation:

```javascript
    rotate(deltaTime) {
        if (this.dir.y !== 0) {
            let angle = -this.spinSpeed * (Math.PI / 180) * deltaTime;
            let vector = [this.dir.x, this.dir.y];

            var cos = Math.cos(angle);
            var sin = Math.sin(angle);

            this.dir.x = Math.round(10000 * (vector[0] * cos - vector[1] * sin)) / 10000;
            this.dir.y = Math.round(10000 * (vector[0] * sin + vector[1] * cos)) / 10000;
        }
    }
```

Another interting element of the ball is that it moves with the player until the spacebar is pressed. This parallels that of Magic Ball, Break!'s predecessor. This functionality was achieved through the creation of an initial flag in the Ball's constructor, as well as key handling logic shown here:

```javascript
    handleBallRelease(input, key) {
        if (!this.initialFlag && key !== "space") {
            this.vel.x += input[0];
            this.vel.y += input[1];
        } else if (key === "space" && this.dir.x === 0 && this.dir.y === 0) {
            this.vel.x += input[0];
            this.vel.y += input[1];
            this.initialRotation();

        }
    };
```

The above conditionals ensure that one has no control of the ball (with the a and d keys) after the spacebar is pressed and the ball is released.

### Collision Logic
Multiple types of collisions were managed in this game. Paddle to wall, wall to ball, paddle to ball, and ball to block. For paddle to wall, the following code was used:
```javascript
    wallCollision() {
        this.vel.x = -this.vel.x;
        return true;
    };
```
Note the reversal of velocity on the x-axis on collision with the wall, preventing the paddle from going outside of the canvas. Collisions of all types were checked for with the following code in the main game class:

```javascript
    checkForWallCollisions() {
        const allMovingObj = this.allCurMovingObjs();
        for (let i = 0; i < allMovingObj.length; i++) {
            const obj = allMovingObj[i];
            if ((obj instanceof Player) && (obj.pos.x < 0 || obj.pos.x > (920 - obj.width))) {
                return obj.wallCollision();
            }
            if ((obj instanceof Ball) && (obj.pos.x < (0 + obj.radius) || obj.pos.x > (920 - obj.radius))) {
                this.playBounceSound();
                return obj.wallCollision();
            }
            if ((obj instanceof Ball) && (obj.pos.y < (0 + obj.radius) || obj.pos.y > (600 - obj.radius))) {
                this.playBounceSound();
                return obj.topWallCollision();
            }
        };
    };
```
Note how width and height are used to check for wall collisions for the rectangular objects, while radius is used for the circular objects.

Object-on object collisions were more complicated, checked for with this code:
```javascript
    isCollided(obj1, obj2) {
        let temp;
        if (obj1 instanceof Ball) {
            temp = obj1;
            obj1 = obj2;
            obj2 = temp;
        }
        let dx = Math.abs(obj2.pos.x - obj1.pos.x - obj1.width / 2);
        let dy = Math.abs(obj2.pos.y - obj1.pos.y - obj1.height / 2);
        if (dx > (obj1.width / 2 + obj2.radius)) {
            return false;
        };
        if (dy > (obj1.height / 2 + obj2.radius)) { 
            return false; 
        };
        if (dx <= (obj1.width / 2)) { 
            return true; 
        };
        if (dy <= (obj1.height / 2)) { 
            return true; 
        };
        let dX = dx - obj1.width / 2;
        let dY = dy - obj2.width / 2;
        return (dX * dX + dY * dY <= (obj2.radius * obj2.radius));
    };
```
The above algorithm uses an Axis-Aligned Bounding Box (AABB) to check for collisions between the ball and rectangular objects (blocks and the player). It also checks for corner collisions as well.

If a collision is detected, the following function determines ball behavior:
```javascript
    bounce() {
        if (this.dir.x !== 0 && this.dir.y !== 0) {
            this.dir.x = -this.dir.x;
            this.dir.y = -this.dir.y;
            this.vel.y = -this.vel.y;
        };
    };
```    
Upon collision, the ball reverses its x and y directions, as well as its y velocity.

## Future Directions
While I am quite proud of the app, there is much to do in order to make it even better:
* Implement powerups, like superballs, multiballs, and longer paddle to allow for more dynamic gameplay.
* Implement different types of blocks, including unbreakable and extra-strong ones.
