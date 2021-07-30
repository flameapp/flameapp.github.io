function indexmain() {
firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    window.location.href = 'main.html';
  } else {
    window.location.href = 'sign.html';
  }
});

}