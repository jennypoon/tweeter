$(document).ready(function() {
  $("textarea").keyup(function() {
    let currentVal = 140 - this.value.length;
    let counterElm = $("span.counter");

    if (currentVal >= 0) {
      $(counterElm).text(currentVal).removeClass('countertxtover');
    } else {
      $(counterElm).text(currentVal).addClass('countertxtover');
    }
  });
});