# Dragonball-Game

## open the game here: https://ameliebrix.github.io/Dragonball-Game/


# Description
This game is a playful way to get to know the Chinese culture, specifically several Chinese characters relating to the Chinese Zodiac: Because 2024 is the year of the dragon. 

The game allows the player to guide the dragon through the new year by helping him collect the dragon spheres; dragon spheres are emblazoned with the Chinese character for "dragon", (lóng) "龙". They give the dragon strength to survive the year.

But be aware of the elements! Avoid the earth element: 土, the water element: 水, the fire element: 火, and the air element: 气 .

# Dragon/Player
- Player moves when pressing the corrosponding arrow keys.
- The Dragon has a total of three lives.
- Dragon spheres (with the character 龙) appear at the top of the screen from random locations and random frequencies.
- Dragon Spheres increase the score by 1.
- Elemental spheres (4 different types) also appear at the top of the screen from random locations and random frequencies.
- They reduce the dragons life by 1
- The game ends when the total lives is equal to 0


# Backlog
- Increasing the speed of the game based on the score of the dragon/player
- Making the game

# Technologies Used
- HTML
- CSS
- JavaScript
- DOM Manipulation
- JS Classes


# States
- Start Screen
- Game Screen
- Game Over Screen


# Project Structure
## script.js
- handleKeydown()
- handleKeyUp()
- startGame()
- startButton.addEventListener()
- restartButton.addEventListener()


## game.js

### game ()
- this.startScreen
- this.gameScreen
- this.gameEndScreen
- this.gameContainer
- this.player
- this.height
- this.width
- this.obstacles
- this.sphere
- this.score
- this.lives
- this.gameIsOver
- this.gameIntervalId
- this.gameLoopFrequency

- start ()
- resetGameLoop()
- gameLoop()
- updateLives()
- updateScore()
- endGame()
- update()

### player ()

- this.gameScreen
- this.left
- this.top 
- this.width
- this.height
- this.directionX
- this.directionY
- this.element

- move()
- updatePosition() 
- didCollide(obstacle)
- didCollect(sphere)


### Obstacle ()
- this.gameScreen
- this.left
- this.top 
- this.width 
- this.height
- this.element

- selectImage()
- updatePosition()
- move()

### Sphere ()
- this.gameScreen
- this.left
- this.top 
- this.width 
- this.height
- this.element

- updatePosition()
- move()

## Links

- link to the game: https://ameliebrix.github.io/Dragonball-Game/ 
- link to the presentation: https://docs.google.com/presentation/d/1cNHpMP8_QBmGNKjnE_sN64gKa3pFXxqYc39rsGckWl0/edit?usp=sharing
- link to the github repo: https://github.com/AmelieBrix/Dragonball-Game

