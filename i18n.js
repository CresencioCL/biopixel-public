// Function to fetch translation files
async function fetchTranslations(lang) {
  console.log(`[i18n] Attempting to fetch ${lang}.json`); // Loguear intento
  try {
    const response = await fetch(`${lang}.json`);
    console.log(`[i18n] Response status for ${lang}.json: ${response.status}`); // Loguear status
    if (!response.ok) {
      const errorText = await response.text(); // Intentar leer el texto del error
      console.error(`[i18n] Failed to load ${lang}.json. Status: ${response.status}. Body: ${errorText}`);
      alert(`Error: Could not load translation file for ${lang}. Server returned ${response.status}.`); // Alerta visible
      throw new Error(`Failed to load ${lang}.json. Status: ${response.status}`);
    }
    const data = await response.json();
    console.log(`[i18n] Successfully fetched and parsed ${lang}.json`); // Loguear éxito
    return data;
  } catch (error) {
    console.error(`[i18n] Critical error fetching or parsing ${lang}.json:`, error);
    alert(`Critical Error: Could not process translation file for ${lang}. See console for details.`); // Alerta visible
    throw error; // Re-lanzar para que setLanguage falle
  }
}

// Function to apply translations to the page
function applyTranslations(translations) {
  console.log('[i18n] Applying translations...');
  try {
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (translations[key]) {
        // Preserve child elements for elements like the hero button
        if (element.children.length > 0 && (key === 'hero_button' || key === 'navbar_home' || key === 'navbar_about' || key === 'navbar_contact')) {
            // For buttons or links, we might only want to change the text node
            // This is a simple approach; more complex structures might need specific handling
            let textNode = Array.from(element.childNodes).find(node => node.nodeType === Node.TEXT_NODE);
            if (textNode) {
                textNode.textContent = translations[key];
            } else {
                element.textContent = translations[key];
            }
        } else {
          element.textContent = translations[key];
        }
      }
    });
    // Update the lang attribute of the HTML tag
    document.documentElement.lang = currentLanguage; // currentLanguage should be set before this runs
    console.log('[i18n] Translations applied. HTML lang set to:', currentLanguage);
  } catch (e) {
    console.error('[i18n] Error in applyTranslations:', e);
    alert(`Error applying translations. Some text may not be updated. See console.`); // Alerta visible
    throw e;
  }
}

// Function to set the language
async function setLanguage(lang) {
  console.log(`[i18n] setLanguage called for: ${lang}`);
  if (!['en', 'es', 'nl'].includes(lang)) {
    console.warn(`[i18n] Language ${lang} not supported. Defaulting to 'es'.`);
    lang = 'es';
  }

  // Guardar en localStorage
  try {
    localStorage.setItem('language', lang);
    console.log(`[i18n] Language ${lang} saved to localStorage.`);
  } catch (e) {
    console.error('[i18n] Error during localStorage.setItem (continuing anyway):', e);
  }

  currentLanguage = lang;
  document.documentElement.lang = currentLanguage; // Actualizar lang HTML inmediatamente
  console.log(`[i18n] currentLanguage set to: ${currentLanguage}. HTML lang attribute updated.`);

  try {
    console.log(`[i18n] Attempting to load translations for ${lang}...`);
    const translations = await fetchTranslations(lang);
    if (translations) { // Solo aplicar si fetchTranslations tuvo éxito
        console.log(`[i18n] Translations successfully loaded for ${lang}. Applying...`);
        applyTranslations(translations); // applyTranslations ya tiene sus propios logs y try/catch
        console.log(`[i18n] Translations applied for ${lang}.`);
    } else {
        // Esto no debería ocurrir si fetchTranslations lanza error en caso de fallo.
        console.error(`[i18n] Translations object for ${lang} is null or undefined after fetch. Cannot apply.`);
        alert(`Error: Translation data for ${lang} could not be loaded. Check console.`);
    }
  } catch (error) {
    // Si fetchTranslations falla y lanza un error, se atrapará aquí.
    // La alerta ya se habrá mostrado en fetchTranslations.
    console.error(`[i18n] Failed to set language ${lang} due to error in fetching/applying translations:`, error);
    // Opcionalmente, revertir al idioma anterior o a uno por defecto si falla la carga.
  }
}

// Function to initialize language settings
async function initLanguage() {
  console.log('[i18n] Initializing language...');
  let preferredLanguage = 'es'; // Default
  try {
    preferredLanguage = localStorage.getItem('language') || 'es';
    console.log('[i18n] Preferred language from localStorage:', preferredLanguage);
  } catch (e) {
    console.error('[i18n] Error reading from localStorage (continuing with default "es"):', e);
    // preferredLanguage remains 'es'
  }

  // Check if the HTML lang attribute is set and different, and if so, use it.
  try {
    const htmlLang = document.documentElement.lang;
    console.log('[i18n] HTML lang attribute:', htmlLang);
    if (htmlLang && ['en', 'es', 'nl'].includes(htmlLang) && htmlLang !== preferredLanguage) { // Also update here for consistency
      preferredLanguage = htmlLang;
      console.log('[i18n] Using HTML lang attribute as preferred language:', preferredLanguage);
    }
  } catch (e) {
    console.error('[i18n] Error reading document.documentElement.lang (continuing with preferredLanguage):', e);
  }

  currentLanguage = preferredLanguage; // Set global current language
  console.log('[i18n] Current language before setLanguage call:', currentLanguage);
  try {
    await setLanguage(preferredLanguage);
    console.log('[i18n] initLanguage: setLanguage completed for', preferredLanguage);
  } catch (error) {
    console.error('[i18n] initLanguage: Error calling setLanguage:', error);
    throw error; // Re-throw to be caught by the i18nInitialized promise
  }
}

// Global variable for current language
let currentLanguage = 'es';

// Initialize language settings when the script loads
// Expose a promise that resolves when initLanguage is done
window.i18nInitialized = new Promise((resolve, reject) => {
  document.addEventListener('DOMContentLoaded', async () => {
    try {
      await initLanguage();
      resolve();
    } catch (error) {
      console.error("Error during i18n initialization:", error);
      reject(error);
    }
  });
});

// Make setLanguage globally accessible for the onclick handlers in HTML
window.setLanguage = setLanguage;
