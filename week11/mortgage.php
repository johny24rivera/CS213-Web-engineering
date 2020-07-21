<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Mortgage Calculator Rsponse</title>
  <link rel="stylesheet" href="MortgageCalculator.css" type="text/css"/>
</head>
<body>
  <section id="response">
  <?php
    $apr = $_GET["apr"] / 100;
    $terms = $_GET["term"];
    $amount = $_GET["amount"];

    $D = (pow($apr + 1, $terms) - 1) / ($apr * pow(1 + $apr, $terms));
    $pay = $amount / $D;

    echo "<div><h1>APR:</h1><p>", $apr, "</p></div>";
    echo "<div><h1>Amount of Terms:</h1><p>", $terms, "</p></div>";
    echo "<div><h1>Loan Amount:</h1><p>$", $amount, "</p></div>";
    echo "<div><h1>Monthly Payment:</h1><p>$", number_format($pay, 2, '.', ''), "</p></div>";

  ?>
  </section>
</body>
</html>