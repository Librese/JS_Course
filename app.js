/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, lastDice, goal;
//var test = [0,0];

init();

goal = document.getElementsByName('goal')[0].value;
goal = parseInt(goal);

//Before it became a function
/*
scores =  [0,0];
roundScore = 0;
activePlayer = 0;


//document.querySelector('#score-0').textContent = dice;

//This is a setter, because it sets a value.
//document.querySelector('#current-' + activePlayer).textContent = dice;
//HTML in the code has to be a String!!
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

//This is a getter, because it gets the value.
//var x = document.querySelector('#score-0').textContent;
//console.log (x);


*/

/*
function btn() {
    //Do something here
}
btn();

//the "btn" function is a "callback function" because it is called by another function (the Event Listener method), not by the user.
document.querySelector('.btn-roll').addEventListener('click', btn);
*/


//Annonymous function. It can be used only where defined, it can't be called by another function.
document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
                
    //1. Random number
    var dice = Math.floor(Math.random() * 6) + 1;
    //var dice = Math.floor(Math.random() * 2) + 5;
    
            
    //ARRAY FOR DOUBLE 6es    
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
        

    if (lastDice === 6 && dice === 6) {
        scores[activePlayer] = 0;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        nextPlayer();   
    } else {
        
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
        /* REPLACED ALL OF THIS WITH A NEW FUNCTION FOR DRY principle
        //Next player
        //For a simple IF statements use the TERNARY operator.
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        //Same as: 
        //if (activePlayer === 0) {
        //activePlayer = 1;
        // } else {
        // activePlayer = 0;
        // }
        roundScore = 0;
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';
        
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
        
        //Adding and removing HTML classes
        //document.querySelector('.player-0-panel').classList.remove('active');
        //document.querySelector('.player-1-panel').classList.add('active');
        
        document.querySelector('.dice').style.display = 'none';
        */
        
        }
    }
        //Add lastDice variable
        lastDice = dice;
        //console.log(lastDice);
                
        }
});
                                                    

        

document.querySelector('.btn-hold').addEventListener('click', function() {
    if(gamePlaying) {
        // Add CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore;
    //SAME AS: scores[activePlayer] = scores[activePlayer + roundScore];
    
    // Update the UI with new score 
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        
    // Check if the player won the game
    if (scores[activePlayer] >= goal) {
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




