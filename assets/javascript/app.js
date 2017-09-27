$(document).ready(function () {

function start() {
  // 2. Initialize the JavaScript client library.
  gapi.client.init({
    'apiKey': 'AIzaSyDc08oLMAvQH64tuev0znFXVgYgYrsSkjA',
    // Your API key will be automatically added to the Discovery Document URLs.
    'discoveryDocs': ['https://people.googleapis.com/$discovery/rest'],
    // clientId and scope are optional if auth is not required.
    'clientId': '565675754604-l7lbdvbnmpcp7uegm6s8fqh85001otnh.apps.googleusercontent.com',
    'scope': 'profile',
  }).then(function() {
    // 3. Initialize and make the API request.
    return gapi.client.people.people.get({
      'resourceName': 'people/me',
      'requestMask.includeField': 'person.names'
    });
  }).then(function(response) {
    console.log(response.result);
  }, function(reason) {
    console.log('Error: ' + reason.result.error.message);
  });
};
// 1. Load the JavaScript client library.
gapi.load('client', start);


	var config = {
	    apiKey: "AIzaSyBcgtk5PwiGsep3vRZLZyjSMFBQI0SWfWc",
	    authDomain: "project1-8e7c0.firebaseapp.com",
	    databaseURL: "https://project1-8e7c0.firebaseio.com",
	    projectId: "project1-8e7c0",
	    storageBucket: "project1-8e7c0.appspot.com",
	    messagingSenderId: "1085632833712"
  	};

  	firebase.initializeApp(config);

  	var database = firebase.database();

  	var gitHubToken = "";

  	database.ref().on("value", function (tokenPull) {

  		gitHubToken = tokenPull.val().gitHubToken;
  		
  	});
	
	$("#userSearchButton").on("click", function (event) {

		$('.userNetwork').empty()

		event.preventDefault();

		var userInput = $("#userInput").val().trim();


		var queryURL = "https://api.github.com/users/" + userInput + "/followers?access_token=" + gitHubToken;

		
		console.log(queryURL);


		$.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {

        	for (var i = 0; i < response.length; i++) {

        		var followers = response[i].login;

        		console.log(followers);

        		var results = $("<p class='followerButton'>" + followers + "</p>");

        		results.attr("id", followers)

        		results.appendTo(".userNetwork")


        	};
		});

	});

});

$(document).on("click", ".followerButton", function(second){
	
	$('.userNetwork').empty()

	var database = firebase.database();

	var gitHubToken = "";

  	database.ref().on("value", function (tokenPull) {

  		gitHubToken = tokenPull.val().gitHubToken;
  		
  	});

	userInput = $(this).attr("id");

	queryURL = "https://api.github.com/users/" + userInput + "/followers?access_token=" + gitHubToken;

	console.log(queryURL)



	$.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {

        	for (var s = 0; s < response.length; s++) {

        		var followers = response[s].login;

        		console.log(followers);

        		var results = $("<p class='followerButton'>" + followers + "</p>");

        		results.attr("id", followers)

        		results.appendTo(".userNetwork")


        	};
		});
})

