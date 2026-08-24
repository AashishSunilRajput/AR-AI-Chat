(function () {

    "use strict";

    if (window.ARAIWidgetLoaded) {
        return;
    }

    window.ARAIWidgetLoaded = true;

    const currentScript = document.currentScript;

    const widgetKey = currentScript?.dataset.key;

    if (!widgetKey) {

        console.error("TT AI Chat : Widget Key Missing");

        return;

    }

    const BASE_URL =
        new URL(currentScript.src).origin;

    const API_URL =
        "http://localhost:5000/api";

    loadManifest();

    async function loadManifest() {

        try {

            const response = await fetch(

                BASE_URL + "/.vite/manifest.json",

                {

                    cache: "no-store"

                }

            );

            if (!response.ok) {

                throw new Error("Unable to load manifest");

            }

            const manifest =
                await response.json();

            const entry =
                manifest["index.html"];

            if (!entry) {

                throw new Error("Manifest entry not found");

            }

            //-----------------------------------
            // Host
            //-----------------------------------

            const host =
                document.createElement("div");

            host.id =
                "ar-ai-chat-widget";

            document.body.appendChild(host);

            //-----------------------------------
            // Shadow Root
            //-----------------------------------

            const shadowRoot =
                host.attachShadow({

                    mode: "open"

                });

            //-----------------------------------
            // Root
            //-----------------------------------

            const root =
                document.createElement("div");

            root.id = "root";

            shadowRoot.appendChild(root);

            //-----------------------------------
            // Global Config
            //-----------------------------------

            window.ARAI_WIDGET_CONFIG = {

                widgetKey,

                apiUrl: API_URL,

                rootElement: root,

                shadowRoot

            };

            //-----------------------------------
            // Load CSS
            //-----------------------------------

            if (entry.css) {

                for (const file of entry.css) {

                    const cssResponse =
                        await fetch(

                            BASE_URL + "/" + file,

                            {

                                cache: "no-store"

                            }

                        );

                    const cssText =
                        await cssResponse.text();

                    const style =
                        document.createElement("style");

                    style.textContent =
                        cssText;

                    shadowRoot.appendChild(style);

                }

            }

            //-----------------------------------
            // Load JS
            //-----------------------------------

            const script =
                document.createElement("script");

            script.type = "module";

            script.src =
                BASE_URL + "/" + entry.file;

            document.body.appendChild(script);

        }

        catch (error) {

            console.error(

                "Widget Load Error",

                error

            );

        }

    }

})();