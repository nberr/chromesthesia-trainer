let colors = {
    perfect_unison : '#c0c0c0',
    minor_second   : '#000000',
    major_second   : '#ff0000',
    minor_third    : '#800000',
    major_third    : '#ffff00',
    perfect_fourth : '#707030',
    tritone        : '#00ee00',
    perfect_fifth  : '#009000',
    minor_sixth    : '#00eeee',
    major_sixth    : '#00a0a0',
    minor_seventh  : '#0000ff',
    major_seventh  : '#ff00ff',
    perfect_octave : '#900090'
};

// timer stuff
let start_time_q;
let question_start_q;
let question_end_q;
let end_time_q;

let questions_completed_q;
let wrong_count_q;
let current_interval_q;
let current_root_q;
let current_audio_q;

let timer_func_q;

let ref_q;
let quiz_number;

let is_color;

async function start_quiz() {

    quiz_number = 0;

    if (firebase.auth().currentUser) {
        // a user is logged in
        ref_q = firebase.database().ref('users/' + firebase.auth().currentUser.uid);

        // get the current quiz number (do any quizs exist?)
        ref_q.once("value")
            .then(function(snapshot) {
                is_color = snapshot.child('isColor').val();

                while (snapshot.hasChild("quiz" + quiz_number)) {
                    quiz_number++;
                }

                firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/quiz' + quiz_number).set({
                    date: readable_date()
                });

            });

    }

    // hide the start button and show the quiz stuff
    document.getElementById('StartQuiz').style.display = 'none';
    document.getElementById('QuizStuff').style.display = 'block';

    // start the overall timer
    start_time_q = Date.now();

    // init json stuff
    questions_completed_q = 0;
    wrong_count_q = 0;
    question_start_q = start_time_q;

    document.getElementById('QuizCompleted').innerHTML = 'Completed: ' + questions_completed_q;
    document.getElementById('QuizTimer').innerText = 'Timer: 0';

    timer_func_q = setInterval(show_timer_q, 1000);

    // get an interval and root for the user to listen to
    current_interval_q = intervals[uniform_random(0, intervals.length)];
    current_root_q = roots[uniform_random(0, roots.length)];

    // enable all buttons
    enable_intervals_q();

    // get the audio file for the user
    current_audio_q = new Audio('res/audio/'.concat(current_root_q, '/', current_interval_q, '.wav'));
    current_audio_q.play();

    // change background if the user is color
    if (is_color) {
        await sleep(2000);
        setColor(colors[current_interval_q]);
    }
}

function end_quiz() {
    if (current_audio_q != null) {
        current_audio_q.pause();
        //set color back to white
        setColor('white');
    }

    end_time_q = Date.now();

    firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/quiz' + quiz_number).update({
        time: (end_time_q-start_time_q)/1000
    });

    // show the start button and hide quiz stuff
    document.getElementById('StartQuiz').style.display = 'block';
    document.getElementById('QuizStuff').style.display = 'none';

    clearInterval(timer_func_q);
}

async function check_interval_q(interval) {
    if (interval === current_interval_q) {
        // user was correct
        question_end_q = Date.now();

        // store data in database
        ref_q = firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/quiz' + quiz_number + '/question'+questions_completed_q).set({
            interval: current_interval_q,
            root: current_root_q,
            guesses: wrong_count_q,
            time: (question_end_q - question_start_q)/1000
        });

        // move on to next question
        questions_completed_q++;
        wrong_count_q = 0;
        question_start_q = Date.now();

        document.getElementById('QuizCompleted').innerHTML = 'Completed: ' + questions_completed_q;

        // enable all button
        enable_intervals_q();

        current_interval_q = intervals[uniform_random(0, intervals.length)];
        current_root_q = roots[uniform_random(0, roots.length)];

        if (current_audio_q != null) {
            current_audio_q.pause();
            //set color to white
            setColor('white');
        }

        current_audio_q = new Audio('res/audio/'.concat(current_root_q, '/', current_interval_q, '.wav'));
        current_audio_q.play();

        // change background if user is color
        if (is_color) {
            await sleep(2000);
            setColor(colors[current_interval_q]);
        }


    }
    else {
        // user was incorrect
        wrong_count_q++;

        // disable the button they pressed
        document.getElementById(interval.concat('_quiz')).disabled = true;

    }
}

function enable_intervals_q() {
    for (let curr_int in intervals) {
        document.getElementById(intervals[curr_int].concat('_quiz')).disabled = false;
    }
}

function uniform_random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function show_timer_q() {
    document.getElementById("QuizTimer").innerHTML="Timer: " + Math.floor((Date.now() - start_time_q)/1000) + " sec";
}

async function hear_again_q() {
    if (current_audio_q != null) {
        current_audio_q.pause();
        // set color to white
    }

    current_audio_q = new Audio('res/audio/'.concat(current_root_q, '/', current_interval_q, '.wav'));
    current_audio_q.play();

    // change color is user is color
    if (is_color) {
        await sleep(2000);
        setColor(colors[current_interval_q]);
    }
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

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
