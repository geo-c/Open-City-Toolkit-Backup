var Map = L.Map.extend({
	/***Variables
	*
	*
	*/
	data: null,
	markers: L.markerClusterGroup({ chunkedLoading: true }),
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
			if(value.location && value.location != "#N/A" && value.location != "") {
				loc = value.location.split(",");
				var latlng = [loc[0], loc[1]];
				var marker = L.marker(latlng);
				marker.on('click', function (e) {
					that.sidebar.filterTable(srch);
					$("#toggleSidebar").text("< Hide Sidebar");
					$("#sidebar-container").show();
					$("#map-container").attr("class","col-md-6");
				});
				that.markers.addLayer(marker);
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
		$("#map-container").attr("class","col-md-6 pull-right");

		this.toggleButton.addTo(this);

		var that = this;
		$("#toggleSidebar").on('click', function (e) {
			if($("#toggleSidebar").text() == "Show Sidebar >") {
				that.showSidebar();
			} else {
				that.hideSidebar();				    
			}		
		});
	},

	showSidebar: function () {
		$("#toggleSidebar").text("< Hide Sidebar");
		this.sidebar.show();
		$("#map-container").attr("class","col-md-6 pull-right");
		console.log(this.getBounds());
	},

	hideSidebar: function () {
		$("#toggleSidebar").text("Show Sidebar >");
		this.sidebar.hide();
		$("#map-container").attr("class","col-md-12 pull-right");
		console.log(this.getBounds());
	},

	initMap: function () {
		this.addLayer(this.markers);
	}
});
