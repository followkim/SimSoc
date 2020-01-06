<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">

<?php 
	$title = "SimSociety";
	$description = $title;
	
	// turn on error reporting
	error_reporting(E_ALL);
	ini_set('display_errors', true); 
	
	// DB Variables TODO must change
	$username = 'root';
	$password = 'R03ShamB0!';
	$hostspec = 'localhost';
	$database = 'simsoc';
	$phptype = 'mysql';
	$port = 3306;
	
	// is this a POST?
	$isPost = ($_SERVER['REQUEST_METHOD'] == 'POST')
	
?>

<head>
	<title><?php echo $title; ?></title>
	<meta http-equiv="content-type" content="text/html;charset=utf-8" />
	<meta name="description" content=<?php echo $description; ?> />
	<llink rel="icon" type="image/ico" href="http://www.pixieproject.org/favicon.ico" />

	<!-- #stylesheets -->
    <link href="css/default.css" rel="stylesheet" />

	<!-- #includes -->
	
	<!-- #scripts -->
    <script src="js/main.js"></script>
</head>

<!-- Connect to the database -->

<body onload="Init()">
<table>
	<tr>
		<td><img src="img/SimSocLogo.png"></td>
		<td><h1><?php echo $title; ?></h1></td>
	</tr>
</table>

<hr>


<h2>Population List</h2>
<form name="form1" method="post" action="index.php">

	<table><tr>
		<td>Population Size: <input   type="text" name="pop_size" id="pop_size" value=<?= $isPost?$_POST['pop_size']:50; ?>></td>
		<td>Needed: <input            type="text" name="pop_need" id="pop_need" value=<?= $isPost?$_POST['pop_need']:5; ?>></td>
		<td><input type="submit" value="Generate" /></td>
	</tr></table>
	<!-- button id="go" type="button">Reroll</button -->
</form>

<table width="100%"><tr>
<?php 
	// connect
		$mysqli = new mysqli($hostspec, $username, $password, $database, $port);
	if ($mysqli->connect_errno) {
		echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
	}

	if ($_SERVER['REQUEST_METHOD'] == 'POST') {
		$popSize = $_POST['pop_size'];
		$popNeed = $_POST['pop_need'];
		$sql = "CALL gen_pop('$popSize')";
	}
	else $sql = "CALL gen_pop(20)";

?>
		<script>
			SetNeeded(<?= $popNeed?>);
		</script>

<?php 
	
	$result = $mysqli->query($sql);
	if (!$result) {
		echo "Query failed" . $mysqli->errno  . ") " . $mysqli->error;
	} 

	// Generate the table
	$i = 0;
	$perrow = 10;

	while($row = $result->fetch_array()) {
		
	?>
		<script>
			addPopulation(<?= $i ?>,'<?= $row['name'] ?>', '<?= $row['gender'] ?>', <?= $row['age'] ?>, '<?= $row['jobClassCode'] ?>', <?= $row['job_skill'] ?>, '<?= $row['sinName'] ?>', <?= $row['sin_skill'] ?>);
		</script>
		<td id="p<?= $i ?>" onclick="SelectCell(p<?= $i ?>)">
			
			<b><?= $row['name'] ?></b> (<?= $row['gender'] ?>, <?= $row['age'] ?>y)
			<br><u>Job</u>:<?= $row['jobName'] ?> (<?= $row['job_skill'] ?>)
			<br><u>Crime</u>:<?= $row['sinName'] ?> (<?= $row['sin_skill'] ?>)
		</td>
	
	<?php
		$i += 1;
		if (($i % $perrow) == 0) {
			printf("</tr><tr>");
		}
		}
		printf ("Generated %d people.\n", $result->num_rows);
		$result->close();
	
?>


</tr></table>
<button id="show_pop" type="button" onclick="showPopulation()">showPopulation</button>

Selected: <span id="selected"></span>

    <p>
        <button id="go" disabled type="button" onclick="letsGo()">Go</button>
        <button id="pause" disabled type="button" onclick="pause()">Pause</button>

   <p>
        Year:<span id="year"></span><center>
            <table>
                <tr>
                    <td><canvas id="happiness_g" width="25" height="100" style="border:1px solid #d3d3d3;"></canvas><br /><span id="happiness" style="font-size: 8pt;">Happiness</span></td>
                    <td><canvas id="crime_g" width="25" height="100" style="border:1px solid #d3d3d3;"></canvas><br /><span id="crime" style="font-size: 8pt;">Crime</span></td>
                    <td><canvas id="hunger_g" width="25" height="100" style="border:1px solid #d3d3d3;"></canvas><br /><span id="hunger" style="font-size: 8pt;">Hunger</span></td>
                    <td><canvas id="religion_g" width="25" height="100" style="border:1px solid #d3d3d3;"></canvas><br /><span id="religion" style="font-size: 8pt;">Religion</span></td>
                    <td><canvas id="health_g" width="25" height="100" style="border:1px solid #d3d3d3;"></canvas><br /><span id="health" style="font-size: 8pt;">Health</span></td>
                    <td><canvas id="education_g" width="25" height="100" style="border:1px solid #d3d3d3;"></canvas><br /><span id="education" style="font-size: 8pt;">Education</span></td>
                    <td><canvas id="population_g" width="25" height="100" style="border:1px solid #d3d3d3;"></canvas><br /><span id="population" style="font-size: 8pt;">Population</span></td>
                </tr>
            </table>
        </center>

<span id="log"></span>
</body>


</html>
</body>

</html>
