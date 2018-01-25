document.writeln('Hello, world!');

function randomColor() {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
}

function randomSound() {

}

function playSound() {
    var audio = new Audio('res/mp3/something.mp3');

    audio.play();
}

function playSomething() {

    setColor(randomColor());

    playSound(randomSound());

}

function setColor(color) {
    document.body.style.background = color;
}