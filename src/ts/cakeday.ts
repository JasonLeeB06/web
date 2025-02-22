import $ from "jquery";

$(document).ready(function () {
  function getNextEndDate() {
    let now = new Date();
    let year = now.getFullYear();
    let endDate = new Date(`Feb 20, ${year} 04:29:00`).getTime();
    
    if (now.getTime() > endDate) {
      endDate = new Date(`Feb 20, ${year + 1} 04:29:00`).getTime();
    }
    
    return endDate;
  }

  let endDate = getNextEndDate();

  let countdownInterval = setInterval(function () {
    let now = new Date().getTime();
    let distance = endDate - now;

    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (distance < 0) {
      endDate = getNextEndDate();
      return;
    }

    $("#cakeday-countdown").html(
      days + " Days, " + hours + " Hours, " + minutes + " Minutes, " + seconds + " Seconds"
    );
  }, 1000);
});
