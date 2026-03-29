# 🌱 Memoria del Proyecto — Biopixel

> **Dominio:** [www.biopixel.cl](https://www.biopixel.cl)
> **Repositorio:** `CresencioCL/biopixel-public`
> **Hosting:** GitHub Pages (con CNAME personalizado)
> **Rama activa:** `modernizacion-ui`
> **Última actualización de esta memoria:** 28 de marzo de 2026

---

## 1. Descripción General

Biopixel es una empresa de **agricultura de precisión** que analiza datos de ecosistemas naturales y artificiales para potenciar la industria agrícola global. Este proyecto es su **sitio web institucional**, construido como un sitio estático (HTML/CSS/JS vanilla) con un diseño minimalista oscuro premium. En marzo de 2026, el sitio pasó por un rediseño completo adopting la estética **"Precision Industrialism"** (prototipada vía Stitch), caracterizada por bordes rectangulares (0px radius), tipografía hiper-legible y animaciones industriales sutiles.

---

## 2. Stack Tecnológico

| Capa | Tecnología |
|---|---|
| **Estructura** | HTML5 semántico |
| **Estilos** | CSS vanilla con custom properties (variables) |
| **Lógica** | JavaScript vanilla (ES6+) |
| **Tipografía** | Google Fonts: `Inter` (body) + `Outfit` (headings) |
| **Formulario** | Cloudflare Workers (backend de email) |
| **Analytics** | Cloudflare Web Analytics |
| **Deploy** | GitHub Pages |
| **Dependencias** | `jsdom` (solo para testing) |

---

## 3. Estructura de Archivos

```
Biopixel-claude/
├── index.html              ← Landing page principal (hero, nosotros, servicios, contacto)
├── about.html              ← Página "Nosotros" con detalle de la misión
├── contacto.html           ← Formulario de contacto
├── monitoreo.html          ← Servicio: Monitoreo de Cultivos
├── mapeo.html              ← Servicio: Mapeo de Campo
├── optimizacion.html       ← Servicio: Optimización de Rendimiento
│
├── global.css              ← Estilos globales y design system
├── i18n.js                 ← Motor de internacionalización (V6)
├── form-handler.js         ← Lógica del formulario de contacto
├── header-scroll.js        ← Efectos de scroll en el header
├── mobile-menu.js          ← Menú hamburguesa móvil
├── smooth-scroll.js        ← Scroll suave entre secciones
│
├── es.json                 ← Traducciones ES (versión alternativa/nueva)
├── en.json                 ← Traducciones EN (versión alternativa/nueva)
├── nl.json                 ← Traducciones NL (holandés)
│
├── images/
│   ├── logo.png            ← Logo principal
│   ├── logo-48x48.png      ← Favicon
│   └── logo-192x192.png    ← Apple touch icon
│
├── test_i18n.html          ← Página de prueba para i18n
├── run_test.js             ← Script de testing con jsdom
├── CNAME                   ← Dominio: www.biopixel.cl
├── package.json            ← Solo dependencia de testing (jsdom)
└── README.md               ← Descripción básica del repo
```

---

## 4. Design System ("Precision Industrialism")

### 4.1 Paleta de Colores y Jerarquía de Superficies

| Variable | Valor | Uso |
|---|---|---|
| `--bg-main` | `#080810` | Fondo principal hero (negro industrial) |
| `--surface` | `#13131b` | Fondo sección Nosotros (mid-dark) |
| `--surface-container-low` | `#1b1b23` | Card servicio 1 |
| `--surface-container` | `#1f1f28` | Card servicio 2 |
| `--surface-container-high`| `#292932` | Card servicio 3 |
| `--surface-sunken` | `#0d0d16` | Fondo footer (hundido) |
| `--primary` | `#9494c7` | Color de acento (lavanda técnica) |
| `--primary-dim` | `rgba(148, 148, 199, 0.10)` | Acento tenue para números grandes de fondo |
| `--text-main` | `#e4e1ed` | Texto principal (blanco industrial) |
| `--ghost-border` | `rgba(71, 70, 79, 0.15)`| Bordes invisibles/guías estructurales |

### 4.2 Tipografía

- **Headings (H1, H2, H3, números gigantes):** `Outfit` — pesos 300, 500 (geometría limpia)
- **Body, labels técnicos, botones:** `Inter` — pesos 300, 400, 500
- **Tamaño base y legibilidad:** Body usa `font-weight: 300` con `line-height: 1.6` a `2`. Los "eyebrows" (labels de sección) usan tracking extremo (`letter-spacing: 0.35em`).

### 4.3 Arquitectura Visual y Efectos

- **Border Radius:** Estrictamente `0px` en todo el sitio.
- **Scroll Reveal:** Sistema basado en `IntersectionObserver` que activa clases `.reveal` (fade up & in) con delays progresivos (`.reveal-delay-1`...`4`).
- **Líneas Decorativas:** `.line-h` animadas que crecen horizontalmente al revelar y `.scan-line` infinitas que simulan barridos de radar/óptica en el hero.
- **Botones "Slide-Fill":** Efecto hover donde el fondo primario rellena el botón de izquierda a derecha (`::before` psuedo-element).
- **Color de fondo dinámico:** Script JS custom interpola frame a frame los valores RGB del `body` en función del scroll, creando un gradiente invisible y sin sobresaltos (`#080810` -> `#161628` -> `#040408`).
- **Header Shrink:** El menú superior con glasmorfismo reduce su altura de 72px a 56px al hacer scroll.

---

## 5. Sistema de Internacionalización (i18n)

### 5.1 Arquitectura

El motor i18n está en `i18n.js` (V6 — "URL Propagation"). Soporta **español (ES)** e **inglés (EN)** de forma activa en la UI (botones ES/EN en el header). Existe también un archivo `nl.json` para holandés.

### 5.2 Cómo Funciona

1. **Atributo `data-i18n`** en elementos HTML → se reemplaza `textContent` con la traducción
2. **Prioridad de idioma:** URL param `?lang=` > `localStorage` > cookie > default `es`
3. **Propagación:** todos los links internos se reescriben automáticamente con `?lang=X`
4. **Sincronización:** listeners en `storage`, `pageshow`, `popstate`, `focus`, `visibilitychange`
5. **Anti-flash:** clase `i18n-loading` oculta el body hasta que se aplican las traducciones

### 5.3 Traducciones Inline vs Archivos JSON

- **`i18n.js`** contiene las traducciones activas (ES y EN) como objeto `translations`
- Los archivos **`es.json`**, **`en.json`**, **`nl.json`** contienen traducciones para una versión/diseño alternativo (claves diferentes como `hero1_title`, `hero2_title`, etc.)

> ⚠️ **Nota importante:** Los archivos JSON y el objeto inline en `i18n.js` usan **claves diferentes**. Los JSON parecen pertenecer a un diseño previo o alternativo de la landing page con estructura multi-hero.

---

## 6. Páginas y Navegación

### 6.1 Flujo de Navegación

```
index.html ─────┬── about.html
                ├── contacto.html
                ├── monitoreo.html
                ├── mapeo.html
                └── optimizacion.html
```

### 6.2 Componentes Comunes (repetidos en cada página)

- **Header fijo** con glasmorfismo: logo + nav desktop + selector de idioma + hamburguesa móvil
- **Mobile menu** desplegable
- **Footer** con copyright

> ⚠️ No hay un sistema de componentes/templates. El header, nav y footer están **copiados** en cada archivo HTML. Cualquier cambio global requiere editar todas las páginas.

---

## 7. Formulario de Contacto

- **Frontend:** `contacto.html` con campos nombre, email y mensaje
- **Backend:** Cloudflare Worker en `https://worker-de-email.biopixel-form.workers.dev`
- **Handler:** `form-handler.js` envía los datos via `fetch` POST con `FormData`
- Muestra feedback visual de éxito/error al usuario

---

## 8. Ramas del Repositorio

| Rama | Descripción |
|---|---|
| `modernizacion-ui` ★ | Rama de trabajo actual |
| `create-website-project` | Rama principal/default en origin |
| `feat/dark-theme-i18n-site` | Feature de tema oscuro + i18n |
| `feat/favicon-integration` | Integración de favicons |
| `feat/i18n-language-switching` | Sistema de cambio de idioma |
| `fix/redundancy-and-test-fixes` | Corrección de redundancias y tests |
| `repo-improvements-spanish` | Mejoras del repo en español |

---

## 9. Decisiones de Diseño Clave

1. **Sin frameworks:** HTML/CSS/JS vanilla puro para máxima simplicidad y velocidad de carga
2. **Estética minimalista oscura:** inspirada en diseños de arquitectura y branding de lujo
3. **Parallax basado en perspectiva CSS:** el hero usa `perspective` + `translateZ` en lugar de librerías
4. **i18n custom:** se construyó un motor propio en vez de usar librerías como i18next, optimizado para cross-browser (especialmente Firefox con bfcache)
5. **GitHub Pages:** hosting gratuito con dominio personalizado vía CNAME

---

## 10. Deuda Técnica y Mejoras Pendientes

- [ ] **Componentización del header/footer:** actualmente duplicado en 6 archivos HTML
- [ ] **Consolidar traducciones:** los archivos JSON externos (`es.json`, `en.json`, `nl.json`) usan claves diferentes a las del `i18n.js` inline — requiere unificación
- [ ] **SEO:** falta `meta description` y Open Graph tags en todas las páginas
- [ ] **Accesibilidad:** revisar contraste, aria-labels, y navegación por teclado
- [ ] **Responsive:** probar y ajustar en dispositivos móviles variados
- [ ] **Soporte holandés (NL):** existe `nl.json` pero no hay botón NL en la UI

---

## 11. Historial de Cambios Relevantes

| Fecha | Cambio |
|---|---|
| Feb 2026 | Creación de páginas de servicios individuales (`monitoreo.html`, `mapeo.html`, `optimizacion.html`) |
| Feb 2026 | Implementación de scroll snapping elástico |
| Feb 2026 | Fix de consistencia de navegación de idioma en Firefox |
| Feb 2026 | Integración de favicons y apple-touch-icon |
| Mar 2026 | **Rediseño UI total** (rama `modernizacion-ui`): Implementación del design system *"Precision Industrialism"* prototipado en Stitch. Nuevas paletas, animaciones de scroll (IntersectionObserver), transición continua de fondo vía JS y layout editorial. |

---

*Este documento debe actualizarse cada vez que se realicen cambios significativos al proyecto.*
