<?php
$conn_string = "host=*** port=*** dbname=*** user=*** password=***";
$dbconn = pg_connect($conn_string);

$result = pg_query($dbconn, 'SELECT * FROM "Datasets"');

$resultArray = pg_fetch_all($result);
$json = json_encode($resultArray);
echo $json;

?>