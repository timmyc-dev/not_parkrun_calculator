document.addEventListener('DOMContentLoaded', function(){ 
  document.getElementById('distance').focus();
  
}, false);

const copySpec = (event) => {
  if (document.getElementById('result').innerHTML == 'Waiting for result') calculateTime();
  
  console.log(` Inner HTML: ${document.getElementById('clipText').value}`);
  const copyText = document.querySelector('#clipText');
  copyText.select();
  document.execCommand('copy');

}

function calculateTime(event) {
  // Runs code when inpt box is blurred
  let distance = document.getElementById('distance').value;
  let hours = parseInt(document.getElementById('hours').value);
  let minutes = parseInt(document.getElementById('minutes').value);
  let seconds = parseInt (document.getElementById('seconds').value);

  if (isNaN(hours)) hours = "";
  if (isNaN(minutes)) minutes = "";
  if (isNaN(seconds)) seconds = "";

  let notHours;
  let notMinutes;
  let notSeconds;

  let notparkruntime_seconds = (((hours * 3600) + (minutes * 60) + seconds)/distance  * 3.125);
  notparkruntime_seconds = Math.ceil(notparkruntime_seconds)
  if (notparkruntime_seconds > 3600) {
      notHours = Math.floor(notparkruntime_seconds/3600);
      notparkruntime_seconds = notparkruntime_seconds - (notHours * 3600);
  } else {
      notHours = "";
  }
  if (notparkruntime_seconds > 60) {
      notMinutes = Math.floor(notparkruntime_seconds/60);
      notparkruntime_seconds = notparkruntime_seconds - (notMinutes * 60);
  } else {
      notMinutes = "";
  }
  notSeconds = notparkruntime_seconds;

  let resultInnerHtml = "";
  if (notHours !== "") {
      resultInnerHtml = `${notHours}H: `
  }
  resultInnerHtml = `${resultInnerHtml}${notMinutes}Min: ${notSeconds}Sec:`
  document.getElementById("result").innerHTML = resultInnerHtml;

  // Get data ready for clipboard copy
  // Expected format h:mm:ss
  notHours = "" ? notHours = "0" : notHours = notHours.toString().padStart(2,"0");
  notMinutes = "" ? notMinutes = "00" : notMinutes = notMinutes.toString().padStart(2,"0");
  notSeconds = "" ? notSeconds = "00" : notSeconds.toString().padStart(2,"0");
  const clipString = `${notHours}:${notMinutes}:${notSeconds}`;
  document.getElementById('clipText').value = clipString;

  
// Debugging    
  // document.getElementById("dbValue0").innerHTML = `${hours} Hours`;
  // document.getElementById("dbValue1").innerHTML = `${notparkruntime_seconds} Total seconds`;
  // document.getElementById("dbValue2").innerHTML = notMinutes + " minutes portion for 5k";
  // document.getElementById("dbValue3").innerHTML = `${notSeconds} seconds portion for 5k`;
  // document.getElementById("dbValue4").innerHTML = distance + " Distance from input screen";
// End of debug


// alert(notMinutes + "min " + notSeconds + "sec");
  
  
}


