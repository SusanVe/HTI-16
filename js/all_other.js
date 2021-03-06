var ServerUrl = 'http://wwwis.win.tue.nl/2id40-ws/16';

function uploadData(address, xml) {
    $.ajax({
        type: "put",
        url: ServerUrl + address,
        contentType: 'application/xml',
        data: xml,
        async: false
    });
}

function onloadStuff(){
  var place = document.getElementById("timeslot");
  place.innerHTML = get("day", "current_day")+ "  -  " + get("time","time");
  setTimeout(onloadStuff, 1500);
}

function updateTemp(){
  var place2 = document.getElementById("cTemp");
  place2.innerHTML = get("currentTemperature", "current_temperature") + " °C";
  setTimeout(updateTemp, 1500);
}

function parseTime(t) {
    return parseFloat(t.substr(0,2)) + parseFloat(t.substr(3,2))/60;
}

/* Adds a heating period for a specific day
*/
function addPeriod(day, start, end) {
    var program = getWeekProgram()[day];
    program.push([start, end]);
    sortMergeProgram(day);
    setWeekProgram();
}

/* Removes a heating period from a specific day.
   idx is the idex of the period with values from 0 to 4
*/
function removePeriod(day, idx) {
    var program = getWeekProgram()[day];
    //var start = program[idx][0];
    //var end = program[idx][1];
    program.splice(idx,1);
    setWeekProgram();
}

/* Checks whether the temperature is within the range [5.0,30.0]
*/
function inTemperatureBoundaries(temp) {
  temp = parseFloat(temp);
  return ( temp >= MinTemperature && temp <= MaxTemperature);
}

var t= get("currentTemperature", "current_temperature");

function minTemp() {
    if (t > 5) {
        t= Math.round( 10 *(t-(+0.1)))/10;
        put("currentTemperature","current_temperature",t)
        document.getElementById("cTemp").innerHTML=t+" °C";
    }
}

function plusTemp() {
    if (t < 30) {
        t= Math.round( 10 *(t-(-0.1)))/10;
        put("currentTemperature","current_temperature",t)
        document.getElementById("cTemp").innerHTML=t+" °C";
    }
}

function getTemp() {
  var temp = get("currentTemperature", "current_temperature");
  document.getElementById("cTemp").innerHTML= temp;
}

  function submitDay(attribute_name, xml_tag, value){
    var dayTemp = document.getElementById("dayTemp").value;
    put("dayTemperature", "day_temperature", dayTemp);
  }

  function submitNight(attribute_name, xml_tag, value){
    var nightTemper = document.getElementById("nightTemp").value;
    put("nightTemperature", "night_temperature", nightTemper);
  }

  window.addEventListener("load", doFirst, false);

  function doFirst() {
      var button = document.getElementById('save_button');
      button.addEventListener("click", save, false);
      //display();
  }

  function save(){
      var one = document.getElementById('one').value;
      var two = document.getElementById('two').value;
      /*add various types of checks here*/
      if (one != "" && two != "") {
          sessionStorage.setItem(one,two);
          //display();
          document.getElementById('one').value="";
          document.getElementById('two').value="";
      }
  }

  function remove(id){
    var ind = (location.search.indexOf("="));
    var webday = location.search.substr(ind+1);
    removePeriod(webday, id);
    location.reload();
  }

  function removeAll(){
    var webday = location.search.substr(ind+1);
      for(var i = 1; i < 5; i++){
        removePeriod(webday, 0);
      }
    location.reload();
  }

  function display() {
      var rightbox = document.getElementById('rightbox');
      //rightbox.innerHTML="";
      if (sessionStorage.length==5) {
          document.getElementById('save_button').style="disabled";
      }
      for (var x=0;x<sessionStorage.length;x++) {
          var a = sessionStorage.key(x);
          var b = sessionStorage.getItem(a);
          /*add sorting here*/
          rightbox.innerHTML += "<img src='images/sun2.png' width='50px' /> "+a+" <img src='images/moon2.png' width='45px' onclick=\"remove();\" /> "+b+
  		"&nbsp;<img src='images/close2.png' width='30px' hspace='5' vspace='5' id='hover' align=right value='Remove' onclick=\"remove('"+a+"');\" /><br />";
      }
  }

  function pullProgram() {
    var days = ['Monday','Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    var ind = (location.search.indexOf("="));
    var webday = location.search.substr(ind+1);
    var result = getWeekProgram();
    for (var i = 0; i < 7; i++) {
      if(webday===days[i]){
      var array = result[days[i]];
      if(array.length >= 0) {
        var switchLeft = 5 - array.length;
        document.write("<h3>"+days[i]+"</h3><h5></br>Switches left: " + switchLeft  + "</h5></br>");
        for (var j = 0; j < array.length; j++) {
          var period = array[j];
          var id = j;
          document.write("<img src='images/sun2.png' width='50px' />" + period[0] +  " - " + period[1] + "&nbsp;" + "<img src='images/moon2.png' width='45px' onclick=\"remove();\"/>" +
          "<img src='images/close2.png' width='30px' hspace='5' vspace='5' id="+ id +" align=right value='Remove' onclick=\"remove(id);\" />" + "</br>");
        }
      }
      }
    }
  }

  ProgramState = "on";

  document.addEventListener('DOMContentLoaded', function () {
  var checkbox = document.querySelector('input[type="checkbox"]');

  checkbox.addEventListener('change', function () {
    if (checkbox.checked) {
      ProgramState = "off";
      put("weekProgramState", "week_program_state", ProgramState);
      console.log(ProgramState);
    } else {
      ProgramState = "on";
      put("weekProgramState", "week_program_state", ProgramState);
      console.log(ProgramState);
    }
  });
});
