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

	$hline.append($('<th></th>').html( '<b>Name</b>' ) );
	$hline.append($('<th></th>').html('<b>Beschreibung</b>'));
	$head.append($hline);
	$table.append($head);
	$.each(this.data, function (index, value) {
		var $bline = $( '<tr></tr>' );
		$bline.append( $( '<td></td>' ).html( '<a href="' + value.url + '">' + value.name + '</a>' ) );
		$bline.append( $( '<td></td>' ).html( value.description ) );
		$body.append( $bline );
	});
	$table.append($body);
	this._sidebar.append($table)
	
	this.dtable = $table.DataTable( 
		{
			searching: false,
	  	} 
  	);
};

Sidebar.prototype.clear = function () {
	this._sidebar.empty();
};

Sidebar.prototype.addAPI = function () {
	this.clear();
};

Sidebar.prototype.addData = function (data) {
	this.data = data;
};