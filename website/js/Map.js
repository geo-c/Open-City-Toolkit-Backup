var Map = L.Map.extend({
    /***Variables
     *
     *
     */
    data: null,
    cityMarkers: L.markerClusterGroup({chunkedLoading: true}),
    regionMarkers: L.markerClusterGroup({chunkedLoading: true}),
    countryMarkers: L.markerClusterGroup({chunkedLoading: true}),
    continentMarkers: L.markerClusterGroup({chunkedLoading: true}),
    layersControl: L.control.layers(),
    countries: [],
    lastCountry: null,
    boundary: null,
    sidebar: null,
    toggleButton: null,
    sidebar: new Sidebar(),
            /***Methods
             *
             *
             */

            /** Add a marker to a layer by its type
             *
             */
            addData: function (data) {
                this.data = data;
                this.sidebar.addData(data);
            },
    addMarker: function () {
        var that = this;
        $.each(that.data, function (index, value) {
            if (value.location && value.location != "#N/A" && value.location != "") {
                loc = value.location.split(",");
                var latlng = [loc[0], loc[1]];
                var marker = L.marker(latlng);
                marker.on('click', function (e) {
                    that.sidebar.filterTable(srch);
                    $("#toggleSidebar").text("< Hide Sidebar");
                    $("#sidebar-container").show();
                    $("#map-container").attr("class", "col-md-6");
                });
                that.cityMarkers.addLayer(marker);
            }
        });
    },
    initSidebar: function () {
        this.toggleButton = L.control({position: 'topleft'});
        this.toggleButton.onAdd = function () {
            var div = L.DomUtil.create('div', 'toggle');
            var inner = '<button id="toggleSidebar" role="button" class="btn btn-primary">< Hide Sidebar</button>'
            div.innerHTML = inner;
            return div;
        };
        $("#map-container").attr("class", "col-md-6");

        this.toggleButton.addTo(this);

        var that = this;
        $("#toggleSidebar").on('click', function (e) {
            if ($("#toggleSidebar").text() == "Show Sidebar >") {
                that.showSidebar();
            } else {
                that.hideSidebar();
            }
        });
    },
    addCountries: function (countries) {
        var that = this;
        for (var country in countries) {
            this.countries[country] = this.getCountryBoundary(country);
            loc = countries[country].location.split(",");
            var latlng = [loc[0], loc[1]];
            var marker = L.circleMarker(latlng, {
                radius: 8,
                fillColor: "#ff7800",
                color: "#000",
                opacity: 1,
                fillOpacity: 1,
                country: country
            });

            marker.properties = {
                country: country
            };

            marker.on('click', function (e) {
                if (that.boundary) {
                    that.removeLayer(that.boundary);
                }
                if (that.lastCountry != this.properties.country) {
                    var map = that;
                    map.sidebar.filterTable(this.properties.country);
                    map.boundary = that.countries[this.properties.country];
                    map.boundary.addTo(that);

                    map.boundary.on('click', function (e) {
                        map.removeLayer(map.boundary);
                    });
                }
            });

            this.countryMarkers.addLayer(marker);
        }
    },
    getCountryBoundary: function (country) {
        var that = this;
        $.getJSON("http://nominatim.openstreetmap.org/search?format=json&limit=1&q=" + country + "&polygon_geojson=1", function (geojsonFeature) {
            console.log("loaded country: " + country);
            that.countries[country] = L.geoJson(geojsonFeature[0].geojson);
        });
    },
    showSidebar: function () {
        $("#toggleSidebar").text("< Hide Sidebar");
        this.sidebar.show();
        $("#map-container").attr("class", "col-md-6");
        console.log(this.getBounds());
    },
    hideSidebar: function () {
        $("#toggleSidebar").text("Show Sidebar >");
        this.sidebar.hide();
        $("#map-container").attr("class", "col-md-12");
        console.log(this.getBounds());
    },
    initMap: function () {
        this.addLayer(this.cityMarkers);
        this.addLayer(this.countryMarkers);
        this.layersControl.addOverlay(this.cityMarkers, 'Cities');
        this.layersControl.addOverlay(this.countryMarkers, 'Countries');
        this.addControl(this.layersControl);
    }
});
