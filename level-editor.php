<?php
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
?>

<select id="level">
</select>

"Red" = 0
"Black" = 1
"Blue" = 2
"Violet" = 3
"Green" = 4
"Transparent" = 5

<div id="content"></div>

<input type="button" id="saveLevel" value="save level">

<script src="https://code.jquery.com/jquery-1.11.3.min.js"></script>
<script type="text/javascript" charset="utf-8" src="ts/Utils.js"></script>
<script type="text/javascript" charset="utf-8" src="ts/Color.js"></script>
<script type="text/javascript" charset="utf-8" src="ts/LevelEditor.js"></script>
