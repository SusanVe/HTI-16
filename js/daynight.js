var ServerUrl = 'http://wwwis.win.tue.nl/2id40-ws/16';

function submitDay(attribute_name, xml_tag, value){
  var dayTemp = document.getElementById("dayTemp").value;
  put("dayTemperature", "day_temperature", dayTemp);
}

function submitNight(attribute_name, xml_tag, value){
  var nightTemper = document.getElementById("nightTemp").value;
  put("nightTemperature", "night_temperature", nightTemper);
}

function get(attribute_name, xml_tag) {
    return requestData(
        "/"+attribute_name,
        function(data) {
            return $(data).find(xml_tag).text();
        }
    );
}

function put(attribute_name, xml_tag, value){
    uploadData("/"+attribute_name, "<" + xml_tag + ">"+ value + "</" + xml_tag + ">");
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
