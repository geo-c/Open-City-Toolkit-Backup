var Sidebar = function () {
    this.dtable = null;
    this._sidebar = $('#sidebar');
    this.data = null;
};

Sidebar.prototype.fillData = function () {
    this.clear();
    $table = $('<table id="datatable" class="display" style="width=100%;"></table>');
    $head = $('<thead></thead>');
    $body = $('<tbody></tbody>');
    $hline = $('<tr></tr>');

    $hline.append($('<th></th>').html('<b>Name</b>'));
    $hline.append($('<th></th>').html('<b>Beschreibung</b>'));
    $head.append($hline);
    $table.append($head);
    $.each(this.data, function (index, value) {
        var $bline = $('<tr></tr>');
        $bline.append($('<td></td>').html('<a href="' + value.url + '">' + value.name + '</a>'));
        $bline.append($('<td></td>').html(value.description));
        $body.append($bline);
    });
    $table.append($body);
    this._sidebar.append($table);

    this.dtable = $table.DataTable();

    $('datatables_filter').css("display", "none");
};

Sidebar.prototype.hide = function () {
    $("#sidebar-container").hide();
};

Sidebar.prototype.show = function () {
    $("#sidebar-container").show();
};

Sidebar.prototype.filterTable = function (term) {
    this.dtable.search(term);
    this.dtable.draw();
};

Sidebar.prototype.clear = function () {
    this._sidebar.empty();
};

Sidebar.prototype.addAPI = function () {
    this.clear();
	$div = $('<div id = "formSheet">');
	
	$header = $('<h4>Add Dataset</h4>');
	$div.append($header);
	
	$titleLabel = $('<label for="text-3">Title*:</label>');
	$titleTextField = $('<input type="text" class="form-control" name="text-3" id="title" value="">');
	$nameLabel = $('<label for="text-3">Name:</label>');
	$nameTextField = $('<input type="text" class="form-control" name="text-1" id="name" value="">');
	$urlLabel = $('<label for="text-3">Url*:</label>');
	$urlTextField = $('<input type="text" class="form-control" name="text-3" id="url" value="">');
	$authorLabel = $('<label for="text-3">Author:</label>');
	$authorTextField = $('<input type="text" class="form-control" name="text-3" id="author" value="">');	
	$publisherLabel = $('<label for="text-3">Publisher:</label>');
	$publisherTextField = $('<input type="text" class="form-control" name="text-3" id="publisher" value="">');	
	$descriptionLabel = $('<label for="text-3">Descrription:</label>');
	$descriptionTextField = $('<input type="text" class="form-control" name="text-3" id="description" value="">');	
	$tagsLabel = $('<label for="text-3">Tags:</label>');
	$locationTextField = $('<input type="text" class="form-control" name="text-3" id="tags" value="" placeholder="Tags separated by ;">');	
	
	$div.append($titleLabel);$div.append($titleTextField);$div.append($nameLabel);$div.append($nameTextField);
	$div.append($urlLabel);$div.append($urlTextField);$div.append($authorLabel);$div.append($authorTextField);
	$div.append($publisherLabel);$div.append($publisherTextField);$div.append($descriptionLabel);$div.append($descriptionTextField);
	$div.append($tagsLabel);$div.append($locationTextField);
	
	$tablehead = $('</br><label for="myTable">Locations*:</label>');
	$table = $('<table id="myTable" class="table" name = "myTable"></table>');
    $head = $('<thead></thead>');
    $body = $('<tbody></tbody>');
    $hline = $('<tr></tr>');
	
	$hline.append($('<th></th>').html('<b>Continent</b>'));
    $hline.append($('<th></th>').html('<b>Country</b>'));
	$hline.append($('<th></th>').html('<b>State</b>'));
    $hline.append($('<th></th>').html('<b>City</b>'));
	
	$buttonAdd = $('<button/>', {
        text: 'More',
		id: 'btn_add',
		click: function () { addRow(); }
	});
	
	$hline.append($('<th></th>').html($buttonAdd));
	$head.append($hline);
	
	var $bline = $('<tr></tr>');
	$bline.append($('<td></td>').html('<input type="text" name="continent"/>'));
	$bline.append($('<td></td>').html('<input type="text" name="country" />'));
	$bline.append($('<td></td>').html('<input type="text" name="state" />'));
	$bline.append($('<td></td>').html('<input type="text" name="city" />'));

	$buttonDel = $('<button/>', {
        text: 'Delete',
		id: 'btn_del',
		click: function () { deleteRow(this.id); }
	});	
	
	$bline.append($('<td></td>').html($buttonDel));
	$body.append($bline);	
	
	$table.append($head);
	$table.append($body);
	$div.append($tablehead);
	$div.append($table);

	$languagesLabel = $('<label for="text-3">Languages:</label>');
	$languagesField = $('<input type="text" class="form-control" name="text-3" id="languages" value="" placeholder="Languages separated by ;">');	
	$statusLabel = $('<label for="text-3">Status:</label>');
	$statusField = $('<input type="text" class="form-control" name="text-3" id="status" value="" placeholder="active, inactive...">');	
	$apiEndLabel = $('<label for="text-3">API Endpoint:</label>');
	$apiEndField = $('<input type="text" class="form-control" name="text-3" id="apiEndpoint" value="" placeholder="Enter URL here">');	
	$annotation = $('<p>* required</p>');
	
	$div.append($languagesLabel);$div.append($languagesField);$div.append($statusLabel);$div.append($statusField);
	$div.append($apiEndLabel);$div.append($apiEndField);
	$div.append($annotation);
	
	$buttonSendData = $('<button/>', {
        text: 'Send Data',
		id: 'btn_send',
		click: function () { collectData(); }
	});	
	
	$div.append($buttonSendData);
	this._sidebar.append($div);
};

Sidebar.prototype.addData = function (data) {
    this.data = data;
};

Sidebar.prototype.parser = function (data) {
    this.clear();
    $buttonDiv = $('<div id = "buttons"></div>');
    $parserDiv = $('<div id = "urls"></div>');
    this._sidebar.append($buttonDiv);
    this._sidebar.append($parserDiv);
};

Sidebar.prototype.linkedData = function (data) {
    this.clear();
    
    $container = $('<div class="form-group" id ="app">');
    $header = $('<label for="sel2">Select Application:</label>');
	$dropDown = $('<select class="form-control application" id="sel2"></select>');
	for ( var i = 0; i < linkedDataAppArray.length; i++){
		$li1 = $('<option value="'+linkedDataAppArray[i]+'"></option>').html(linkedDataAppArray[i]);
		$dropDown.append($li1);
	}
	$container.append($header);
	$container.append($dropDown);
	this._sidebar.append($container);	

	$consumesTable = initConsumesTable();
	//this._sidebar.append($consumesTable);
	
	$generatesTable = initGeneratesTable();
	//this._sidebar.append($generatesTable);	

	$table = $('<table class="table" name = "myTable"></table>');
    $head = $('<thead></thead>');
    $body = $('<tbody></tbody>');
    $hline = $('<tr></tr>');
    $hline.append($generatesTable);
    $hline.append($consumesTable);
    $body.append($hline);
    $table.append($head);
    $table.append($body);
	this._sidebar.append($table);
	
	$buttonSave = $('<button/>', {
        text: 'Save',
		id: 'btn_save',
		click: function () { saveLinkedData(); }
	});		
	this._sidebar.append($buttonSave);

};
