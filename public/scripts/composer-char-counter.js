$(document).ready(function() {


  $("textarea").keyup(function() {
    const maxLength = 140;
    let currentVal = maxLength - this.value.length;
    let counterElm = $(this).siblings()[1];
    $(counterElm).text(currentVal);

  });

});
