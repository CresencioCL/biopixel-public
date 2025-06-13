const { JSDOM, VirtualConsole } = require('jsdom');
const fs = require('fs');
const path = require('path');

async function testI18n() {
    console.log('--- Node.js JSDOM Test Runner ---');

    // Read the HTML file
    const testHtmlPath = path.resolve(__dirname, 'test_i18n.html');
    let testHTML;
    try {
        testHTML = fs.readFileSync(testHtmlPath, 'utf-8');
    } catch (e) {
        console.error(`Failed to read test_i18n.html: ${e.message}`);
        return;
    }

    // Read the i18n.js file to inject it
    const i18nScriptPath = path.resolve(__dirname, 'i18n.js');
    let i18nScriptContent;
    try {
        i18nScriptContent = fs.readFileSync(i18nScriptPath, 'utf-8');
    } catch (e) {
        console.error(`Failed to read i18n.js: ${e.message}`);
        return;
    }

    // Fetch translation files for mocking
    let enJSON, esJSON;
    try {
        enJSON = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'en.json'), 'utf-8'));
        esJSON = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'es.json'), 'utf-8'));
    } catch (e) {
        console.error(`Failed to read JSON translation files: ${e.message}`);
        return;
    }

    const virtualConsole = new VirtualConsole();
    virtualConsole.on("error", (...args) => console.error("JSDOM CONSOLE ERROR:", ...args));
    virtualConsole.on("warn", (...args) => console.warn("JSDOM CONSOLE WARN:", ...args));
    virtualConsole.on("info", (...args) => console.info("JSDOM CONSOLE INFO:", ...args));
    virtualConsole.on("log", (...args) => console.log("JSDOM:", ...args));

    try {
        const dom = new JSDOM(testHTML, {
            runScripts: "dangerously",
            resources: "usable",
            url: `file://${testHtmlPath}`,
            virtualConsole,
            beforeParse(window) {
                window.addEventListener('unhandledrejection', event => {
                    console.error('JSDOM UNHANDLED PROMISE REJECTION:', event.reason);
                });

                // Restore localStorage mock, making it slightly more Storage-like
                const store = {};
                window.localStorage = {
                    getItem: function(key) {
                        return store.hasOwnProperty(key) ? store[key] : null;
                    },
                    setItem: function(key, value) {
                        store[key] = String(value);
                    },
                    removeItem: function(key) {
                        delete store[key];
                    },
                    clear: function() {
                        for (const key in store) {
                            if (store.hasOwnProperty(key)) {
                                delete store[key];
                            }
                        }
                    },
                    get length() {
                        return Object.keys(store).length;
                    },
                    key: function(index) {
                        const keys = Object.keys(store);
                        return keys[index] || null;
                    }
                };

                // Mock fetch to return local JSON files
                window.fetch = async (url) => {
                    // console.log(`JSDOM fetch mock: Intercepted request for ${url}`);
                    const fileName = path.basename(url);
                    if (fileName === 'en.json') {
                        // console.log("JSDOM fetch mock: Serving en.json");
                        return { ok: true, json: async () => JSON.parse(JSON.stringify(enJSON)) }; // Deep clone
                    }
                    if (fileName === 'es.json') {
                        // console.log("JSDOM fetch mock: Serving es.json");
                        return { ok: true, json: async () => JSON.parse(JSON.stringify(esJSON)) }; // Deep clone
                    }
                    console.error(`JSDOM fetch mock: Unknown URL: ${url}`);
                    return { ok: false, status: 404, json: async () => ({ error: 'File not found' }) };
                };

                // JSDOM does not execute script tags with src directly in the way a browser does when dynamically created or complex loaded.
                // We've read i18n.js, so we can directly evaluate it in the window context.
                // This is simpler than trying to make JSDOM's resource loader work perfectly for this case.
                // window.eval(i18nScriptContent);
            }
        });

        // Wait for all scripts to load and execute, especially DOMContentLoaded and subsequent async operations
        // The test_i18n.html script uses setTimeout to delay runTests. We need to allow that to trigger.
        // A common way is to wait for a specific event or a timeout.
        await new Promise(resolve => setTimeout(resolve, 1500)); // Increased timeout to ensure all async test operations complete

        console.log('--- Node.js JSDOM Test Runner Finished ---');

    } catch (error) {
        console.error('Error during JSDOM execution:', error);
    }
}

testI18n().catch(e => console.error("Critical error in testI18n:", e));
