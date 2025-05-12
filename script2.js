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
            clock.textContent = formatTime(user_number, 0);
        });

        pomodoro.addEventListener('click', () => {
            stopTimer();
            clock.textContent = "25:00";
        });

        shortBreak.addEventListener('click', () => {
            stopTimer();
            clock.textContent = "05:00";
        });

        longBreak.addEventListener('click', () => {
            stopTimer();
            clock.textContent = "10:00";
        });


        resetButton.addEventListener('click', () => {
            stopTimer();
            clock.textContent = formatTime(startTime, 0); // reset to the last entered time
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
            // ensure start button doesn't run multiple times
            if (!intervalID) {
                // this line of code is I aksed for copilot
                const timeString = clock.textContent; // Example innerHTML or textContent
                const minutes = parseInt(timeString.split(':')[0], 10); // Extracts the number before the colon
                startTime = minutes; // Store the start time
                number = minutes * 60; // Converts to seconds
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


