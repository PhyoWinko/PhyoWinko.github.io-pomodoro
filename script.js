let number; // number of seconds
        const pomodoro = document.querySelector('#pomodoro');
        const shortBreak = document.querySelector('#shortBreak');
        const longBreak = document.querySelector('#longBreak');
        const adjustButton = document.querySelector('#adjust');
        const resetButton = document.querySelector('#resetButton'); // to add functionality
        const clock = document.querySelector('#clock'); // clock div to display time on
        const startButton = document.querySelector('#startButton');
        const pauseButton = document.querySelector('#pauseButton');
        let startTime;
        let intervalID = null;
        let isPaused = false;

        adjustButton.addEventListener('click', () => {
            let user_number = prompt('Enter the number of minutes:');
            number = user_number * 60;
            startTime = number;
            clock.textContent = formatTime(user_number, 0);
            
        });

        pomodoro.addEventListener('click', () => {
            number = 25 * 60; // 25 minutes in seconds
            startTime = number;
            clearInterval(intervalID); // clear running interval
            clock.textContent = formatTime(25, 0);
        });

        shortBreak.addEventListener('click', () => {
            number = 5 * 60; // 5 minutes in seconds
            startTime = number;
            clearInterval(intervalID); // clear running interval
            clock.textContent = formatTime(5, 0);
        });

        longBreak.addEventListener('click', () => {
            number = 10 * 60; // 10 minutes in seconds
            startTime = number;
            clearInterval(intervalID); // clear running interval
            clock.textContent = formatTime(10, 0);
        });

        // Need to fix reset functionality
        resetButton.addEventListener('click', () => {
            stopTimer();
            number = startTime;
            let minutes = startTime / 60;
            clock.textContent = formatTime(minutes, 0); // reset to the last entered time

        });

        function updateNumber() {
            if (number <= 0) {
                clearInterval(intervalID);
                clock.textContent = '00:00';
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
            // that is not the best logic, need to fix
            if (clock.textContent == '25:00') {
                number = 25 * 60;
                startTime = number;
            }

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

// for second version for better code
// pomodoro, short break, long break set the time to display on timer 
// start button extract value from the clock timer dispalying

