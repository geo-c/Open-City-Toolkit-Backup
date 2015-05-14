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
					that.sidebar.dtable.search(value.name);
					that.sidebar.dtable.draw();
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
		this.toggleButton.addTo(this);
		
		$("#toggleSidebar").text("Show Sidebar >");
		$("#sidebar-container").hide();

		$("#toggleSidebar").on('click', function (e) {
			if($("#toggleSidebar").text() == "Show Sidebar >") {
				$("#toggleSidebar").text("< Hide Sidebar");
				$("#sidebar-container").show();
				$("#map-container").attr("class","col-md-6 pull-right");
			} else {
				$("#toggleSidebar").text("Show Sidebar >");
				$("#sidebar-container").hide();
				$("#map-container").attr("class","col-md-12 pull-right");
				    
			}		
		});
	},

	initMap: function () {
		this.addLayer(this.markers);
	}
});
