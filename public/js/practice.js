var practice_playing = null;

function play_practice() {
    let root_dropdown = document.getElementById('root_dropdown');
    let root = root_dropdown.options[root_dropdown.selectedIndex].value;

    let interval_dropdown = document.getElementById('interval_dropdown');
    let interval = interval_dropdown.options[interval_dropdown.selectedIndex].value;

    // check if an interval is already playing
    if (practice_playing != null) {

        // stop it if it is playing
        practice_playing.pause();
    }

    // set the audio file
    practice_playing = new Audio('res/audio/'.concat(root, '/', interval, '.wav'));
    practice_playing.play();

}
