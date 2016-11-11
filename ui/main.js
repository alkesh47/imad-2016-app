//var button= document.getElementById('counterButton');
//var counter=0;


//Get the submit button
var submit= document.getElementById('submitButton');
submit.onclick = function(){
  var request = new XMLHttpRequest();

  request.onreadystatechange = function(){
    if (request.readyState === XMLHttpRequest.DONE) {
      var names = request.responseText;
      names = JSON.parse(names);
      var list = '';
      for (var i = 0; i<names.length;i++){
        list+= '<li>'+names[i]+'</li>';
      }

      var ul = document.getElementById('nameList');
      ul.innerHTML = list;
    }
  }

  var nameInput = document.getElementById('name');
  var name = nameInput.value;
  request.open('GET', 'http://localhost:8080/:NameOfArticle/submit-name?name='+name, true);
  request.send(null);
};


    //request.open('GET', 'http://localhost:8080/articleTwo?name='+ name, true);
    //request.send(null);
