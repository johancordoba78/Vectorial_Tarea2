// Mapa Leaflet
var mapa = L.map('mapid').setView([12.7828,-83.7054], 6);


// Definición de capas base
var capa_osm = L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?', 
  {
    maxZoom: 20,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }
).addTo(mapa);	


// 2_Otra capa base
var esri = L.tileLayer(
	'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', 
	{
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
	}
).addTo(mapa);	
	
	
// 3_Otra capa base

var OpenTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {maxZoom: 17,
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
}
).addTo(mapa);



// 4_Otra capa base

var OpenStreetMap_HOT = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
}
).addTo(mapa);



// Conjunto de capas base

var capas_base = {
  "osm": capa_osm,
  "esri": esri,
  "Topografia_1": OpenStreetMap_HOT,
  "Topografía_2": OpenTopoMap,
 
};	 

    
// Control de capas
control_capas = L.control.layers(capas_base).addTo(mapa);	

// Control de escala
L.control.scale().addTo(mapa);

// Capa vectorial de Paises en formato GeoJSON
$.getJSON("https://johancordoba78.github.io/datos/AmerCentra.geojson", function(geodata) {
  var paises = L.geoJson(geodata, {
    style: function(feature) {
	  return {'color': "#CB4335", 'weight': 1.5, 'fillOpacity': 0.0}
    },
    onEachFeature: function(feature, layer) {
      var popupText = "<strong>Departamentos & Provincias</strong>: " + feature.properties.NAME_12 + "<br>" + "<strong>País</strong>: " + feature.properties.NAME_01;
      layer.bindPopup(popupText);
    }			
  }).addTo(mapa);

  control_capas.addOverlay(paises, 'América Central');
});  

// Capa vectorial capitales en formato GeoJSON
$.getJSON("https://johancordoba78.github.io/datos/Capitales.geojson" , function(geodata) {
  var capitales = L.geoJson(geodata, {
    style: function(feature) {
	  return {'color': "#212F3D ", 'weight': 2.5, 'fillOpacity': 0.0}
    },
    onEachFeature: function(feature, layer) {
      var popupText = "<strong>Capital</strong>: " + feature.properties.CIUDAD + "<br>";
      layer.bindPopup(popupText);
    }			
  }).addTo(mapa);

  control_capas.addOverlay(capitales, 'Capitales');
 });   

// Capa vectorial de líneas ferreas en formato GeoJSON
$.getJSON("https://johancordoba78.github.io/datos/L_Tren.geojson" , function(geodata) {
  var TREN = L.geoJson(geodata, {
    style: function(feature) {
	  return {'color': "#A04000 ", 'weight': 2.5, 'fillOpacity': 0.0}
    },
    onEachFeature: function(feature, layer) {
      var popupText = "<strong>Línea ferrea</strong>: " + feature.properties.F_CODE_D_6 + "<br>";
      layer.bindPopup(popupText);
    }			
  }).addTo(mapa);

  control_capas.addOverlay(TREN, 'Línea Ferrocarril');




});