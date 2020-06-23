mapboxgl.accessToken = 'pk.eyJ1IjoieWFubmlrdnNuIiwiYSI6ImNrYnJ1NjV5cTI2azAycXA5MDZidjgwODcifQ.88UZ_E6najB1gHH5pfYDQw';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
    center: [-80.6026,28.6050], // starting position [lng, lat]
    zoom: 7 // starting zoom
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
