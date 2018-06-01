
function setColor(color) {
    document.body.style.background = color;
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
        //console.log(firebase.auth().currentUser.email);
        //btnLogout.classList.remove('hide');
    }
    else {
        //console.log('not logged in');
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
