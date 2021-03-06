function checkName(event) {
  var name = event.target.value;
  var patt = /^[A-Za-z]+$/;

  if (patt.test(name)) {
    event.target.nextElementSibling.innerHTML = "";
  } else {
    event.target.nextElementSibling.innerHTML = "Error: Input Invalid Ex. 'John Doe'";
  }
}

function validateName(element) {
  var name = element.value;
  var patt = /^[A-Za-z]+$/;

  if (patt.test(name)) {
    element.nextElementSibling.innerHTML = "";
    return true;
  } else {
    element.nextElementSibling.innerHTML = "Error: Input Invalid Ex. 'John Doe'";
    element.focus();
    return false;
  }
}

function checkID(event) {
  var str = event.target.value;
  var patt = /[0-9]/

  if (str.length == 2 || str.length == 6) {
    event.target.value = str + '-';
  }
  
  if (str.length > 11 || !patt.test(str.slice(str.length - 1, str.length))) {
    event.target.value = str.substring(0, str.length - 1);
  }

  if (str.length == 11) {
    event.target.nextElementSibling.innerHTML = ""
  }
}

function validateID(element) {
  var str = element.value;

  if (str.length < 11) {
    element.nextElementSibling.innerHTML = "Error: Id is too small Ex. '74-466-8956'"
    element.focus();
    return false;
  } else {
    element.nextElementSibling.innerHTML = ""
    return true;
  }
}

function checkPerformance(event) {
  if (event.target.value == "duet") {
    document.getElementById("secondPerson").style.display = "contents";
  } else {
    document.getElementById("secondPerson").style.display = "none";
  }
}

function validateDropdown(element) {
  if(element.value != "") {
    element.nextElementSibling.innerHTML = "";
    return true;
  } else {
    element.focus();
    element.nextElementSibling.innerHTML = "This needs to be filled out";
    return false;
  }
}

function checkDropdown(event) {
  if (event.target.value != "") {
    event.target.nextElementSibling.innerHTML = "";
    return true;
  } else {
    event.target.focus();
    event.target.nextElementSibling.innerHTML = "This needs to be filled out";
    return false;
  }
}

function validateForm(event) {
  event.preventDefault();

  //Declarations
  var performance = document.getElementsByName('performance')[0];
  var fname = document.getElementsByName("first_name")[0];
  var fname2 = document.getElementsByName("first_name_2")[0];
  var lname = document.getElementsByName("last_name")[0];
  var lname2 = document.getElementsByName("last_name_2")[0];
  var id = document.getElementsByName("student_id")[0];
  var skill = document.getElementsByName('skill')[0];
  var id2 = document.getElementsByName("student_id_2")[0];
  var play = document.getElementsByName("instrument")[0];
  var location = document.getElementsByName('location')[0];
  var room = document.getElementsByName('room')[0];
  var time = document.getElementsByName('time_slot')[0];

  //Validations
  if (!validateDropdown(performance)) {
      return;
  } else if (!validateName(fname)) {
    return;
  } else if (!validateName(lname)) {
    return;
  } else if (!validateID(id)) {
    return;
  } else if (performance.value == "duet") {
    if (!validateName(fname2)) {
      return;
    } if (!validateName(lname2)) {
      return;
    } if (!validateID(id2)) {
      return;
    }
  } else if (!validateDropdown(skill)) {
    return;
  } else if (!validateDropdown(play)) {
    return;
  } else if (!validateDropdown(location)) {
    return;
  } else if (!validateDropdown(room)) {
    return;
  } else if (!validateDropdown(time)) {
    return;
  }


  getJson();
  event.target.submit();
}

function getJson() {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 & this.status == 200) {
      var response = this.responseText;
      response = JSON.parse(response);
      displayResults(response);
    }
  }

  var theForm = document.getElementsByName('studentForm')[0];
  var theData = new FormData(theForm);

  xhr.open("GET", "data1.txt", true);
  xhr.send();
}

function displayResults(response) {
  var output = "";

  for (student of response) {
      output += '<div class="prevSignedUp"><h3 class="studentName">' + student.fname + " " + student.lname;
      if (student.performance == "duet")
      {
          output += " & " + student.fname2 + " " + student.lname2; 
      }
    output += "</h3><p>" + student.performance + '<br>';
    output +=  "ID: " + student.id + '<br>';

    if (student.performance == "duet") {
      output += " ID of 2nd Student: " + student.id2 +  '<br>';
    }

    output += "Playing " + student.instrument + "<br>";
    output += "Location: " + student.location + " Building in Room " + student.room + "<br>";
    output += "When: " + student.time + "</p></div>";
  }

    document.getElementById("displayWait").innerHTML = output;
}

function eventListeners() {
  getJson();

  document.forms[0].elements[1].addEventListener(   "blur", checkName);
  document.getElementsByName('last_name')[0].addEventListener(    "blur", checkName);
  document.getElementsByName('first_name_2')[0].addEventListener( "blur", checkName);
  document.getElementsByName('last_name_2')[0].addEventListener(  "blur", checkName);
  document.getElementsByName('performance')[0].addEventListener(  "click", checkPerformance);
  document.getElementsByName('student_id')[0].addEventListener(   "input", checkID);
  document.getElementsByName('student_id_2')[0].addEventListener( "input", checkID);
  document.getElementsByName('performance')[0].addEventListener(  "blur", checkDropdown);
  document.getElementsByName('skill')[0].addEventListener(        "blur", checkDropdown);
  document.getElementsByName('location')[0].addEventListener(     "blur", checkDropdown);
  document.getElementsByName('room')[0].addEventListener(         "blur", checkDropdown);
  document.getElementsByName('time_slot')[0].addEventListener(    "blur", checkDropdown);
  document.getElementsByName("instrument")[0].addEventListener(   "blur", checkDropdown)
  document.getElementsByName("studentForm")[0].addEventListener(  "submit", validateForm);
}
