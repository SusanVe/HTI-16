var ServerUrl = 'http://wwwis.win.tue.nl/2id40-ws/16';
var t=21;

function minTemp() {
    if (t > 5) {
        t= Math.round(10*(t-0.1))/10;
        document.getElementById("cTemp").innerHTML=t+" °C";
    }
}

function plusTemp() {
    if (t < 30) {
        t= Math.round( 10 *(t-(-0.1)))/10;
        document.getElementById("cTemp").innerHTML=t+" °C";
    }
}

function put(attribute_name, xml_tag, value){

    uploadData('/'+attribute_name, '<' + xml_tag + '>'+ value + '</' + xml_tag + '>');

  }

    function uploadData(address, xml) {
        $.ajax({
            type: "put",
            url: ServerUrl + address,
            contentType: 'application/xml',
            data: xml,
            async: false
        });
    }

    function update(attribute_name, xml_tag, value) {
      put("targetTemperature", "target_temperature", "12.0");

    }
