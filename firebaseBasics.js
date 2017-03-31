//sing in function - async function with callback
function signIn(email, password,callback){

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function (firebaseUser){
      //Handle success
      callback(firebaseUser);

    })
    .catch(function(error) {
      // Handle Errors here.
      callback(error);

    });


}

//function to create new user with email and password
function createUser(email, password){

  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });


}

//function to check if there is a signed in user
function isLogged(callback){

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      callback(user);
    } else {
      // No user is signed in.
      callback(false);
    }
  });

}

//sign off user
function signOff(callback){
  firebase.auth().signOut()
  .then(function() {
    // Sign-out successful.
    callback(true);

  })
  .catch(function(error) {
    // An error happened.
    callback(error);
  });
}

//generic function to read once from db
//accepts userId
function readFromDb(table, userId, callback){

  return firebase.database().ref('/' + table + '/' + userId).once('value').then(function(snapshot) {
    var data = snapshot.val();
    callback(data);
  });

}
