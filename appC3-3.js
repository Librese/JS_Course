var scores, roundScore, activePlayer, gamePlaying, lastDice, final;

init();


document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
                
    //1. Random number
    var dice = Math.floor(Math.random() * 6) + 1;
    var dice1 = Math.floor(Math.random() * 6) + 1;

     /*
    if (lastDice === 6 && dice === 6) {
        scores[activePlayer] = 0;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        nextPlayer();   
    } else {
    */
        
    //2. Display the result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';
    
    var dice1DOM = document.querySelector('.dice1');
    dice1DOM.style.display = 'block';
    dice1DOM.src = 'dice-' + dice1 + '.png';
            
    //3. Update the round score IF the rolled number was NOT 1
    // !== means different, and doesn't do type coercion. != does type coercion.
    if (dice !== 1 && dice1 !==1) {
        //Add score
        roundScore = roundScore + dice + dice1;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;

    } else {
        gamePlaying = false;
        setTimeout (function() {
            nextPlayer();
            gamePlaying = true;
        }
            ,500);
          }
        /*
    }
        
        //Add lastDice variable
        lastDice = dice;
        //console.log(lastDice);
          */      
        }
});
                                                    
        

document.querySelector('.btn-hold').addEventListener('click', function() {
    if(gamePlaying) {
        // Add CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore;
    //SAME AS: scores[activePlayer] = scores[activePlayer + roundScore];
    
    // Update the UI with new score 
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    
    final = parseInt(document.querySelector('.final').value, 10);
    //final = parseInt(final);
    var finalScore;
        
    //Check if Final Score has been entered (not null, "", 0 or valid format)
    if (final) {
        finalScore = final;
        console.log(final);
    } else {
        finalScore = 100;
    }
        
    // Check if the player won the game
    if (scores[activePlayer] >= finalScore) {
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.dice1').style.display = 'none';
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
        document.querySelector('.dice1').style.display = 'none';
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
    document.querySelector('.dice1').style.display = 'none';
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

