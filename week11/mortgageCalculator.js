function validateAPR() {
  x = document.getElementById('apr').value;

  if (x == "" || x == null){
    document.getElementById('aprError').innerHTML = "Please enter a value.";
    document.getElementById('apr').focus();
    return true;
  } else if (x < 0 || x > 25) {
    document.getElementById('aprError').innerHTML = "Invalid value: must be between 0 - 25";
    document.getElementById('apr').focus();
    return true;
  } else {
    document.getElementById('aprError').innerHTML = "";
    return false;
  }
}

function validateTerm() {
  x = document.getElementById('term').value;

  if (x == "" || x == null) {
    document.getElementById('termError').innerHTML = "Please enter a value.";
    document.getElementById('term').focus();
    return true;
  } else if (x < 0 || x > 40) {
    document.getElementById('termError').innerHTML = "Invalid value: must be between 0 - 40";
    document.getElementById('term').focus();
    return true;
  } else {
    document.getElementById('termError').innerHTML = "";
    return false;
  }
}

function validateAmount() {
  x = document.getElementById('amount').value;

  if (x == "" || x == null) {
    document.getElementById('amountError').innerHTML = "Please enter a value.";
    document.getElementById('amount').focus();
    return true;
  } else {
    document.getElementById('amountError').innerHTML = "";
    return false;
  }
}

function validateForm() {
  validateAPR();
  validateTerm();
  validateAmount();
}

function calculateMortgage(APR, Term, Amount) {
  validateForm();

  if (validateAPR()) { return; }
  if (validateTerm()) { return; }
  if (validateAmount()) { return; }

  n = Number(Term);
  i = Number(APR/100);
  i /= 12;
  n *= 12;

  D = (Math.pow(1 + i, n) - 1) / (i * Math.pow(1 + i, n));

   var payment = Number(Amount) / D;

}

//document.getElementById('calculate').addEventListener(click, validateForm);