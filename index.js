const scoreArr = [];
let counter = 5;
let startTime;
let active = false;

document.addEventListener('DOMContentLoaded', function() {

    const gameboard = document.getElementById('gameboard');

    document.getElementById('start-btn').addEventListener('click', function () {
        start()
    });

    document.getElementById('stop-btn').addEventListener('click', function () {
        stop()
    });

});

function start() {

    gameboard.setAttribute('style', 'background-color:blue');
    nextRound();

    gameboard.addEventListener('click', function() {

        if (active === true) {
            let time = new Date();
            const timestampInMilliseconds = time.getTime();
            gameboard.setAttribute('style', 'background-color:blue');
            active = false;
            scoreArr.push(timestampInMilliseconds - startTime)

            counter--;
            printScore();

            if (counter > 0) {
                nextRound();
            } else {
                alert('win');
                //hide elements
            }

        } else {
            console.log('to fast!')
        }


    })
};

function activeGameBoard() {
    gameboard.setAttribute('style', 'background-color:red');
    startTime = new Date().getTime();
    active = true
};

function nextRound() {
    const timeInterval = Math.random() * 10000;
    console.log('interval:' + timeInterval);
    setTimeout(() => activeGameBoard(), timeInterval);
};


function printScore() {

    document.getElementById('score-arr').innerText = '';
    for (let i = 0; i < scoreArr.length; i++) {
        document.getElementById('score-arr').innerText += ' ' + scoreArr[i];
    }

    document.getElementById('score-fastest').innerText = "Fastest: " + Math.min.apply(Math, scoreArr);
    document.getElementById('score-average').innerText = "Average: " + scoreArr.reduce((v1, v2) => v1 + v2)/scoreArr.length;
    document.getElementById('score-slowest').innerText = "slowest: " + Math.max.apply(Math, scoreArr);

};



function stop() {
    alert('stop');
};