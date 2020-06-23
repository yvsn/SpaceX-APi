mapboxgl.accessToken = 'pk.eyJ1IjoieWFubmlrdnNuIiwiYSI6ImNrYnJ1NjV5cTI2azAycXA5MDZidjgwODcifQ.88UZ_E6najB1gHH5pfYDQw';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-80.6026,28.6050], //
    zoom: 7
});

var geojson = {
  type: 'FeatureCollection',
  features: [{
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [-80.6026,28.6050]
    },
    properties: {
      title: 'Cape Canaveral',
      description: 'Florida, US'
    }
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [-80.397270,27.638643,]
    },
    properties: {
      title: 'Vero Beach',
      description: 'Florida, US'
    }
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [-81.0228331,29.2108147]
    },
    properties: {
      title: 'Daytona Beach',
      description: 'Florida, US'
    }
  }]
};
// add markers to map
geojson.features.forEach(function(marker) {

  // create a HTML element for each feature
  var el = document.createElement('div');
  el.className = 'marker';

  // make a marker for each feature and add to the map
  new mapboxgl.Marker(el)
    .setLngLat(marker.geometry.coordinates)
    new mapboxgl.Marker(el)
  .setLngLat(marker.geometry.coordinates)
  .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
    .setHTML('<h3>' + marker.properties.title + '</h3><p>' + marker.properties.description + '</p>'))
  .addTo(map);
});


function getAPIdata() {

	var url = 'https://api.openweathermap.org/data/2.5/weather';
	var apiKey ='3d3b923a70391c9c73f2c77695e5bec3';
	var city = document.getElementById('inputCity').value;

	// construct request
	var request = url + '?' + 'appid=' + apiKey + '&' + 'q=' + city;

	// get current weather
	fetch(request)

	// parse to JSON format
	.then(function(response) {
		if(!response.ok) throw Error(response.statusText);
		return response.json();
	})

	// render weather per day
	.then(function(response) {
		// render weatherCondition
		onAPISucces(response);
	})

	// catch error
	.catch(function (error) {
		onAPIError(error);
	});
}

function onAPISucces(response) {
	// get type of weather in string format
	var description = response.weather[0].description;

	// get temperature in Celcius
	var degrees = Math.floor(response.main.temp - 273.15);

	// render weather in DOM
	var weatherBox = document.getElementById('weather');
	weatherBox.innerHTML = response.name + '<br>' + degrees + '&#176;C <br>' + description;
}


function onAPIError(error) {
	var weatherBox = document.getElementById('weather');
	weatherBox.innerHTML = 'Try again! <br/> It looks like you enter an invalid city name :(';
}

// init data stream
document.getElementById('getWeather').onclick = function(){
   var weather=document.getElementById("weather");
    if (weather.style.display === "none") {
      weather.style.display = "block";
}
        else {
          weather.style.display = "block";
}
	getAPIdata();
};
