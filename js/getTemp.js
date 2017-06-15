function getTemp() {
var ServerUrl='http://wwwis.win.tue.nl/2id40-ws/16';

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
