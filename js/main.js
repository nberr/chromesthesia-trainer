
/* hard coded values */
var my_colors = {
    perfect_unison : 'red',
    minor_second   : 'orangered',
    major_second   : 'orange',
    minor_third    : 'tangerine',
    major_third    : 'yellow',
    perfect_fourth : 'yellowgreen',
    tritone        : 'green',
    perfect_fifth  : '#7BCCB5', /* blue green */
    minor_sixth    : '#blue',
    major_sixth    : 'blueviolet',
    minor_seventh  : 'violet',
    major_seventh  : 'mediumvioletred',
    perfect_octave : 'red'
};

var intervals = ["perfect_unison", "minor_second", "major_second", "minor_third", "major_third", "perfect_fourth",
                 "tritone", "perfect_fifth", "minor_sixth", "major_sixth", "minor_seventh", "major_seventh",
                 "perfect_octave"];

var roots = ['c3', 'c#3', 'd3', 'd#3', 'e3', 'f3', 'f#3','g3', 'g#3', 'a3', 'a#3', 'b3',
    'c4', 'c#4', 'd4', 'd#4', 'e4', 'f4', 'f#4','g4', 'g#4', 'a4', 'a#4', 'b4',
    'c5'];


var audio = null;

var previous = null;

/* var timer = Date.now();*/

function playInOrder() {
    var index;

    for (index = 0; index < intervals.length; index++) {
        setColor(my_colors[intervals[index]]);
        playSound(intervals[index]);
        /* wait till the sound is finished */
        
    }
}

function randomRoot() {
    return roots[Math.floor(Math.random() * roots.length)];
}

function randomInterval() {
    return intervals[Math.floor(Math.random() * intervals.length)];
}

function randomSound() {

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