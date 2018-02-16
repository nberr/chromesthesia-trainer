//TODO: set the buttons to display the color rather than the name of the interval

/* hard coded color values */
var my_colors = {
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

/* intervals allowed */
var intervals = ["perfect_unison", "minor_second", "major_second", "minor_third", "major_third", "perfect_fourth",
                 "tritone", "perfect_fifth", "minor_sixth", "major_sixth", "minor_seventh", "major_seventh",
                 "perfect_octave"];

/*
 * root of the interval
 * V1: only use c3 for the root
 */
var roots = ['c3', 'c#3', 'd3', 'd#3', 'e3', 'f3', 'f#3','g3', 'g#3', 'a3', 'a#3', 'b3',
    'c4', 'c#4', 'd4', 'd#4', 'e4', 'f4', 'f#4','g4', 'g#4', 'a4', 'a#4', 'b4',
    'c5'];


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
function practice_interval(interval) {
    playInterval(intervals[interval]);
    setColor(my_colors[intervals[interval]]);
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

        alert(total_time);

        // they got it right so stop updating the timer
        clearInterval(timer_func);
    }
    else {
        // you guess wrong :(

        //TODO: show the user how many wrong guesses
        guesses++;
        alert(guesses);

        //TODO: maybe set the color for the user?
        //setColor(my_colors[intervals[interval]]);
    }
}

function display_timer() {
    setColor(randomColor());
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
