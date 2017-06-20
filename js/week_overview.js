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
