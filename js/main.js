document.writeln('Hello, world!');

var my_colors = {
    perfect_unison : 'red',
    minor_second : 'green',
    major_second : 'blue',
    minor_third : 'beige',
    major_third : 'coral',
    perfect_fourth : 'yellow',
    augmented_fourth : 'brown',
    perfect_fifth : 'cyan',
    minor_sixth : 'violet',
    major_sixth : 'white',
    minor_seventh : 'black',
    major_seventh : 'gold',
    perfect_octave : 'silver'
};

var intervals = ["perfect_unison", "minor_second", "major_second", "minor_third", "major_third", "perfect_fourth",
                 "augmented_fourth", "perfect_fifth", "minor_sixth", "major_sixth", "minor_seventh", "major_seventh",
                 "perfect_octave"];

function randomInterval() {
    return intervals[Math.floor(Math.random() * intervals.length)];
}

function randomColor() {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
}

function randomSound() {

}

function playSound(interval) {
    var audio = new Audio('res/audio/'.concat(interval, '/tmp.mp3'));
    audio.play();
}

function playSomething() {

    // get a random interval
    var interval = randomInterval();


    setColor(my_colors[interval]);

    playSound(interval);
}

function setColor(color) {
    document.body.style.background = color;
}