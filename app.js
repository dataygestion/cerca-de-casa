/* Lógica de la app. Normalmente NO hace falta tocar este archivo:
   los comercios se editan en data/datos.js */

(function () {
  const $q = document.getElementById("q");
  const $borrar = document.getElementById("borrar");
  const $accesos = document.getElementById("accesos");
  const $lugares = document.getElementById("lugares");
  const $barraCategoria = document.getElementById("barra-categoria");
  const $tituloCategoria = document.getElementById("titulo-categoria");
  const $volver = document.getElementById("volver");
  const $resumen = document.getElementById("resumen");
  const $resultados = document.getElementById("resultados");

  const LUGARES = [
    { id: "todos",  nombre: "Todos" },
    { id: "paseo",  nombre: "🏬 Paseo Comercial Haras Del Sur" },
    { id: "vecino", nombre: "🏡 Particulares" },
  ];

  let categoriaActiva = "todos";
  let lugarActivo = "todos";

  // ---------- Utilidades ----------
  // Quita tildes y pasa a minúsculas: "Panadería" == "panaderia"
  const normalizar = (t) =>
    (t || "").toString().normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();

  const soloDigitos = (t) => (t || "").toString().replace(/\D/g, "");

  const escapar = (t) =>
    (t || "").toString().replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const lugarDe = (c) => (c.lugar === "paseo" ? "paseo" : "vecino");

  // Teléfono en formato internacional para tel: y WhatsApp (Argentina)
  function internacional(tel, movil) {
    let d = soloDigitos(tel).replace(/^0+/, "");
    if (d.startsWith("54")) return d;
    return (movil ? "549" : "54") + d;
  }

  // Texto en el que busca el buscador, calculado una sola vez
  const indice = COMERCIOS.map((c) => ({
    comercio: c,
    texto: normalizar([
      c.nombre, c.rubro, c.descripcion, c.direccion, c.etiquetas,
      lugarDe(c) === "paseo" ? "paseo comercial local" : "vecino particular",
    ].join(" ")),
  }));

  // ---------- Búsqueda ----------
  // El botón del Paseo ("locales") muestra todo lo que está en el Paseo
  // (lugar: "paseo"), sea de la categoría que sea, y nada de particulares.
  function enCategoria(c) {
    if (categoriaActiva === "todos") return true;
    if (categoriaActiva === "locales") return lugarDe(c) === "paseo";
    return c.categoria === categoriaActiva;
  }

  function buscar() {
    const palabras = normalizar($q.value).split(/\s+/).filter(Boolean);
    return indice
      .filter(({ comercio, texto }) =>
        enCategoria(comercio) &&
        (lugarActivo === "todos" || lugarDe(comercio) === lugarActivo) &&
        palabras.every((p) => texto.includes(p)))
      .map((x) => x.comercio)
      .sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
  }

  // ---------- Dibujo ----------
  // Botones visibles en cada ficha. Poner en true para volver a mostrarlos.
  const MOSTRAR = { llamar: false, whatsapp: false, instagram: false, comoLlegar: false };

  const ICONO_WSP = `<svg class="icono-wsp" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 4.54 0 8.24 3.7 8.24 8.24 0 4.55-3.7 8.24-8.24 8.24Zm4.52-6.17c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z"/></svg>`;

  function enlaceWsp(c) {
    const msg = encodeURIComponent(`Hola ${c.nombre}, te encontré en ${BARRIO.nombre}.`);
    return `https://wa.me/${internacional(c.telefono, true)}?text=${msg}`;
  }

  // Línea de teléfonos: si tiene WhatsApp, el primer número abre el chat
  function lineaTelefonos(c) {
    if (!c.telefono && !c.telefono2) return "";
    const nota = c.telefonoNota ? " " + escapar(c.telefonoNota) : "";
    if (c.telefono && c.whatsapp) {
      const otro = c.telefono2 ? " · " + escapar(c.telefono2) : "";
      return `<p class="dato"><a class="tel-wsp" target="_blank" rel="noopener" href="${enlaceWsp(c)}" aria-label="Escribir por WhatsApp al ${escapar(c.telefono)}">${ICONO_WSP}${escapar(c.telefono)}</a>${otro}${nota}</p>`;
    }
    const tels = [c.telefono, c.telefono2].filter(Boolean).join(" · ");
    return `<p class="dato">📞 ${escapar(tels)}${nota}</p>`;
  }

  function botones(c) {
    const b = [];
    const llamar = (tel, etiqueta) =>
      `<a class="btn btn-llamar" href="tel:+${internacional(tel, c.whatsapp)}">📞 ${etiqueta}</a>`;

    if (MOSTRAR.llamar) {
      if (c.telefono) b.push(llamar(c.telefono, c.telefono2 ? "Llamar 1" : "Llamar"));
      if (c.telefono2) b.push(llamar(c.telefono2, "Llamar 2"));
    }

    if (MOSTRAR.whatsapp && c.telefono && c.whatsapp) {
      b.push(`<a class="btn btn-wsp" target="_blank" rel="noopener" href="${enlaceWsp(c)}">💬 WhatsApp</a>`);
    }

    if (MOSTRAR.instagram && c.instagram) {
      b.push(`<a class="btn" target="_blank" rel="noopener" href="https://instagram.com/${escapar(c.instagram)}">📷 Instagram</a>`);
    }

    let mapa = c.mapa || "";
    if (!mapa && lugarDe(c) === "paseo" && BARRIO.paseo) {
      mapa = "https://www.google.com/maps/search/?api=1&query=" +
        encodeURIComponent(`${BARRIO.paseo.nombre}, ${BARRIO.paseo.direccion}`);
    } else if (!mapa && c.direccion && !/atiende/i.test(c.direccion)) {
      mapa = "https://www.google.com/maps/search/?api=1&query=" +
        encodeURIComponent(`${c.direccion}, ${BARRIO.ciudadReferencia}`);
    }
    if (MOSTRAR.comoLlegar && mapa) b.push(`<a class="btn" target="_blank" rel="noopener" href="${escapar(mapa)}">📍 Cómo llegar</a>`);

    if (b.length) return `<div class="acciones">${b.join("")}</div>`;
    return c.telefono || c.telefono2 ? "" : `<p class="dato">Contacto próximamente.</p>`;
  }

  function insignia(c) {
    return lugarDe(c) === "paseo"
      ? `<span class="insignia insignia-paseo">🏬 Paseo${c.local ? " · Local " + escapar(c.local) : ""}</span>`
      : `<span class="insignia insignia-vecino">🏡 Particular</span>`;
  }

  function tarjeta(c) {
    return `
      <article class="tarjeta ${lugarDe(c) === "paseo" ? "tarjeta-paseo" : ""}">
        <div class="insignias">${insignia(c)}${c.rubro ? `<span class="rubro">${escapar(c.rubro)}</span>` : ""}</div>
        <h2>${escapar(c.nombre)}</h2>
        ${c.descripcion ? `<p>${escapar(c.descripcion)}</p>` : ""}
        ${lineaTelefonos(c)}
        ${c.grupo ? `<p class="dato"><a class="tel-wsp" target="_blank" rel="noopener" href="${escapar(c.grupo)}">${ICONO_WSP}Grupo con promos</a></p>` : ""}
        ${c.direccion ? `<p class="dato">📍 ${escapar(c.direccion)}</p>` : ""}
        ${c.horario ? `<p class="dato multilinea">🕒 ${escapar(c.horario)}</p>` : ""}
        ${c.promos ? `<details class="promos"><summary>🏷️ Promociones</summary><p class="multilinea">${escapar(c.promos)}</p></details>` : ""}
        ${botones(c)}
      </article>`;
  }

  function dibujar() {
    const lista = buscar();
    $borrar.hidden = !$q.value;
    // Mientras se busca, se ocultan los botones de categorías y quedan solo los resultados
    $accesos.hidden = categoriaActiva !== "todos" || !!$q.value.trim();

    $resumen.textContent = lista.length
      ? `${lista.length} ${lista.length === 1 ? "resultado" : "resultados"}`
      : "";

    $resultados.innerHTML = lista.length
      ? lista.map(tarjeta).join("")
      : `<div class="vacio"><p><strong>No encontramos nada.</strong></p>
         <p>Probá con otra palabra o cambiá los filtros. Si falta un comercio, ¡sumalo abajo!</p></div>`;
  }

  function dibujarFiltros() {
    // Con una categoría elegida se ocultan los botones grandes y aparece "Volver"
    const cat = CATEGORIAS.find((c) => c.id === categoriaActiva);
    // (los botones grandes también se ocultan mientras hay texto en el buscador: ver dibujar)
    $accesos.hidden = !!cat || !!$q.value.trim();
    $barraCategoria.hidden = !cat;
    $tituloCategoria.textContent = cat ? `${cat.icono} ${cat.nombre}` : "";

    $accesos.innerHTML = CATEGORIAS
      .map((i) => `<button type="button" class="acceso" data-cat="${i.id}" aria-pressed="${i.id === categoriaActiva}">
          <span class="icono">${i.icono}</span>${escapar(i.nombre)}</button>`)
      .join("");

    // La fila "Dónde queda" se sacó del HTML; si se vuelve a agregar, se dibuja sola
    if ($lugares) $lugares.innerHTML = LUGARES
      .map((l) => `<button type="button" class="chip" data-lugar="${l.id}" aria-pressed="${l.id === lugarActivo}">${escapar(l.nombre)}</button>`)
      .join("");
  }

  // ---------- Eventos ----------
  $q.addEventListener("input", dibujar);

  $borrar.addEventListener("click", () => { $q.value = ""; $q.focus(); dibujar(); });

  $accesos.addEventListener("click", (e) => {
    const btn = e.target.closest(".acceso");
    if (!btn) return;
    categoriaActiva = btn.dataset.cat;
    // Se guarda en el historial para que el botón "atrás" del celular también vuelva
    history.pushState({ cat: categoriaActiva }, "");
    dibujarFiltros();
    dibujar();
    window.scrollTo(0, 0);
  });

  $volver.addEventListener("click", () => {
    if (history.state && history.state.cat) {
      history.back(); // dispara popstate, que redibuja
    } else {
      categoriaActiva = "todos";
      dibujarFiltros();
      dibujar();
    }
  });

  window.addEventListener("popstate", (e) => {
    categoriaActiva = (e.state && e.state.cat) || "todos";
    dibujarFiltros();
    dibujar();
  });

  if ($lugares) $lugares.addEventListener("click", (e) => {
    const btn = e.target.closest(".chip");
    if (!btn) return;
    lugarActivo = btn.dataset.lugar;
    dibujarFiltros();
    dibujar();
  });

  // ---------- Inicio ----------
  document.title = BARRIO.nombre;
  document.getElementById("nombre-barrio").textContent = BARRIO.nombre;
  document.getElementById("lema").textContent = BARRIO.lema;
  document.getElementById("btn-sumate").href =
    "https://wa.me/" + soloDigitos(BARRIO.whatsappAdministrador) +
    "?text=" + encodeURIComponent(`Hola, quiero sumar mi comercio a ${BARRIO.nombre}.`);

  if (BARRIO.paseo) {
    document.getElementById("pie-paseo").innerHTML =
      `🏬 ${escapar(BARRIO.paseo.nombre)} · ${escapar(BARRIO.paseo.direccion)}` +
      (BARRIO.paseo.instagram
        ? ` · <a href="https://instagram.com/${escapar(BARRIO.paseo.instagram)}" target="_blank" rel="noopener">@${escapar(BARRIO.paseo.instagram)}</a>`
        : "");
  }

  dibujarFiltros();
  dibujar();

  // Permite instalar la app en el celular y usarla sin conexión (solo con https o localhost)
  if ("serviceWorker" in navigator && location.protocol !== "file:") {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
})();
