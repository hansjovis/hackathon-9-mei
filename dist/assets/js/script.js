"use strict";/**
 * Capitalize the first letter of a string.
 *
 * @param   {string} string The string to capitalize.
 *
 * @returns {string}        The string with the first letter capitalized.
 */function firstToUpperCase(a){return a.charAt(0).toUpperCase()+a.slice(1)}/**
 * Strips HTML from a string.
 *
 * @param {string} string  The string to strip HTML from.
 *
 * @returns {string} The string with HTML stripped.
 */function stripHTML(a){var b=document.createElement("DIV");return b.innerHTML=a,b.textContent||b.innerText||""}
