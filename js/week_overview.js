var ServerUrl = 'http://wwwis.win.tue.nl/2id40-ws/16';

Type = {
    Day : 'day',
    Night : 'night'
};

Days = {
    Monday : 'Monday',
    Tuesday : 'Tuesday',
    Wednesday : 'Wednesday',
    Thursday : 'Thursday',
    Friday : 'Friday',
    Saturday : 'Saturday',
    Sunday : 'Sunday'
};

var MinTemperature = parseFloat(5.0);
var MaxTemperature = parseFloat(30.0);
var MaxSwitches = 5;

var Time;
var CurrentDay;
var DayTemperature;
var NightTemperature;
var CurrentTemperature;
var TargetTemperature;
var ProgramState;

var Program = {};
Program[Days.Monday]    = [];
Program[Days.Tuesday]   = [];
Program[Days.Wednesday] = [];
Program[Days.Thursday]  = [];
Program[Days.Friday]    = [];
Program[Days.Saturday]  = [];
Program[Days.Sunday]    = [];

window.addEventListener("load", doFirst, false);

function doFirst() {
    var button = document.getElementById('save_button');
    button.addEventListener("click", save, false);
    display();
}

function save(){
    var one = document.getElementById('one').value;
    var two = document.getElementById('two').value;
    /*add various types of checks here*/
    if (one != "" && two != "") {
        sessionStorage.setItem(one,two);
        display();
        document.getElementById('one').value="";
        document.getElementById('two').value="";
    }
}

function remove(item){
    sessionStorage.removeItem(item);
    display();
    document.getElementById('one').value="";
    document.getElementById('two').value="";
}

function removeAll(){
    setDefault();
    sessionStorage.clear();
    display();
    document.getElementById('one').value="";
    document.getElementById('two').value="";
}

function display() {
    var rightbox = document.getElementById('rightbox');
    rightbox.innerHTML="";
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
function getProgram(day) {
    return Program[day];
}

function pullProgram() {
  var days = ['Monday','Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  var result = getWeekProgram();
  for (var i = 0; i < 7; i++) {
    var array = result[days[i]];
    if(array.length > 0) {
      document.write("<h4>"+days[i]+ "</h4>");
      for (var j = 0; j < array.length; j++) {
        var period = array[j];
        document.write("Begin: " + period[0] + "End: " + period[1] + "</br>");
      }
    }
  }
}

function outputData() {
  var result = getWeekProgram();
  var dayResObject = result['Tuesday'];
  var dayResArr = dayResObject[0];
  var lowerBound = dayResArr[0];
  var upperBound = dayResArr[1];
  document.write("Start Time; " + lowerBound + "End Time: " + upperBound);
}

function getWeekProgram() {
    return requestData(
        '/weekProgram',
        function(data) {
            $(data).find('day').each(function() {
                var day = $(this).attr('name');
                Program[day] = [];
                $(this).find('switch').each(function() {
                    if ($(this).attr('state') == 'on') {
                        if ($(this).attr('type') == Type.Day) {
                            getProgram(day).push([$(this).text(), '00:00']);
                        } else {
                            getProgram(day)[getProgram(day).length - 1][1] = $(this).text();
                        }
                    }
                })
            });
            return Program;
        }
    );
}

function requestData(address, func) {
    var result;
    $.ajax({
        type: "get",
        url: ServerUrl + address,
        dataType: "xml",
        async: false,
        success: function(data) {
            result = func(data);
        }
    });
    return result;
}
