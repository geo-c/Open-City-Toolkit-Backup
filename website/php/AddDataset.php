<?php
	$dbconn = pg_connect("host=giv-lodumdata.uni-muenster.de port=5432 dbname=DatasetsCollection user=postgres password=Life#2013")
		or die('Verbindungsaufbau fehlgeschlagen: ' . pg_last_error());

	header("Content-Type: text/html; charset=utf-8");  
	
	$title = $_POST['title'];
	$name = $_POST['name'];
	$url = $_POST['url'];
	$author = $_POST['author'];
	$publisher = $_POST['publisher'];
	$description = $_POST['description'];
	$tags = createArrayText($_POST['tags']);
	$languages = createArrayText($_POST['languages']);	
	$status = $_POST['status'];
	$apiEndpoint = $_POST['apiEndpoint'];
	$date = $_POST['date'];
	$locations = $_POST['locations'];
	
	function createArrayText($array){
	$arraytext = "ARRAY[";
	for ( $i = 0; $i < count($array); $i++){
		$arraytext = $arraytext."'".$array[$i]."',";
	}
	$arraytext = substr($arraytext, 0, -1);
	$arraytext = $arraytext."]";
	return $arraytext;
	}
	
	$StaffQuery=pg_query($dbconn,"insert into \"Datasets\" values (default,'".$title."','".$name."','".$url."','".$author."','".$publisher.
							"','".$description."',".$tags.",".$languages.",'".$status."','".$apiEndpoint."',ARRAY[''],0,0,0,0,'".$date."') RETURNING id;");
							
	$returnedContent = pg_fetch_row($StaffQuery);
	$returnedID = substr($returnedContent[0], 0, strlen($returnedContent[0]));
	
	for ($i = 0; $i < count($locations); $i++){
		$continent = $locations[$i]["Continent"];
		$country = $locations[$i]["Country"];
		$state = $locations[$i]["State"];
		$city = $locations[$i]["City"];		
		$StaffQuery=pg_query($dbconn,"insert into \"Location\" values (default,'".$returnedID."','".$continent."','".$country."','".$state."','".$city."')");
	}

	
?>