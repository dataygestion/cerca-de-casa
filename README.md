# Cerca de casa

Buscador del barrio: comercios y servicios con el contacto a un toque (llamar, WhatsApp, cómo llegar).
Funciona en el celular y en la compu, y se puede instalar como app.

No usa frameworks ni base de datos: son 4 archivos simples.

## Cómo abrirlo en Visual Studio Code

1. Abrí la carpeta con **Archivo → Abrir carpeta**.
2. Instalá la extensión **Live Server** (Ritwick Dey).
3. Click derecho sobre `index.html` → **Open with Live Server**.
   Cada vez que guardes un cambio, la página se actualiza sola.

(También podés hacer doble click en `index.html` y se abre en el navegador; solo no funciona la instalación como app.)

## Qué archivo toco para qué

| Quiero…                                   | Archivo            |
|-------------------------------------------|--------------------|
| Agregar / cambiar / borrar un comercio    | `data/datos.js`    |
| Cambiar nombre del barrio o el lema       | `data/datos.js`    |
| Agregar una categoría nueva               | `data/datos.js` (lista `CATEGORIAS`) |
| Cambiar colores                           | `styles.css` (bloque `:root` al inicio) |
| Cambiar el ícono de la app                | `icons/icon.svg`   |

**Paseo vs. vecinos:** en `data/datos.js`, los comercios con `lugar: "paseo"` (y su `local`) aparecen con la insignia
🏬 del Paseo Comercial. Los que no tienen `lugar` se muestran como 🏡 Vecino.

**Pendiente:** poné el WhatsApp real del administrador en `whatsappAdministrador`, completá los teléfonos de los vecinos
y cargá los consultorios médicos (hay una plantilla al final de `datos.js`).

## Publicarla gratis en internet

Cualquiera de estas opciones sirve para carpetas estáticas como esta:

- **GitHub Pages**: subís la carpeta a un repositorio y activás Pages en Settings.
- **Netlify** o **Cloudflare Pages**: arrastrás la carpeta y te da un link.

Una vez publicada (con https), en el celular aparece "Agregar a pantalla de inicio" y queda como una app.
Si actualizás los datos y un celular sigue mostrando lo viejo, subí el número `VERSION` en `sw.js`.

## Estructura

```
index.html            Página
styles.css            Diseño
app.js                Buscador y tarjetas
sw.js                 Uso sin conexión
manifest.webmanifest  Datos para instalarla en el celular
data/datos.js         ← Los comercios (lo que más vas a editar)
icons/icon.svg        Ícono
```
