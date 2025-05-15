let number = 25 * 60; // number of seconds
const pomodoro = document.querySelector('#pomodoro');
const shortBreak = document.querySelector('#shortBreak');
const longBreak = document.querySelector('#longBreak');
const adjustButton = document.querySelector('#adjust');
const resetButton = document.querySelector('#resetButton'); // to add functionality
const clock = document.querySelector('#clock'); // clock div to display time on
const startButton = document.querySelector('#startButton');
const pauseButton = document.querySelector('#pauseButton');
let startTime = number; // Store the start time
let intervalID = null;
let isPaused = false;

        
adjustButton.addEventListener('click', () => {
    stopTimer();
    let user_number = prompt('Enter the number of minutes:');
    number = user_number * 60; // convert minutes to seconds
    clock.textContent = formatTime(user_number, 0);
    startTime = number; // Store the start time
});

pomodoro.addEventListener('click', () => {
    stopTimer();
    number = 25 * 60;
    clock.textContent = formatTime(25, 0); // set the clock to 25 minutes
    startTime = number; // Store the start time   
});

shortBreak.addEventListener('click', () => {
    stopTimer();
    number = 5 * 60; // set the clock to 5 minutes
    clock.textContent = formatTime(5, 0);
    startTime = number; // Store the start time
});

longBreak.addEventListener('click', () => {
    stopTimer();
    number = 10 * 60; // set the clock to 10 minutes
    clock.textContent = formatTime(10, 0);
    startTime = number; // Store the start time
});


resetButton.addEventListener('click', () => {
    stopTimer();
    number = startTime; // reset to the last entered time
    const minutes = Math.floor(number / 60);
    clock.textContent = formatTime(minutes, 0); 
});


function updateNumber() {
    if (number === 0) {
        clearInterval(intervalID);
        clock.textContent = '00:00';
        document.querySelector('#alarmSound').play(); // play alarm sound 
        return;
    }

    // Decrement the number of seconds and update the clock
    number--;
    const minutes = Math.floor(number / 60);
    const seconds = number % 60;
    clock.textContent = formatTime(minutes, seconds);
}

function stopTimer() {
    clearInterval(intervalID);
    intervalID = null; // clear the interval ensure no timer is running after
}

function formatTime(minutes, seconds) {
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

startButton.addEventListener('click', () => {
    // ensure start button doesn't run multiple times
    if (!intervalID) {
        intervalID = setInterval(updateNumber, 1000);
    }
});

pauseButton.addEventListener('click', () => {
    if (isPaused) {
        intervalID = setInterval(updateNumber, 1000);
        isPaused = false;
    }
    else {
        clearInterval(intervalID);
        isPaused = true;
    }
});

// setting constant time for pomodoro, short break and long break
// automatically switch on while loop in start button


// how to change style with javascript