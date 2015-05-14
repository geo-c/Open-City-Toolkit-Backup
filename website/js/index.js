$(document).ready(function () {
	var map = new Map('map', {zoomControl: false}).setView([51.962797, 7.621200], 5);
	L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>',
	    maxZoom: 18
	}).addTo(map);
	map.initMap();
	map.initSidebar();

	var data = null;

	$.getJSON("data/data.json", function(data) {
	    map.addData(data);
	    process();
	});

	process = function () {
		map.addMarker();
		map.sidebar.fillData();
	}


	var srch = getParam("srch");

	$('#btn-addApi').on('click', function () {
		map.sidebar.addAPI();
	});

	$('#btn-home').on('click', function () {
		map.sidebar.fillData();
	});

	if(srch) {
		console.log("test");

		$.getJSON('http://nominatim.openstreetmap.org/search?format=json&limit=5&q=' + srch, function(data) {
			var lat = data[0].lat
			var lng = data[0].lon;
			var southWest =  L.latLng(lat - 0.5, lng - 0.5);
			var northEast =  L.latLng(lat + 0.5, lng + 0.5);
			bounds = L.latLngBounds(southWest, northEast);
			map.fitBounds(bounds);
		});
	}

	function getParam(variable) {
		var query = window.location.search.substring(1);
		var vars = query.split("&");
		for (var i = 0; i < vars.length; i++) {
			var pair = vars[i].split("=");
			if (pair[0] == variable) {
				return pair[1];
			}
		}
		return (false);
	};
});