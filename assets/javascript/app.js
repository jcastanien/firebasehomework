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

    var trainName = '';
    var destination = '';
    var firstTrainTime;
    var frequency = 0;
    var timeStamp = 0;

    $('#add-user').on('click', function(event) {
        event.preventDefault();

        trainName = $('#train-name').val().trim();
        destination = $('#destination').val().trim();
        firstTrainTime = $('#first-train-time').val();
        frequency = $('#frequency').val().trim();
        timeStamp = firebase.database.ServerValue.TIMESTAMP;

        database.ref().push({
            name: trainName,
            destination: destination,
            firstTrainTime: firstTrainTime,
            frequency: frequency,
            timestamp: timeStamp
        });

    });

    database.ref().on('child_added', function(snapshot) {

      var ss = snapshot.val();

      // Console.loging the last user's data
      console.log(ss.name);
      console.log(ss.destination);
      console.log(ss.firstTrainTime);
      console.log(ss.frequency);

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(ss.firstTrainTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % ss.frequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = ss.frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));




      // Change the HTML to reflect
      $(".table").append("<tr><td>" + ss.name + "</td>" + "<td>" + ss.destination + "</td>" + "<td>" + ss.frequency + "</td>" + "<td>" + nextTrain + "</td>" + "<td>" + tMinutesTillTrain + "</td></tr>");
     

     // $("#test2").html(ss.destination);
     // $("#test3").html(ss.firstTrainTime);
     // $("#test4").html(ss.frequency);


    });

    // database.ref().orderByChild('dateAdded').limitToLast(5).on('child_added', function(snapshot) {
    //     console.log(childSnapshot.val().userName);
    // });
});