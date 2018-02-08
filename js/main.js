
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










var audio = null;

var previous = null;
var answer = null;

var timer = Date.now();

function randomRoot() {
    return roots[Math.floor(Math.random() * roots.length)];
}

function randomInterval() {
    return intervals[Math.floor(Math.random() * intervals.length)];
}

function randomSound() {

}

function start_test() {
    /* generate a random interval */
    playSomething();

    /* start the timer */
    timer = Date.now();

    /* wait for the user to answer */
    while (answer === null) {
        if (answer === previous) {
            /* correct answer; stop the timer */

        }
    }
}

function answer(interval) {
    answer = interval;
}

/*
 * get the path to an interval
 *
 */
function getPath(interval, root) {
    return 'res/audio/'.concat('tmp/', interval, '.wav');
}

/* play the interval */
function playSound(interval) {
    /* if the previous play has not finished, stop it! */
    if (audio != null) {
        audio.pause();
    }

    audio = new Audio(getPath(interval, 'c'));
    audio.play();

}

/* plays the interval and changes the color */
function playInterval(interval) {
    setColor(my_colors[intervals[interval]]);
    playSound(intervals[interval]);
}

/* this function gets called on a button press */
function playSomething() {
    // get a random interval
    var interval = randomInterval();

    while (interval === previous) {
        interval = randomInterval();
    }
    previous = interval;

    setColor(my_colors[interval]);

    playSound(interval);
}

/* set the background color */
function setColor(color) {
    document.body.style.background = color;
}