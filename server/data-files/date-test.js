let createdDate = 1539301317229
let date = new Date(createdDate)
let today = new Date();

console.log(date);
console.log("type of new Date:", typeof date)
console.log("Today's date:",  today);


var timeinmilisec = date.getTime() - today.getTime();
console.log("Posted " + Math.abs(Math.ceil(timeinmilisec / (1000 * 60 * 60 * 24))) + " days ago" );