States = ["AL","AK","AZ","AR","CA","CO","CT","DE","DC","FL","GA","HI","ID", "IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"];

function eventListener() {
  document.getElementsByName('startCity')[0].addEventListener("blur", validateCity);
  document.getElementsByName('endCity')[0].addEventListener("blur", validateCity);
  document.getElementsByName('startState')[0].addEventListener("blur", validateState);
  document.getElementsByName('endState')[0].addEventListener("blur", validateState);
  document.getElementById('inputBtn').addEventListener("click", updateUser);
}

function validateCity(event) {
  city = event.target.value;
  patt = /^[a-zA-Z]+([ ][a-zA-Z]+)*$/
  if (patt.test(city)) {
    event.target.nextElementSibling.innerHTML = "";
  } else {
    event.target.nextElementSibling.innerHTML = "Error, Input Invalid Ex. Chicago, San Francisco";
    event.target.focus();
  }
}

function validateState(event) {
  if (States.includes(event.target.value)) {
    event.target.nextElementSibling.innerHTML = "";
  } else {
    event.target.nextElementSibling.innerHTML = "Error, Input Invalid Ex. CA, ID, WY";
    event.target.focus();
  }
}

function updateUser() {
  console.log("called updateUser")
  var url = getURL();
  getData(url);
}

function getURL() {
  console.log("called getURL")
  var url = "/cgi-bin/cs213/mileageAjaxJSON"
  url += "?startCity=" + document.getElementsByName('startCity')[0].value;
  url += "&startState=" + document.getElementsByName('startState')[0].value;
  url += "&endCity=" + document.getElementsByName('endCity')[0].value;
  url += "&endState=" + document.getElementsByName('endState')[0].value;
  return url;
}

function getData(url) {
  console.log("called getData")
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    var nHTML = ""
    if (this.readyState == 4 && this.status == 200) {
      var json = JSON.parse(this.responseText);
      console.log(json.trip);
      nHTML = parseJSON(json);
      console.log(nHTML);
    } else if (this.readyState == 4) {
      console.log("failed");
      nHTML = "<p>Could not find the distance</p>";
      console.log(nHTML);
    }

    document.getElementById('distanceText').innerHTML = nHTML;
  };

  xhr.open("GET", url, true);
  xhr.send();
}

function parseJSON(json) {
  console.log("called parseJSON");

  var nHTML = "<p>";
  console.log(json.trip);
  nHTML += "The distance between" + json.trip.startCity + " and " + json.trip.endCity;
  nHTML += "is " + json.trip.miles + "miles.";
  
  for (var i = 0; i < json.trip.tmode.length; i++) {
      nHTML += "  " + json.trip.tmode[i] + "<br>";
      console.log("called for loop");
  }

  nHTML += "</p>";
  console.log(nHTML);

  return nHTML;
}
