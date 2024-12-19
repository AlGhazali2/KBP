// Variables
let workTittle = document.getElementById('work');
let breakTittle = document.getElementById('break');

let workTime = 25; // Default time
let breakTime = 5; // Default break time

let seconds = "00";
let timerInterval = null; // Variable to hold the interval reference

// Display initial time
window.onload = () => {
    document.getElementById('minutes').innerHTML = workTime;
    document.getElementById('seconds').innerHTML = seconds;
    workTittle.classList.add('active');
};

// Start timer function
function start() {
    // Get time from input
    workTime = document.getElementById('pomodoro-time').value || 25;

    // change button visibility
    document.getElementById('start').style.display = "none";
    document.getElementById('reset').style.display = "block";

    // Reset seconds
    seconds = 59;

    let workMinutes = workTime - 1;
    let breakMinutes = breakTime - 1;

    let breakCount = 0;

    // Countdown timer function
    let timerFunction = () => {
        // Update display
        document.getElementById('minutes').innerHTML = workMinutes;
        document.getElementById('seconds').innerHTML = seconds;

        // Start countdown
        seconds = seconds - 1;

        if (seconds === -1) {
            workMinutes = workMinutes - 1;
            if (workMinutes === -1) {
                if (breakCount % 2 === 0) {
                    // Start break
                    workMinutes = breakMinutes;
                    breakCount++;

                    // Change the panel
                    workTittle.classList.remove('active');
                    breakTittle.classList.add('active');
                } else {
                    // Continue work
                    workMinutes = workTime;
                    breakCount++;

                    // Change the panel
                    breakTittle.classList.remove('active');
                    workTittle.classList.add('active');
                }
            }
            seconds = 59;
        }
    };

    // Start countdown
    timerInterval = setInterval(timerFunction, 1000); // 1000 = 1s
}

// Reset timer function
function reset() {
    // Clear interval to stop the timer
    clearInterval(timerInterval);
    timerInterval = null;

    // Reset time to default values
    seconds = "00";
    document.getElementById('minutes').innerHTML = workTime;
    document.getElementById('seconds').innerHTML = seconds;

    // Reset UI
    document.getElementById('start').style.display = "block";
    document.getElementById('reset').style.display = "none";

    // Reset active states
    workTittle.classList.add('active');
    breakTittle.classList.remove('active');
}

// TO-DO LIST

window.addEventListener('load', () => {
    const form = document.querySelector("#new-task-form");
    const input = document.querySelector("#new-task-input");
    const list_el = document.querySelector("#tasks");

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const task = input.value;

        if (!task.trim()) return; // Prevent adding empty tasks

        const task_el = document.createElement('div');
        task_el.classList.add('task');

        const task_content_el = document.createElement('div');
        task_content_el.classList.add('content');

        task_el.appendChild(task_content_el);

        const task_input_el = document.createElement('input');
        task_input_el.classList.add('text');
        task_input_el.type = 'text';
        task_input_el.value = task;
        task_input_el.setAttribute('readonly', 'readonly');

        task_content_el.appendChild(task_input_el);

        const task_actions_el = document.createElement('div');
        task_actions_el.classList.add('actions');

        const task_edit_el = document.createElement('button');
        task_edit_el.classList.add('edit');
        task_edit_el.innerText = 'Edit';

        const task_delete_el = document.createElement('button');
        task_delete_el.classList.add('delete');
        task_delete_el.innerText = 'Delete';

        task_actions_el.appendChild(task_edit_el);
        task_actions_el.appendChild(task_delete_el);

        task_el.appendChild(task_actions_el);

        list_el.appendChild(task_el);

        input.value = '';

        task_edit_el.addEventListener('click', () => {
            if (task_edit_el.innerText.toLowerCase() === "edit") {
                task_edit_el.innerText = "Save";
                task_input_el.removeAttribute("readonly");
                task_input_el.focus();
            } else {
                task_edit_el.innerText = "Edit";
                task_input_el.setAttribute("readonly", "readonly");
            }
        });

        task_delete_el.addEventListener('click', () => {
            list_el.removeChild(task_el);
        });
    });
});
