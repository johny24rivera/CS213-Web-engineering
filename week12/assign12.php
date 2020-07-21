<?php
$fname = sanitize($_POST["first_name"]);
$lname = sanitize($_POST["last_name"]);
$address = sanitize($_POST["address"]);
$total = 0;


$phone = sanitize($_POST["phone"]);
$cardType = sanitize($_POST["card"]);
$cardNum = sanitize($_POST["credit_card"]);
$exp = sanitize($_POST["exp_date"]);

function sanitize($input)
{
  $value = $_GET[$input];
  $value = trim($value);
  $value = stripslashes($value);
  $value = htmlspecialchars($value);
  return $value;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Mortgage Calculator Rsponse</title>
  <link rel="stylesheet" href="MortgageCalculator.css" type="text/css"/>
</head>
<body>
<?php
  echo $fname;
?>

</body>