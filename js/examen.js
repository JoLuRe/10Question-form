// **********************************
//      DEFINICION de VARIABLES
// **********************************
// esta variable sirve para almacenar el elemento del FORMulario
var formElement=null;

//esta variable almacenará la respuesta correcta de preguntas.xml

var secret=50;
//esta variable almacenará la respuesta correcta de preguntas.xml

var respuesta=null;


// **********************************
//      DEFINICION de EVENTO
// **********************************
//al cargar la página...
window.onload = function(){
   //pide los datos, lee preguntas.xml del servidor (por http)

   var xhttp = new XMLHttpRequest();

   xhttp.onreadystatechange = function() {

      if (this.readyState == 4 && this.status == 200) {

         gestionarXml(this);
      }
   };

   xhttp.open("GET", "xml/examen.xml", true);
 
   xhttp.send();
 
 

   //Para corregir gestionamos el contenido introducido en el formulario

   formElement=document.getElementById('myform');

   formElement.onsubmit=function(){

      var s=formElement.elements[0].value;
      if (lowercase(s)==secret) alert('Respuesta correcta');

      else {

//         if (s>secret) alert('te has pasado');

//         else alert('te has quedado corto');
  
         alert('Respuesta incorrecta');
  
      }
      //corrección select
  
      var sel = formElement.elements[1];  
  
      if (sel.selectedIndex==respuesta) alert('Select correcto'); 
      else alert('Select incorrecto');
  
      return false;
 
   }

}



// **********************************
//      DEFINICION de FUNCION
// **********************************
//funcion donde cogemos los datos del xml y los ponemos en el html 

function gestionarXml(dadesXml){
 
   //Rellenamos p title y guardamos el número secreto
 
   var xmlDoc = dadesXml.responseXML;
 
//   document.getElementById("title").innerHTML = xmlDoc.getElementsByTagName("title")[0].childNodes[0].nodeValue;
 
   document.getElementById("q001").innerHTML = xmlDoc.getElementsByTagName("title")[0].childNodes[0].nodeValue;
 
   secret=parseInt(xmlDoc.getElementsByTagName("answer")[0].childNodes[0].nodeValue);
 
 

   //Rellenamos p selecttitle y guardamos la respuesta para corregir
 
//   document.getElementById("selecttitle").innerHTML = xmlDoc.getElementsByTagName("title")[1].childNodes[0].nodeValue;
 
 
   document.getElementById("q002").innerHTML = xmlDoc.getElementsByTagName("title")[1].childNodes[0].nodeValue;
 
 

   //RECUERDA document se refiere al documento HTML, xmlDOC es el documento leido XML 
   var select = document.getElementsByTagName("select")[0];
 
   //numero de opciones que hay en el XML
 
 
   var nopciones = xmlDoc.getElementsByTagName("option").length; 

   //Bucle para rellenar todas las opciones de select
 
   for (i = 0; i < nopciones; i++) { 
    
      var option = document.createElement("option");
    
      option.text = xmlDoc.getElementsByTagName("option")[i].childNodes[0].nodeValue;
    
      option.value=i+1;
    
      select.options.add(option);
 
   } 
 
 

   //nos quedamos la respuesta para la corrección
 
   respuesta=parseInt(xmlDoc.getElementsByTagName("answer")[1].childNodes[0].nodeValue);


}

