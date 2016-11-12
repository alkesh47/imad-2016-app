
//Get the submit button
var submit= document.getElementById('submit_btn');
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
    }
  }


  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  console.log(username);
  console.log(password);
  
  request.open('POST', 'http://alkesh47.imad.hasura-app.io/login', true);
  request.setRequestHeader('Content-Type','application/json');
  request.send(JSON.stringify({username:username , password:password}));
};


    //request.open('GET', 'http://localhost:8080/articleTwo?name='+ name, true);
    //request.send(null);
