// **********************************
//      DEFINICION de VARIABLES
// **********************************
// esta variable sirve para almacenar el elemento del FORMulario
var formElement = null;

//esta variable almacena en número de preguntas de examen.xml
var numpreg = 10;

//estas variables almacenarán las soluciones correctas de examen.xml
////var sol0 = null; var sol1 = null; var sol2 = []; var sol3 = null; var sol4 = []; 
////var sol5 = null; var sol6 = null; var sol7 = []; var sol8 = null; var sol9 = [];
//var sol = [];
//for (i = 0; i < numpreg; i++) {
//    sol[i] = null;
//}

var sol_text_1 = null;
var sol_select_1 = null;
var sol_mult_1 = []; var sol_multiple_1 = "";
var sol_radio_1 = null;
var sol_ckx_1 = []; var sol_checkbox_1 = "";

var sol_text_2 = null;
var sol_select_2 = null;
var sol_mult_2 = []; var sol_multiple_2 = "";
var sol_radio_2 = null;
var sol_ckx_2 = []; var sol_checkbox_2 = "";

//estas variables almacenarán las respuestas daadas en examen.html
////var resp0 = null; var resp1 = null; var resp2 = []; var resp3 = null; var resp4 = [];
////var resp5 = null; var resp6 = null; var resp7 = []; var resp8 = null; var resp9 = [];
//var resp = [];
//for (i = 0; i < numpreg; i++) {
//    resp[i] = null;
//}

var resp_text_1 = null;
var resp_select_1 = null;
var resp_mult_1 = []; var resp_multiple_1 = "";
var resp_radio_1 = null;
var resp_ckx_1 = []; var resp_checkbox_1 = "";

var resp_text_2 = null;
var resp_select_2 = null;
var resp_mult_2 = []; var resp_multiple_2 = "";
var resp_radio_2 = null;
var resp_ckx_2 = []; var resp_checkbox_2 = "";

var score = null;

// **********************************
//      DEFINICION de EVENTO
// **********************************
//al cargar la página...
window.onload = function(){
    
  formElement=document.getElementById('myexam');
   
  // Corregir al hacer clic en el botón    
  formElement.onsubmit=function(){
      borrarCorreccion();
      //corregirText();
      //corregirSelect();
      //corregirMultiple();
      //corregirRadio(); 
      //corregirCheckbox(); 
	  showScore();
      return false;
   }

   //pide los datos, lee examen.xml del servidor (por http)
   var xhttp = new XMLHttpRequest();
   xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
         gestionarXml(this);
      }
   };
   xhttp.open("GET", "xml/examen.xml", true);
   xhttp.send();
}; 

//   //Para corregir gestionamos el contenido introducido en el formulario
//   formElement=document.getElementById('myexamm');
//   formElement.onsubmit=function(){
////      var s=formElement.elements[0].value;
////      if (lowercase(s)==sol[0]) alert('Respuesta correcta');
////    TEXT
//      resp[0] = formElement.elements[0].value;
//      if (lowercase(resp[0]) == sol[0]) alert('Respuesta correcta');
//      else alert('Respuesta incorrecta');
//  
////      var sel = formElement.elements[1];  
////    SELECT single
//      resp[1] = formElement.elements[1];  
//      if (resp[1].selectedIndex == sol[1]) alert('Select correcto'); 
//      else alert('Select incorrecto');
//  
////    MULTIPLE select
//      resp[2] = formElement.elements[2];  
//      if (resp[2].selectedIndex == sol[2]) alert('Select correcto'); 
//      else alert('Select incorrecto');
//
////    RADIO single
//      resp[3] = formElement.elements[3];  
//      if (resp[3].selectedIndex == sol[3]) alert('Select correcto'); 
//      else alert('Select incorrecto');
//
////    CHECKBOX 0 o más
//      resp[4] = formElement.elements[4];  
//      if (resp[4].selectedIndex == sol[4]) alert('Select correcto'); 
//      else alert('Select incorrecto');
//       
//      return false;
//   }

// **********************************
//      DEFINICION de FUNCION
// **********************************
//funcion donde cogemos los datos del xml y los ponemos en el html 

function gestionarXml(dadesXml){
 
   //Rellenamos el texto de las preguntas, de las opciones de respuesta y guardamos las respuestas
   var xmlDoc = dadesXml.responseXML;
   // Rellenamos el texto del título de las preguntas
   for (i = 0; i < numpreg; i++) { 
      //var qn='q'+i; 
      //document.getElementById(qn).innerHTML = xmlDoc.getElementsByTagName("title")[i].childNodes[0].nodeValue;
      document.getElementsByClassName("question")[i].innerHTML = xmlDoc.getElementsByTagName("title")[i].childNodes[0].nodeValue;
   } 

   // Rellenamos las opciones de respuesta
   // document se refiere al documento HTML, xmlDOC es el documento leido XML 

   // TEXT_1 --> no tiene opciones
    
   // SELECT_1 single
   //var select = document.getElementsByTagName("select")[0];
   var html_select = document.getElementById("select_1");
   //var html_select = document.getElementsByTagName("select")[0];
   //numero de opciones que hay en el XML
   var xml_select = xmlDoc.getElementById("item1");
   //var nopciones = xmlDoc.getElementsByTagName("option").length; 
   var nopciones = xml_select.getElementsByTagName("option").length; 
   //Bucle para rellenar todas las opciones de select
   for (i = 0; i < nopciones; i++) { 
      var option = document.createElement("option");
      option.text = xml_select.getElementsByTagName("option")[i].childNodes[0].nodeValue;
      option.value=i+1;
      html_select.options.add(option);
   } 
   
	// MULTIPLE_1 select
   var html_select = document.getElementById("multiple_1");
   //numero de opciones que hay en el XML
   var xml_select = xmlDoc.getElementById("item2");
   var nopciones = xml_select.getElementsByTagName("option").length; 
   //Bucle para rellenar todas las opciones de select
   for (i = 0; i < nopciones; i++) { 
      var option = document.createElement("option");
      option.text = xml_select.getElementsByTagName("option")[i].childNodes[0].nodeValue;
      option.value=i+1;
      html_select.options.add(option);
   } 

   	// RADIO_1
	var radioContainer=document.getElementById("radio_1");
	var nopciones = xmlDoc.getElementById("item3").getElementsByTagName('option').length;
	for (i = 0; i < nopciones; i++) { 
		var input = document.createElement("input");
		var label = document.createElement("label");
		var br = document.createElement("br");
		label.innerHTML = xmlDoc.getElementById("item3").getElementsByTagName('option')[i].childNodes[0].nodeValue;
		label.setAttribute("for", i);
		input.type="radio";
		input.name="rad";
		input.id=i;    
		radioContainer.appendChild(input);
		radioContainer.appendChild(label);
		radioContainer.appendChild(br);
	}
	
  	//CHECKBOX_1
 	//creamos un elemento h3 para introducirlo como título en el checkboxContainer (div)
 	var checkboxContainer=document.getElementById("checkbox_1");
 	//var h3 = document.createElement("h3");
	//h3.innerHTML = xmlDoc.getElementsByTagName("title")[2].childNodes[0].nodeValue;
	//checkboxContainer.appendChild(h3); 

 	//añadimos todas las opciones de checkbox (como <input type='checkbox' name='color'>) con su label
 	var nopciones = xmlDoc.getElementById("item4").getElementsByTagName('option').length;
 	for (i = 0; i < nopciones; i++) { 
    	var input = document.createElement("input");
    	var label = document.createElement("label");
    	var br = document.createElement("br");
    	label.innerHTML = xmlDoc.getElementById("item4").getElementsByTagName('option')[i].childNodes[0].nodeValue;
    	label.setAttribute("for", i);
    	input.type="checkbox";
    	input.name="chkbx";
		//input.id="color_"+i;;    
    	input.id=i;    
    	checkboxContainer.appendChild(input);
    	checkboxContainer.appendChild(label);
		checkboxContainer.appendChild(br);
	}  


   // TEXT_2 --> no tiene opciones
   // SELECT_2 single
   var html_select = document.getElementById("select_2");
   var xml_select = xmlDoc.getElementById("item6");
   var nopciones = xml_select.getElementsByTagName("option").length; 
   for (i = 0; i < nopciones; i++) { 
      var option = document.createElement("option");
      option.text = xml_select.getElementsByTagName("option")[i].childNodes[0].nodeValue;
      option.value=i+1;
      html_select.options.add(option);
   } 
   // MULTIPLE_2 select
   var html_select = document.getElementById("multiple_2");
   //numero de opciones que hay en el XML
   var xml_select = xmlDoc.getElementById("item7");
   var nopciones = xml_select.getElementsByTagName("option").length; 
   //Bucle para rellenar todas las opciones de select
   for (i = 0; i < nopciones; i++) { 
      var option = document.createElement("option");
      option.text = xml_select.getElementsByTagName("option")[i].childNodes[0].nodeValue;
      option.value=i+1;
      html_select.options.add(option);
   } 
	// RADIO_2
	var radioContainer=document.getElementById("radio_2");
	var nopciones = xmlDoc.getElementById("item8").getElementsByTagName('option').length;
	for (i = 0; i < nopciones; i++) { 
		var input = document.createElement("input");
		var label = document.createElement("label");
		var br = document.createElement("br");
		label.innerHTML = xmlDoc.getElementById("item8").getElementsByTagName('option')[i].childNodes[0].nodeValue;
		label.setAttribute("for", i);
		input.type="radio";
		input.name="rad";
		input.id=i;    
		radioContainer.appendChild(input);
		radioContainer.appendChild(label);
		radioContainer.appendChild(br);
	}	
    //CHECKBOX_2
	var checkboxContainer=document.getElementById("checkbox_2");
 	var nopciones = xmlDoc.getElementById("item9").getElementsByTagName('option').length;
 	for (i = 0; i < nopciones; i++) { 
    	var input = document.createElement("input");
    	var label = document.createElement("label");
    	var br = document.createElement("br");
    	label.innerHTML = xmlDoc.getElementById("item9").getElementsByTagName('option')[i].childNodes[0].nodeValue;
    	label.setAttribute("for", i);
    	input.type="checkbox";
    	input.name="chkbx";
    	input.id=i;    
    	checkboxContainer.appendChild(input);
    	checkboxContainer.appendChild(label);
		checkboxContainer.appendChild(br);
	}  
	
   // Guardamos todas las respuestas correctas

	// TEXT_1
	
	var sol_text_1 = xmlDoc.getElementById("item0").getElementsByTagName("answer")[0].childNodes[0].nodeValue;	
    	
    // SELECT_1
    sol_select_1 = parseInt(xmlDoc.getElementById("item1").getElementsByTagName("answer")[0].childNodes[0].nodeValue);
    
	// MULTIPLE_1
 	var nsoluciones = xmlDoc.getElementById("item2").getElementsByTagName('answer').length;
 	for (i = 0; i < nsoluciones; i++) { 
		sol_mult_1[i]=xmlDoc.getElementById("item2").getElementsByTagName("answer")[i].childNodes[0].nodeValue;
		sol_multiple_1 = sol_multiple_1 + sol_mult_1[i];
	}
    
	// RADIO_1
	sol_radio_1=parseInt(xmlDoc.getElementById("item3").getElementsByTagName("answer")[0].childNodes[0].nodeValue);
	
	// CHECKBOX_1
 	var nsoluciones = xmlDoc.getElementById("item4").getElementsByTagName('answer').length;
 	for (i = 0; i < nsoluciones; i++) { 
		sol_ckx_1[i]=xmlDoc.getElementById("item4").getElementsByTagName("answer")[i].childNodes[0].nodeValue;
		sol_checkbox_1 = sol_checkbox_1 + sol_ckx_1[i];
	}
    
	// TEXT_2
	var sol_text_2 = xmlDoc.getElementById("item5").getElementsByTagName("answer")[0].childNodes[0].nodeValue;	
	//var sol_text_2 = sol_text_2.toUpperCase();	
	//var sol_text_2 = sol_text_2.toLowerCase();	
    
	// SELECT_2
	sol_select_2=parseInt(xmlDoc.getElementById("item6").getElementsByTagName("answer")[0].childNodes[0].nodeValue);
    
	// MULTIPLE_2
 	var nsoluciones = xmlDoc.getElementById("item7").getElementsByTagName('answer').length;
 	for (i = 0; i < nsoluciones; i++) { 
		sol_mult_2[i]=xmlDoc.getElementById("item7").getElementsByTagName("answer")[i].childNodes[0].nodeValue;
		sol_multiple_2 = sol_multiple_2 + sol_mult_2[i];
	}
	//sol_multiple_2=parseInt(xmlDoc.getElementsByTagName("answer")[7].childNodes[0].nodeValue);
    
	// RADIO_2
	sol_radio_2=parseInt(xmlDoc.getElementById("item8").getElementsByTagName("answer")[0].childNodes[0].nodeValue);
    
	// CHECKBOX_2
 	var nsoluciones = xmlDoc.getElementById("item9").getElementsByTagName('answer').length;
 	for (i = 0; i < nsoluciones; i++) { 
		sol_ckx_2[i]=xmlDoc.getElementById("item9").getElementsByTagName("answer")[i].childNodes[0].nodeValue;
		sol_checkbox_2 = sol_checkbox_2 + sol_ckx_2[i];
	}
	//sol_checkbox_2=parseInt(xmlDoc.getElementsByTagName("answer")[9].childNodes[0].nodeValue);
	
	// debugging
	
	//document.getElementById("mostrar").style.color="white";	
	//document.getElementById("mostrar").innerHTML = numpreg;
	//document.getElementById("mostrar").innerHTML = sol_text_1;
	//document.getElementById("mostrar").innerHTML = sol_select_1;
	//document.getElementById("mostrar").innerHTML = sol_multiple_1;
	//document.getElementById("mostrar").innerHTML = sol_radio_1;
	//document.getElementById("mostrar").innerHTML = sol_checkbox_1;
	//document.getElementById("mostrar").innerHTML = sol_text_2;
	//document.getElementById("mostrar").innerHTML = sol_select_2;
	//document.getElementById("mostrar").innerHTML = sol_multiple_2;
	//document.getElementById("mostrar").innerHTML = sol_radio_2;
	//document.getElementById("mostrar").innerHTML = sol_checkbox_2;
	
	document.getElementById("mostrar").innerHTML = 
		'numpreg: ' + numpreg +
		' score: ' + score + "<br/>" +
		'sol_text_1: ' + sol_text_1 + 
		' sol_select_1: ' + sol_select_1 + 
		' sol_multiple_1: ' + sol_multiple_1 +
		' sol_radio_1: ' + sol_radio_1 + 
		' sol_checkbox_1: ' + sol_checkbox_1 + "<br/>" +
		'sol_text_2: ' + sol_text_2 + 
		' sol_select_2: ' + sol_select_2 + 
		' sol_multiple_2: ' +  sol_multiple_2 +
		' sol_radio_2: ' + sol_radio_2 + 
		' sol_checkbox_2: ' + sol_checkbox_2;
	
};

//****************************************************************************************************
//implementación de la corrección
//function corregirNumber(){
//  var s=formElement.elements[0].value;     
//  if (s==secret) darRespuesta("P1: Exacto!");
//  else {
//    if (s>secret) darRespuesta("P1: Te has pasado");
//    else darRespuesta("P1: Te has quedado corto");
//  }
//}

function corregirText(){
	// TEXT_1
	document.getElementsByClassName("solution")[0].innerHTML = "Correct answer: " + sol_text_1;
	resp_text_1=formElement.elements[0].value;
	resp_text_1 = resp_text_1.toLowerCase();
	if (resp_text_1 == sol_text_1) {
		informSuccess(0);
	  	score++;
  	}
  	else {
    	informError(0);
  	}
	// TEXT_2
	document.getElementsByClassName("solution")[5].innerHTML = "Correct answer: " + sol_text_2;
	resp_text_2=formElement.elements[5].value;
	resp_text_2 = resp_text_2.toLowerCase();
	if (resp_text_2 == sol_text_2) {
		informSuccess(5);
	  	score++;
  	}
  	else {
    	informError(5);
  	}
}

//function corregirSelect(){
//  var r1 = formElement.elements[1];  
//  if (r1.selectedIndex==sol_select_1) darRespuesta("P2: Correcto");
//  else darRespuesta("P2: Error");
//}

//function corregirCheckbox(){
//  var f=document.getElementById('myexam');
//  var escorrecta = [];
//  for (i = 0; i < f.color.length; i++) {
//   if (f.color[i].checked) {
//    escorrecta[i]=false;     
//    for (j = 0; j < respuestasCheckbox.length; j++) {
//     if (i==respuestasCheckbox[j]) escorrecta[i]=true;
//    }
//   } 
//  }
//  for (i = 0; i < f.color.length; i++) {
//   
//   if (f.color[i].checked) {
//    if (escorrecta[i]) {
//     darRespuesta("P3: "+i+" correcta");    
//    } else {
//     darRespuesta("P3: "+i+" incorrecta");
//    }   
//   }
//  }
//}

function showScore(){
	alert('Puntuación obtenida: ' + score);	
}
//****************************************************************************************************
//implementación de la presentación
function darRespuesta(r){
 //var resultContainer=document.getElementById('resultContainer');
 //var p = document.createElement("p");
 //node = document.createTextNode(r);
 //p.appendChild(node);
 //resultContainer.appendChild(p);
 document.getElementsByClassName("solution").style.display='inline';    
}
function informSuccess(su){
 document.getElementsByTagName("solution")[su].style.display = 'inline';    
 document.getElementsByTagName("correction")[su].src = "img/success32.png";    
 document.getElementsByTagName("correction")[su].style.display ='inline';    
}
function informError(er){
 document.getElementsByTagName("solution")[er].style.display = 'inline';    
 document.getElementsByTagName("correction")[er].src = "img/error32.png";    
 document.getElementsByTagName("correction")[er].style.display = 'inline';    
}
function borrarCorreccion(){
   	//var resultContainer=document.getElementById('resultContainer');
   	//resultContainer.innerHTML = "";
	document.getElementsByClassName("solution").style.display = 'none'; 
	document.getElementsByClassName("correction").style.display = 'none'; 
	score = 0.0;
}