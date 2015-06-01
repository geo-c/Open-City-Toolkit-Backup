<?php
$conn_string = "host=giv-lodumdata.uni-muenster.de port=5432 dbname=DatasetsCollection user=postgres password=Life#2013";
$dbconn = pg_connect($conn_string);
$result = pg_query($dbconn, 'SELECT * FROM "Datasets"');
$resultArray = pg_fetch_all($result);

if ( count($resultArray) > 0 ){
	for ( $i = 0; $i < count($resultArray); $i++ ){
		$locationsQuery = pg_query($dbconn, 'SELECT * FROM "Location" WHERE dataset_id = '.$resultArray[$i]["id"].'');
		$locations = pg_fetch_all($locationsQuery);
		$locationsJson = json_encode($locations);
		$resultArray[$i]["locations"] = $locationsJson;
	}
}

$json = json_encode($resultArray, JSON_PRETTY_PRINT);

echo "<pre>".$json."</pre>";

?>