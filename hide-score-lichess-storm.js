// ==UserScript==
// @name         No score lichess storm
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Hide current score on Lichess puzzle storm
// @author       lvrcz
// @match        https://lichess.org/storm
// @icon         https://www.google.com/s2/favicons?sz=64&domain=lichess.org
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Wait for the DOM to be fully loaded
    window.addEventListener('load', function() {
        // Select all elements with the class puz-side
        var elements = document.getElementsByClassName('puz-side');
        // Apply CSS style to hide those elements
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.display = 'none';
        }
    });
})();
