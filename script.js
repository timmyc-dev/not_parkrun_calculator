document.addEventListener('DOMContentLoaded', function(){ 
  document.getElementById('clip').addEventListener('click',()=>copySpec(event))
  document.getElementById('btCalculate').addEventListener('click', ()=>calculateTime(event))
  document.addEventListener('keydown', ({key})=>{
    if (key === "Enter"  && event.target.nodeName === 'INPUT') {
      console.log(event.target.getAttribute('data-enterkey'));
      if (event.target.getAttribute('data-enterkey') == 'calculate') {
        calculateTime()
      }
      else {
        const idNext = event.target.getAttribute('data-enterkey');
        document.getElementById(idNext).focus();      
      }
    }
  })
  document.getElementById('distance').focus();
  
}, false);

const enterKey = ({key}) => {
  
}

const copySpec = () => {
  if (document.getElementById('result').innerHTML == 'Waiting for result') {calculateTime()}
  
  const clipText = document.getElementById('clipText');

  if (window.getComputedStyle(clipText).visibility === "hidden") {
  clipText.style.visibility = 'visible';
  const copyText = document.querySelector('#clipText');
  copyText.select();
  document.execCommand('copy');
  clipText.style.visibility = 'hidden';
  }
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

    // 1 mile = 1609.34 meters
    // 5km = 5000m = 3.106856 miles

    // notparkruntime_seconds = total 5km time in (whole) seconds
  let notparkruntime_seconds = (((hours * 3600) + (minutes * 60) + seconds)/distance  * 3.106856);
  notparkruntime_seconds = Math.ceil(notparkruntime_seconds)

    // deconstruct in to hours, minutes and seconds
  if (notparkruntime_seconds >= 3600) {
      notHours = Math.floor(notparkruntime_seconds/3600);
      notparkruntime_seconds = notparkruntime_seconds - (notHours * 3600);
  } else {
      notHours = "";
  }
  if (notparkruntime_seconds > 60) {
      notMinutes = Math.floor(notparkruntime_seconds/60);
      notparkruntime_seconds = notparkruntime_seconds - (notMinutes * 60);
  } else {
      notMinutes = 0;
  }
  notSeconds = notparkruntime_seconds;



  let resultInnerHtml = "";
  if (notHours !== "") {
      resultInnerHtml = `${notHours}H: `
  }

  if (notMinutes >0 || notHours !== "") {
    resultInnerHtml = `${resultInnerHtml}${notMinutes}Min: `  
  }
  resultInnerHtml = `${resultInnerHtml}${notSeconds}Sec`
  document.getElementById("result").innerHTML = resultInnerHtml;

  // Get data ready for clipboard copy
  // Expected format h:mm:ss
  notHours = "" ? notHours = "0" : notHours = notHours.toString().padStart(2,"0");
  notMinutes = "" ? notMinutes = "00" : notMinutes = notMinutes.toString().padStart(2,"0");
  notSeconds = "" ? notSeconds = "00" : notSeconds.toString().padStart(2,"0");
  const clipString = `${notHours}:${notMinutes}:${notSeconds}`;
  document.getElementById('clipText').value = clipString;
  document.getElementById('result').title = clipString;

  if (document.querySelector('#copyToClipboard').checked) {
    copySpec()
  }
}


