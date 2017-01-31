var formElement = null;
/*var secret=50; //ahora se lee 23 de <answer>23</answer> suministrado en preguntas.xml */
 
//al cargar la pÃ¡gina... 
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
 
/* //Para corregir gestionamos el contenido introducido en el formulario
 formElement=document.getElementById('examinationform');
 formElement.onsubmit=function(){
  var s=formElement.elements[0].value;  
  var s=lowercase(formElement.elements[0].value); 
  if (s==clue) alert('Correcto');
  else {
    alert('No es correcto');
/*    if (s>secret) alert('te has pasado');
    else alert('te has quedado corto');
*/
/*  }
  return false;
 }
}
*/


//funcion donde cogemos los datos del xml y los ponemos en el html 
function gestionarXml(dadesXml){
 var xmlDoc = dadesXml.responseXML;
 document.getElementById("q001").innerHTML = xmlDoc.getElementsByTagName("title")[0].childNodes[0].nodeValue;
 clue=parseInt(xmlDoc.getElementsByTagName("answer")[0].childNodes[0].nodeValue);
}







/* AQUI COMENÇA el CODI ANTERIOR  */

/*
var textXML = '<exam><question><type>text</type><text>Extensió de fitxer full estil?</text>' +
         '<answer>css</answer></question></exam>';

parser = new DOMParser();
xmlDoc = parser.parseFromString(textXML, "text/xml");
document.getElementById("p1").innerHTML = xmlDoc.getElementsByTagName("text")[0].childNodes[0].nodeValue;
document.getElementById("t1").innerHTML = xmlDoc.getElementsByTagName("type")[0].childNodes[0].nodeValue;
document.getElementById("r1").innerHTML = xmlDoc.getElementsByTagName("answer")[0].childNodes[0].nodeValue;

/*
Formulari amb camp de text, onsubmit fer que surti un missatge amb el que hem escrit:
*/
/*
<form id='myform'>
 <input type='text'>
 <input type='submit'>
</form>

var formElement=null;
window.onload = function(){
 formElement=document.getElementById('myform');
 formElement.onsubmit=function(){
  var s=formElement.elements[0].value; 
  alert("text: "+s);
  return false; //no envía el formulario, solo mira los valores
 }
}

/*
Formulari per triar una opció de tres (select), onsubmit o onchange mostrar el valor de l'opció seleccionada:
*/
/*
<form id='myform'>

 <select id="mySel">
  <option value="1" selected>opció 1 bla bla</option>
  <option value="2">opció 2 bla bla</option>
  <option value="3">opció 3 bla bla</option>
 </select>
 <input type='submit'> 
</form>

var e=null;
var formElement=null;
window.onload = function(){
 e=document.getElementById("mySel");
 e.onchange=function(){
  message();
  return false;
 }
 formElement=document.getElementById('myform'); 
 formElement.onsubmit=function(){
  message();
  return false;
 } 
}
function message(){
 var value = e.options[e.selectedIndex].value;
 var text = e.options[e.selectedIndex].text; 
 alert("value: "+value+" text: "+text);
}

/*
Formulari per triar més d'una opció de tres (select multiple), onsubmit o onchange mostrar el valor de l'opció seleccionada:
*/
/*
<form id='myform'>
<select id="mySel" multiple>
<option value="1" selected>opció 1 bla bla</option>
<option value="2">opció 2 bla bla</option>
<option value="3">opció 3 bla bla</option>
</select>
<input type='submit'> 
</form>

var f=null;
window.onload = function(){
 f=document.getElementById('myform');
 f.onsubmit=function(){
 var text="Seleccted: ";
  if (f.mySel[0].selected) text+=" "+f.mySel[0].value;
  if (f.mySel[1].selected) text+=" "+f.mySel[1].value;
  if (f.mySel[2].selected) text+=" "+f.mySel[2].value;
  alert(text);
  return false;
 }
}

/*
Formulari per triar més d'una opció de tres (checkbox), onsubmit mostrar les opcions seleccionades:
*/
/*
<form id="myform">
<p><input type="checkbox" name="r" value="red">Red</p>
<p><input type="checkbox" name="g" value="green">Green</p>
<p><input type="checkbox" name="b" value="blue">Blue</p>
<p><input type="submit" value=" Enviar "></p>
</form>

var f=null;
window.onload = function(){
 f=document.getElementById('myform');
 f.onsubmit=function(){
  var text="Colors: ";
  if (f.r.checked) text+=" "+f.r.value;
  if (f.g.checked) text+=" "+f.g.value;
  if (f.b.checked) text+=" "+f.b.value;
  alert(text);
  return false;
 }
}

/*
Formulari per triar una opció de tres (radio), onsubmit mostrar la opció seleccionada:
*/
/*
<form id="myform">
<input id="red" type="radio" name="color" value="red">
<label for="red">Red</label><br>
<input id="green" type="radio" name="color" value="green">
<label for="green">Green</label><br> 
<input id="blue" type="radio" name="color" value="blue">
<label for="blue">Blue</label><br><br>
<input type="submit">
</form>

var f=null;
window.onload = function(){
 f=document.getElementById('myform');
 f.onsubmit=function(){
  var text="Colors: ";
  if ((f.color[0].checked) || (f.color[1].checked) || (f.color[2].checked)) {
   text+=" "+f.color.value;
  } else{
   text="No color selected";
  }
  alert(text);
  return false; 
 }
}