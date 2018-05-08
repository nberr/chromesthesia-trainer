
var colors = {
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

var intervals = ["perfect_unison", "minor_second", "major_second", "minor_third", "major_third", "perfect_fourth",
                 "tritone", "perfect_fifth", "minor_sixth", "major_sixth", "minor_seventh", "major_seventh",
                 "perfect_octave"];

var roots = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];


// what is currently playing
var playing = null;
var curr_interval = null;

// timer for test mode
var timer_start = null;
var total_time = null;
var timer_func;

var guesses;


/*
 * Used for practice mode
 * Play the interval and set the appropriate color
 */
async function practice_interval(interval) {
    playInterval(intervals[interval]);
    await sleep(2000);
    setColor(my_colors[intervals[interval]]);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function playInterval(interval) {

    // check if the previous sound is still playing
    if (playing != null) {
        playing.pause();
    }

    // get the path to the audio file and play it
    playing = new Audio(getAudioPath(interval, randomRoot()));
    playing.play();

    curr_interval = interval;
}

function setColor(color) {
    document.body.style.background = color;
}

function getAudioPath(interval, root) {
    //TODO: change this to use the root value to grab the proper audio file
    return 'res/audio/'.concat('tmp/', interval, '.wav');
}

/*
 * Use for testing mode
 *
 */
function test_interval() {
    // start the timer
    timer_start = Date.now();

    timer_func = setInterval(display_timer, 1000);

    // reset the number of guesses
    guesses = 0;

    // play a random interval with a random root (but don't set the color)
    // clear the color
    playInterval(randomInterval(), randomRoot());
    setColor('white');
}

function check_interval(interval) {

    if (intervals[interval] === curr_interval) {
        // you guessed correctly :)

        // stop the timer
        total_time = Date.now() - timer_start;

        //alert(Math.floor(total_time/1000) + " seconds");


        // they got it right so stop updating the timer
        clearInterval(timer_func);
    }
    else {
        // you guess wrong :(

        //TODO: show the user how many wrong guesses
        guesses++;
        //alert(guesses);
        document.getElementById("guessestext").innerHTML="Guesses: " + guesses;

        //TODO: maybe set the color for the user?
        //setColor(my_colors[intervals[interval]]);
    }
}

function display_timer() {
    //setColor(randomColor());
    document.getElementById("timertext").innerHTML="Timer: " + Math.floor((Date.now() - timer_start)/1000) + " seconds";
}

/*
 * Random Functions : generate random things like interval, root, etc.
 *
 */
function randomInterval() {
    return intervals[Math.floor(Math.random() * intervals.length)];
}

function randomRoot() {
    //TODO: change this to generate random roots when you have all the audio files
    return 'c';
}

function randomColor() {
    return my_colors[randomInterval()];
}

document.getElementById("defaultOpen").click();

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
    setColor('white');

}

/*
function start_quiz() {
    // hide the start quiz button
    document.getElementById('StartQuiz').style.display = 'none';
    document.getElementById('QuizStuff').style.display = 'block';

    //check if user is color user
}

function end_quiz() {
    document.getElementById('StartQuiz').style.display = 'block';
    document.getElementById('QuizStuff').style.display = 'none';
}*/

/*
 * Authentication stuff
 */
function signup() {
    //get email and pass
    const email = document.getElementById('textEmail').value;
    const pass = document.getElementById('textPassword').value;
    const auth = firebase.auth();

    //create the user
    const promise = auth.createUserWithEmailAndPassword(email, pass).then(function log_user() {
        firebase.database().ref('users/' + firebase.auth().currentUser.uid).set({
            isColor: Math.floor(Math.random()*2),
            email: email
        });
    });
    promise.catch(ev => console.log(ev.message));

}


function logout() {
    firebase.auth().signOut();
}

function login() {
    //get email and pass
    const email = document.getElementById('textEmail').value;
    const pass = document.getElementById('textPassword').value;
    const auth = firebase.auth();

    //log in
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(ev => console.log(ev.message));

    if (firebase.auth().currentUser) {
        console.log(firebase.auth().currentUser.email);
        //btnLogout.classList.remove('hide');
    }
    else {
        console.log('not logged in');
        //btnLogout.classList.add('hide');
    }
}

function check_login() {
    if (firebase.auth().currentUser) {
        window.alert('You are logged in as ' + firebase.auth().currentUser.email);
    }
    else {
        window.alert('You are not logged in');
    }
}

