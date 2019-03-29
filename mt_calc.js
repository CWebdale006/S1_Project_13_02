"use strict";

/*
   New Perspectives on HTML5, CSS3 and JavaScript 6th Edition
   Tutorial 11
   Case Problem 2

   Author: Connor J Webdale 
   Date: 3.28.19 
   
   Filename: mt_calc.js
	
   Functions List:

   init()
      Initializes the contents of the web page and sets up the
      event handlers
      
   buttonClick(e)
      Adds functions to the buttons clicked within the calcutlor
      
   calcKeys(e)
      Adds functions to key pressed within the calculator window 
      
   eraseChar(textStr)
      Erases the last character from the text string, textStr
      
   evalEq(textStr, decimals) 
      Evaluates the equation in textStr, returning a value to the number of decimals specified by the decimals parameter

   lastEq(textStr) 
      Returns the previous expression from the list of expressions in the textStr parameter

*/
// Runs the init() function when the page is loaded by the browser 
window.onload = init();

// Creates the init() function that sets up the event handlers for the page. 
function init() {
   // Contains the collection of page elements belonging to the calcButton class. 
   var calcButtons = document.querySelectorAll(".calcButton");

   for (var i = 0; i < calcButtons.length; i++) {
      // Runs the buttonClick() function in response to the "click" event for every button in the calcButton collection. 
      calcButtons[i].onclick = buttonClick(calcButtons);
   }

   // Runs the calcKeys() function in response to the "keydown" event occuring 
   // document.getElementById("calcWindow").onkeydown = calcKeys();
}

// Changes what appears in the calculator window when the user clicks the calculator buttons. 
function buttonClick(e) {
   // Sets the calcValue variable equal to the value attribute of the calcWindow text area box 
   var calcValue = document.getElementById("calcWindow").value;

   // Declares the calcDecimal variable equal to the value attribute of the decimals input box 
   var calcDecimal = document.getElementById("decimals").value;

   // Declares the buttonValue attribute equal to the value attribute of the event object target 
   var buttonValue = e.target;

   console.log(buttonValue); 
   switch (buttonValue) {
      case "del":
         calcValue = "";
         break;
      case "bksp":
         calcValue = eraseChar(calcValue);
         break;
      case "enter": 
         calcValue = " = " + evalEq(calcValue, calcDecimal) + "/n"; 
         break; 
      case "prev": 
         calcValue = lastEq(calcValue); 
         break; 
      default:
         calcValue = calcValue + buttonValue; 
         break;
   }
}

/* ===================================================================== */

function eraseChar(textStr) {
   return textStr.substr(0, textStr.length - 1);
}

function evalEq(textStr, decimals) {
   var lines = textStr.split(/\r?\n/);
   var lastLine = lines[lines.length - 1];
   var eqValue = eval(lastLine);
   return eqValue.toFixed(decimals);
}

function lastEq(textStr) {
   var lines = textStr.split(/\r?\n/);
   var lastExp = lines[lines.length - 2];
   return lastExp.substr(0, lastExp.indexOf("=")).trim();
}