/* =====================================================================
   DATOS DEL BARRIO  —  ESTE ES EL ÚNICO ARCHIVO QUE HAY QUE EDITAR
   para agregar, cambiar o borrar comercios.

   Cómo agregar uno: copiá un bloque { ... } entero, pegalo debajo del
   último (con una coma entre bloques) y cambiá los datos.

   Campos (solo "nombre" y "categoria" son obligatorios):
     nombre         Nombre del comercio o persona
     categoria      "locales", "alimentos", "hogar", "salud", "belleza", "inmuebles",
                    "compras", "automotor" o "comunidad"
     lugar          "paseo" = local del Paseo Comercial. Si no lo ponés, es un vecino.
                    El botón "Paseo Comercial" muestra todos los que tienen lugar: "paseo".
     local          Número de local en el Paseo. Ej: "8" o "12 · P. Baja"
     rubro          Ej: "Panadería", "Plomero"
     descripcion    Frase corta de qué ofrece
     telefono       Como quieras escribirlo. Ej: "11-3001-8729"
     telefonoNota   Aclaración del teléfono. Ej: "(Emilce)"
     telefono2      Segundo teléfono (opcional)
     whatsapp       true si el teléfono tiene WhatsApp (muestra el botón verde)
     grupo          Link a un grupo de WhatsApp con promos (muestra "Grupo con promos")
     instagram      Usuario sin la @. Ej: "passione.gelata"
     direccion      Solo para vecinos (los del Paseo usan la dirección del Paseo)
     horario        Varias líneas con \n
     promos         Promociones, varias líneas con \n
     mapa           (opcional) link de Google Maps propio
     etiquetas      Palabras extra para que el buscador lo encuentre
   ===================================================================== */

const BARRIO = {
  nombre: "Cerca de casa",
  lema: "Todo lo que necesitás, cerca de casa.",
  ciudadReferencia: "Haras del Sur, Buenos Aires", // para armar búsquedas en el mapa
  whatsappAdministrador: "5492215553364", // ⚠️ poné el real: botón "Sumá tu comercio"
  /*paseo: {
    nombre: "Paseo Comercial Haras del Sur",
    direccion: "Acceso libre Ruta 2 · Km 70.5",
    instagram: "paseoharasdelsur",
  },*/
};

const CATEGORIAS = [
  { id: "locales",   nombre: "Paseo Comercial Haras del Sur", icono: "🏪" },
  { id: "alimentos", nombre: "Alimentos", icono: "🍞" },
  { id: "hogar",     nombre: "Hogar",     icono: "🛠️" },
  { id: "salud",     nombre: "Salud",     icono: "🩺" },
  { id: "belleza",   nombre: "Belleza",   icono: "💅" },
  { id: "inmuebles", nombre: "Inmuebles", icono: "🏠" },
  { id: "compras",   nombre: "Compras",   icono: "🛍️" },
  { id: "automotor", nombre: "Automotor", icono: "🚗" },
  { id: "comunidad", nombre: "Comunidad", icono: "🤝" },
];

const COMERCIOS = [

  /* ===================== PASEO COMERCIAL ===================== */
  /* Datos tomados de la Guía de Locales 2026 */

  // ---- Esenciales ----
  {
    nombre: "Almacenes Pampa",
    categoria: "alimentos", lugar: "paseo",
    rubro: "Almacén",
    descripcion: "Almacén con cajero automático. Hacen envíos.",
    telefono: "221-522-4313", whatsapp: true,
    instagram: "grupoelnene",
    horario: "Lun a jue 8:00–20:00 hs\nVie a dom 8:00–21:00 hs",
    etiquetas: "supermercado almacen cajero automatico banco envios delivery",
  },
  {
    nombre: "Farmacia del Centro",
    categoria: "salud", lugar: "paseo", local: "3/4",
    rubro: "Farmacia",
    descripcion: "Medicamentos y perfumería.",
    telefono: "0221-220-4110",
    instagram: "farma.delcentro",
    horario: "Lun a vie 7:30–20:00 hs\nSáb 9:00–20:00 hs\nDom y feriados 10:00–13:00 hs",
    etiquetas: "remedios medicamentos perfumeria",
  },
  {
    nombre: "Candy Store",
    categoria: "locales", lugar: "paseo", local: "19",
    rubro: "Drugstore",
    descripcion: "Drugstore, juguetería, cotillón y bazar. Cobro Express.",
    telefono: "221-555-5745", whatsapp: true,
    horario: "Lun a sáb 8:30–20:00 hs\nDom 9:00–19:00 hs",
    etiquetas: "kiosco golosinas jugueteria cotillon bazar cobro express pagos",
  },

  // ---- Gastronomía ----
  {
    nombre: "Passione",
    categoria: "alimentos", lugar: "paseo", local: "1 y 2",
    rubro: "Heladería y pastelería",
    descripcion: "Helados todo el año, pastelería, café y delivery.",
    telefono: "11-3001-8729", whatsapp: true,
    instagram: "passione.gelata",
    horario: "Lun a jue 11–20 hs · Vie 11–21 hs\nSáb 12–21 hs · Dom 11–18 hs\nVísperas de feriado 11–20 hs · Feriados 11–18 hs",
    etiquetas: "helado cafe pasteleria postres delivery merienda",
  },
  {
    nombre: "Masamore",
    categoria: "alimentos", lugar: "paseo", local: "5",
    rubro: "Pastas frescas",
    descripcion: "Pastas frescas, pizzas y empanadas.",
    telefono: "11-7186-5194", whatsapp: true,
    instagram: "masamoreharas",
    horario: "Mar a sáb 11:00–14:00 y 18:00–21:00 hs\nDom 11:00–14:00 hs",
    etiquetas: "pastas fideos ravioles pizza empanadas comida",
  },
  {
    nombre: "Tikoi Tea",
    categoria: "alimentos", lugar: "paseo", local: "17",
    rubro: "Casa de té",
    descripcion: "Casa de té. Sábados con reserva.",
    telefono: "221-306-5047", whatsapp: true,
    instagram: "tikoitea",
    horario: "Lun 14–18 hs\nMar a vie 9:30–18 hs\nSáb 14–18 hs (con reserva)",
    etiquetas: "te cafe merienda",
  },

  // ---- Tiendas ----
  {
    nombre: "Crazy Pet",
    categoria: "locales", lugar: "paseo", local: "8",
    rubro: "Pet shop",
    descripcion: "Alimento y accesorios para mascotas.",
    telefono: "11-3408-9068", whatsapp: true,
    promos: "Lun a sáb: 10% en efectivo\nMar y jue: 30% Banco Francés\nMié, vie y sáb: 3 cuotas sin interés, todos los bancos\nLun a vie: Cuenta DNI Comercios de Cercanía 20%\nSáb: Cuenta DNI Veterinarias 30%",
    etiquetas: "mascotas perros gatos alimento balanceado veterinaria",
  },
  {
    nombre: "La Librería",
    categoria: "locales", lugar: "paseo", local: "9",
    rubro: "Librería",
    descripcion: "Librería.",
    telefono: "11-6814-4447", whatsapp: true,
    instagram: "lalibreria.h4",
    horario: "Lun a sáb 10:00–12:00 y 15:00–19:00 hs",
    etiquetas: "libros utiles escolares papeleria cuadernos",
  },
  {
    nombre: "Flores Fanara",
    categoria: "locales", lugar: "paseo", local: "12 · P. Baja",
    rubro: "Florería",
    descripcion: "Florería.",
    telefono: "11-3296-2516", whatsapp: true,
    horario: "Lun a sáb 10:00–18:00 hs",
    etiquetas: "flores ramos plantas regalos",
  },

  // ---- Hogar y deco ----
  {
    nombre: "Espacio Deco",
    categoria: "locales", lugar: "paseo", local: "22",
    rubro: "Cortinas y tapicería",
    descripcion: "Cortinas y tapicería.",
    telefono: "221-523-6330", telefono2: "221-525-7611", whatsapp: true,
    instagram: "espaciodecoharas",
    horario: "Mié a sáb 12:00–18:00 hs",
    etiquetas: "cortinas tapiceria decoracion hogar sillones",
  },
  {
    nombre: "Guatambú",
    categoria: "hogar", lugar: "paseo", local: "24",
    rubro: "Diseño de interiores y espacios verdes",
    descripcion: "Diseño de interiores y espacios verdes.",
    telefono: "2291-46-4010", whatsapp: true,
    instagram: "guatambu_hg",
    horario: "Mar a sáb 10:00–18:00 hs",
    etiquetas: "paisajismo jardin parquizacion diseño interiores decoracion",
  },

  // ---- Moda y belleza ----
  {
    nombre: "Roma Lingerie",
    categoria: "locales", lugar: "paseo", local: "11",
    rubro: "Lencería",
    descripcion: "Lencería.",
    telefono: "11-3226-0623", whatsapp: true,
    instagram: "romalingerie.ar",
    horario: "Mar a sáb 10:00–20:00 hs",
    etiquetas: "ropa interior lenceria indumentaria moda mujer",
  },
  {
    nombre: "Reina Juana",
    categoria: "locales", lugar: "paseo", local: "25",
    rubro: "Indumentaria y accesorios",
    descripcion: "Indumentaria y accesorios.",
    telefono: "11-3888-9748", whatsapp: true,
    instagram: "reinajuana.ok",
    horario: "Mar a vie 10:00–12:00 y 15:00–17:00 hs\nSáb 10:00–13:00 y 16:00–19:00 hs",
    etiquetas: "ropa moda mujer accesorios",
  },
  {
    nombre: "Despierta Corazón",
    categoria: "locales", lugar: "paseo", local: "26",
    rubro: "Indumentaria femenina e infantil",
    descripcion: "Indumentaria femenina e infantil.",
    telefono: "11-2639-9658", whatsapp: true,
    instagram: "despierta.corazon",
    horario: "Lun y jue 11:00–17:00 hs\nMar y vie 8:00–14:00 hs",
    etiquetas: "ropa moda mujer niños infantil",
  },
  {
    nombre: "Zona Impulso",
    categoria: "locales", lugar: "paseo", local: "23 · P. Alta",
    rubro: "Deporte e indumentaria",
    descripcion: "Deporte e indumentaria: tenis, golf y fútbol.",
    telefono: "11-6466-4867", telefonoNota: "(Emilce)", whatsapp: true,
    horario: "Lun a sáb 15:00–18:00 hs\nDom cerrado",
    etiquetas: "ropa deportiva zapatillas tenis golf futbol camisetas",
  },
  {
    nombre: "Lorena by Maggi",
    categoria: "hogar", lugar: "paseo", local: "20",
    rubro: "Peluquería y barbería",
    descripcion: "Hair beauty y barbería. Con turno previo.",
    telefono: "221-555-5745", telefonoNota: "(turnos)", whatsapp: true,
    instagram: "lorena_bymaggi",
    horario: "Mar a sáb 9:00–18:00 hs",
    etiquetas: "peluqueria corte pelo turnos barberia belleza",
  },
  {
    nombre: "By Maggi Barber Shop",
    categoria: "hogar", lugar: "paseo", local: "16",
    rubro: "Barbería",
    descripcion: "Barbería.",
    telefono: "11-3570-2279", whatsapp: true,
    instagram: "bymaggibarber",
    horario: "Lun a sáb 9:00–18:00 hs",
    etiquetas: "barbero corte pelo barba peluqueria hombres",
  },

  // ---- Servicios y cultura ----
  {
    nombre: "Saint Francis English College",
    categoria: "hogar", lugar: "paseo", local: "6",
    rubro: "Instituto de inglés",
    descripcion: "Instituto de inglés.",
    telefono: "11-3091-5330", whatsapp: true,
    instagram: "stfrancisenglishcollege",
    horario: "Lun, mié y vie 10:00–13:00 y 15:00–20:00 hs",
    etiquetas: "ingles idiomas clases academia",
  },
  {
    nombre: "Atica Art",
    categoria: "locales", lugar: "paseo", local: "",
    rubro: "Atelier y galería de arte",
    descripcion: "Obras disponibles y a pedido. Talleres infantiles y workshops.",
    telefono: "11-2722-4381", whatsapp: true,
    instagram: "atica.arte",
    horario: "Lun a jue 15:00–19:00 hs\nVie y sáb 10:30–20:00 hs",
    etiquetas: "Despierta corazón y arte cuadros pintura taller",
  },
  {
    nombre: "Tannat Viajes",
    categoria: "hogar", lugar: "paseo", local: "27",
    rubro: "Agencia de viajes",
    descripcion: "Agencia de viajes.",
    telefono: "221-455-6684", whatsapp: true,
    instagram: "tannatviajes",
    horario: "Lun a vie 10:00–17:00 hs",
    etiquetas: "viajes turismo pasajes vacaciones hoteles",
  },

  /* ===================== VECINOS (particulares) ===================== */
  /* ⚠️ Faltan los teléfonos: completá "telefono" y poné whatsapp: true si corresponde. */

  {
    nombre: "Almacén Natural",
    categoria: "alimentos",
    rubro: "Almacén natural",
    descripcion: "Frutos secos, miel.",
    telefono: "11-5259-7090", telefonoNota: "(Sol)", whatsapp: true,
    grupo: "https://chat.whatsapp.com/E8k2eOWx8vW08vmuBTh70x",
    etiquetas: "almacen natural dietetica organico saludable granel frutos secos miel nueces almendras",
  },
  {
    nombre: "Yoga",
    categoria: "hogar",
    rubro: "Clases",
    descripcion: "Clases de yoga integral",
    telefono: "221-555-3364", telefonoNota: "(Fer)", whatsapp: true,
    etiquetas: "yoga integral",
  },
  {
    nombre: "Carnicería Fátima",
    categoria: "alimentos",
    rubro: "Carnicería",
    descripcion: "Carnicería Fátima",
    telefono: "11-3686-4833", telefonoNota: "(Sol)", whatsapp: true,
    etiquetas: "carne asado pollo cerdo chorizo vaca",
  },
  {
    nombre: "Frigolar",
    categoria: "alimentos",
    rubro: "Carnicería",
    descripcion: "Carnicería Frigolar",
    etiquetas: "carne asado pollo cerdo chorizo vaca",
  },
  {
    nombre: "Servicio de tortas",
    categoria: "alimentos",
    rubro: "Tortas por encargo",
    descripcion: "Tortas y postres por encargo.",
    telefono: "11-3686-4833", telefonoNota: "(Marisol)", whatsapp: true,
    etiquetas: "torta cumpleaños pasteleria postres dulces",
  },
  {
    nombre: "Darío Mauriño",
    categoria: "hogar",
    rubro: "Plomero",
    descripcion: "Plomería.",
    etiquetas: "plomero plomeria gasista agua cañeria destapaciones",
  },
  {
    nombre: "Cristian",
    categoria: "hogar",
    rubro: "Plomero",
    descripcion: "Plomería.",
    etiquetas: "plomero plomeria gasista agua cañeria destapaciones",
  },
  {
    nombre: "Venta de casas y terrenos",
    categoria: "inmuebles",
    rubro: "Inmuebles",
    descripcion: "Venta y alquiler de casas y terrenos.",
    telefono: "11-5247-0235", telefonoNota: "(María Piñeiro)", whatsapp: true,
    etiquetas: "inmobiliaria alquiler alquileres propiedades lotes casas terrenos comprar vender",
  },
  {
    nombre: "Venta de muebles",
    categoria: "compras",
    rubro: "Muebles",
    descripcion: "Venta de muebles.",
    etiquetas: "muebles mesas sillas placard living comedor",
  },
  {
    nombre: "Productos Natura",
    categoria: "locales",
    rubro: "Cosmética",
    descripcion: "Venta de productos Natura.",
    etiquetas: "natura perfumes cosmetica cremas belleza catalogo",
  },
  {
    nombre: "Bicicletería",
    categoria: "hogar",
    rubro: "Bicicletas",
    descripcion: "Venta y reparación de bicicletas.",
    etiquetas: "bicicleta bici bicicleteria repuestos reparacion cubiertas",
  },

  /* ===================== SALUD: CONSULTORIOS MÉDICOS =====================
     Pendiente de cargar. Plantilla para copiar:

  {
    nombre: "Dra. Nombre Apellido",
    categoria: "salud",
    rubro: "Pediatría",
    descripcion: "Consultorio. Atiende con turno.",
    telefono: "11-0000-0000", whatsapp: true,
    direccion: "Calle y número",
    horario: "Lun y mié 15 a 19 hs",
    etiquetas: "medico doctor turno consulta",
  },
  ================================================================== */
];
