// Objeto que contiene todas las traducciones
const translations = {
  en: {
    page_title: "Biopixel - Precision Agriculture",
    nav_home: "Home",
    nav_about: "About Us",
    nav_services: "Services",
    nav_contact: "Contact",
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
    footer_text: "© 2025 Biopixel. All rights reserved."
  },
  es: {
    page_title: "Biopixel - Agricultura de Precisión",
    nav_home: "Inicio",
    nav_about: "Nosotros",
    nav_services: "Servicios",
    nav_contact: "Contacto",
    hero_supertitle: "Agricultura de Precisión",
    hero_subtitle: "Analizamos datos de ecosistemas naturales y artificiales para potenciar la industria agrícola global.",
    hero_button: "Conoce Más",
    about_title: "Nuestro Compromiso",
    about_text: "La optimización de los recursos no solo es conveniente económicamente, es necesario para la subsistencia y evolución ordenada del rubro.",
    about_button: "Nuestros Servicios",
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
    footer_text: "© 2025 Biopixel. Todos los derechos reservados."
  }
};

function updateActiveButton(lang) {
    ['es', 'en'].forEach(id => {
        document.getElementById(`lang-${id}`)?.classList.remove('active');
        document.getElementById(`lang-${id}-mobile`)?.classList.remove('active');
    });
    document.getElementById(`lang-${lang}`)?.classList.add('active');
    document.getElementById(`lang-${lang}-mobile`)?.classList.add('active');
}

function translatePage() {
  const lang = localStorage.getItem('language') || 'es';
  
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    const translation = translations[lang][key];
    
    if (translation) {
      if (element.placeholder !== undefined) {
        element.placeholder = translation;
      } else {
        element.textContent = translation;
      }
    }
  });
  updateActiveButton(lang);
}

function setLanguage(lang) {
  localStorage.setItem('language', lang);
  translatePage();
}

document.addEventListener('DOMContentLoaded', translatePage);
