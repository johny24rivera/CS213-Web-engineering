total = 0;

function validateName(event) {
  console.log("called")
  var name = event.target.value;
  var name1 = event.value;
  var patt = /^[A-Za-z]+$/;

  if (patt.test(name)) {
    event.target.nextElementSibling.style.visibility = "";
    console.log(event.target.nextElementSibling);
    return true;
  } else {
    event.target.nextElementSibling.style.visibility = "visible";
    console.log(event.target.nextElementSibling);
    return false;
  }
}

function validateAddress(event) {
  var address = event.target.value;
  var patt = /^\d+\s\w+/

  if (patt.test(address)) {
    event.target.nextElementSibling.style.visibility = "hidden";
    return true;
  } else {
    event.target.nextElementSibling.style.visibility = "visible";
    return false;
  }
}

function validatePhone(event) {
  var phone = event.target.value;
  var patt = /^\d{3}-\d{3}-\d{4}$/;

  if (patt.test(phone)) {
    event.target.nextElementSibling.style.visibility = "hidden";
    return true;
  } else {
    event.target.nextElementSibling.style.visibility = "visible";
    return false;
  }
}

function updateTotal(event) {
  if (event.target.checked) {
    total += Number(event.target.value);
  } else {
    total -= Number(event.target.value);
  }

  document.getElementsByName("total")[0].innerHTML = "$" + total;
}

function validateCCN(event) {
  var ccn = event.target.value;
  var patt = /^\d{4}[ ]\d{4}[ ]\d{4}[ ]\d{4}$/;

  if (patt.test(ccn)) {
    event.target.nextElementSibling.style.visibility = "hidden";
  } else {
    event.target.nextElementSibling.style.visibility = "visible";
  }
}

function validateCCNexp(event) {
  var exp = event.target.value;
  var patt = /^[01]\d\/\d{4}$/;

  var month = Number(exp.slice(0, 2));
  console.log(month);
  var year = Number(exp.slice(3));
  console.log(year);

  if (!patt.test(exp)) {
    event.target.nextElementSibling.innerHTML = "Error: Invalid Expiration Date Ex. 01/2019";
    return false;
  } else if (month > 12 || month < 1) {
    event.target.nextElementSibling.innerHTML = "Error: Month Value invalid - Month needs to be between 01 - 12";
    return false;
  } else if (year <= 2017) {
    event.target.nextElementSibling.innerHTML = "Error: Year Value Invalid - Year needs to be greater than 2017";
    return false;
  } else {
    event.target.nextElementSibling.innerHTML = "";
    return true;
  }

  event.target.nextElementSibling.style.visibility = "visible";
}

function reset() {
  total = 0;
  document.getElementsByName("total")[0].innerHTML = "$" + total;
}

function validateForm() {
  event.preventDefault();

  log.console("submission called")
  var value = document.getElementsByName('first_name')[0].value;
  var patt = /^[A-Za-z]+$/;

  if (!patt.test(value)) {
    document.getElementsByName('first_name')[0].focus();
    return false;
  }

  document.getElementsByName('form')[0].submit();
}

function eventListeners() {
  document.getElementsByName('first_name')[0].addEventListener("blur", validateName);
  document.getElementsByName('last_name')[0].addEventListener("blur", validateName);
  document.getElementsByName('address')[0].addEventListener("blur", validateAddress);
  document.getElementsByName('phone')[0].addEventListener("blur", validatePhone);
  document.getElementsByName('credit_card')[0].addEventListener("blur", validateCCN);
  document.getElementsByName('exp_date')[0].addEventListener("blur", validateCCNexp);
  document.getElementsByName('item_0')[0].addEventListener("click", updateTotal);
  document.getElementsByName('item_1')[0].addEventListener("click", updateTotal);
  document.getElementsByName('item_2')[0].addEventListener("click", updateTotal);
  document.getElementsByName('item_3')[0].addEventListener("click", updateTotal);
  document.getElementsByName('reset')[0].addEventListener("click", reset);
  document.getElementsByName('form')[0].addEventListener("submit", validateForm);
}