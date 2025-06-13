// Function to fetch translation files
async function fetchTranslations(lang) {
  const response = await fetch(`${lang}.json`);
  if (!response.ok) {
    throw new Error(`Failed to load ${lang}.json`);
  }
  return await response.json();
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
    document.documentElement.lang = currentLanguage;
    console.log('[i18n] Translations applied. HTML lang set to:', currentLanguage);
  } catch (e) {
    console.error('[i18n] Error in applyTranslations:', e);
    throw e; // Re-throw to be caught by initLanguage promise
  }
}

// Function to set the language
async function setLanguage(lang) {
  console.log('[i18n] Setting language to:', lang);
  try {
    await Promise.resolve(); // Test await itself
    console.log('[i18n] after test await in setLanguage');
  } catch (e) {
    console.error('[i18n] Error after test await in setLanguage', e);
    throw e;
  }
  if (!['en', 'es', 'nl'].includes(lang)) {
    console.warn(`[i18n] Language ${lang} not supported. Defaulting to 'es'.`);
    lang = 'es';
  }
  try {
    localStorage.setItem('language', lang);
    console.log('[i18n] localStorage.setItem attempted for', lang);
  } catch (e) {
    console.error('[i18n] Error during localStorage.setItem (continuing anyway):', e);
    // Do not throw e, allow to continue
  }
  currentLanguage = lang; // Update global current language
  console.log('[i18n] Fetching translations for:', lang);
  const translations = await fetchTranslations(lang);
  console.log('[i18n] Translations fetched for:', lang);
  applyTranslations(translations);
  console.log('[i18n] Language set to:', lang);
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
