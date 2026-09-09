(() => {
    const marker = document.getElementById("filmoteka-email-update");
    if (!marker) return;

    const {mode, appUrl, realm, clientId} = marker.dataset;
    if (!appUrl) return;

    const tabId = new URL(globalThis.location.href).searchParams.get("tab_id");
    const key = tabId ? `filmoteka:email-update:${realm}:${clientId}:${tabId}` : null;

    let redirected = false;

    function returnToApp() {
        if (redirected) return;
        redirected = true;
        globalThis.location.replace(appUrl);
    }

    if (mode === "success") {
        try {
            if (key) globalThis.localStorage.setItem(key, "complete");
        } catch (error) {
            console.warn("Could not notify the waiting tab about the email update.", error);
        }
        returnToApp();
        return;
    }

    if (mode !== "waiting" || !key) return;

    function complete() {
        try {
            globalThis.localStorage.removeItem(key);
        } catch (error) {
            console.warn("Could not clear the email-update notification.", error);
        }
        returnToApp();
    }

    function checkCompletion() {
        try {
            if (globalThis.localStorage.getItem(key) === "complete") {
                complete();
            }
        } catch (error) {
            console.warn("Could not read the email-update notification.", error);
        }
    }

    globalThis.addEventListener("storage", (event) => {
        if (event.key === key && event.newValue === "complete") {
            complete();
        }
    });

    globalThis.addEventListener("pageshow", checkCompletion);

    document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "visible") {
            checkCompletion();
        }
    });

    checkCompletion();
})();