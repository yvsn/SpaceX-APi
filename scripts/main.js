mapboxgl.accessToken = 'pk.eyJ1IjoieWFubmlrdnNuIiwiYSI6ImNrYnJ1NjV5cTI2azAycXA5MDZidjgwODcifQ.88UZ_E6najB1gHH5pfYDQw';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-80.6026,28.6050], //
    zoom: 5
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
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [-80.1300455,25.790654]
    },
    properties: {
      title: 'Miami Beach',
      description: 'Florida, US'
    }
  }]
};

geojson.features.forEach(function(marker) {

  var el = document.createElement('div');
  el.className = 'marker';

  new mapboxgl.Marker(el)
    .setLngLat(marker.geometry.coordinates)
    new mapboxgl.Marker(el)
  .setLngLat(marker.geometry.coordinates)
  .setPopup(new mapboxgl.Popup({ offset: 20 })
    .setHTML('<h3>' + marker.properties.title + '</h3><p>' + marker.properties.description + '</p>'))
  .addTo(map);
});

function getAPIdata() {

	var url = 'https://api.openweathermap.org/data/2.5/weather';
	var apiKey ='3d3b923a70391c9c73f2c77695e5bec3';
	var city = document.getElementById('inputCity').value;
  var request = url + '?' + 'appid=' + apiKey + '&' + 'q=' + city;

	fetch(request)
	.then(function(response) {
		if(!response.ok) throw Error(response.statusText);
		return response.json();
	})
	.then(function(response) {
		onAPISucces(response);
	})
	.catch(function (error) {
		onAPIError(error);
	});
}

function onAPISucces(response) {
	var description = response.weather[0].description;
	var degrees = Math.floor(response.main.temp - 273.15);
	var weatherBox = document.getElementById('weather');

	weatherBox.innerHTML = response.name + '<br>' + degrees + '&#176;C <br>' + description;
}

function onAPIError(error) {
	var weatherBox = document.getElementById('weather');
	weatherBox.innerHTML = 'Try again! <br/> It looks like you entered an invalid city name 😔';
}

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
