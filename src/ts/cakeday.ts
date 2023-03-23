import $ from "jquery";

$(document).ready(function() {
    var endDate = new Date("Feb 20, 2024 04:29:00").getTime();
  
    var countdownInterval = setInterval(function() {
      var now = new Date().getTime();
    
      var distance = endDate - now;
      
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      $('#cakeday-countdown').html(days + " Days, " + hours + " Hours, " + minutes + " Minutes, " + seconds + " Seconds");
      
      if (distance < 0) {
        clearInterval(countdownInterval);
        $('#cakeday-countdown').html("Happy Birthday!");
      }

      if (new Date().getFullYear() > new Date(endDate).getFullYear()) {
        endDate = new Date("Feb 20, " + (new Date().getFullYear() + 1) + " 00:00:00").getTime();
      }
    }, 1000);
});
