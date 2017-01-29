var formElement = null;
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
//funcion donde cogemos los datos del xml y los ponemos en el html 
function gestionarXml(dadesXml){
 var xmlDoc = dadesXml.responseXML;
 document.getElementById("q001").innerHTML = xmlDoc.getElementsByTagName("text")[0].childNodes[0].nodeValue;
 clue_1=parseInt(xmlDoc.getElementsByTagName("answer")[0].childNodes[0].nodeValue);
 document.getElementById("q002").innerHTML = xmlDoc.getElementsByTagName("text")[1].childNodes[0].nodeValue;
 clue_2=parseInt(xmlDoc.getElementsByTagName("answer")[1].childNodes[0].nodeValue);
}
