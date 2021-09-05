//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

});

  function Validar(){  
  var usuario=document.getElementById("nombre").value; 
  var password=document.getElementById("contraseña").value; 
  if (usuario!=="" && password!=="") { 
  window.location="index.html"; 
  } 
  
  } 
  