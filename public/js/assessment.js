let intervals = ["minor_second", "major_second", "minor_third", "major_third", "perfect_fourth",
    "tritone", "perfect_fifth", "minor_sixth", "major_sixth", "minor_seventh", "major_seventh",
    "perfect_octave"];

let roots = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// timer stuff
let start_time;
let question_start;
let question_end;
let end_time;

let questions_completed;
let wrong_count;
let current_interval;
let current_root;
let current_audio;

let timer_func;

let ref;
let assessment_number;

function start_assessment() {

    assessment_number = 0;

    if (firebase.auth().currentUser) {
        // a user is logged in
        ref = firebase.database().ref('users/' + firebase.auth().currentUser.uid);

        // get the current assessment number (do any assessments exist?)
        ref.once("value")
            .then(function(snapshot) {
                while (snapshot.hasChild("assessment" + assessment_number)) {
                    assessment_number++;
                }

                firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/assessment' + assessment_number).set({
                    date: readable_date()
                });

            });

    }

    // hide the start button and show the assessment stuff
    document.getElementById('StartAssessment').style.display = 'none';
    document.getElementById('AssessmentStuff').style.display = 'block';

    // start the overall timer
    start_time = Date.now();

    // init json stuff
    questions_completed = 0;
    wrong_count = 0;
    question_start = start_time;

    document.getElementById('AssessmentCompleted').innerHTML = 'Completed: ' + questions_completed;
    document.getElementById('AssessmentTimer').innerText = 'Timer: 0';

    timer_func = setInterval(show_timer, 1000);

    // get an interval and root for the user to listen to
    current_interval = intervals[uniform_random(0, intervals.length)];
    current_root = roots[uniform_random(0, roots.length)];

    // enable all buttons
    enable_intervals();

    // get the audio file for the user
    current_audio = new Audio('res/audio/'.concat(current_root, '/', current_interval, '.wav'));
    current_audio.play();
}

function end_assessment() {
    if (current_audio != null) {
        current_audio.pause();
    }

    end_time = Date.now();

    firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/assessment' + assessment_number).update({
        time: (end_time-start_time)/1000
    });

    // show the start button and hide assessment stuff
    document.getElementById('StartAssessment').style.display = 'block';
    document.getElementById('AssessmentStuff').style.display = 'none';

    clearInterval(timer_func);
}

function check_interval(interval) {
    if (interval === current_interval) {
        // user was correct
        question_end = Date.now();

        // store data in database
        ref = firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/assessment' + assessment_number + '/question'+questions_completed).set({
            interval: current_interval,
            root: current_root,
            guesses: wrong_count,
            time: (question_end - question_start)/1000
        });

        // move on to next question
        questions_completed++;
        wrong_count = 0;
        question_start = Date.now();

        document.getElementById('AssessmentCompleted').innerHTML = 'Completed: ' + questions_completed;

        // enable all button
        enable_intervals();

        current_interval = intervals[uniform_random(0, intervals.length)];
        current_root = roots[uniform_random(0, roots.length)];

        if (current_audio != null) {
            current_audio.pause();
        }

        current_audio = new Audio('res/audio/'.concat(current_root, '/', current_interval, '.wav'));
        current_audio.play();
    }
    else {
        // user was incorrect
        wrong_count++;

        // disable the button they pressed
        document.getElementById(interval.concat('_assessment')).disabled = true;

    }
}

function enable_intervals() {
    for (let curr_int in intervals) {
        document.getElementById(intervals[curr_int].concat('_assessment')).disabled = false;
    }
}

function uniform_random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function show_timer() {
    document.getElementById("AssessmentTimer").innerHTML="Timer: " + Math.floor((Date.now() - start_time)/1000) + " sec";
}

function hear_again() {
    if (current_audio != null) {
        current_audio.pause();
    }

    current_audio = new Audio('res/audio/'.concat(current_root, '/', current_interval, '.wav'));
    current_audio.play();
}

function readable_date() {
    let date = new Date();

    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();

    month = (month < 10 ? "0" : "") + month;
    day = (day < 10 ? "0" : "") + day;
    hour = (hour < 10 ? "0" : "") + hour;
    min = (min < 10 ? "0" : "") + min;
    sec = (sec < 10 ? "0" : "") + sec;

    return date.getFullYear() + "-" + month + "-" + day + "_" +  hour + ":" + min + ":" + sec;
}
