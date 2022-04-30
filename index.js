const SCORE_ARR = [];
let GAMEBOARD;
let ROUND_COUNTER = 5;
let TO_FAST_CLICK_COUNTER = 0;
let START_TIME;
let GAME_ACTIVE = false;

document.addEventListener('DOMContentLoaded', function() {
    GAMEBOARD = document.getElementById('gameboard');

    printBestScore();
    showMenu();

    document.getElementById('start-btn').addEventListener('click', function () {
        start()
    });

    document.getElementById('stop-btn').addEventListener('click', function () {
        stop()
    });

});

function start() {
    showGameBoard();

    GAMEBOARD.setAttribute('style', 'background-color:blue');
    nextRound();

    GAMEBOARD.addEventListener('click', function() {

        if (GAME_ACTIVE === true) {
            const timestamp = new Date().getTime();
            let score = timestamp- START_TIME;

            updateScore(score);

            printActuallScore();

            deactiveGameBoard();

            ROUND_COUNTER--;
            

            if (ROUND_COUNTER> 0) {
                nextRound();
            } else {
                stop();
            }

        } else {
            TO_FAST_CLICK_COUNTER++;
        }


    })
};

function updateScore(score){
    SCORE_ARR.push(score)

    if (localStorage.getItem('best') > score) {
        localStorage.setItem('best', score);
        printBestScore();
    }

}

function deactiveGameBoard() {
    GAMEBOARD.setAttribute('style', 'background-color:blue');
    GAME_ACTIVE = false;
}

function activeGameBoard() {
    GAMEBOARD.setAttribute('style', 'background-color:red');
    START_TIME = new Date().getTime();
    GAME_ACTIVE = true;
};

function nextRound() {
    const timeInterval = Math.random() * 10000;
    console.log('interval:' + timeInterval);
    setTimeout(() => activeGameBoard(), timeInterval);
};

function printBestScore() {
    if (localStorage.getItem('best') === null) {
        bestScore = 0;
    } else {
        bestScore = localStorage.getItem('best');
    }

    document.getElementById('score-best').innerText = 'Best score ever: ' + bestScore;
}

function printActuallScore() {


    document.getElementById('score-arr').innerText = '';
    for (let i = 0; i < SCORE_ARR.length; i++) {
        document.getElementById('score-arr').innerText += ' ' + SCORE_ARR[i];
    }
    
    document.getElementById('score-fastest').innerText = "Fastest: " + Math.min.apply(Math, SCORE_ARR);
    document.getElementById('score-average').innerText = "Average: " + SCORE_ARR.reduce((v1, v2) => v1 + v2)/SCORE_ARR.length;
    document.getElementById('score-slowest').innerText = "slowest: " + Math.max.apply(Math, SCORE_ARR);


};


function stop() {
    alert('You have clidked to fast ' + TO_FAST_CLICK_COUNTER + ' times');
    showStats();
};

function showMenu(){
    document.getElementById('menu').style.display = 'block';
    document.getElementById('game-interface').style.display = 'none';
    document.getElementById('game-over').style.display = 'none';
}

function showGameBoard() {
    document.getElementById('menu').style.display = 'none';
    document.getElementById('game-interface').style.display = 'block';
    document.getElementById('game-over').style.display = 'none';

}

function showStats() {
    document.getElementById('menu').style.display = 'none';
    document.getElementById('game-interface').style.display = 'none';
    document.getElementById('game-over').style.display = 'block';
}