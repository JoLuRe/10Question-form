// **********************************
//      DEFINICION de VARIABLES
// **********************************
// número de preguntas de examen.xml
var numpreg = 10;
// almacena el elemento del FORMulario
var formElement = null;
// almacena el fichero de datos XML
var xmlDoc = null;
// puntuacion
var score = 0.0;

//estas variables almacenarán las soluciones correctas de examen.xml

// null
var sol_text = "";
var sol_text_1 = "";
var sol_text_2 = "";

// ""
var sol_select = -1;
var sol_select_1 = -1;
var sol_select_2 = -1;

var sol_mult = [];
var sol_multiple = "";
var sol_multiple_1 = "";
var sol_multiple_2 = "";

// null
var sol_radio = -1;
var sol_radio_1 = -1;
var sol_radio_2 = -1;

var sol_ckx = [];
var sol_checkbox = "";
var sol_checkbox_1 = "";
var sol_checkbox_2 = "";

//estas variables almacenarán las respuestas dadas en examen.html

var resp_text = "";
var resp_text_1 = "";
var resp_text_2 = "";

var resp_select = -1;
var resp_select_1 = -1;
var resp_select_2 = -1;

var resp_mult = [];
var resp_multiple = "";
var resp_multiple_1 = "";
var resp_multiple_2 = "";

var resp_radio = -1;
var resp_radio_1 = -1;
var resp_radio_2 = -1;

var resp_ckx = [];
var resp_checkbox = "";
var resp_checkbox_1 = "";
var resp_checkbox_2 = "";

// Time management

var mins_quiz_time = 3; //available quiz time (in mins)
var secs_quiz_time = 0; //available quiz time (in secs)
var exam_time = ((mins_quiz_time * 60) + secs_quiz_time) * 1000;
var delay = 1600; // calculation delay adjustment
var quiz_time = exam_time + delay;
var clock_tick = 0; // used for timer increments
var remaining_time = 0;
// **********************************
//      DEFINICION de EVENTO
// **********************************
//al cargar la página...
window.onload = function () {
	formElement = document.getElementById('myexam');

	// Corregir al hacer clic en el botón    
	formElement.onsubmit = function () {
		// we stop the timer
		clearInterval(clock_tick);
		// calculate minutes and seconds
		var mn = Math.floor((remaining_time / (1000 * 60)));
		var sc = ((remaining_time / 1000) - (mn * 60)).toFixed(0);
		// format minutes and seconds if less than 10
		if (mn < 10) {
			fmn = "0" + mn;
		} else {
			fmn = mn;
		}
		if (sc < 10) {
			fsc = "0" + sc;
		} else {
			fsc = sc;
		}
		document.getElementById("reloj").innerHTML = "Remaining time " + fmn + ":" + fsc;
		// why does not the following line work here?
		//doCorrect();
		resetPuntuacion();
		corregirText();
		corregirSelect();
		corregirMultiple();
		corregirRadio();
		corregirCheckbox();
		//showScore();
		document.getElementById("nota").innerHTML = "Score " + score + " / " + numpreg;
		scroll(0, 0);
		return false;
	};

	//pide los datos, lee examen.xml del servidor (por http)
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			gestionarXml(this);
		}
	};
	//xhttp.open("GET", "https://rawgit.com/JoLuRe/10Question-form/master/xml/examen.xml", true);
	xhttp.open("GET", "xml/examen.xml", true);
	xhttp.send();

	var now = new Date().getTime();
	var limit = now + quiz_time;

	clock_tick = setInterval(function () {

		// Get todays date and time and find the remaining_time between now and the limit
		var now = new Date().getTime();
		remaining_time = limit - now;

		// Time calculations for minutes and seconds
		var minutes = Math.floor((remaining_time % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = Math.floor((remaining_time % (1000 * 60)) / 1000);

		if (minutes < 10) {
			fminutes = "0" + minutes;
		} else {
			fminutes = minutes;
		}
		if (seconds < 10) {
			fseconds = "0" + seconds;
		} else {
			fseconds = seconds;
		}

		// Display the result in the id="reloj"
		document.getElementById("reloj").innerHTML = "Remaining time " + fminutes + ":" + fseconds;

		// If the count down is finished... 
		if (remaining_time < 0) {
			clearInterval(clock_tick);
			document.getElementById("reloj").innerHTML = "TIME FINISHED";
			doCorrect();
		}
	}, 1000);
};

// **********************************
//      DEFINICION de FUNCION
// **********************************
//Read XML data (title, answer options and correct answers)
//Display titles and options in HTML
//Store correct answers for evaluation
function doCorrect() {
	resetPuntuacion();
	corregirText();
	corregirSelect();
	corregirMultiple();
	corregirRadio();
	corregirCheckbox();
	//showScore();
	document.getElementById("nota").innerHTML = "Score " + score + " / " + numpreg;
	scroll(0, 0);
	return false;
}

function gestionarXml(dadesXml) {

	// Store the XML data descriptor
	// "document" refers to HTML document, "xmlDOC" refers to XML document 
	xmlDoc = dadesXml.responseXML;

	// ****************************** Fill-in questions' titles

	for (i = 0; i < numpreg; i++) {
		document.getElementsByClassName("question")[i].innerHTML = xmlDoc.getElementsByTagName("title")[i].childNodes[0].nodeValue;
	}

	// ****************************** Fill-in answer options

	// TEXT_1 and TEXT_2 --> no options
	// "text_1", "item0"
	// "text_2", "item5"

	// SELECT_1 single and SELECT_2 single
	fillOptionsSelect("select_1", "item1");
	fillOptionsSelect("select_2", "item6");

	// MULTIPLE_1 select and MULTIPLE_2 select
	fillOptionsMultiple("multiple_1", "item2");
	fillOptionsMultiple("multiple_2", "item7");

	// RADIO_1 and RADIO_2
	fillOptionsRadio("radio_1", "item3");
	fillOptionsRadio("radio_2", "item8");

	// CHECKBOX_1 and CHECKBOX_2
	fillOptionsCheckbox("checkbox_1", "item4");
	fillOptionsCheckbox("checkbox_2", "item9");

	// ****************************** Store the correct answers

	// TEXT_1 and TEXT_2
	sol_text_1 = storeAnswerText("item0");
	sol_text_2 = storeAnswerText("item5");

	// SELECT_1 single and SELECT_2 single
	sol_select_1 = storeAnswerSelect("item1");
	sol_select_2 = storeAnswerSelect("item6");

	// MULTIPLE_1 select and MULTIPLE_2 select
	sol_multiple_1 = storeAnswerMultiple("item2");
	sol_multiple_2 = storeAnswerMultiple("item7");

	// RADIO_1 and RADIO_2
	sol_radio_1 = storeAnswerRadio("item3");
	sol_radio_2 = storeAnswerRadio("item8");

	// CHECKBOX_1 and CHECKBOX_2
	sol_checkbox_1 = storeAnswerCheckbox("item4");
	sol_checkbox_2 = storeAnswerCheckbox("item9");

	// debugging
	//document.getElementById("mostrar").innerHTML = 
	//	'numpreg: ' + numpreg +
	//	' score: ' + score + "<br/>" +
	//	'sol_text_1: ' + sol_text_1.charAt(0).toUpperCase() + sol_text_1.substr(1) +
	//	' sol_select_1: ' + sol_select_1 + 
	//	' sol_multiple_1: ' + sol_multiple_1 +
	//	' sol_radio_1: ' + sol_radio_1 + 
	//	' sol_checkbox_1: ' + sol_checkbox_1 + "<br/>" +
	//	'sol_text_2: ' + sol_text_2 + 
	//	' sol_select_2: ' + sol_select_2 + 
	//	' sol_multiple_2: ' +  sol_multiple_2 +
	//	' sol_radio_2: ' + sol_radio_2 + 
	//	' sol_checkbox_2: ' + sol_checkbox_2;
}

//****************************************************************************************************
// fillOptionsX functions (HTML_element, XML_element)
//****************************************************************************************************

function fillOptionsSelect(sel_elem, item_elem) {
	var selectContainer = document.getElementById(sel_elem);
	//numero de opciones que hay en el XML
	var xml_select = xmlDoc.getElementById(item_elem);
	var nopciones = xml_select.getElementsByTagName("option").length;
	//Bucle para rellenar todas las opciones de select
	for (i = 0; i < nopciones; i++) {
		var option = document.createElement("option");
		option.text = xml_select.getElementsByTagName("option")[i].childNodes[0].nodeValue;
		option.value = i + 1;
		selectContainer.options.add(option);
	}
}

function fillOptionsMultiple(mult_elem, item_elem) {
	var multipleContainer = document.getElementById(mult_elem);
	//numero de opciones que hay en el XML
	var xml_select = xmlDoc.getElementById(item_elem);
	var nopciones = xml_select.getElementsByTagName("option").length;
	multipleContainer.size = nopciones;
	//Bucle para rellenar todas las opciones de select
	for (i = 0; i < nopciones; i++) {
		var option = document.createElement("option");
		option.text = xml_select.getElementsByTagName("option")[i].childNodes[0].nodeValue;
		option.value = i;
		multipleContainer.options.add(option);
	}
}

function fillOptionsRadio(rad_elem, item_elem) {
	var radioContainer = document.getElementById(rad_elem);
	var xml_select = xmlDoc.getElementById(item_elem);
	var nopciones = xml_select.getElementsByTagName('option').length;
	for (i = 0; i < nopciones; i++) {
		var input = document.createElement("input");
		var label = document.createElement("label");
		var br = document.createElement("br");
		label.innerHTML = xml_select.getElementsByTagName('option')[i].childNodes[0].nodeValue;
		label.setAttribute("for", i);
		input.type = "radio";
		input.name = rad_elem;
		input.id = rad_elem + "_" + i;
		input.value = i;
		radioContainer.appendChild(input);
		radioContainer.appendChild(label);
		radioContainer.appendChild(br);
	}
}

function fillOptionsCheckbox(cbx_elem, item_elem) {
	var checkboxContainer = document.getElementById(cbx_elem);
	var xml_select = xmlDoc.getElementById(item_elem);
	var nopciones = xml_select.getElementsByTagName('option').length;
	for (i = 0; i < nopciones; i++) {
		var input = document.createElement("input");
		var label = document.createElement("label");
		var br = document.createElement("br");
		label.innerHTML = xmlDoc.getElementById(item_elem).getElementsByTagName('option')[i].childNodes[0].nodeValue;
		label.setAttribute("for", i);
		input.type = "checkbox";
		input.name = cbx_elem;
		input.id = cbx_elem + "_" + i;
		input.value = i;
		checkboxContainer.appendChild(input);
		checkboxContainer.appendChild(label);
		checkboxContainer.appendChild(br);
	}
}

//****************************************************************************************************
// storeAnswerX functions (XML_element)
//****************************************************************************************************

function storeAnswerText(item_elem) {
	sol_text = xmlDoc.getElementById(item_elem).getElementsByTagName("answer")[0].childNodes[0].nodeValue;
	return sol_text;
}

function storeAnswerSelect(item_elem) {
	sol_select = parseInt(xmlDoc.getElementById(item_elem).getElementsByTagName("answer")[0].childNodes[0].nodeValue);
	return sol_select;
}

function storeAnswerMultiple(item_elem) {
	sol_multiple = "";
	var nsoluciones = xmlDoc.getElementById(item_elem).getElementsByTagName('answer').length;
	for (i = 0; i < nsoluciones; i++) {
		sol_mult[i] = xmlDoc.getElementById(item_elem).getElementsByTagName("answer")[i].childNodes[0].nodeValue;
		sol_multiple = sol_multiple + sol_mult[i];
	}
	return sol_multiple;
}

function storeAnswerRadio(item_elem) {
	sol_radio = parseInt(xmlDoc.getElementById(item_elem).getElementsByTagName("answer")[0].childNodes[0].nodeValue);
	return sol_radio;
}

function storeAnswerCheckbox(item_elem) {
	sol_checkbox = "";
	var nsoluciones = xmlDoc.getElementById(item_elem).getElementsByTagName('answer').length;
	for (i = 0; i < nsoluciones; i++) {
		sol_ckx[i] = xmlDoc.getElementById(item_elem).getElementsByTagName("answer")[i].childNodes[0].nodeValue;
		sol_checkbox = sol_checkbox + sol_ckx[i];
	}
	return sol_checkbox;
}

//****************************************************************************************************
// corregirX functions 
//****************************************************************************************************

function corregirText() {
	resp_text_1 = evaluateText(sol_text_1, "sol_text_1", "text_1");
	resp_text_2 = evaluateText(sol_text_2, "sol_text_2", "text_2");
}

function corregirSelect() {
	resp_select_1 = evaluateSelect(sol_select_1, "sol_select_1", "select_1");
	resp_select_2 = evaluateSelect(sol_select_2, "sol_select_2", "select_2");
}

function corregirMultiple() {
	resp_multiple_1 = evaluateMultiple(sol_multiple_1, "sol_multiple_1", "multiple_1");
	resp_multiple_2 = evaluateMultiple(sol_multiple_2, "sol_multiple_2", "multiple_2");
}

function corregirRadio() {
	resp_radio_1 = evaluateRadio(sol_radio_1, "sol_radio_1", "radio_1");
	resp_radio_2 = evaluateRadio(sol_radio_2, "sol_radio_2", "radio_2");
}

function corregirCheckbox() {
	resp_checkbox_1 = evaluateCheckbox(sol_checkbox_1, "sol_checkbox_1", "checkbox_1");
	resp_checkbox_2 = evaluateCheckbox(sol_checkbox_2, "sol_checkbox_2", "checkbox_2");
}

//****************************************************************************************************
// evaluateX functions (correct_solution_variable, solution_display_HTML_element, form_element)
//****************************************************************************************************

function evaluateText(correct_text, sol_elem, frm_elem) {
	resp_text = document.getElementById(frm_elem).value;
	resp_text = resp_text.toLowerCase();
	if (resp_text == correct_text) {
		informSuccess(frm_elem);
	} else {
		document.getElementById(sol_elem).innerHTML = "Correct answer: " + correct_text.charAt(0).toUpperCase() + correct_text.substr(1);
		informError(frm_elem);
	}
	return resp_text;
}

function evaluateSelect(correct_select, sol_elem, frm_elem) {
	resp_select = -1;
	resp_select = document.getElementById(frm_elem).selectedIndex;
	if (resp_select == correct_select) {
		informSuccess(frm_elem);
	} else {
		document.getElementById(sol_elem).innerHTML = "Correct answer: " + document.getElementById(frm_elem).getElementsByTagName("option")[correct_select].innerHTML;
		informError(frm_elem);
	}
	return resp_select;
}

function evaluateMultiple(correct_multiple, sol_elem, frm_elem) {
	resp_multiple = "";
	multiple_q = document.getElementById(frm_elem);
	multiple_o = multiple_q.getElementsByTagName('option');
	multiple_o_length = multiple_o.length;
	for (i = 0; i < multiple_o_length; i++) {
		if (multiple_o[i].selected) {
			resp_mult[i] = multiple_o[i].value;
			resp_multiple = resp_multiple + resp_mult[i];
		}
	}
	if (resp_multiple == correct_multiple) {
		informSuccess(frm_elem);
	} else {
		var correction = "Correct answer: ";
		num_resp_ok = correct_multiple.length;
		for (j = 0; j < num_resp_ok; j++) {
			idx_resp_ok = correct_multiple.charAt(j);
			idx = parseInt(idx_resp_ok);
			txt_resp_ok = multiple_q.getElementsByTagName("option")[idx].innerHTML;
			correction = correction + "<br/>" + txt_resp_ok;
		}
		document.getElementById(sol_elem).innerHTML = correction;
		informError(frm_elem);
	}
	return resp_multiple;
}

function evaluateRadio(correct_radio, sol_elem, frm_elem) {
	resp_radio = -1;
	radio_q = document.getElementById(frm_elem);
	radio_o = radio_q.getElementsByTagName('input');
	radio_o_length = radio_o.length;
	for (i = 0; i < radio_o_length; i++) {
		if (radio_o[i].checked) { //if this radio button is checked
			resp_radio = radio_o[i].value;
		}
	}
	if (resp_radio == correct_radio) {
		informSuccess(frm_elem);
	} else {
		document.getElementById(sol_elem).innerHTML = "Correct answer: " + radio_q.getElementsByTagName("label")[correct_radio].innerHTML;
		informError(frm_elem);
	}
	return resp_radio;
}

function evaluateCheckbox(correct_checkbox, sol_elem, frm_elem) {
	resp_checkbox = "";
	checkbox_q = document.getElementById(frm_elem);
	checkbox_o = checkbox_q.getElementsByTagName('input');
	checkbox_o_length = checkbox_o.length;
	for (i = 0; i < checkbox_o_length; i++) {
		if (checkbox_o[i].checked) {
			//resp_ckx[i] = checkbox_q.getElementsByTagName("input")[i].value;
			resp_ckx[i] = checkbox_o[i].value;
			resp_checkbox = resp_checkbox + resp_ckx[i];
		}
	}
	if (resp_checkbox == correct_checkbox) {
		informSuccess(frm_elem);
	} else {
		var correction = "Correct answer: ";
		num_resp_ok = correct_checkbox.length;
		for (j = 0; j < num_resp_ok; j++) {
			idx_resp_ok = correct_checkbox.charAt(j);
			idx = parseInt(idx_resp_ok);
			txt_resp_ok = checkbox_q.getElementsByTagName("label")[idx].innerHTML;
			correction = correction + "<br/>" + txt_resp_ok;
		}
		document.getElementById(sol_elem).innerHTML = correction;
		informError(frm_elem);
	}
	return resp_checkbox;
}

function showScore() {

	//document.getElementById("mostrar").innerHTML = 
	//	'numpreg: ' + numpreg +
	//	' score: ' + score + "<br/>" +
	//	'sol_text_1: ' + sol_text_1.charAt(0).toUpperCase() + sol_text_1.substr(1) + 
	//	' sol_select_1: ' + sol_select_1 + 
	//	' sol_multiple_1: ' + sol_multiple_1 +
	//	' sol_radio_1: ' + sol_radio_1 + 
	//	' sol_checkbox_1: ' + sol_checkbox_1 + "<br/>" +
	//	'resp_text_1: ' + resp_text_1 +
	//	' resp_select_1: ' + resp_select_1 +
	//	' resp_multiple_1: ' + resp_multiple_1 +
	//	' resp_radio_1: ' + resp_radio_1 +
	//	' resp_checkbox_1: ' + resp_checkbox_1 + "<br/>" + "<br/>" +        
	//	'sol_text_2: ' + sol_text_2 + 
	//	' sol_select_2: ' + sol_select_2 + 
	//	' sol_multiple_2: ' +  sol_multiple_2 +
	//	' sol_radio_2: ' + sol_radio_2 + 
	//	' sol_checkbox_2: ' + sol_checkbox_2 + "<br/>" +
	//	'resp_text_2: ' + resp_text_2 +
	//	' resp_select_2: ' + resp_select_2 +
	//	' resp_multiple_2: ' + resp_multiple_2 +
	//	' resp_radio_2: ' + resp_radio_2 +
	//	' resp_checkbox_2: ' + resp_checkbox_2 + "<br/>" + "<br/>"
	//  ;    
	alert('Puntuación obtenida: ' + score + ' / ' + numpreg);
}
//****************************************************************************************************
function informSuccess(su) {
	var cor_v = "cor_" + su;
	document.getElementById(cor_v).src = "img/success24.png";
	document.getElementById(cor_v).style.display = 'inline';
	var sol_v = "sol_" + su;
	document.getElementById(sol_v).style.display = 'none';
	score++;
}

function informError(er) {
	var cor_v = "cor_" + er;
	document.getElementById(cor_v).src = "img/error24.png";
	document.getElementById(cor_v).style.display = 'inline-block';
	var sol_v = "sol_" + er;
	document.getElementById(sol_v).style.display = 'inline-block';
}

function resetPuntuacion() {
	score = 0.0;
}
