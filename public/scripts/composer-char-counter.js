$(document).ready(function() {
  $("textarea").keyup(function() {
    let currentVal = 140 - this.value.length;
    let counterElm = $(this).siblings()[1];
    // let counterElm = $("span.counter");

//When limit is over, turn counter red
    if (currentVal >= 0) {
      $(counterElm).text(currentVal).removeClass('countertxtover');
    } else {
      $(counterElm).text(currentVal).addClass('countertxtover');
    }
  });
});