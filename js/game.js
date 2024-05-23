class Game {
  constructor() {
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.gameEndScreen = document.getElementById("game-end");
    this.gameContainer = document.getElementById("game-container");
    this.player = new Player(
      this.gameScreen,
      300,
      394,
      100,
      150,
      "./images/dragon.png"
    );
    this.height = 500;
    this.width = 700;
    this.obstacles = [];
    this.sphere = [];
    this.score = 0;
    this.lives = 3;
    this.gameIsOver = false;
    this.gameIntervalId;
    this.gameLoopFrequency = Math.round(1000 / 60); // 60fps
  }

  start() {
    // Set the height and width of the game screen
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;
    //Add
    this.resetGameLoop(this.gameLoopFrequency);

    // Hide the start screen
    this.startScreen.style.display = "none";

    // Show the game screen
    this.gameScreen.style.display = "flex";
    this.gameContainer.style.display = "flex";

    // Runs the gameLoop on a fequency of 60 times per second. Also stores the ID of the interval.
    this.gameIntervalId = setInterval(() => {
      this.gameLoop()
    }, this.gameLoopFrequency)
  }
  //add
  resetGameLoop(newFrequency) {
    clearInterval(this.gameIntervalId); // Clear the existing interval
    this.gameLoopFrequency = newFrequency; // Update frequency based on score
    this.gameIntervalId = setInterval(() => {
      this.gameLoop();
    }, this.gameLoopFrequency);
  }

  gameLoop() {
    //check

    this.update();

    if (this.gameIsOver) {
      clearInterval(this.gameIntervalId)
    }
  }
  updateLives() {
    document.getElementById('lives').textContent = this.lives;
  }
  updateScore() {
    document.getElementById('score').textContent = this.score;
    document.getElementById('final-score').textContent = this.score + " points";
  }

  endGame() {
    this.player.element.remove(); 
    this.obstacles.forEach(obstacle => obstacle.element.remove()); 

    this.gameIsOver = true; 

    // Hide game screen
    this.gameScreen.style.display = "none";
    this.gameContainer.style.display = "none";
    // Show end game screen
    this.gameEndScreen.style.display = "flex";
    
  }

  update() { // responsible for the updates of all the elements of the game
    //   console.log("in the update");
    this.updateScore()
    this.updateLives()
    this.player.move(); // get most recent player position

    for (let i = 0; i < this.obstacles.length; i++) {
      const obstacle = this.obstacles[i];
      obstacle.move();

      if (this.player.didCollide(obstacle)) {
        obstacle.element.remove();
        this.obstacles.splice(i, 1);
        this.lives--;
        i--;
      }
      else if (obstacle.top > this.height) {
        obstacle.element.remove();
        this.obstacles.splice(i, 1);
        i--;
      }
    }

     if (this.score > 5 && this.score <= 10) {
        this.resetGameLoop(Math.round(1000 / 100)); 
        console.log("Level up 1");
      } else if (this.score > 10 && this.score <= 15) {
        this.resetGameLoop(Math.round(1000 / 120)); 
        console.log("Level up 2");
      } else if (this.score > 15 && this.score <= 20) {
        this.resetGameLoop(Math.round(1000 / 140));
        console.log("Level up 3"); 
      } else if (this.score > 20 && this.score <= 25) {
        this.resetGameLoop(Math.round(1000 / 160));
        console.log("Level up 4"); 
      } else if (this.score > 25) {
        this.resetGameLoop(Math.round(1000 / 200)); 
        console.log("Level up 5");
      }


    for (let i = 0; i < this.sphere.length; i++) {
      const sphere = this.sphere[i];
      sphere.move();

      if (this.player.didCollect(sphere)) {
        sphere.element.remove();
        this.sphere.splice(i, 1);
        this.score++;
        i--;
      }
      else if (sphere.top > this.height) {

        sphere.element.remove();
        // Remove obstacle object from the array
        this.sphere.splice(i, 1);
        // Update the counter variable to account for the removed obstacle
        i--;
      }

    }

    if (Math.random() > 0.98 && this.obstacles.length < 1) {
      this.obstacles.push(new Obstacle(this.gameScreen));  // generate the obstacles
    }

    if (Math.random() > 0.98 && this.sphere.length < 1) {
      this.sphere.push(new Sphere(this.gameScreen));  // generate the spheres
    }

    if (this.lives === 0) {
      this.endGame();
    }
      
  }
  }

class Player {
  constructor(gameScreen, left, top, width, height, imgSrc) {
    this.gameScreen = gameScreen;
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
    this.directionX = 0;
    this.directionY = 0;
    this.element = document.createElement("img");

    this.element.src = imgSrc;
    this.element.style.position = "absolute";
    // Set up the default element's property values
    this.element.style.width = `${width}px`;
    this.element.style.height = `${height}px`;
    this.element.style.left = `${left}px`;
    this.element.style.top = `${top}px`;

    this.gameScreen.appendChild(this.element);
  }

  move() {
    // Update player's car position based on directionX and directionY
    this.left += this.directionX;
    this.top += this.directionY;

    // Ensure the player's car stays within the game screen
    // handles left hand side
    if (this.left < 10) {
      this.left = 10;
    }

    // handles top side
    if (this.top < 10) {
      this.top = 10;
    }

    // handles right hand side
    if (this.left > this.gameScreen.offsetWidth - this.width - 10) {
      this.left = this.gameScreen.offsetWidth - this.width - 10;
    }

    // handles bottom side
    if (this.top > this.gameScreen.offsetHeight - this.height - 10) {
      this.top = this.gameScreen.offsetHeight - this.height - 10;
    }

    // Update the player's car position on the screen
    this.updatePosition();
  }

  updatePosition() {
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }

  didCollide(obstacle) { // check if there's a collision between a player and an obstacle
    const playerRect = this.element.getBoundingClientRect(); // --> {x, y, width, height, top, right, left, bottom}
    const obstacleRect = obstacle.element.getBoundingClientRect(); // --> {x, y, width, height, top, right, left, bottom}

    if (
      playerRect.left < obstacleRect.right &&
      playerRect.right > obstacleRect.left &&
      playerRect.top < obstacleRect.bottom &&
      playerRect.bottom > obstacleRect.top
    ) { // if all these are true --> collision happened
      return true;
    } else {
      return false;
    }
  }

  didCollect(sphere) { // check if there's a collision between a player and an obstacle
    const playerRect = this.element.getBoundingClientRect(); // --> {x, y, width, height, top, right, left, bottom}
    const sphereRect = sphere.element.getBoundingClientRect(); // --> {x, y, width, height, top, right, left, bottom}

    if (
      playerRect.left < sphereRect.right &&
      playerRect.right > sphereRect.left &&
      playerRect.top < sphereRect.bottom &&
      playerRect.bottom > sphereRect.top
    ) { // if all these are true --> collision happened
      return true;
    } else {
      return false;
    }
  }
}

class Obstacle {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;
    this.left = Math.floor(Math.random() * 520 + 70);
    this.top = 0;
    this.width = 100;
    this.height = 120;
    this.element = document.createElement("img");

    this.selectImage(Math.floor(Math.random() * 4))

    this.element.style.position = "absolute";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;

    this.gameScreen.appendChild(this.element);
  }

  selectImage(index) {
    switch (index) {
      case 0:
        this.element.src = "./images/fire.png"
        break;
      case 1:
        this.element.src = "./images/water.png"
        break;
      case 2:
        this.element.src = "./images/earth.png"
        break;
      case 3:
        this.element.src = "./images/air.png"
        break;
      default:
        break;
    }
  }

  updatePosition() {
    // Update the obstacle's position based on the properties left and top
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }

  move() {
    // Move the obstacle down by 3px
    this.top += 3;
    // Update the obstacle's position on the screen
    this.updatePosition();
  }
}

class Sphere {
  constructor(gameScreen) {
    this.gameScreen = gameScreen;
    this.left = Math.floor(Math.random() * 520 + 70);
    this.top = 0;
    this.width = 100;
    this.height = 120;
    this.element = document.createElement("img");

    this.element.src = "./images/long.png";
    this.element.style.position = "absolute";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;

    this.gameScreen.appendChild(this.element);
  }

  updatePosition() {
    // Update the obstacle's position based on the properties left and top
    this.element.style.left = `${this.left}px`;
    this.element.style.top = `${this.top}px`;
  }

  move() {
    // Move the obstacle down by 3px
    this.top += 3;
    // Update the obstacle's position on the screen
    this.updatePosition();
  }
}


