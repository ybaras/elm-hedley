"use strict";function waitForElement(e,a,l){setTimeout(function(){var r=a.call(null,e,l);r||waitForElement(e,a,l)},50)}function mapManager(e,a){if(!a.leaflet.showMap)return!0;var l=document.querySelector(e);if(!l)return!1;mapEl=mapEl||addMap();var r=a.events,t=void 0;return a.leaflet.markers.forEach(function(e){var l=e.id;markersEl[l]?markersEl[l].setLatLng([e.lat,e.lng]):(markersEl[l]=L.marker([e.lat,e.lng]).addTo(mapEl),selectMarker(markersEl[l],l));var n=!!a.leaflet.selectedMarker&&a.leaflet.selectedMarker===l;n&&(t=markersEl[l]),markersEl[l].setIcon(n?selectedIcon:defaultIcon);var o=r.indexOf(l);r.splice(o,1)}),a.leaflet.markers.length?(mapEl.fitBounds(a.leaflet.markers),t&&mapEl.panTo(t._latlng)):mapEl.setZoom(1),r.forEach(function(e){markersEl[e]&&(mapEl.removeLayer(markersEl[e]),markersEl[e]=void 0)}),!0}function selectMarker(e,a){e.on("click",function(e){elmApp.ports.selectEvent.send(a)})}function addMap(){var e=L.map("map");return L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IjZjNmRjNzk3ZmE2MTcwOTEwMGY0MzU3YjUzOWFmNWZhIn0.Y8bhBaUMqFiPrDRW9hieoQ",{maxZoom:10,id:"mapbox.streets"}).addTo(e),e}var elmApp=Elm.fullscreen(Elm.Main,{selectEvent:null}),mapEl=void 0,markersEl={},defaultIcon=L.icon({iconUrl:"default@2x.6d6bb654.png",iconRetinaUrl:"default@2x.6d6bb654.png",iconSize:[35,46]}),selectedIcon=L.icon({iconUrl:"selected@2x.c4402371.png",iconRetinaUrl:"selected@2x.c4402371.png",iconSize:[35,46]});elmApp.ports.mapManager.subscribe(function(e){return!e.leaflet.showMap&&mapEl?(mapEl.remove(),mapEl=void 0,void(markersEl={})):void waitForElement("#map",mapManager,e)});