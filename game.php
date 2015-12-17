<?php
include("header.php");
//loading levels from json
$files = scandir(__DIR__ . "/games");
unset($files[0]);//odebrání tečkových virtuálních souborů
unset($files[1]);
$jsons = [];
foreach ($files as $file ) {
	$jsons[$file] = json_decode(file_get_contents(__DIR__ . "/games/" . $file));
}

//proměnná bez var je automaticky globální
echo "<script type=\"text/javascript\">
games = " . json_encode($jsons) . ";
</script>";
echo file_get_contents("plain-game.html");
include("footer.php");
