  var useWeekProgram = new Boolean(true);
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
      console.log("he");
    } else {
      //disable week program here
      console.log("eh");
    }
  });
});
