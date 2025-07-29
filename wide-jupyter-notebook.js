// ==UserScript==
// @name         Wide Jupyter Notebook
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description
// @author       lvrcz
// @match        *http://localhost:8888/notebooks/*
// @icon         none
// @grant        none
// @run-at   document-start
// ==/UserScript==


function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('.container { width:100% !important; }');
