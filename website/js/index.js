$(document).ready(function () {
    var map = new Map('map').setView([51.962797, 7.621200], 5);
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>',
        maxZoom: 18
    }).addTo(map);
    map.initMap();
    map.initSidebar();


    $.getJSON("data/data.json", function (data) {
        map.addData(data);
        process();
    });

    $.getJSON("data/countrydata.json", function (data) {
        map.addCountries(data);
    });

    $('#btn-addApi').on('click', function () {
        map.sidebar.addAPI();
        $('#hometaskbar').attr('class', '');
        $('#addapitaskbar').attr('class', 'active');
        $('#parsertaskbar').attr('class', '');
        $('#linkeddata').attr('class', '');
    });

    $('#btn-home').on('click', function () {
        map.sidebar.fillData();
        $('#hometaskbar').attr('class', 'active');
        $('#addapitaskbar').attr('class', '');
        $('#parsertaskbar').attr('class', '');
        $('#linkeddata').attr('class', '');
    });

    $('#btn-parser').on('click', function () {
        map.sidebar.parser();
        initParser();
        $('#parsertaskbar').attr('class', 'active');
        $('#hometaskbar').attr('class', '');
        $('#addapitaskbar').attr('class', '');
        $('#linkeddata').attr('class', '');
    });

    $('#btn-linkeddata').on('click', function () {
        map.sidebar.linkedData();
        $('#linkeddata').attr('class', 'active');
        $('#parsertaskbar').attr('class', '');
        $('#hometaskbar').attr('class', '');
        $('#addapitaskbar').attr('class', '');
    });

    var srch = getParam("srch");

    if (srch) {
        $.getJSON('http://nominatim.openstreetmap.org/search?format=json&limit=5&q=' + srch, function (data) {
            var lat = data[0].lat
            var lng = data[0].lon;
            var southWest = L.latLng(lat - 0.5, lng - 0.5);
            var northEast = L.latLng(lat + 0.5, lng + 0.5);
            bounds = L.latLngBounds(southWest, northEast);
            map.fitBounds(bounds);
            map.sidebar.filterTable(srch);
            $('#srch-term').val(srch);

        });
    }

    process = function () {
        map.addMarker();
        map.sidebar.fillData();
    };

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
    }
    ;
});