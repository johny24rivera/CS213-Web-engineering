function eventListener() {
  document.getElementById("US").addEventListener("click", getCountryText);
  document.getElementById("MX").addEventListener("click", getCountryText);
  document.getElementById("CA").addEventListener("click", getCountryText);
  document.getElementById("RU").addEventListener("click", getCountryText);
  document.getElementById("studentBtn").addEventListener("click", getJSONText);
}

function getCountryText(event) {
  var file = event.target.value + ".txt";
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var lines = this.responseText.split('\n');
      var input = "<p>";
      for(var i = 0;  i < lines.length; i++){
        input += lines[i] + "<br>";
      }

      input += "</p>";
      document.getElementById("countryInfo").innerHTML = input;
      document.getElementById("countryInfo").style.border = "thin solid";
    }
  };
  xhr.open("GET", file, true);
  xhr.send();
}

function getJSONText() {
  var filename = document.getElementById("studentInput").value;
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var json = JSON.parse(this.responseText);
      console.log(json.students);
      var nHTML = "";
      for (var i = 0; json.students[i]; i++) {
        nHTML += "<p>" + json.students[i].first + " ";
        nHTML += json.students[i].last + ",<br>";
        nHTML += json.students[i].major + ": ";
        nHTML += json.students[i].gpa + " GPA</p>";
      }
      document.getElementById('studentView').innerHTML = nHTML; 
      document.getElementById("studentView").style.border = "thin solid";
      document.getElementById("studentView").style.color = "black";
    }
    else if (this.status == 404) {
      document.getElementById('studentView').innerHTML = "<p>ERROR: File Not Found.</p>";
      document.getElementById("studentView").style.color = "red";
      document.getElementById("studentView").style.border = "unset";
      return;
    }
  };

  xhr.open("GET", filename, true);
  xhr.send();
}
