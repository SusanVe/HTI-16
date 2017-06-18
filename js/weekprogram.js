  var useWeekProgram = new Boolean(true);
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

document.addEventListener('DOMContentLoaded', function () {
  var checkbox = document.querySelector('input[type="checkbox"]');

  checkbox.addEventListener('change', function () {
    if (checkbox.checked) {
      useWeekProgram = false;
      console.log(useWeekProgram);

    } else {
      useWeekProgram = true;
      console.log(useWeekProgram);
    }

    if (useWeekProgram) {
      //add week program here
      getWeekProgram();
      setWeekProgram();
      console.log(getWeekProgram());
    } else {
      //disable week program here
      console.log();
    }
  });
});

/*--------------------------------------------------------------------------*/
function getProgram(day) {
    return Program[day];
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

function setWeekProgram() {
    var doc = document.implementation.createDocument(null, null, null);
    var program = doc.createElement('week_program');
    program.setAttribute('state', ProgramState ? 'on' : 'off');
    for (var key in Program) {
        var day = doc.createElement('day');
        day.setAttribute('name', key);

        var daySwitches = [];
        var nightSwitches = [];

        var i, text, sw;
        var periods = getProgram(key);
        for (i = 0; i < periods.length; i++ ) {
            daySwitches.push(periods[i][0]);
            nightSwitches.push(periods[i][1]);
        }

        for (i = 0; i < MaxSwitches; i++) {
            sw = doc.createElement('switch');
            sw.setAttribute('type', Type.Day);

            if (i < daySwitches.length) {
                sw.setAttribute('state', 'on');
                text = doc.createTextNode(daySwitches[i]);
            } else {
                sw.setAttribute('state', 'off');
                text = doc.createTextNode('00:00');
            }
            sw.appendChild(text);
            day.appendChild(sw);
        }

        for (i = 0; i < MaxSwitches; i++ ) {
            sw = doc.createElement('switch');
            sw.setAttribute('type', Type.Night);

            if (i < nightSwitches.length) {
                sw.setAttribute('state', 'on');
                text = doc.createTextNode(nightSwitches[i]);
            } else {
                sw.setAttribute('state', 'off');
                text = doc.createTextNode('00:00');
            }
            sw.appendChild(text);
            day.appendChild(sw);
        }
        program.appendChild(day);
    }
    doc.appendChild(program);
    uploadData('/weekProgram', (new XMLSerializer()).serializeToString(doc));
}
