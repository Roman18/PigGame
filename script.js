'use strict';

// init variables and functions

const maxScore = 100;

const diceElem = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, activePlayer, currentScore;

const init = () => {

    currentScore = 0;
    scores = [0, 0]; // global scores of players, scores[0] - player1, scores[1] - player2
    activePlayer = 0;

    document.querySelectorAll(`.player`).forEach((item) =>{
        item.classList.remove('player--winner');
        item.classList.remove('player--active');
    });

    
    document.querySelector(`.player--${activePlayer}`).classList.add('player--active');

    document.querySelector(`#current--0`).textContent = 0;
    document.querySelector(`#current--1`).textContent = 0;
    document.querySelector(`#score--0`).textContent = 0;
    document.querySelector(`#score--1`).textContent = 0;

    diceElem.classList.add('hidden');
    btnRoll.disabled = false;
    btnHold.disabled = false;
};

const switchPlayer = () => {
        
        currentScore = 0;
        document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
        document.querySelectorAll('.player').forEach((item) => {
            item.classList.toggle('player--active');
        });
        // switch player
        activePlayer = activePlayer === 0 ? 1 : 0;
};

//

// *************** call an init func

init();

// *********************************

// create buttons listeners
btnRoll.addEventListener('click', () => {

    // get random dice surface
    const diceNumber = Math.floor(Math.random() * 6) + 1;

    // show dice
    diceElem.src = `dice/dice-${diceNumber}.png`;
    diceElem.classList.remove('hidden');

    if(diceNumber !== 1){
        currentScore += diceNumber;
        document.querySelector(`#current--${activePlayer}`).textContent = currentScore; 

    }else{ // if diceNumber equals 1 then current score will flush and player will be switched
        switchPlayer();
    }
    
});

btnHold.addEventListener('click', () => {

    // set a score
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer];

    if(scores[activePlayer] >= maxScore){ //finish 
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        btnRoll.disabled = true;
        btnHold.disabled = true;
    }else{
        switchPlayer();
    }

});

btnNew.addEventListener('click', init);

//