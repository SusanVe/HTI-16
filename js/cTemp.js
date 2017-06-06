function changeTemp(sliderID, textbox) {
    var x = document.getElementById(textbox);
    var y = document.getElementById(sliderID);
    x.innerHTML = y.value+" C&deg;";
}

function minTemp() {
    var t = document.getElementById("slider").value;
    if (t > 5) {
        t= Math.round(10*(t-0.1))/10;
        document.getElementById("slider").value=t;
        document.getElementById("cTemp").innerHTML=t+" C&deg;";
    }
}

function plusTemp() {
    var t = document.getElementById("slider").value;
    if (t < 30) {
        t= Math.round( 10 *(t-(-0.1)))/10;
        document.getElementById("slider").value=t;
        document.getElementById("cTemp").innerHTML=t+" C&deg;";
    }
}
