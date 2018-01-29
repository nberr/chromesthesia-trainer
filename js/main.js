document.writeln('Hello, world!');

/* hard coded values */
var my_colors = {
    perfect_unison      : 'red',
    minor_second        : 'orangered',
    major_second        : 'orange',
    minor_third         : 'tangerine',
    major_third         : 'yellow',
    perfect_fourth      : 'yellowgreen',
    augmented_fourth    : 'green',
    perfect_fifth       : '#7BCCB5', /* blue green */
    minor_sixth         : '#blue',
    major_sixth         : 'blueviolet',
    minor_seventh       : 'violet',
    major_seventh       : 'mediumvioletred',
    perfect_octave      : 'red'
};

var intervals = ["perfect_unison", "minor_second", "major_second", "minor_third", "major_third", "perfect_fourth",
                 "augmented_fourth", "perfect_fifth", "minor_sixth", "major_sixth", "minor_seventh", "major_seventh",
                 "perfect_octave"];

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

function randomInterval() {
    return intervals[Math.floor(Math.random() * intervals.length)];
}

/* play the interval */
function playSound(interval) {
    /* if the previous play has not finished, stop it! */
    if (audio != null) {
        audio.pause();
    }

    audio = new Audio('res/audio/'.concat('tmp/', interval, '.wav'));
    audio.play();
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