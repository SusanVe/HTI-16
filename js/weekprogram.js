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

  function getProgram(day) {
      return Program[day];
  }

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
      console.log(getWeekProgram());
    }
  });
});
