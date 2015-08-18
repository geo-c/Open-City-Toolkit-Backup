var linkedDataAppArray = new Array("app1cygluchsddflsdfbl","app2","app3");
var linkedDataDatasetArray = new Array("dataset1","dataset2","dataset3");
var linkedDataCounterConsume = 1;
var linkedDataCounterGenerates = 1;

function addConsumeRow(){
	linkedDataCounterConsume = $('#myTableConsumes tr').length - 2;

	var newRow = $('<tr>');
	var cols = "";
	
	$container = $('<div class="form-group">');
	$dropDown = $('<select class="form-control consumes" id="'+linkedDataCounterConsume+'" style="margin-top:2%;"></select>');
	for ( var i = 0; i < linkedDataDatasetArray.length; i++){
		$li1 = $('<option value="'+linkedDataDatasetArray[i]+'"></option>').html(linkedDataDatasetArray[i]);
		$dropDown.append($li1);
	}	
	$container.append($dropDown);
	newRow.append($container);
	newRow.append($('<td><button class="ibtnDel" onclick="deleteRow(this.id)" id = "deleteBtnConsume'+linkedDataCounterConsume+'">Delete</button></td>'));
	$(".table.consumes").append(newRow);
	linkedDataCounterConsume++;
}

function addGeneratesRow(){
	linkedDataCounterGenerates = $('#myTableGenerates tr').length - 2;

	var newRow = $('<tr>');
	var cols = "";
	
	$container = $('<div class="form-group">');
	$dropDown = $('<select class="form-control generates" id="'+linkedDataCounterGenerates+'" style="margin-top:2%;"></select>');
	for ( var i = 0; i < linkedDataDatasetArray.length; i++){
		$li1 = $('<option value="'+linkedDataDatasetArray[i]+'"></option>').html(linkedDataDatasetArray[i]);
		$dropDown.append($li1);
	}	
	$container.append($dropDown);
	newRow.append($container);
	newRow.append($('<td><button class="ibtnDel" onclick="deleteRow(this.id)" id = "deleteBtnGenerate'+linkedDataCounterGenerates+'">Delete</button></td>'));
	$(".table.generates").append(newRow);
	linkedDataCounterGenerates++;
}

function deleteLinkedDataRow(id){
	$('#'+id).closest("tr").remove();
	linkedDataCounterConsume -= 1;
	linkedDataCounterGenerates -= 1;
	$('#addrow').attr('disabled', false).prop('value', "Add Row");
}


function saveLinkedData(){

	$(".form-control.application").each(function(i){
			console.log("Application: " + $(this)[0].value);
	});	
	
	$(".form-control.consumes").each(function(i){
			console.log("Consumes: " + $(this)[0].value);
	});	
	
	$(".form-control.generates").each(function(i){
			console.log("Generates: " + $(this)[0].value);
	});	
}

function initConsumesTable(){
	$tableConsume = $('<table id="myTableConsumes" style="width=20%;" class="table consumes" name = "myTable"></table>');
    $headConsume = $('<thead></thead>');
    $bodyConsume = $('<tbody></tbody>');
    $hlineConsume = $('<tr></tr>');
	
	$relation = $('<th></th>').html('<b>Consumes</b>');
	$hlineConsume.append($relation);
	
	$buttonAddConsume = $('<button/>', {
        text: 'Add dataset',
		id: 'btn_addConsume',
		click: function () { addConsumeRow(); }
	});
	
	$relation.append($('<th></th>').html($buttonAddConsume));
	$headConsume.append($hlineConsume);
	
	$tableConsume.append($headConsume);
	$tableConsume.append($bodyConsume);
	
	return $tableConsume;	
}

function initGeneratesTable(){
	$tableGenerates = $('<table id="myTableGenerates" style="width=20%;" class="table generates" name = "myTable"></table>');
    $headGenerates = $('<thead></thead>');
    $bodyGenerates = $('<tbody></tbody>');
    $hlineGenerates = $('<tr></tr>');
	
	$relation = $('<th></th>').html('<b>Generates</b>');
		
	$buttonAddGenerates = $('<button/>', {
        text: 'Add dataset',
		id: 'btn_addGenerates',
		click: function () { addGeneratesRow(); }
	});
	
	$relation.append($('<th></th>').html($buttonAddGenerates));
	$hlineGenerates.append($relation);
	$headGenerates.append($hlineGenerates);
	
	$tableGenerates.append($headGenerates);
	$tableGenerates.append($bodyGenerates);
	
	return $tableGenerates;
}
