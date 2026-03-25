export type Lang = "es" | "en";

export const getLangFromPath = (pathname: string): Lang => (pathname.startsWith("/en") ? "en" : "es");

export const getSwitchHref = (pathname: string): string => {
  if (pathname.startsWith("/en")) {
    const rest = pathname.slice("/en".length) || "/";
    return rest;
  }
  return `/en${pathname === "/" ? "" : pathname}`;
};

export const t = (lang: Lang) => {
  const es = {
    layout: {
      titleDefault: "Colca Star Domes | Glamping de lujo bajo las estrellas",
      descDefault:
        "Experimenta una noche de glamping de lujo bajo el cielo más limpio del Valle del Colca, en Arequipa, Perú.",
    },
    header: {
      experience: "Experiencia",
      packages: "Paquetes",
      gallery: "Galería",
      faq: "FAQ",
      contact: "Contacto",
      book: "Reservar",
      langLabel: "EN",
      whatsappText: "Hola Colca Star Domes, quiero información sobre disponibilidad.",
    },
    hero: {
      eyebrow: "Glamping de lujo en el Valle del Colca",
      title: "Duerme bajo la Vía Láctea",
      body:
        "Descubre noches silenciosas, domos geodésicos de diseño y cielos perfectos para astrofotografía en Arequipa. Una experiencia privada, íntima y extraordinaria.",
      ctaPrimary: "Explorar experiencia",
      ctaSecondary: "Ver galería de domos",
      imageAlt: "Domo geodésico iluminado bajo cielo estrellado",
      captionEyebrow: "Colca Star Domes",
      caption: "Noches privadas de lujo y observación estelar en altura.",
    },
    features: {
      eyebrow: "Comodidad premium",
      title: "Detalles pensados para el cielo",
      items: [
        {
          title: "Calefacción",
          body: "Temperatura ideal durante toda la noche para una estadía confortable en altura.",
        },
        {
          title: "Jacuzzi privado",
          body: "Relájate en un espacio íntimo con agua caliente y una vista abierta al cielo nocturno.",
        },
        {
          title: "Vista panorámica",
          body: "Amaneceres del Colca y cielos profundos sin contaminación visual en primera fila.",
        },
      ],
    },
    packages: {
      eyebrow: "Paquetes",
      title: "Experiencias diseñadas para cada viaje",
      demoNotice: "Mostrando paquetes de demo (configura Supabase para ver los reales).",
      domeLabel: "Domo",
      fromPrice: "Desde S/",
      capacity: "Capacidad",
      people: "personas",
      cta: "Consultar paquete",
      whatsappTemplate: 'Hola Colca Star Domes, deseo reservar el domo "{name}". Por favor compartan disponibilidad.',
      fallback: [
        { name: "Domo Astral", description: "Cúpula panorámica, fogata privada y desayuno." },
        { name: "Domo Familiar", description: "Más espacio, ideal para grupos pequeños." },
        { name: "Domo Premium", description: "Amenities premium y la mejor ubicación." },
      ],
    },
    gallery: {
      eyebrow: "Galería",
      title: "Domos bajo millones de estrellas",
      body: "Espacios geodésicos de lujo, paisajes andinos y noches ideales para astrofotografía.",
      alts: [
        "Cielo nocturno estrellado en montaña",
        "Domo de glamping con iluminación tenue",
        "Vista panorámica del valle andino",
        "Paisaje natural al atardecer en altura",
        "Reflejos nocturnos y ambiente de lujo",
        "Vía láctea visible en cielo despejado",
      ],
    },
    prebook: {
      eyebrow: "Pre-reserva",
      title: "Cotiza tu experiencia en minutos",
      body:
        "Primero consultamos disponibilidad real y luego generamos tu solicitud por WhatsApp con fechas y cantidad de huéspedes.",
      name: "Nombre",
      namePlaceholder: "Tu nombre",
      dates: "Fechas",
      selectRange: "Selecciona check-in y check-out",
      calendar: "Calendario",
      tipTitle: "Tip",
      tipBody: "Verás la disponibilidad por día (tipo aerolínea).",
      chooseRange: "Elige un rango",
      close: "Cerrar",
      legend: "Leyenda:",
      available: "disponible",
      soldOut: "sin cupo",
      guests: "Huéspedes",
      guestLabel: "{n} huésped(es)",
      notes: "Mensaje adicional (opcional)",
      notesPlaceholder: "Ejemplo: celebración especial, preferencias, hora estimada de llegada.",
      submit: "Consultar disponibilidad y enviar por WhatsApp",
      checking: "Consultando disponibilidad...",
      noScript: "Activa JavaScript para generar el mensaje automático o reserva directamente aquí:",
      whatsappBooking: "WhatsApp reservas",
      statusFill: "Completa nombre, fechas y cantidad de huéspedes.",
      statusValidating: "Validando fechas y disponibilidad...",
      statusNoValidate: "No se pudo validar la disponibilidad.",
      statusNoStock:
        "No hay disponibilidad para esas fechas. Escríbenos por WhatsApp para sugerirte alternativas.",
      statusAvailable: "Disponible: {domes} domo(s). Estimado: S/ {total} por {nights} noche(s).",
      statusLeadFail: "Disponibilidad encontrada, pero no pudimos registrar la pre-reserva. Intenta otra vez.",
      statusGeneric: "No pudimos procesar tu solicitud ahora. Intenta nuevamente en unos minutos.",
      waIntro: "Hola Colca Star Domes, quiero realizar una pre-reserva.",
      waName: "Nombre",
      waCheckIn: "Check-in",
      waCheckOut: "Check-out",
      waGuests: "Huéspedes",
      waConfirmed: "Disponibilidad confirmada",
      waEstimate: "Estimado total",
      waCode: "Código interno de pre-reserva",
      waExtra: "Mensaje adicional",
      weekdayShort: ["L", "M", "M", "J", "V", "S", "D"],
      locale: "es-PE",
    },
    faq: {
      title: "Preguntas frecuentes",
      items: [
        {
          q: "¿Cuál es la mejor temporada para ver la Vía Láctea?",
          a: "Entre abril y octubre encontrarás cielos más limpios y condiciones ideales para observación y fotografía nocturna.",
        },
        {
          q: "¿Incluyen transporte desde Arequipa?",
          a: "Podemos coordinar traslados privados o recomendar opciones seguras según el horario de llegada de tu grupo.",
        },
        {
          q: "¿Los domos tienen baño privado y calefacción?",
          a: "Sí. Cada domo cuenta con baño privado, sistema de calefacción y amenidades premium para una estadía confortable.",
        },
        {
          q: "¿Cómo funciona la política de cancelación?",
          a: "Se permite reprogramación con aviso previo según temporada. Te compartimos las condiciones completas antes de confirmar.",
        },
      ],
    },
    footer: {
      about:
        "Glamping de lujo y noches de astrofotografía en el Valle del Colca, Arequipa, Perú.",
      explore: "Explora",
      contact: "Contacto",
      home: "Inicio",
      prebook: "Formulario de pre-reserva",
      whatsapp: "WhatsApp reservas",
      copyrightSuffix: "© {year} Colca Star Domes.",
      tagline: "Experiencia de glamping de lujo en el Valle del Colca.",
      whatsappText: "Hola Colca Star Domes, quiero información sobre disponibilidad.",
    },
    sticky: {
      prompt: "¿Listo para dormir bajo la Vía Láctea?",
      cta: "Reservar vía WhatsApp",
      whatsappText: "Hola Colca Star Domes, quiero reservar una experiencia de glamping.",
    },
    page: {
      homeTitle: "Colca Star Domes | Glamping de lujo en Arequipa",
      homeDesc:
        "Vive una experiencia de glamping de lujo en Colca Star Domes: noches de cielo profundo, domos exclusivos y confort premium en el Valle del Colca.",
    },
  } as const;

  const en = {
    layout: {
      titleDefault: "Colca Star Domes | Luxury glamping under the stars",
      descDefault:
        "Experience luxury glamping under the cleanest skies in the Colca Valley, Arequipa, Peru.",
    },
    header: {
      experience: "Experience",
      packages: "Packages",
      gallery: "Gallery",
      faq: "FAQ",
      contact: "Contact",
      book: "Book",
      langLabel: "ES",
      whatsappText: "Hi Colca Star Domes, I’d like info about availability.",
    },
    hero: {
      eyebrow: "Luxury glamping in the Colca Valley",
      title: "Sleep Under the Milky Way",
      body:
        "Discover quiet nights, design geodesic domes, and skies made for astrophotography in Arequipa. A private, intimate, extraordinary experience.",
      ctaPrimary: "Explore the experience",
      ctaSecondary: "View dome gallery",
      imageAlt: "Geodesic dome lit under a starry sky",
      captionEyebrow: "Colca Star Domes",
      caption: "Private luxury nights and high-altitude stargazing.",
    },
    features: {
      eyebrow: "Premium comfort",
      title: "Details designed for the sky",
      items: [
        { title: "Heating", body: "Ideal temperature all night for a comfortable high-altitude stay." },
        { title: "Private jacuzzi", body: "Relax in a private space with hot water and open night-sky views." },
        { title: "Panoramic views", body: "Colca sunrises and deep skies with minimal light pollution." },
      ],
    },
    packages: {
      eyebrow: "Packages",
      title: "Experiences designed for every kind of trip",
      demoNotice: "Showing demo packages (configure Supabase to see live ones).",
      domeLabel: "Dome",
      fromPrice: "From PEN",
      capacity: "Capacity",
      people: "guests",
      cta: "Ask about package",
      whatsappTemplate: 'Hi Colca Star Domes, I’d like to book the "{name}" dome. Please share availability.',
      fallback: [
        { name: "Astral Dome", description: "Panoramic dome, private fire pit, and breakfast." },
        { name: "Family Dome", description: "More space, ideal for small groups." },
        { name: "Premium Dome", description: "Premium amenities and top location." },
      ],
    },
    gallery: {
      eyebrow: "Gallery",
      title: "Domes under millions of stars",
      body: "Luxury geodesic spaces, Andean landscapes, and nights made for astrophotography.",
      alts: [
        "Starry mountain night sky",
        "Glamping dome with warm light",
        "Panoramic view of the Andean valley",
        "Natural sunset landscape at high altitude",
        "Night reflections and luxury atmosphere",
        "Milky Way visible in clear sky",
      ],
    },
    prebook: {
      eyebrow: "Pre-booking",
      title: "Get your quote in minutes",
      body:
        "We first check real availability, then create your WhatsApp request with dates and number of guests.",
      name: "Name",
      namePlaceholder: "Your name",
      dates: "Dates",
      selectRange: "Select check-in and check-out",
      calendar: "Calendar",
      tipTitle: "Tip",
      tipBody: "You will see day-by-day availability (airline-style).",
      chooseRange: "Choose a range",
      close: "Close",
      legend: "Legend:",
      available: "available",
      soldOut: "sold out",
      guests: "Guests",
      guestLabel: "{n} guest(s)",
      notes: "Additional message (optional)",
      notesPlaceholder: "Example: celebration, preferences, estimated arrival time.",
      submit: "Check availability and send via WhatsApp",
      checking: "Checking availability...",
      noScript: "Enable JavaScript to generate the message or book directly here:",
      whatsappBooking: "WhatsApp booking",
      statusFill: "Please complete name, dates, and number of guests.",
      statusValidating: "Validating dates and availability...",
      statusNoValidate: "Could not validate availability.",
      statusNoStock: "No availability for those dates. Message us on WhatsApp for alternatives.",
      statusAvailable: "Available: {domes} dome(s). Estimate: PEN {total} for {nights} night(s).",
      statusLeadFail: "Availability found, but we couldn't save the pre-booking. Please try again.",
      statusGeneric: "We couldn't process your request right now. Please try again in a few minutes.",
      waIntro: "Hi Colca Star Domes, I'd like to make a pre-booking.",
      waName: "Name",
      waCheckIn: "Check-in",
      waCheckOut: "Check-out",
      waGuests: "Guests",
      waConfirmed: "Confirmed availability",
      waEstimate: "Total estimate",
      waCode: "Internal pre-booking code",
      waExtra: "Additional message",
      weekdayShort: ["M", "T", "W", "T", "F", "S", "S"],
      locale: "en-US",
    },
    faq: {
      title: "Frequently asked questions",
      items: [
        {
          q: "When is the best season to see the Milky Way?",
          a: "From April to October you’ll find clearer skies and ideal conditions for night observation and photography.",
        },
        {
          q: "Do you include transportation from Arequipa?",
          a: "We can coordinate private transfers or recommend safe options based on your arrival time.",
        },
        {
          q: "Do domes have private bathrooms and heating?",
          a: "Yes. Each dome includes a private bathroom, heating system, and premium amenities.",
        },
        {
          q: "How does the cancellation policy work?",
          a: "Rescheduling is possible with advance notice depending on season. We share full conditions before confirmation.",
        },
      ],
    },
    footer: {
      about: "Luxury glamping and astrophotography nights in the Colca Valley, Arequipa, Peru.",
      explore: "Explore",
      contact: "Contact",
      home: "Home",
      prebook: "Pre-booking form",
      whatsapp: "WhatsApp booking",
      copyrightSuffix: "© {year} Colca Star Domes.",
      tagline: "Luxury glamping experience in the Colca Valley.",
      whatsappText: "Hi Colca Star Domes, I’d like info about availability.",
    },
    sticky: {
      prompt: "Ready to sleep under the Milky Way?",
      cta: "Book via WhatsApp",
      whatsappText: "Hi Colca Star Domes, I’d like to book a glamping experience.",
    },
    page: {
      homeTitle: "Colca Star Domes | Luxury glamping in Arequipa",
      homeDesc:
        "Live a luxury glamping experience at Colca Star Domes: deep-sky nights, exclusive domes, and premium comfort in the Colca Valley.",
    },
  } as const;

  return lang === "en" ? en : es;
};

