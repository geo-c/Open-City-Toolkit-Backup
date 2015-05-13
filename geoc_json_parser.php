<?php
//get json with data portals and convert it to php associative array
$url = "http://dataportals.org/api/data.json";
$dataPortals = json_decode(file_get_contents($url), true);

//connect to database
$host = "giv-lodumdata.uni-muenster.de";
$port = "0000";
$database = "postgres";
$user = "user";
$password = "password";
$connectionParameters = "host=".$host." port=".$port." dbname=".$database." user=".$user." password=".$password;
$connection = pg_connect($connectionParameters) or die("Could not connect");

//get datasets' table columns
$table = "Datasets";
$sql = "SELECT * FROM information_schema.columns WHERE table_name ='".$table."'";
$result = pg_query($connection, $sql);
$databaseColumns = array();
while($resultRow = pg_fetch_array($result)) {	
	array_push($databaseColumns, $resultRow[0]);
}

//iterate over the data portals and use them to populate the table:
foreach ($dataPortals as $portal) {
	$sql = "INSERT INTO ".$table;
	$sqlColumns = "(";
	$sqlValues = "VALUES(";
	//iterate over the properties of each portal:
	foreach($portal as $propertyName => $portalProperty) {
		if(in_array($propertyName, $databaseColumns) {
			if($propertyName == "location") {
				$sqlValues = $sqlValues."'POINT(".$portalProperty.")',";
			} else {
				//if property is string, it is added as is to INSERT statement: 
				$sqlColumns = $sqlColumns.$propertyName.",";
				if(is_string($portalProperty)) {
					//empty strings are treated as NULL values
					if(strlen($portalProperty) == 0) {
						$sqlValues = $sqlValues."NULL,";
					} else {
						$sqlValues = $sqlValues."'".$portalProperty."',";
					}
				//if property is array of strings, 
				//it is converted to string with array elements separated by commas, 
				//and then added to INSERT statement:
				} elseif(is_array($portalProperty)) {
					$sqlValues = $sqlValues."ARRAY[";
					foreach($portalProperty as $arrayElement) {
						$sqlValues = $sqlValues."'".$arrayElement."',";
					}
					//remove trailing comma
					$sqlValues = rtrim($sqlValues, ",");
					$sqlValues = $sqlValues."],";
				//if property is numeric, it is added to INSERT statement unquoted:
				} elseif(is_numeric($portalProperty)) {
					$sqlValues = $sqlValues.$portalProperty.",";
				//if property is boolean, it is added to INSERT statement unquoted:
				} elseif(is_bool($portalProperty)) { 
					$sqlValues= $sqlValues.var_export($portalProperty, true).",";
				//if property is php null, it is added to INSERT statement as NULL:	
				} elseif(is_null($portalProperty)) {
					$sqlValues = $sqlValues."NULL,";
				} else{
					//property is a JSON object?
				}
			}
		}
	}	
	$sqlColumns = $sqlColumns."phdtopics) ";
	$sqlValues = $sqlValues."NULL)";
	//finalise sql query string to send to database:
	$sql = $sql.$sqlColumns.$sqlValues;
	pg_query($connection, $sql);
}
?>
