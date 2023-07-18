<?php
	// Declaring some constants
	$fullname = $address = $email = $postal = $cardtype = "";

	// Regular expressions
	// $email_regexp = array("options"=>array("regex"=>"/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/"));
	$postal_regexp = array("options"=>array("regexp"=>"/^(?!.*[DFIOQU])[A-VXY][0-9][A-Z] ?[0-9][A-Z][0-9]$/"));

	// if statement for some conditions
	if($_SERVER["REQUEST_METHOD"] == "POST"){
		// Error message for fullname
		if(empty($_POST["fullname"])){
			die("* Full name is a Required field");
		}
		else{
			$fullname = test_input($_POST["fullname"]);
		}
		
		// Error message for address
		if(empty($_POST["address"])){
			die("* Address is a Required field");
		}
		else{
			$address = test_input($_POST["address"]);
		}

		// Error message for email address
		if(empty($_POST["email"])){
			die("* Email is a Required field");
		}
		else{
			$email = test_input($_POST["email"]);
		}

		if (!filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL)) {
			die("* Email is not valid");
		} 
		else {
			$email = test_input($_POST["email"]);
		}

		// Error message for postal code
		if(empty($_POST["postal"])){
			die("*Postal code is a Required field");
		}
		else{
			$postal = test_input($_POST["postal"]);
		}

		// function FILTER_VALIDATE_REGEXP( ){
		// 	array("options"=>array("regex"=>"/^(?!.*[DFIOQU])[A-VXY][0-9][A-Z] ?[0-9][A-Z][0-9]$/"));
		// }
		$post = 'R3H 0J9';
		if(!filter_input(INPUT_POST, "postal", FILTER_VALIDATE_REGEXP,$postal_regexp)) {
			die("* Postal Code is not formatted properly");
			$postal = test_input($_POST["postal"]);
		}
		else{
			$postal = test_input($_POST["postal"]);
		}


		// Error message for Province
		if(empty($_POST["province"])){
			die("* Province is a Required field");
		}
		else{
			$province = test_input($_POST["province"]);
		}

		// Error message for City
		if(empty($_POST["city"])){
			die("* City is a required field");
		}
		else{
			$city = test_input($_POST["city"]);
		}
	}

	// A function that checks the input and encodes against possible SQL injections
	function test_input($data){
		$data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
	}
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<title>Thanks for shopping at the WebDev Store!</title>
	<link rel="stylesheet" type = "text/css" href = "styles.css" />
</head>
<body>
    <div class = "invoice">
        <h2>Thanks for your order <?= $fullname ?>.</h2> 
        <h3>Here's a summary of your order:</h3>
        
        <table>
			<tr>
				<td colspan = "4">
					<h3>Address Information</h3>
				</td>
			</tr>
        
			<tr>
				<td class = "alignright">
					<span class = "bold">Address:</span>
				</td>
				<td> <?= $address ?> </td>
				<td class = "alignright">
					<span class = "bold">City:</span>
				</td>
				<td> <?= $city ?> </td>
			</tr>
        
			<tr>
				<td class = "alignright">
					<span class = "bold">Province:</span>
				</td>
				<td> <?= $province ?> </td>
				<td class = "alignright">
					<span class = "bold">Postal Code:</span>
				</td>
				<td> <?= $postal ?> </td>
			</tr>
	
			<tr>
				<td colspan = "2" class = "alignright">
					<span class = "bold">Email:</span>
				</td>
				<td colspan="2"><?= $email ?></td>
			</tr>
		</table>
	
		<table>
			<tr>
				<td colspan = "3">
				<h3>Order Information</h3>
				</td>
			</tr>

			<tr>
				<td>
					<span class = "bold">Quantity</span>
				</td>
				<td>
					<span class = "bold">Description</span>
				</td>
				<td>
					<span class = "bold">Cost</span>
				</td>
			</tr>
			
			<?php if(isset($_POST['cart'])) : ?>
					<?php for($i=0;$i<count($_SESSION['src']); $i++) : ?>
						<tr>
							<td> <?= $_SESSION['name'][$i] ?> </td>
							<td> <?= $_SESSION['src'][$i] ?> </td>
							<td> <?= $_SESSION['span'][$i] ?> </td>
						</tr>
					<?php endfor ?>
				<?php exit(); ?>
			<?php endif ?>
		
			<tr>
				<td colspan = "2"  class='alignright'>
				<span class = "bold">Totals</span>
				</td>
				<td class='alignright'>
				<span class = 'bold'>$ 0</span>		
				</td>
			</tr>
		</table>
	</div>
 </body>
</html>
