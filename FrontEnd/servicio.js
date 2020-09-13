let inputName = document.getElementById ("fname");
let inputLastName = document.getElementById("lname");
let inputEmail = document.getElementById("email");

function AddVisitor (event){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({"name":inputName.value,"lastName":inputLastName.value,"email":inputEmail.value});
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };
    
    fetch("http://localhost:3006/visitante", requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
}