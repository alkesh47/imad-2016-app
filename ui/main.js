//var button= document.getElementById('counterButton');
//var counter=0;


//Get the submit button
var submit= document.getElementById('submitButton');
submit.onclick = function(){
  var request = new XMLHttpRequest();

  request.onreadystatechange = function(){
    if (request.readyState === XMLHttpRequest.DONE) {
      if(request.status === 200){
          console.log("Logged in");
          alert("Logged in succesfully");
      }
      
      else if(request.status === 403){
              alert("Username/Password is incorrect");
      }
      
      else if(request.status === 500){
              alert("Something went wrong");
      }
      
      
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


  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  console.log(username);
  console.log(password);
  
  request.open('POST', 'http://alkesh47.cloud.imad.hasura.io/login', true);
  request.setRequestHeader('Content-Type','application/json');
  request.send(JSON.stringify({username:username , password:password}));

};


    //request.open('GET', 'http://localhost:8080/articleTwo?name='+ name, true);
    //request.send(null);
