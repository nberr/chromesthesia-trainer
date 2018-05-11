


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



function setColor(color) {
    document.body.style.background = color;
}




function display_timer() {
    //setColor(randomColor());
    document.getElementById("timertext").innerHTML="Timer: " + Math.floor((Date.now() - timer_start)/1000) + " seconds";
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
