var button= document.getElementById('counter');
var counter=0;

button.onclick = function(){
  // Create a request object
  var request = new XMLHttpRequest();
  request.onreadystatechange = function(){
    if (request.readystatechange === XMLHttpRequest.DONE) {
      if (request.status === 200) {
        var counter = request.responseText;
        var span = document.getElementById('count');
        span.innerHTML = count.toString();
      }
    }
  }

  // Make a request object
  request.open('GET', 'https://cloud.imad.hasura.io/counter', true)
  request.send(null)
};
