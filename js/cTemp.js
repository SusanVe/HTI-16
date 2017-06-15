var ServerUrl = 'http://wwwis.win.tue.nl/2id40-ws/16';
var t= 21;

function minTemp() {
  var t = getTemp();
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
    function getTemp() {
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


      function get(attribute_name, xml_tag) {
          return requestData(
              "/"+attribute_name,
              function(data) {
                  return $(data).find(xml_tag).text();
              }
          );
      }
      var temp = get("currentTemperature", "current_temperature");
      document.getElementById("cTemp").innerHTML= temp;
    }
