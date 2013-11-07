/* earthquakes.js
    Script file for the INFO 343 Lab 7 Earthquake plotting page

    SODA data source URL: https://soda.demo.socrata.com/resource/earthquakes.json
    app token (pass as '$$app_token' query string param): Hwu90cjqyFghuAWQgannew7Oi
*/

//create a global variable namespace based on usgs.gov
//this is how JavaScript developers keep global variables
//separate from one another when mixing code from different
//sources on the same page
var gov = gov || {};
gov.usgs = gov.usgs || {};

//base data URL--additional filters may be appended (see optional steps)
//the SODA api supports the cross-origin resource sharing HTTP header
//so we should be able to request this URL from any domain via AJAX without
//having to use the JSONP technique
gov.usgs.quakesUrl = 'https://soda.demo.socrata.com/resource/earthquakes.json?$$app_token=Hwu90cjqyFghuAWQgannew7Oi';

//current earthquake dataset (array of objects, each representing an earthquake)
gov.usgs.quakes;

//reference to our google map
gov.usgs.quakesMap;

//AJAX Error event handler
//just alerts the user of the error
$(document).ajaxError(function(event, jqXHR, err){
    alert('Problem obtaining data: ' + jqXHR.statusText);
});

$(function(){
	getQuakes();
});

function getQuakes() {
	$.getJSON(gov.usgs.quakesUrl, function(quakes){
	    //quakes is an array of objects, each of which represents info about a quake
	    //see data returned from:
	    //https://soda.demo.socrata.com/resource/earthquakes.json?$$app_token=Hwu90cjqyFghuAWQgannew7Oi

	    //set our global variable to the current set of quakes
	    //so we can reference it later in another event
	    gov.usgs.quakes = quakes;
	    alert(gov.usgs.quakes.length);
	    $(".message").html("Displaying " + quakes.length + " earthquakes");
	});
	gov.usgs.quakesMap = new google.maps.Map($(".map-container")[0], {
			center: new google.maps.LatLng(0,0),		// centered on 0/0
			zoom: 2,							 		// zoom level 2
			mapTypeId: google.maps.MapTypeId.TERRAIN,	// terrain map
			streetViewControl: false					// no street view
	});
	// addQuakeMarkers(gov.usgs.quakes, gov.usgs.quakesMap);
}

//addQuakeMarkers()
//parameters
// - quakes (array) array of quake data objects
// - map (google.maps.Map) Google map we can add markers to
// no return value
function addQuakeMarkers(quakes, map) {
    
    //loop over the quakes array and add a marker for each quake
    var quake;      //current quake data
    var idx;        //loop counter

    for (idx = 0; idx < quakes.length; ++idx) {
        quake = quakes[idx];
        alert(quake.region);
        //latitude of current quake = quake.location.latitude 
        //longitutde of current quake = quake.location.longitude

}

// function addQuakeMarkers(quakes, map) {
// 	var latitude;
// 	var longitude;
// 	var quake;
// 	var idx;

// 	for(idx = 0; idx < quakes.length; idx++) {
// 		quake = quakes[idx];
// 		if(quake.location) {
// 			latitude = quake.location.latitude;
// 			longitude = quake.location.longitude;
// 		}
// 		quake.mapMarker = new google.maps.Marker({
// 			map: map,
// 			position: new google.maps.LatLng(latitude, longitude)
// 		}) 
// 	}
	// $.each(quakes, function() {
	// 	quake = this;
	// 	if(this.location) {
	// 		latitude = this.location.latitude;
	// 		longitude = this.location.longitude;
	// 	}
	// 	quake.mapMarker = new google.maps.Marker({
	// 		map: map,
	// 		position: new google.maps.LatLng(latitude, longitude)
	// 	}) 
	// });
}
