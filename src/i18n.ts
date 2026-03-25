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

