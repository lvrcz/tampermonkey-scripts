// ==UserScript==
// @name         Jupyter done running sound
// @namespace    http://tampermonkey.net/
// @version      2.1
// @description  Play a sound when the page favicon changes
// @author       lvrcz
// @match        *http://localhost:8888/notebooks/*
// @grant        none
// ==/UserScript==

window.addEventListener('load', function() {
    'use strict';
    // Create an audio element to play the sound
    var audio = new Audio("https://www.soundjay.com/buttons/button-3.mp3");
    audio.load();
    // Get the current favicon
    var currentFavicon = document.querySelector("link[id*='favicon']")
    // Check for changes to the favicon every 2000 milliseconds
    setInterval(function() {
        var newFavicon = document.querySelector("link[id*='favicon']");
        if (newFavicon !== currentFavicon && newFavicon.outerHTML == '<link id="favicon" type="image/x-icon" rel="shortcut icon" href="/static/base/images/favicon-notebook.ico">') {
            currentFavicon = newFavicon;
            audio.play();

        }
    }, 2000);
}, false);

