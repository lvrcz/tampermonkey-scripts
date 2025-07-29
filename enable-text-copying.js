// ==UserScript==
// @name         Enable Text Copying on All Websites
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Allows copying of selectable text on websites (especially for those for shitty websites that block it)
// @author       lvrcz
// @match        *://*/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // Only override copy/cut/contextmenu (don't block mousedown or selectstart)
    const allowCopy = () => {
        const eventsToUnblock = ['copy', 'cut', 'contextmenu'];
        document.addEventListener('DOMContentLoaded', () => {
            eventsToUnblock.forEach(event => {
                document.body.addEventListener(event, e => {
                    e.stopPropagation();
                }, true);
            });
        });
    };

    // Override document-level properties
    const overrideDocumentProperties = () => {
        const props = ['oncopy', 'oncut', 'oncontextmenu'];
        props.forEach(prop => {
            Object.defineProperty(document, prop, {
                get: () => null,
                set: () => {}
            });
        });
        document.addEventListener('DOMContentLoaded', () => {
            if (document.body) {
                props.forEach(prop => {
                    Object.defineProperty(document.body, prop, {
                        get: () => null,
                        set: () => {}
                    });
                });
            }
        });
    };

    // Apply CSS to enable selection without breaking interactions
    const allowTextSelection = () => {
        const style = document.createElement('style');
        style.textContent = `
            body, body * {
                user-select: text !important;
                -webkit-user-select: text !important;
                -moz-user-select: text !important;
                -ms-user-select: text !important;
            }

            input, textarea, select {
                user-select: auto !important;
            }
        `;
        document.addEventListener('DOMContentLoaded', () => {
            document.head.appendChild(style);
        });
    };

    // Initialize
    allowCopy();
    overrideDocumentProperties();
    allowTextSelection();
})();
