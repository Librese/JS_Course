var scores, roundScore, activePlayer, gamePlaying, lastDice;
//var test = [0,0];

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
                
    //1. Random number
    var dice = Math.floor(Math.random() * 6) + 1;
    //var dice = Math.floor(Math.random() * 2) + 5;
    
    if (lastDice === 6 && dice === 6) {
        scores[activePlayer] = 0;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        nextPlayer();   
    } else {
        
          //ARRAY FOR DOUBLE 6es  (enable "var test" !)
/*
    for (var i = 0; i < 1; i++) {
        test.push(dice);
        test.shift();
        console.log(test);
        
        if (test[0] === 6 && test[1] === 6) {
            console.log('BINGO!');
        }
    }
*/
        
    //2. Display the result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';
    
            
    //3. Update the round score IF the rolled number was NOT 1
    // !== means different, and doesn't do type coercion. != does type coercion.
    if (dice !== 1) {
    
        //Add score
        roundScore += dice;
        //roundScore = roundScore + dice
        document.querySelector('#current-' + activePlayer).textContent = roundScore;

    } else {
        gamePlaying = false;
        setTimeout (function() {
            nextPlayer();
            gamePlaying = true;
        }
            ,500);
        
        }
    }
        
        //Add lastDice variable
        lastDice = dice;
        console.log(lastDice);
                
        }
});
                                                    

        

document.querySelector('.btn-hold').addEventListener('click', function() {
    if(gamePlaying) {
        // Add CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore;
        
    // Update the UI with new score 
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        
    // Check if the player won the game
    if (scores[activePlayer] >= 20) {
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        gamePlaying = false;
        } else {
            //Next player
            nextPlayer();
        }  
    }
          
    });

function nextPlayer() {
        //Next player  
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';
        
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        
        document.querySelector('.dice').style.display = 'none';
        lastDice = 0;
}

//New Game Button
document.querySelector('.btn-new').addEventListener('click', init);


function init() {
    scores =  [0, 0];
    roundScore = 0;
    activePlayer = 0;
    lastDice = 0;
    //State variable
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');    

}