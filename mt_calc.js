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
      calcButtons[i].addEventListener("click", buttonClick);
   }

   // Runs the calcKeys() function in response to the "keydown" event occuring 
   document.getElementById("calcWindow").addEventListener("keydown", calcKeys);
}

// Changes what appears in the calculator window when the user clicks the calculator buttons. 
function buttonClick(e) {
   // Sets the calcValue variable equal to the value attribute of the calcWindow text area box 
   var calcValue = document.getElementById("calcWindow").value;

   // Declares the calcDecimal variable equal to the value attribute of the decimals input box 
   var calcDecimal = document.getElementById("decimals").value;

   // Declares the buttonValue attribute equal to the value attribute of the event object target 
   var buttonValue = e.target.value;

   switch (buttonValue) {
      case "del":
         // Deletes the contents of the window 
         calcValue = "";
         break;
      case "bksp":
         // Erases the last character in the calculator window 
         calcValue = eraseChar(calcValue);
         break;
      case "enter":
         // Calculates the value of the current expression 
         calcValue += " = " + evalEq(calcValue, calcDecimal) + "\n";
         break;
      case "prev":
         // Copies the last equation in the calculator window 
         calcValue = lastEq(calcValue);
         break;
      default:
         // Appends the calculator button character to the calculator window 
         calcValue = calcValue + buttonValue;
         break;
   }

   // Sets the value attribute of the calcWindow text area box to calcValue 
   document.getElementById("calcWindow").value = calcValue;

   // Puts the cursor focus within the calculator window 
   document.getElementById("calcWindow").focus();
}

// Controls the keyboard actions within the calculator window 
function calcKeys(e) {
   // Declares local variables like the ones in buttonClick() 
   var calcValue = document.getElementById("calcWindow").value;
   var calcDecimal = document.getElementById("decimals").value;

   switch (e.key) {
      case "Delete":
         // Erases the contents of the calculator window 
         console.log(e.key); 
         calcValue = "";
         break;
      case "Enter":
         // Adds an expression to calcValue 
         console.log(e.key); 
         calcValue += " = " + evalEq(calcValue, calcDecimal); 
         break; 
      case "ArrowUp": 
         // Adds an expression to calcValue 
         console.log(e.key); 
         calcValue = lastEq(calcWindow.value); 

         // Prevents the browser from performing the default action 
         e.preventDefault(); 
   }
   
   // Sets the value attribute of calcWindow to calcValue 
   document.getElementById("calcWindow").value = calcValue; 
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