$(document).ready(function() {
  $("textarea").keyup(function() {
    const maxLength = 140;
    let currentVal = maxLength - this.value.length;
    let counterElm = $(this).siblings()[1];
    if (currentVal >= 0) {
      $(counterElm).text(currentVal).css("color", "black");
    } else {
      $(counterElm).text(currentVal).css("color", "red");
    }
  });
});