
window.onload = function () {
    const startButton = document.getElementById("start-button");
    const restartButton = document.getElementById("restart-button");
    let game; // added undefined --> Game {}
  
    // Function that handles keydown event
    function handleKeydown(event) {
      const key = event.key;
      console.log('key', key)
      const possibleKeystrokes = [
        "ArrowLeft",
        "ArrowUp",
        "ArrowRight",
        "ArrowDown",
      ];
  
      // Check if the pressed key is in the possibleKeystrokes array
      if (possibleKeystrokes.includes(key)) {
        event.preventDefault();
  
        // Update player's directionX and directionY based on the key pressed
        switch (key) {
          case "ArrowLeft":
            game.player.directionX = -4;
            break;
          case "ArrowUp":
            game.player.directionY = -4;
            break;
          case "ArrowRight":
            game.player.directionX = 4;
            break;
          case "ArrowDown":
            game.player.directionY = 4;
            break;
        }
      }
    }

    function handleKeyup(event) {
      const key = event.key;
      console.log('key', key)
      const possibleKeystrokes = [
        "ArrowLeft",
        "ArrowUp",
        "ArrowRight",
        "ArrowDown",
      ];
  
      // Check if the pressed key is in the possibleKeystrokes array
      if (possibleKeystrokes.includes(key)) {
        event.preventDefault();
  
        // Update player's directionX and directionY based on the key pressed
        switch (key) {
          case "ArrowLeft":
            game.player.directionX = 0;
            break;
          case "ArrowUp":
            game.player.directionY = 0;
            break;
          case "ArrowRight":
            game.player.directionX = 0;
            break;
          case "ArrowDown":
            game.player.directionY = 0;
            break;
        }
      }
    }
  
    function startGame() {
      // console.log("start game");
      game = new Game(); // added
      game.start(); // added
    }
     // The function that reloads the page to start a new game
     function restartGame() {
      location.reload();
    }
  
    // Add the handleKeydown function as an event listener for the keydown event
    window.addEventListener("keydown", handleKeydown);
    window.addEventListener("keyup", handleKeyup);

  
    startButton.addEventListener("click", function () {
      startGame();
    });
  
    restartButton.addEventListener("click", function () {
      // Call the restartGame function when the button is clicked
      restartGame();
    });
  
   
  };