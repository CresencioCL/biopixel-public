// Biopixel i18n Engine - V6 Cross-Browser "URL Propagation" Version
// This version solves Firefox storage isolation by passing state through the URL.

// --- Cookie Helpers ---
function setCookie(name, value, days = 365) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${d.toUTCString()};path=/;SameSite=Lax`;
}

function getCookie(name) {
    const val = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return val ? val.pop() : null;
}

// --- Translation Data ---
const translations = {
    en: {
        page_title: "Biopixel - Precision Agriculture",
        nav_home: "Home", nav_about: "About Us", nav_services: "Services", nav_contact: "Contact",
        hero_supertitle: "Precision Agriculture",
        hero_subtitle: "We analyze data from natural and artificial ecosystems to empower the global agricultural industry.",
        hero_button: "Learn More",
        about_title: "Our Commitment",
        about_text: "Resource optimization is not only economically convenient, but necessary for the subsistence and orderly evolution of the sector.",
        about_button: "Our Services",
        services_title: "Services",
        services_subtitle: "We offer a suite of precision agriculture solutions tailored to your needs.",
        service1_title: "Crop Monitoring",
        service1_text: "Real-time information on crop health and growth stages.",
        service2_title: "Field Mapping",
        service2_text: "Detailed mapping of terrain conditions and variations.",
        service3_title: "Yield Optimization",
        service3_text: "Data-driven strategies to maximize harvest output.",
        contact_title: "Improve your performance",
        form_button: "Contact Us",
        footer_text: "© 2025 Biopixel. All rights reserved.",

        /* About Page Detail */
        about_p1: "Biopixel is a company focused on transforming how large-scale agriculture is planned and managed. We seek to integrate data from various sources into a single system capable of offering models, simulations, and decision-making tools on the ground.",
        about_p2: "We were founded with the conviction that value lies in understanding space and time in a coordinated way, and that agricultural productivity can be optimized with reliable, accessible, and actionable information.",
        about_p3: "Our approach combines technical knowledge, operational vision, and experience in spatial data management. We want to bring precision agriculture solutions closer, allowing for greater efficiency, problem anticipation, and a fundamental organization of processes.",
        about_p4: "Biopixel doesn't just deliver technology: it proposes a new way of understanding the field, with a strategic perspective connected to the reality of those who work it.",

        /* Service Detail Pages */
        monitoreo_detail_title: "Crop Monitoring",
        monitoreo_detail_subtitle: "Visualizing the pulse of your harvest in real-time.",
        monitoreo_detail_text: "Our monitoring system uses advanced satellite imagery and sensor data to provide a comprehensive view of your crops. Detect anomalies, monitor growth rates, and optimize irrigation schedules with precision data that keeps you ahead of potential issues.",
        mapeo_detail_title: "Field Mapping",
        mapeo_detail_subtitle: "Understanding the geography of productivity.",
        mapeo_detail_text: "We create high-resolution maps that reveal the hidden variables of your terrain. From soil composition to elevation changes, our mapping services provide the base layer for any data-driven agricultural strategy, allowing for variable rate application and precise resource management.",
        optimizacion_detail_title: "Yield Optimization",
        optimizacion_detail_subtitle: "Maximizing the potential of every square meter.",
        optimizacion_detail_text: "By correlating historical data with environmental variables, we provide actionable insights to boost your final production. Our algorithms analyze multiple layers of information to recommend the best strategies for planting, fertilization, and harvesting, ensuring the highest return on investment."
    },
    es: {
        page_title: "Biopixel - Agricultura de Precisión",
        nav_home: "Inicio", nav_about: "Nosotros", nav_services: "Servicios", nav_contact: "Contacto",
        hero_supertitle: "Agricultura de Precisión",
        hero_subtitle: "Analizamos datos de ecosistemas naturales y artificiales para potenciar la industria agrícola global.",
        hero_button: "Explorar",
        about_title: "Nuestro Compromiso",
        about_text: "La optimización de los recursos no solo es conveniente económicamente, es necesario para la subsistencia y evolución ordenada del rubro.",
        about_button: "Servicios",
        services_title: "Servicios",
        services_subtitle: "Ofrecemos un conjunto de soluciones de agricultura de precisión adaptadas a tus necesidades.",
        service1_title: "Monitoreo de Cultivos",
        service1_text: "Información en tiempo real sobre la salud y las etapas de crecimiento de los cultivos.",
        service2_title: "Mapeo de Campo",
        service2_text: "Mapeo detallado de las condiciones y variaciones del terreno.",
        service3_title: "Optimización de Rendimiento",
        service3_text: "Estrategias basadas en datos para maximizar la producción de la cosecha.",
        contact_title: "Mejora tu rendimiento",
        form_button: "Contáctanos",
        footer_text: "© 2025 Biopixel. Todos los derechos reservados.",

        /* About Page Detail */
        about_p1: "Biopixel es una empresa enfocada en transformar la forma en que se planifica y gestiona la agricultura a gran escala. Buscamos integrar datos de diversas fuentes en un solo sistema capaz de ofrecer modelos, simulaciones y herramientas de apoyo para la toma de decisiones en el terreno.",
        about_p2: "Nos fundamos con la convicción de que el valor reside en comprender el espacio y el tiempo de manera coordinada, y que la productividad agrícola puede optimizarse con información confiable, accesible y accionable.",
        about_p3: "Nuestro enfoque combina conocimiento técnico, visión operativa y experiencia en la gestión de datos espaciales. Queremos acercar soluciones de agricultura de precisión, permitiendo una mayor eficiencia, la anticipación de problemas y un ordenamiento fundamental de los procesos.",
        about_p4: "Biopixel no solo entrega tecnología: propone una nueva forma de entender el campo, con una perspectiva estratégica conectada con la realidad de quienes lo trabajan.",

        /* Service Detail Pages */
        monitoreo_detail_title: "Monitoreo de Cultivos",
        monitoreo_detail_subtitle: "Visualizando el pulso de tu cosecha en tiempo real.",
        monitoreo_detail_text: "Nuestro sistema de monitoreo utiliza imágenes satelitales avanzadas y datos de sensores para proporcionar una visión integral de sus cultivos. Detecte anomalías, visualice tasas de crecimiento y optimice los programas de riego con datos de precisión que lo mantienen un paso adelante.",
        mapeo_detail_title: "Mapeo de Campo",
        mapeo_detail_subtitle: "Comprendiendo la geografía de la productividad.",
        mapeo_detail_text: "Creamos mapas de alta resolución que revelan las variables ocultas de su terreno. Desde la composición del suelo hasta los cambios de elevación, nuestros servicios de mapeo proporcionan la capa base para cualquier estrategia agrícola basada en datos, permitiendo la gestión precisa de recursos.",
        optimizacion_detail_title: "Optimización de Rendimiento",
        optimizacion_detail_subtitle: "Maximizando el potencial de cada metro cuadrado.",
        optimizacion_detail_text: "Correlacionando datos históricos con variables ambientales, proporcionamos información accionable para impulsar su producción final. Nuestros algoritmos analizan múltiples capas de información para recomendar las mejores estrategias de siembra, fertilización y cosecha, asegurando el mayor retorno de inversión."
    }
};

// --- Storage & Compatibility Logic ---

function getLang() {
    try {
        // Priority 1: URL Parameter (Bulletproof for Firefox)
        const urlParams = new URLSearchParams(window.location.search);
        const urlLang = urlParams.get('lang');
        if (urlLang && translations[urlLang]) return urlLang;

        // Priority 2: LocalStorage & Cookie (Secondary fallback)
        return localStorage.getItem('language') || getCookie('language') || 'es';
    } catch (e) {
        return getCookie('language') || 'es';
    }
}

// Dynamically rewrite all internal links to carry the current language
// Robust version: handles [Base]?[Search]#[Hash] correctly
function syncLinks(lang) {
    document.querySelectorAll('a[href]').forEach(link => {
        const href = link.getAttribute('href');

        // Skip external, protocols, and pure anchors
        if (!href || href.startsWith('http') || href.startsWith('mailto') ||
            href.startsWith('tel') || href.startsWith('#')) return;

        try {
            // 1. Split by Hash first
            const [urlPart, hashPart] = href.split('#');
            const hash = hashPart ? '#' + hashPart : '';

            // 2. Split urlPart by Query
            const [base, searchQuery] = urlPart.split('?');

            // 3. Update Params
            const params = new URLSearchParams(searchQuery || '');
            params.set('lang', lang);

            // 4. Rebuild: Base?Params#Hash
            const newHref = `${base}?${params.toString()}${hash}`;

            // Only update if changed to avoid redundant DOM mutations
            if (href !== newHref) {
                link.setAttribute('href', newHref);
            }
        } catch (e) {
            console.error('Error syncing link:', href, e);
        }
    });
}

function updateActiveButton(lang) {
    ['es', 'en'].forEach(id => {
        const btn = document.getElementById(`lang-${id}`);
        const mBtn = document.getElementById(`lang-${id}-mobile`);
        if (btn) btn.classList.toggle('active', id === lang);
        if (mBtn) mBtn.classList.toggle('active', id === lang);
    });
}

function revealBody() {
    requestAnimationFrame(() => {
        document.body.classList.remove('i18n-loading');
    });
}

function translatePage() {
    const lang = getLang();
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(element => {
        try {
            const key = element.getAttribute('data-i18n');
            const translation = translations[lang][key];
            if (translation) {
                if (element.placeholder !== undefined) element.placeholder = translation;
                else element.textContent = translation;
            }
        } catch (e) { console.error('i18n error:', e); }
    });

    updateActiveButton(lang);
    syncLinks(lang); // Propagation to other pages
    revealBody();
}

function setLanguage(lang) {
    try {
        localStorage.setItem('language', lang);
        setCookie('language', lang);

        // Update current URL without reload to match navigation sync
        const url = new URL(window.location.href);
        url.searchParams.set('lang', lang);
        window.history.replaceState({}, '', url.toString());

        // Full re-translation including link sync
        translatePage();
    } catch (e) {
        console.error('setLanguage fallback:', e);
        setCookie('language', lang);
        translatePage();
    }
}

// --- Consistency Listeners ---

// 1. Storage Sync (Cross-tab)
window.addEventListener('storage', (e) => {
    if (e.key === 'language') setTimeout(translatePage, 50);
});

// 2. Navigation Sync (bfcache & Back/Forward)
window.addEventListener('pagehide', () => {
    document.body.classList.add('i18n-loading');
});
window.addEventListener('pageshow', translatePage);
window.addEventListener('popstate', translatePage);

// 3. User Presence Sync
window.addEventListener('focus', translatePage);
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') translatePage();
});

// 4. Initial Load
document.addEventListener('DOMContentLoaded', translatePage);

// 5. Safety Trigger
setTimeout(() => {
    if (document.body.classList.contains('i18n-loading')) revealBody();
}, 2000);
