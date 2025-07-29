// ==UserScript==
// @name         GPT Simulated Chat Deletion
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Adds "Instant Delete" option to chat menu and simulates full deletion flow
// @match        https://chatgpt.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const waitFor = (conditionFn, timeout = 5000, interval = 100) => {
        return new Promise((resolve, reject) => {
            const start = Date.now();
            const check = () => {
                const result = conditionFn();
                if (result) return resolve(result);
                if (Date.now() - start > timeout) return reject("Timeout");
                setTimeout(check, interval);
            };
            check();
        });
    };

    const enhanceMenuButton = (btn) => {
        if (btn.dataset.enhanced) return;
        btn.dataset.enhanced = "true";

        btn.addEventListener("click", () => {
            setTimeout(() => {
                const menu = document.querySelector('[role="menu"]');
                if (!menu || menu.querySelector('.instant-delete')) return;

                const customItem = document.createElement("div");
                customItem.className = "__menu-item hoverable instant-delete";
                customItem.textContent = "Instant Delete (Auto Confirm)";
                customItem.style.color = "red";
                customItem.style.cursor = "pointer";

                customItem.addEventListener("click", async (event) => {
                    // Block all possible navigation triggers
                    event.preventDefault();
                    event.stopImmediatePropagation();

                    try {
                        // Step 1: Find and click the native Delete menu option
                        const deleteOption = Array.from(document.querySelectorAll(".__menu-item"))
                            .find(el => el.textContent.trim().toLowerCase() === "delete");

                        if (!deleteOption) throw new Error("Delete option not found in menu.");

                        deleteOption.click();

                        // Step 2: Wait for confirmation popup button and click it
                        const confirmBtn = await waitFor(() =>
                            [...document.querySelectorAll("button")]
                                .find(btn => btn.textContent.trim().toLowerCase() === "delete")
                        );

                        confirmBtn.click();

                        // Step 3: Force stay on homepage after deletion
                        history.pushState({}, "", "/");
                    } catch (err) {
                        alert("Failed to delete chat: " + err);
                    }
                });

                menu.appendChild(customItem);
            }, 100);
        });
    };

    // Observe and enhance ⋯ menu buttons as they appear
    const observer = new MutationObserver(() => {
        document.querySelectorAll('button[data-testid^="history-item-"][aria-haspopup="menu"]').forEach(enhanceMenuButton);
    });

    observer.observe(document.body, { childList: true, subtree: true });

})();
