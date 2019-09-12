<?php
$fn="placeQ.txt";
$file = file_get_contents($fn);
preg_match_all('#\bhttps?://[^,\s()<>]+(?:\([\w\d]+\)|([^,[:punct:]\s]|/))#', $file, $match);

$result = array_unique($match[0]);
for($i=0;$i<=sizeof($result)-1;$i++){
	$pos = strpos($result[$i], "google");
	$pos1 = strpos($result[$i], "gstatic");
	$pos2 = strpos($result[$i], ".jpg");
	$pos3 = strpos($result[$i], ".png");
	if (($pos === false)) {
		
		if (($pos1 === false)) {
			if (($pos2 === false)) {
				if (($pos3 === false)) {
if(!($result[$i] === NULL)) {

			echo $result[$i] . "<br>";
}
		}
	}
}
	}
}
?>
