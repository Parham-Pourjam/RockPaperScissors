        let playerWins = 0;
        let computerWins = 0;
        let ties = 0;
        let numberOfRounds = 0;

        // select the .winnerOfRound class so we can manipulate it later
        const winnerOfRound = document.querySelector('.winnerOfRound');
        const result = document.querySelector('.result');
        
        function computerPlay() {
            let choices = ["Rock", "Paper", "Scissors"];

            return choices[Math.floor(Math.random() * 3)].toLowerCase();
        }

        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        function whoWon() {
            // Check how many rounds each player won
            if (playerWins > computerWins) {
                result.textContent = `You win the game! You won ${playerWins}/5 rounds. Computer won ${computerWins}/5 rounds. ${ties}/5 rounds were tied.`; 
            }
            else if (computerWins > playerWins) {
                result.textContent = `You lose the game. You won ${playerWins}/5 rounds. Computer won ${computerWins}/5 rounds. ${ties}/5 rounds were tied.`;
            }
            else {
                result.textContent = `It's a tie. You won ${playerWins}/5 rounds. Computer won ${computerWins}/5 rounds. ${ties}/5 rounds were tied.`;
            }
        }

        // compare player and computer selections, then update DOM
        function playRound(playerLowerSelect, computerLowerSelect) {
                
            // Player win
            if (playerLowerSelect === "paper" && computerLowerSelect === "rock" || playerLowerSelect === "scissors" && computerLowerSelect === "paper" 
                    || playerLowerSelect === "rock" && computerLowerSelect === "scissors") {
                
                // update winnerOfRoundboard to reflect win
                winnerOfRound.textContent = `You win the round! ${capitalizeFirstLetter(playerLowerSelect)} beats ${capitalizeFirstLetter(computerLowerSelect)}.`;
            
                return `You win the round! ${capitalizeFirstLetter(playerLowerSelect)} beats ${capitalizeFirstLetter(computerLowerSelect)}.`;
            } 
            // Player loss
            else if (computerLowerSelect === 'scissors' && playerLowerSelect === 'paper' || computerLowerSelect === 'rock' && playerLowerSelect === 'scissors' 
                        || computerLowerSelect === 'paper' && playerLowerSelect === 'rock') {
                
                winnerOfRound.textContent = `You lose the round. ${capitalizeFirstLetter(playerLowerSelect)} loses to ${capitalizeFirstLetter(computerLowerSelect)}.`;
                
                return `You lose the round. ${capitalizeFirstLetter(playerLowerSelect)} loses to ${capitalizeFirstLetter(computerLowerSelect)}.`;
            } 
            // Draw
            else {
                winnerOfRound.textContent = "It's a draw...";

                return "It's a draw...";
            }
        }

        function updateScoreboard() {
            const playerScore = document.querySelector('#playerScore');
            const computerScore = document.querySelector('#computerScore');
            const tieScore = document.querySelector('#tieScore');
            const scoreBoard = document.querySelector('.scoreboard');
            scoreBoard.style.borderStyle = 'solid';
            
            playerScore.textContent = `Player Wins: ${playerWins}`;
            computerScore.textContent = `Computer Wins: ${computerWins}`;
            tieScore.textContent = `Ties: ${ties}`;

            // empty text content of result and winner if numberOfRounds is 0 (after a restart)
            if (numberOfRounds === 0) {
                winnerOfRound.textContent = "";
                result.textContent = "";
            }
        }

        
        // Function which plays through five rounds and declares winner at the end (best out of 5)
        function game() {
            // Convert strings to lower case in order to make it case insensitive
            let playerLowerSelect = this.id;
            let computerLowerSelect = computerPlay().toLowerCase();
                
            if (numberOfRounds < 5) {
                // store return value from playRound in variable so we can use it to determine who won
                let round = playRound(playerLowerSelect, computerLowerSelect);
                console.log(round);
            
                // Update # of wins based on what the returned string from playRound() contains
                if (round.includes("win")) {
                    playerWins += 1;
                 }
                else if (round.includes("lose")) {
                    computerWins += 1;
                }
                else {
                    ties += 1;
                }
                
                numberOfRounds += 1;
                
                // update scoreboard after every round
                updateScoreboard();


                // declare winner if five rounds have been played
                if (numberOfRounds == 5) {
                    whoWon();
                }
            }
        }
        
        // add event listener to the game keys/buttons, and call game function everytime one of them is clicked on    
        const buttons = document.querySelectorAll('.key');
        console.log(buttons);
        buttons.forEach(key => key.addEventListener('click', game));

        // event listener for restart button
        const restartButton = document.querySelector('.restartButton');
        
        restartButton.addEventListener('click', restartGame);


        function restartGame() {
            playerWins = 0;
            computerWins = 0;
            ties = 0;
            numberOfRounds = 0;

            updateScoreboard();
        }

        
    
