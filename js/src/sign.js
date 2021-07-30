firebase.initializeApp(firebaseConfig);

titletxt = document.getElementById('titletxt');
emailinput = document.getElementById('emailinput');
emailinputbox = document.getElementById('emailinputbox');
emailinputdetail = document.getElementById('emailinputdetail');
passwordinput = document.getElementById('passwordinput');
passwordinputbox = document.getElementById('passwordinputbox');
passwordinputdetail = document.getElementById('passwordinputdetail');
rewritepasswordinput = document.getElementById('rewritepasswordinput');
rewritepasswordinputbox = document.getElementById('rewritepasswordinputbox');
rewritepasswordinputdetail = document.getElementById('rewritepasswordinputdetail');
forgotpass = document.getElementById('forgotpass');
signbutton = document.getElementById('signbutton');
changebutton = document.getElementById('changebutton');
emailicon = document.getElementById('email-icon');
lockicon = document.getElementById('lock-icon');
lockicon2 = document.getElementById('lock-icon-2');
divider = document.getElementById('divider');
divider2 = document.getElementById('divider2');
divider3 = document.getElementById('divider3');
flameXviper = document.getElementById('flameXviper');
fbbutton = document.getElementById('fbbutton');
othermtdstxt = document.getElementById('othermtdstxt');
animationcontainer = document.getElementById('animationcontainer');
restorepasswordbutton = document.getElementById('forgotpass');
fbprovider = new firebase.auth.FacebookAuthProvider();

resizePage();

snackbaranim.onend = new Function();

emailinput.onchange = function() {
  if (correctemail) {
    passwordinput.focus();
  }
}

passwordinput.onchange = function() {
  if (correctemail && correctpass) {
    if (mode === 'login') {
     signbutton.click();
    } else {
     rewritepasswordinput.focus();
    }
  }
}

rewritepasswordinput.onchange = function() {
  if (mode === 'signup') {
    signbutton.click();
  }
}

correctemail = false;
correctpass = false;
correctrepass = false;
var ontextchange = function() {
  value = emailinput.value;
  vspt = value.split("@");
  domain = vspt[vspt.length -1];
  vspt = domain.split(".");
  badspt = false;
  for (var i = 0; i < vspt.length; i++) {
    str = vspt[i];
    if (str.includes(' ') || str.includes('\n') || str === '') {
      badspt = true;
    }
  }
  if (value === '') {
    correctemail = false;
    emailinputdetail.innerHTML = "Write your Email below";
    emailinput.style.color = '#00BCD4';
    emailicon.style.color = '#00BCD4';
    emailinputbox.style.border = '2px solid #00BCD4';
    emailinputdetail.style.color = '#00BCD4';
  } else if (!(value.includes('@'))) {
    correctemail = false;
    emailinputdetail.innerHTML = "\"@\" missing from your email";
    emailinput.style.color = '#F44336';
    emailicon.style.color = '#F44336';
    emailinputbox.style.border = '2px solid #F44336';
    emailinputdetail.style.color = '#F44336';
  } else if (!(domain.includes('.')) || badspt) {
    correctemail = false;
    emailinputdetail.innerHTML = "Bad Email domain name";
    emailinput.style.color = '#F44336';
    emailicon.style.color = '#F44336';
    emailinputbox.style.border = '2px solid #F44336';
    emailinputdetail.style.color = '#F44336';
  } else {
    correctemail = true;
    emailinputdetail.innerHTML = "Correct Email";
    emailinput.style.color = '#4CAF50';
    emailicon.style.color = '#4CAF50';
    emailinputbox.style.border = '2px solid #4CAF50';
    emailinputdetail.style.color = '#4CAF50';
  }
  
  pass = passwordinput.value;
  passstrn = checkpassword(pass);
    if (pass.length == 0) {
      correctpass = false;
      passwordinputdetail.innerHTML = "Write your Password below";
      passwordinput.style.color = '#00BCD4';
      lockicon.style.color = '#00BCD4';
      passwordinputbox.style.border = '2px solid #00BCD4';
      passwordinputdetail.style.color = '#00BCD4';
    } else if (passstrn >= 0 && passstrn <= 2) {
      correctpass = false;
      passwordinputdetail.innerHTML = "Weak Password";
      passwordinput.style.color = '#F44336';
      lockicon.style.color = '#F44336';
      passwordinputbox.style.border = '2px solid #F44336';
      passwordinputdetail.style.color = '#F44336';
    } else if (passstrn > 2 && passstrn <= 4) {
      correctpass = true;
      passwordinputdetail.innerHTML = "Normal Password";
      passwordinput.style.color = '#FFC107';
      lockicon.style.color = '#FFC107';
      passwordinputbox.style.border = '2px solid #FFC107';
      passwordinputdetail.style.color = '#FFC107';
    } else {
      correctpass = true;
      passwordinputdetail.innerHTML = "Strong Password";
      passwordinput.style.color = '#4CAF50';
      lockicon.style.color = '#4CAF50';
      passwordinputbox.style.border = '2px solid #4CAF50';
      passwordinputdetail.style.color = '#4CAF50';
    }
    
  repass = rewritepasswordinput.value;
  if (repass === '') {
     correctrepass = false;
     rewritepasswordinputdetail.innerHTML = "Rewrite your Password below";
     rewritepasswordinput.style.color = '#00BCD4';
     lockicon2.style.color = '#00BCD4';
     rewritepasswordinputbox.style.border = '2px solid #00BCD4';
     rewritepasswordinputdetail.style.color = '#00BCD4';
  } else if (pass === '') {
    correctrepass = false;
    rewritepasswordinputdetail.innerHTML = "Empty Password Above";
    rewritepasswordinput.style.color = '#F44336';
    lockicon2.style.color = '#F44336';
    rewritepasswordinputbox.style.border = '2px solid #F44336';
    rewritepasswordinputdetail.style.color = '#F44336';
  } else if (!correctpass) {
    correctrepass = false;
    rewritepasswordinputdetail.innerHTML = "Bad Password Above";
    rewritepasswordinput.style.color = '#F44336';
    lockicon2.style.color = '#F44336';
    rewritepasswordinputbox.style.border = '2px solid #F44336';
    rewritepasswordinputdetail.style.color = '#F44336';
  } else if (repass !== pass) {
    correctrepass = false;
    rewritepasswordinputdetail.innerHTML = "Wrong Password Rewrite";
    rewritepasswordinput.style.color = '#F44336';
    lockicon2.style.color = '#F44336';
    rewritepasswordinputbox.style.border = '2px solid #F44336';
    rewritepasswordinputdetail.style.color = '#F44336';
  } else {
    correctrepass = true;
    rewritepasswordinputdetail.innerHTML = "Correct Password Rewrite";
    rewritepasswordinput.style.color = '#4CAF50';
    lockicon2.style.color = '#4CAF50';
    rewritepasswordinputbox.style.border = '2px solid #4CAF50';
    rewritepasswordinputdetail.style.color = '#4CAF50';
  }
  requestAnimationFrame(ontextchange);
}
requestAnimationFrame(ontextchange);

pageanim = new ValueAnimator();
pageanim.setduration(800);
pageanim.setinterpolator(new OvershotInterpolator());
pageanim.start();
pageanim.setlisteners([function(frac) {
  titletxt.style.transform = 'translateY('.concat(-dip(50)+dip(50)*frac).concat('px)');
  flameXviper.style.opacity = frac*1.5;
  titletxt.style.opacity = frac;
  emailinputbox.style.opacity = frac;
  passwordinputbox.style.opacity = frac;
  rewritepasswordinputbox.style.opacity = frac;
  changebutton.style.opacity = frac;
  forgotpass.style.opacity = frac;
  signbutton.style.opacity = frac;
  divider.style.opacity = frac;
  divider2.style.opacity = frac;
  divider3.style.opacity = frac;
  fbbutton.style.opacity = frac;
}]);

document.body.onscroll = function(e) {
  if (!(pageanim.isrunning())) {
    pageanim.getlistener().call(this, 1, 800)
  }
}

function checkpassword(password) {
  var strength = 0;
  if (password.length >= 6) {
    strength += 1;
  }
  if (password.length >= 10) {
    strength += 1;
  }
  if (password.length >= 15) {
    strength += 1;
  }
  if (password.match(/[a-z]+/)) {
    strength += 1;
  }
  if (password.match(/[A-Z]+/)) {
    strength += 1;
  }
  if (password.match(/[0-9]+/)) {
    strength += 1;
  }
  if (password.match(/[$@#&!]+/)) {
    strength += 1;
  }
  return strength;
}

signbutton.addEventListener('click', function(e) {
  onbuttonmtend(signbutton, e);
  onsignbuttonclicked(e);
}, false);
signbutton.addEventListener('mouseover', function(e) {
  onbuttonmtstart(signbutton, e);
}, false);
signbutton.addEventListener('mouseout', function(e) {
  onbuttonmtend(signbutton, e);
}, false);


fbbutton.addEventListener('click', function(e) {
  onbuttonmtend(fbbutton, e);
  onfbbuttonclicked(e);
}, false);
fbbutton.addEventListener('mouseover', function(e) {
  onbuttonmtstart(fbbutton, e);
}, false);
fbbutton.addEventListener('mouseout', function(e) {
  onbuttonmtend(fbbutton, e);
}, false);

changebutton.addEventListener('click', function(e) {
  onbuttonmtend(changebutton, e);
  onchangebuttonclicked(e);
}, false);
changebutton.addEventListener('mouseover', function(e) {
  onbuttonmtstart(changebutton, e);
}, false);
changebutton.addEventListener('mouseout', function(e) {
  onbuttonmtend(changebutton, e);
}, false);

restorepasswordbutton.addEventListener('click', function(e) {
  onbuttonmtend(restorepasswordbutton, e);
  onrestorepasswordbuttonclicked(e);
}, false);
restorepasswordbutton.addEventListener('mouseover', function(e) {
  onbuttonmtstart(restorepasswordbutton, e);
}, false);
restorepasswordbutton.addEventListener('mouseout', function(e) {
  onbuttonmtend(restorepasswordbutton, e);
}, false);

anim = new ValueAnimator();
anim.setduration(300);
anim.setinterpolator(new DecelerateInterpolator());

function onbuttonmtstart(button, e) {
  anim.stop();
  anim.setrange(1, 0);
  anim.setlisteners([function(progress, time) {
    button.style.opacity = 0.5 + (progress/2);
  }]);
  anim.start();
}

function onbuttonmtend(button, e) {
  anim.stop();
  anim.setrange(0, 1);
  anim.setlisteners([function(progress, time) {
    button.style.opacity = 0.5 + (progress/2);
  }]);
  anim.start();
}

function onsignbuttonclicked(e) {
  if (emailinput.value === '' && passwordinput.value === '') {
    snackbar('Write your Email and Password first to ' + mode, 2000);
  } else if (emailinput.value === '') {
    snackbar('Write your Email first to ' + mode, 2000);
  } else if (passwordinput.value === '') {
    snackbar('Write your Password first to ' + mode, 2000);
  } else if (!correctemail || !correctpass) {
    snackbar('Bad Email and/or Password', 2000);
  } else if (mode == 'signup' && !correctrepass) {
    if (rewritepasswordinput.value === '') {
      snackbar('Rewrite your Password first to Signup', 2000);
    } else {
      snackbar('Wrong Password Rewrite', 2000);
    }
  } else {
    if (mode === 'login') {
     snackbar('Logging in...', 'forever', true);
    firebase.auth().signInWithEmailAndPassword(emailinput.value, passwordinput.value)
      .then((userCredential) => {
        hideSnackbar();
        snackbar('Welcome back, logged in with email : ' + emailinput.value + ' successfuly.', 'forever', true);
        snackbaranim.onend = function() {
          window.location.href = 'index.html';
        }
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        hideSnackbar();
        snackbar('An error occured : ' + errorMessage, 5000);
      });
    } else {
      snackbar('Signing up...', 'forever', true);
      firebase.auth().createUserWithEmailAndPassword(emailinput.value, passwordinput.value)
        .then((userCredential) => {
          hideSnackbar();
          onchangebuttonclicked(null);
          snackbar('Signed up successfuly with Email : ' + emailinput.value + ', now try to Login.', 2000);
        snackbaranim.onend = function() {
          window.location.href = 'index.html';
        }
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          hideSnackbar();
          snackbar('An error occured : ' + errorMessage, 5000);
        });
    }
  }
}

function onfbbuttonclicked(e) {
    firebase
      .auth()
      .signInWithPopup(fbprovider)
      .then((result) => {
        if (mode === 'login') {
          snackbar('Welcome back, logged in with Facebook \"' + result.user.username + '\" successfuly.', 'forever', true);
        } else {
          snackbar('Signed up successfuly with Facebook \"' + result.user.username + '\", Welcome.', 'forever', true);
        }
      })
      .catch((error) => {
        snackbar('An error occured : ' + error.message, 5000);
      });
}

mode = 'login';
rewritepasswordinputbox.style.display = 'none';
function onchangebuttonclicked(e) {
  hideSnackbar();
  pageanim.stop();
  if (mode === 'login') {
    mode = 'signup';
    titletxt.innerHTML = 'Signup to continue';
    signbutton.innerHTML = 'Signup';
    changebutton.innerHTML = 'Login';
    othermtdstxt.innerHTML = 'Or Signup with';
    rewritepasswordinputbox.style.display = 'block';
  } else {
    mode = 'login';
    titletxt.innerHTML = 'Login to continue';
    signbutton.innerHTML = 'Login';
    changebutton.innerHTML = 'Signup';
    othermtdstxt.innerHTML = 'Or Login with';
    rewritepasswordinputbox.style.display = 'none';
  }
  passwordinput.value = '';
  rewritepasswordinput.value = '';
  pageanim.start();
}

function onrestorepasswordbuttonclicked() {
  if (emailinput.value === '') {
    snackbar('Write your Email above first', 2000)
  } else if (!(correctemail)) {
    snackbar('Bad Email')
  } else {
    snackbar('Sending Password Restoration Email...');
    firebase.auth().sendPasswordResetEmail(emailinput.value)
      .then(() => {
        snackbar('Password Restoration Email sent successfuly to Email : '+emailinput.value, 2000)
      })
      .catch((error) => {
        snackbar('An error occured : '+error.message, 5000)
    });
  }
}