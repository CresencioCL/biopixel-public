# Directriz de diseño — Biopixel

Sistema de diseño de `www.biopixel.cl`: **Precision Industrialism** ("The Technical Monolith").

Toma como referencia los **principios** de las Human Interface Guidelines de Apple
(jerarquía, armonía, consistencia y accesibilidad) y los aplica a la identidad propia de
Biopixel. No reproduce la estética, los textos ni los recursos de Apple.

> Toda decisión nueva de diseño debe poder justificarse con esta guía. Si algo no
> encaja, se actualiza la guía primero y el código después.
> Los valores viven como variables en `:root` de [`global.css`](global.css).

---

## 0. Regla de licencias

El sitio solo usa recursos que se puedan publicar sin restricciones ni pagos.

| Recurso | Licencia | Estado |
|---|---|---|
| Inter (texto) | SIL Open Font License 1.1 | ✅ Libre, uso comercial permitido |
| Outfit (títulos) | SIL Open Font License 1.1 | ✅ Libre, uso comercial permitido |
| anime.js v4 (animaciones de la portada) | MIT | ✅ Libre |
| Logo e imágenes en `images/` | Propios de Biopixel | ✅ |

**No se permite:** SF Pro, SF Compact, New York ni SF Symbols (licencia exclusiva de
plataformas Apple), capturas o íconos de productos Apple, ni imágenes de stock sin
licencia documentada. Íconos futuros: propios o de bibliotecas MIT / ISC / CC0
(Lucide, Heroicons, etc.).

Todo recurso de terceros que se agregue se anota en esta tabla con su licencia.

**Pendiente:** alojar Inter y Outfit en el propio sitio (`/fonts/` + `OFL.txt`) en lugar
de cargarlas desde Google Fonts, para no enviar la IP de los visitantes a terceros
(relevante bajo el RGPD europeo).

---

## 1. Principios

1. **Jerarquía.** El contenido manda. Cada pantalla tiene un solo foco principal; lo
   secundario se distingue por tamaño, peso y color, no por decoración.
2. **Armonía.** Formas, espacios y movimientos siguen un mismo ritmo: retícula de 8 px,
   esquinas rectas y una única curva de animación.
3. **Consistencia.** Un mismo componente se ve y se comporta igual en todo el sitio.
   Los valores salen de los tokens; los bloques `<style>` de cada página solo contienen
   lo que es exclusivo de esa página.
4. **Accesibilidad por defecto.** Contraste AA como mínimo, foco visible, áreas táctiles
   de 44 px y respeto por la preferencia de movimiento reducido.
5. **Sobriedad técnica.** Los efectos (vidrio, orbes, grano, líneas de escaneo) refuerzan
   la identidad "instrumento de precisión"; nunca compiten con el texto.

---

## 2. Identidad visual

Rasgos que definen a Biopixel y que **no se cambian** sin actualizar esta guía:

- **Esquinas rectas.** `--radius: 0px` en todo el sitio. La única excepción son los orbes
  de fondo, que son círculos.
- **Eyebrows.** Etiquetas cortas en mayúsculas con tracking amplio sobre cada título
  ("02 — Misión", "Servicio 01").
- **Títulos grandes y livianos.** Outfit 300 con tracking negativo, solo en tamaños
  grandes.
- **Botón "slide-fill".** Borde lavanda; al pasar el cursor, el relleno entra de
  izquierda a derecha.
- **Superficies escalonadas.** Profundidad por variación de fondo, no por sombras.
- **Atmósfera.** Orbes cian y violeta con parallax, grano de película y líneas de
  escaneo, solo en la portada.

---

## 3. Color

Tema **oscuro** único. Los contrastes están medidos sobre `--bg-main` (`#080810`).

### Superficies

| Token | Valor | Uso |
|---|---|---|
| `--bg-main` | `#080810` | Fondo de página |
| `--surface` | `#13131b` | Sección intermedia |
| `--surface-container-low` | `#1b1b23` | Contenedores |
| `--surface-container` | `#1f1f28` | Contenedores elevados |
| `--surface-container-high` | `#292932` | Contenedores más elevados |
| `--surface-sunken` | `#0d0d16` | Pie de página |

### Texto

| Token | Valor | Contraste | Uso |
|---|---|---|---|
| `--text-main` | `#e4e1ed` | 15.5 : 1 | Títulos, texto principal |
| `--text-secondary` | `#9090ae` | 6.4 : 1 | Párrafos, texto de apoyo, etiquetas de formulario |
| `--text-tertiary` | `#8080a2` | 5.2 : 1 | Metadatos, pie de página, idioma inactivo |
| `--text-muted` | `#33334a` | 1.6 : 1 | **Solo decorativo.** Nunca para texto que deba leerse |

### Marca y estados

| Token | Valor | Contraste | Uso |
|---|---|---|---|
| `--primary` | `#9494c7` | 6.9 : 1 | Acento: eyebrows, enlaces, bordes activos, botones |
| `--primary-bright` | `#c2c2f7` | 11.7 : 1 | Cifras destacadas, idioma activo, anillo de foco |
| `--primary-dim` | lavanda al 10 % | — | Números decorativos de fondo |
| `--primary-ghost` | lavanda al 6 % | — | Fondos de *hover* |
| `--secondary` | `#6366f1` | 4.4 : 1 | **Solo gráfico.** No cumple AA como texto |
| `--error` | `#f87171` | 7.2 : 1 | Mensajes de error |

Reglas:
- Texto normal: contraste mínimo **4.5 : 1**. Texto ≥ 24 px o elementos gráficos: **3 : 1**.
- El color nunca es la única señal: el enlace activo lleva además una línea inferior.
- No se escriben colores sueltos (`#fff`, `rgb(...)`) en las páginas; siempre un token.

---

## 4. Tipografía

| Rol | Familia | Token |
|---|---|---|
| Títulos, cifras, logotipo | Outfit | `--font-display` |
| Texto, navegación, botones, formularios | Inter | `--font-text` |

Ambas con respaldo `system-ui, sans-serif`.

### Escala

| Token | Tamaño | Uso |
|---|---|---|
| `--text-display` | `clamp(3rem, 9vw, 6.5rem)` | Título del hero |
| `--text-title-1` | `clamp(2.25rem, 5vw, 3.5rem)` | Título de página o sección |
| `--text-title-2` | `clamp(1.75rem, 3vw, 2.25rem)` | Subtítulo de sección |
| `--text-title-3` | 18 px | Título de tarjeta, subtítulo de servicio |
| `--text-body` | 17 px | Texto corrido (tamaño base del `body`) |
| `--text-callout` | 16 px | Texto de tarjetas, campos de formulario |
| `--text-footnote` | 14 px | Menú móvil, mensajes del formulario |
| `--text-label` | 12 px | **Solo** etiquetas en MAYÚSCULAS: eyebrows, navegación, botones, pie |

### Reglas

- **Pesos:** 400 para texto, 500 para etiquetas y botones, 600 para énfasis.
  El peso 300 solo se usa en títulos de 36 px o más y en cifras decorativas.
- **Tamaño mínimo:** 12 px, y solo para etiquetas en mayúsculas. Texto en minúsculas: 14 px como mínimo.
- **Interlineado:** 1.7–1.8 en párrafos; 0.85–1.05 en títulos grandes.
- **Tracking:** negativo en títulos (−0.02 a −0.04 em); `--tracking-label` (0.18 em) en
  etiquetas; 0.3 em en eyebrows.
- **Ancho de lectura:** máximo `--container-text` (65ch).
- **Campos de formulario:** 16 px como mínimo, para evitar el zoom automático de iOS.
- **Traducciones (es/en/nl):** el neerlandés suele ser un 20–30 % más largo. Ningún
  título ni botón puede depender de un ancho fijo.

---

## 5. Espaciado y layout

Retícula base de **8 px**.

| Token | Valor | | Token | Valor |
|---|---|---|---|---|
| `--space-1` | 4 px | | `--space-7` | 48 px |
| `--space-2` | 8 px | | `--space-8` | 64 px |
| `--space-3` | 12 px | | `--space-9` | 96 px |
| `--space-4` | 16 px | | `--space-10` | 128 px |
| `--space-5` | 24 px | | `--space-11` | 160 px |
| `--space-6` | 32 px | | | |

| Token | Valor | Uso |
|---|---|---|
| `--gutter` | `clamp(20px, 5vw, 64px)` | Margen lateral de página, header, pie |
| `--container-max` | 1100 px | Ancho máximo del contenido |
| `--container-text` | 65ch | Bloques de lectura |
| `--touch-target` | 44 px | Área táctil mínima |

**Contenedores de página**

| Clase | Uso |
|---|---|
| `.seccion` | Secciones de la portada (altura mínima de pantalla completa, con *scroll snap*) |
| `.page-wrap` | Páginas interiores (Nosotros); 960 px máximo |
| `.page-wrap--narrow` | Páginas de servicio; 800 px máximo |

**Puntos de corte:** 820 px (navegación → menú hamburguesa, grillas → una columna) y
480 px (reducción de padding vertical).

---

## 6. Componentes

### Barra superior (`.barra-superior`)
- 72 px de alto; al hacer scroll se reduce a 56 px y aumenta el desenfoque.
- Vidrio translúcido, con fondo opaco de respaldo si el navegador no soporta `backdrop-filter`.
- Enlaces en `--text-label` MAYÚSCULAS con `--text-secondary`. El enlace activo lleva
  `--text-main` y una línea inferior `--primary`.
- Selector de idioma: grupo con `aria-label="Idioma"`; cada botón mide 44 × 44 px y
  tiene `aria-pressed`.

### Menú móvil (`.mobile-menu`)
- `<nav>` con fondo casi opaco (94 %), porque cubre contenido.
- Incluye su propio selector de idioma (`.mobile-lang`).
- El botón hamburguesa tiene `aria-label`, `aria-expanded` y `aria-controls`.

### Eyebrow (`.eyebrow`)
- `--text-label`, peso 500, tracking 0.3 em, color `--primary`, MAYÚSCULAS.
- Una sola clase para todo el sitio (`.section-label` se mantiene como alias).

### Botón (`.boton`)
- Alto mínimo de 44 px, borde de 1 px `--primary`, esquinas rectas, texto `--text-label`.
- *Hover* y foco: relleno "slide-fill" de izquierda a derecha y texto `--bg-main`.
- `.boton--block`: ancho completo (formulario).
- `:disabled`: borde `--border` y texto `--text-tertiary`, sin animación.
- Un solo botón por sección.

### Tarjeta de servicio (`.servicio-minimal`, portada)
- Vidrio translúcido, borde lavanda al 9 %, número decorativo `--primary-dim`, título
  en MAYÚSCULAS `--text-title-3`, texto `--text-callout`.
- *Hover* y foco: se eleva 4 px, aparece una barra lateral `--primary` y el número se ilumina.

### Formulario (`contacto.html`)
- Etiqueta visible sobre cada campo (`--text-secondary`), campo con línea inferior y
  alto mínimo de 48 px.
- `autocomplete` en nombre y email.
- El mensaje de respuesta usa `role="status"` y `aria-live="polite"` para que los
  lectores de pantalla lo anuncien.

### Pie de página
- Fondo `--surface-sunken`, texto `--text-label` MAYÚSCULAS en `--text-tertiary`.

---

## 7. Materiales y efectos

| Efecto | Dónde | Regla |
|---|---|---|
| Vidrio translúcido | Header, menú móvil, tarjetas de servicio | Solo en elementos que flotan sobre contenido |
| Orbes cian/violeta | Fondo de la portada | Sin desenfoque propio; parallax desactivado con movimiento reducido |
| Grano de película | Portada, 5.5 % de opacidad | Animación desactivada con movimiento reducido |
| Líneas de escaneo | Hero | Ocultas con movimiento reducido |
| Brillo (`drop-shadow`) | Logotipo del header | Único elemento con brillo |
| Fondo dinámico | Portada | Interpola el color del fondo según el scroll |

Los elementos puramente decorativos llevan `aria-hidden="true"`.

---

## 8. Movimiento

| Token | Valor | Uso |
|---|---|---|
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | Curva única del sitio |
| `--duration-fast` | 0.2 s | Microinteracciones |
| `--duration-base` | 0.3 s | Colores, menú móvil |
| `--duration-slow` | 0.5 s | Botones, header, tarjetas |
| `--duration-reveal` | 0.8 s | Aparición al hacer scroll (`.reveal`) |

Reglas:
- Se animan propiedades concretas (`color`, `opacity`, `transform`), **nunca `all`**.
- Desplazamiento máximo en *hover*: 4 px.
- **`prefers-reduced-motion: reduce`:** se eliminan transiciones, apariciones, líneas de
  escaneo, parallax, grano animado y la animación de entrada de la portada; el contenido
  aparece de inmediato.
- Si anime.js no carga, el contenido de la portada queda visible: solo se oculta cuando
  la animación está lista para ejecutarse (clase `anim-ready`).

---

## 9. Accesibilidad

- Foco visible en todo elemento interactivo: `outline: 2px solid var(--primary-bright)`
  con `outline-offset: 3px`, usando `:focus-visible`.
- Enlace "Saltar al contenido" (`.skip-link`) al inicio de cada página, traducido.
- Cada página tiene un `<main id="contenido">` y un solo `h1`.
- Áreas táctiles de 44 × 44 px como mínimo.
- `lang` de `<html>` actualizado según el idioma activo (lo hace `i18n.js`).
- Imágenes con `alt` descriptivo; elementos decorativos con `aria-hidden="true"`.

---

## 10. Pendientes

- [ ] Alojar las fuentes en el sitio (ver §0).
- [ ] Traducir textos fijos que no pasan por i18n: "Monitoring", "Data Points",
      "Detalles →", "Servicio 01", "← Volver a servicios", etiquetas del formulario y
      mensajes de `form-handler.js`.
- [ ] Botón NL en la interfaz (existe `nl.json`, pero no está conectado).
- [ ] Componentizar header, menú y pie, hoy duplicados en 6 archivos HTML.
- [ ] Sin JavaScript el sitio no se muestra (`body.i18n-loading` lo oculta); evaluar
      una alternativa.

---

## Referencias

- Apple, *Human Interface Guidelines*: principios de jerarquía, armonía, consistencia,
  tipografía, color, layout, accesibilidad y movimiento. Se usan como inspiración.
- W3C, *WCAG 2.2*: contraste (1.4.3), foco visible (2.4.7), tamaño de objetivo (2.5.8).
- SIL Open Font License 1.1: Inter (Rasmus Andersson) y Outfit (Outfitio).
