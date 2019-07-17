# [Break](link not here right now)

## Background and Overview
As a child, I would spend hours playing a terminal gane called Magic Ball, where the objective was to clear the map of blocks with a ball and paddle. The motivation behind break is to remake a favorite childhood game in Javascript.

The objective of the game will be to use the ```a``` and ```d``` keys to move a paddle along the bottom of the board. The player would seek to catch the ball on the paddle and bounce it back to the blocks. A standard block will break if hit with the ball. If one clears the entire area, they win. A player has 3 lives and if they miss the ball, they lose a life. If ine loses 3 lives, the game ends and they have to restart. 

The game will have some additional functionality as well. Different color themes, as well as different sized blocks, which may take a different number of hits to kill.

## Functionality and MVP Features
### Board & Paddle:
* Render a canvas with a paddle on it that can move side-to side
* To do the above, a keymaster and canvas can be used
* The paddle can start as a simple rectangle, but I may use some png-images for aesthetics

### Blocks:
* Render blocks on the canvas, have them spawn in rows, and give them attributes, namely health and color
* Different health blocks will break at different times from a different amount of hits.
* Use canvas to render blocks

### Balls:
* Bridge the gap between balls and blocks. Basically be able to hit a ball, have the ball move, and then have the ball break blocks
* Add some rotation on the ball for aesthetics

### Advanced Gameplay
* With the game working fine, advanced gameplay can be added, like color-theme changing or difficulty, which will involve faster balls or stronger blocks for harder difficulties

### Styling:
* Add styling and user interface to make it look modern and aesthetic

## Technnology
* Javascipt/CSS: 
  ** Because the guidlines state that Javascript/CSS should be the language used
  
## Architecture
 * Classes:
  ** Paddle, ball, block
 * Methods overview:
  ** Detecting collisions, calculating positions and velocities, vectors, block health, gamer lives
 * Ui:
  ** Button that changes the game color theme
  ** Button that changes the difficulty (that is, increased ball speed, or perhaps stronger blocks)
 * General appearance:
  ** Bottom section of the screen will be the paddle, stuck in place vertically but can move horizontally, bricks in the top half, outside      the screen 
  
## Implementation Timeline
#### 7/17:
* Build out project framework
* Get the canvas rendering and the paddle moving
   
#### 7/18:
  * Get blocks created, start with a single type of block
  * Start on balls and mmoving objects
  
#### 7/19:
  * Finish balls, get the game playing
  * Begin ui styling
  * Push to Heroku
  
#### 7/20 - 7/21:
  * Continue styling
  * Implement more advanced gameplay modes
  * Debugging
  * Production readMe
  
#### 7/22:
* Submit project
