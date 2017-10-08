$(document).ready(function() {

  var config = {
    apiKey: "AIzaSyCMKx_oCaSSVnYSTVj5wbAWmhlNQO72isw",
    authDomain: "fir-homework-e659a.firebaseapp.com",
    databaseURL: "https://fir-homework-e659a.firebaseio.com",
    projectId: "fir-homework-e659a",
    storageBucket: "",
    messagingSenderId: "36705789247"
  };

    firebase.initializeApp(config);

    var database = firebase.database();

    var userName = '';
    var destination = '';
    var firstTrainTime;
    var frequency = 0;
    var timeStamp = 0;

    $('#add-user').on('click', function(event) {
        event.preventDefault();

        userName = $('#train-name').val().trim();
        destination = $('#destination').val().trim();
        firstTrainTime = $('#first-train-time').val();
        frequency = $('#frequency').val().trim();
        timeStamp = firebase.database.ServerValue.TIMESTAMP;

        database.ref().push({
            name: userName,
            destination: destination,
            firstTrainTime: firstTrainTime,
            frequency: frequency,
            timestamp: timeStamp
        });

    });

    database.ref().on('child_added', function(Snapshot) {
      $('')

      var sv = snapshot.val();

      // Console.loging the last user's data
      console.log(sv.name);
      console.log(sv.destination);
      console.log(sv.firstTrainTime);
      console.log(sv.frequency);

      // Change the HTML to reflect
//      $("#test1").html(sv.name);
 //     $("#test2").html(sv.destination);
  //    $("#test3").html(sv.firstTrainTime);
   //   $("#test4").html(sv.frequency);


    });

    // database.ref().orderByChild('dateAdded').limitToLast(5).on('child_added', function(snapshot) {
    //     console.log(childSnapshot.val().userName);
    // });
});