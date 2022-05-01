let SCORE_ARR = [];
let GAMEBOARD;
let ROUND_COUNTER = 5;
let TO_FAST_CLICK_COUNTER = 0;
let START_TIME;
let GAME_ACTIVE = false;

document.addEventListener('DOMContentLoaded', function() {
    GAMEBOARD = document.getElementById('gameboard');

    printBestScore();
    showMenu();
    deactiveGameBoard();

    document.getElementById('start-btn').addEventListener('click', function () {

        let readedValue = document.getElementById('rounds-number').value;

        if (readedValue == "" || readedValue < 1) {
            document.getElementById("error").innerText = 'Wrong rounds number!';
        } else {
            ROUND_COUNTER = parseInt(readedValue);
            start();
        }

    });

    document.getElementById('stop-btn').addEventListener('click', function () {
        stop()
    });

    document.getElementById('play-again').addEventListener('click', function () {
        showMenu();
    });

    GAMEBOARD.addEventListener('click', function() {

        if (GAME_ACTIVE === true) {
            const timestamp = new Date().getTime();
            let score = timestamp - START_TIME;

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

});

function start() {
    SCORE_ARR = [];
    clearActuallScore();
    showGameBoard();

    GAMEBOARD.setAttribute('style', 'background-color:blue');
    nextRound();

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
    document.querySelector("#gameboard > h1").innerText = "WAIT...";
    GAME_ACTIVE = false;
}

function activeGameBoard() {
    GAMEBOARD.setAttribute('style', 'background-color:red');
    document.querySelector("#gameboard > h1").innerText = "CLICK ME!";
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
    
    document.getElementById('score-fastest').innerText = "Fastest time: " + Math.min.apply(Math, SCORE_ARR) + " milliseconds";
    document.getElementById('score-average').innerText = "Average time: " + Math.round(SCORE_ARR.reduce((v1, v2) => v1 + v2)/SCORE_ARR.length) + " milliseconds";
    document.getElementById('score-slowest').innerText = "Slowest time: " + Math.max.apply(Math, SCORE_ARR) + " milliseconds";
};

function clearActuallScore() {
    document.getElementById('score-arr').innerText = '';
    document.getElementById('score-fastest').innerText = '';
    document.getElementById('score-average').innerText = '';
    document.getElementById('score-slowest').innerText = '';
}

function stop() {

    document.getElementById('score-arr').innerText = 'Your results: ';
    for (let i = 0; i < SCORE_ARR.length; i++) {
        document.getElementById('score-arr').innerText += ' ' + SCORE_ARR[i];
    }

    if (TO_FAST_CLICK_COUNTER > 0) {
        document.getElementById('to-fast').innerText = "You clicked too fast " + TO_FAST_CLICK_COUNTER + " times!";
    }
    showStats();
};

function showMenu(){
    document.getElementById('menu').style.display = 'flex';
    document.getElementById('game-interface').style.display = 'none';
    document.getElementById('game-over').style.display = 'none';

    document.getElementById('score').style.display = 'none';

    document.getElementById('rounds-number').value = "";
    document.getElementById('error').innerText = "";
}

function showGameBoard() {
    document.getElementById('menu').style.display = 'none';
    document.getElementById('game-interface').style.display = 'flex';
    document.getElementById('game-over').style.display = 'none';
    document.getElementById('score').style.display = 'flex';

}

function showStats() {
    document.getElementById('menu').style.display = 'none';
    document.getElementById('game-interface').style.display = 'none';
    document.getElementById('game-over').style.display = 'flex';
}