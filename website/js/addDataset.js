	var counter = 0;
	
	function addRow(){
		counter = $('#myTable tr').length - 2;

		var newRow = $('<tr>');
		var cols = "";

		cols += '<td><input type="text" name="continent' + counter + '" style = "width:100%;"/></td>';
		cols += '<td><input type="text" name="country' + counter + '" style = "width:100%;"/></td>';
		cols += '<td><input type="text" name="state' + counter + '" style = "width:100%;"/></td>';
		cols += '<td><input type="text" name="city' + counter + '" style = "width:100%;"/></td>';

		cols += '<td><button class="ibtnDel" onclick="deleteRow(this.id)" id = "deleteBtn'+counter+'">Delete</button></td>';
		newRow.append(cols);
		$(".table").append(newRow);
		//$(".table").append(newRow).enhanceWithin();
		counter++;
	}

	function deleteRow(id){
		$('#'+id).closest("tr").remove();
		counter -= 1
		$('#addrow').attr('disabled', false).prop('value', "Add Row");
	}
					
	function collectData(){
		var title = $('#title').val();
		var name = $('#name').val();
		var url = $('#url').val();
		var author = $('#author').val();
		var publisher = $('#publisher').val();
		var description = $('#description').val();
		var tags = $('#tags').val().split(";");
		var locations = getLocations();
		var languages = $('#languages').val().split(";");
		var status = $('#status').val();
		var apiEndpoint = $('#apiEndpoint').val();
		var date = createDate();
		sendData(title, name, url, author, publisher, description, tags, locations, languages, status, apiEndpoint, date);
	}
	
	function sendData(title, name, url, author, publisher, description, tags, locations, languages, status, apiEndpoint, date){
		if (checkData(title, url, locations)){
			$.post(
				"php/AddDataset.php?",
				{	
				title: title.trim(),
				name: name.trim(),
				url: url.trim(),
				author: author.trim(),
				publisher: publisher.trim(),
				description: description.trim(),
				tags: tags,
				locations: locations,
				languages:languages,
				status:status,
				apiEndpoint:apiEndpoint,
				date:date
				},
				function(data){
					if (data == ""){
						alert("Added data successfully");
						deleteFields();
					}
				}			
			);
		}
	}
	
	function deleteFields(){
		$('#title').val("");
		$('#name').val("");
		$('#url').val("");
		$('#author').val("");
		$('#publisher').val("");
		$('#description').val("");
		$('#tags').val("");
		$('#').val("");
		$('#languages').val("");
		$('#status').val("");
		$('#apiEndpoint').val("");
		$('#tbody').empty();
		addRow();	
	}
	
	function checkData(title, url, locations){
		var dataIsFine = true;
		if (title.trim() == "" || url.trim() == "" || locations[0].Continent == ""){
			alert("Required data is missing");
			dataIsFine = false;
		}
		return dataIsFine;
	}

	function getLocations(){
		var locations = [];
		$("tbody tr").each(function(i){
			console.log($(this).find("input")[0].value);
			var location = {"Continent": $(this).find("input")[0].value,
							"Country": $(this).find("input")[1].value,
							"State": $(this).find("input")[2].value,
							"City": $(this).find("input")[3].value
							}
			locations.push(location);					
		});
		console.log(locations);
		return locations;
	}
	
	function createDate(){
		var dateObj = new Date();
		var month = dateObj.getUTCMonth() + 1; //months from 1-12
		var day = dateObj.getUTCDate();
		var year = dateObj.getUTCFullYear();
		newdate = year + "-" + month + "-" + day;
		return newdate;
	}
			