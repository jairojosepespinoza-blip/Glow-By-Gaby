(() => {
  "use strict";

  const PHONE = "51937549111";
  const products = Array.isArray(window.GLOW_PRODUCTS) ? window.GLOW_PRODUCTS : [];

  const elements = {
    grid: document.querySelector("[data-product-grid]"),
    count: document.querySelector("[data-cart-count]"),
    drawer: document.querySelector("[data-cart-drawer]"),
    backdrop: document.querySelector("[data-modal-backdrop]"),
    empty: document.querySelector("[data-cart-empty]"),
    cartContent: document.querySelector("[data-cart-content]"),
    cartItems: document.querySelector("[data-cart-items]"),
    orderForm: document.querySelector("[data-order-form]"),
    productModal: document.querySelector("[data-product-modal]"),
    productModalContent: document.querySelector("[data-product-modal-content]"),
    galleryModal: document.querySelector("[data-gallery-modal]"),
    galleryImage: document.querySelector("[data-gallery-modal-image]"),
    galleryCaption: document.querySelector("[data-gallery-modal-caption]"),
    toast: document.querySelector("[data-toast]"),
    menuButton: document.querySelector(".menu-toggle"),
    mainNav: document.querySelector(".main-nav")
  };

  const state = {
    filter: "all",
    cart: loadJSON("glow-cart", {}),
    language: localStorage.getItem("glow-language") === "en" ? "en" : "es"
  };

  const copy = {
    es: {
      pageTitle: "Glow by Gaby | Catálogo de belleza y bienestar",
      pageDescription: "Glow by Gaby: catálogo informativo de productos de belleza, cuidado facial y bienestar con atención personalizada por WhatsApp en Los Olivos.",
      added: "agregado al pedido",
      removed: "Producto eliminado del pedido",
      addAtLeast: "Agrega al menos un producto",
      selected: "Seleccionado",
      inOrder: "En tu pedido",
      add: "Agregar al pedido",
      addAnother: "Agregar otra unidad",
      current: "Actualmente",
      details: "Ver detalles de",
      decrease: "Disminuir cantidad",
      increase: "Aumentar cantidad",
      remove: "Eliminar",
      unitsSelected: "unidades seleccionadas",
      closePhoto: "Cerrar fotografía",
      galleryOpen: "Ver fotografía completa",
      filters: {all:"Todos",bestsellers:"Más vendidos",facial:"Cuidado facial",nutrition:"Nutrición",body:"Cuidado corporal"},
      topics: {
        advice: "Estimada Gaby:\n\nMe comunico desde la página web de Glow by Gaby. Quisiera recibir una asesoría personalizada para elegir una rutina adecuada según mi tipo de piel, mi objetivo principal y mi presupuesto aproximado.\n\nAgradeceré que me indiques qué información necesitas para orientarme correctamente.",
        spots: "Estimada Gaby:\n\nMe comunico desde la página web de Glow by Gaby. Estoy interesada/o en una rutina enfocada en la apariencia de manchas y tono desigual.\n\nQuisiera conocer los productos recomendados, su forma de uso, disponibilidad, precio y opciones de entrega.",
        cleansing: "Estimada Gaby:\n\nMe comunico desde la página web de Glow by Gaby. Deseo información sobre una rutina de limpieza facial profunda.\n\nQuisiera recibir una recomendación según mi tipo de piel, además de conocer el modo de uso, disponibilidad, precio y opciones de entrega.",
        hydration: "Estimada Gaby:\n\nMe comunico desde la página web de Glow by Gaby. Estoy interesada/o en una rutina orientada a mejorar visualmente la luminosidad y la hidratación de mi piel.\n\nAgradeceré información sobre productos recomendados, modo de uso, disponibilidad, precio y entrega.",
        body: "Estimada Gaby:\n\nMe comunico desde la página web de Glow by Gaby. Quisiera recibir información sobre una rutina de cuidado corporal, incluyendo productos recomendados, modo de uso, disponibilidad, precio y opciones de entrega.",
        business: "Estimada Gaby:\n\nMe comunico desde la página web de Glow by Gaby. Estoy interesada/o en conocer la oportunidad de negocio.\n\nQuisiera recibir información clara sobre cómo empezar, requisitos, inversión referencial, acompañamiento disponible y responsabilidades antes de tomar una decisión.",
        references: "Estimada Gaby:\n\nMe comunico desde la página web de Glow by Gaby. Antes de realizar una compra, quisiera conocer referencias o experiencias reales de clientes que hayan autorizado compartir su testimonio.",
        choose: "Estimada Gaby:\n\nMe comunico desde la página web de Glow by Gaby. Necesito orientación para elegir los productos más adecuados.\n\nMi objetivo principal es: ",
        products: "Estimada Gaby:\n\nMe comunico desde la página web de Glow by Gaby. Deseo recibir información sobre sus productos, disponibilidad, precios, recomendaciones de uso y opciones de entrega."
      }
    },
    en: {
      pageTitle: "Glow by Gaby | Beauty and wellness catalog",
      pageDescription: "Glow by Gaby: an informative beauty, facial care and wellness catalog with personalized WhatsApp support in Los Olivos.",
      added: "added to your order",
      removed: "Product removed from your order",
      addAtLeast: "Add at least one product",
      selected: "Selected",
      inOrder: "In your order",
      add: "Add to order",
      addAnother: "Add another unit",
      current: "Currently",
      details: "View details for",
      decrease: "Decrease quantity",
      increase: "Increase quantity",
      remove: "Remove",
      unitsSelected: "units selected",
      closePhoto: "Close photo",
      galleryOpen: "View full photo",
      filters: {all:"All",bestsellers:"Best sellers",facial:"Facial care",nutrition:"Nutrition",body:"Body care"},
      topics: {
        advice: "Dear Gaby,\n\nI am contacting you through the Glow by Gaby website. I would like personalized guidance to choose a routine based on my skin type, main goal and approximate budget.\n\nPlease let me know what information you need to advise me properly.",
        spots: "Dear Gaby,\n\nI am contacting you through the Glow by Gaby website. I am interested in a routine focused on the appearance of dark spots and uneven tone.\n\nPlease share recommended products, directions, availability, pricing and delivery options.",
        cleansing: "Dear Gaby,\n\nI am contacting you through the Glow by Gaby website. I would like information about a deep facial cleansing routine.\n\nPlease recommend options according to my skin type and share directions, availability, pricing and delivery options.",
        hydration: "Dear Gaby,\n\nI am contacting you through the Glow by Gaby website. I am interested in a routine focused on a more radiant and hydrated-looking complexion.\n\nPlease share recommended products, directions, availability, pricing and delivery options.",
        body: "Dear Gaby,\n\nI am contacting you through the Glow by Gaby website. I would like information about a body-care routine, including recommended products, directions, availability, pricing and delivery options.",
        business: "Dear Gaby,\n\nI am contacting you through the Glow by Gaby website. I am interested in learning about the business opportunity.\n\nPlease share clear information about how to begin, requirements, estimated investment, available support and responsibilities before I make a decision.",
        references: "Dear Gaby,\n\nI am contacting you through the Glow by Gaby website. Before purchasing, I would like to learn about genuine client experiences or references that have been authorized for sharing.",
        choose: "Dear Gaby,\n\nI am contacting you through the Glow by Gaby website. I need guidance choosing the most suitable products.\n\nMy main goal is: ",
        products: "Dear Gaby,\n\nI am contacting you through the Glow by Gaby website. I would like information about your products, availability, prices, usage recommendations and delivery options."
      }
    }
  };

  const staticText = {
    es: {
      ".skip-link":"Saltar al contenido",
      ".announcement span:first-child":"Atención personalizada en Los Olivos",
      ".announcement span:last-child":"Envíos coordinados por WhatsApp",
      ".main-nav a:nth-child(1)":"Productos",
      ".main-nav a:nth-child(2)":"Rutinas",
      ".main-nav a:nth-child(3)":"Galería",
      ".main-nav a:nth-child(4)":"Emprende",
      ".main-nav a:nth-child(5)":"Contacto",
      ".cart-button span:first-child":"Mi pedido",
      ".hero-copy .eyebrow":"Cuidado personalizado para ti",
      ".hero-copy h1":"Tecnología y belleza para una piel que se siente bien.",
      ".hero-copy .hero-text":"Descubre productos para cuidado facial, corporal y bienestar. Elige lo que te interesa y envía tu solicitud completa directamente por WhatsApp.",
      ".hero-actions .button-primary":"Explorar catálogo",
      ".hero-actions .button-ghost":"Pedir asesoría",
      ".trust-row span:nth-child(1)":"✓ Orientación personalizada",
      ".trust-row span:nth-child(2)":"✓ Compra asistida",
      ".trust-row span:nth-child(3)":"✓ Envío por coordinar",
      ".hero-caption span":"Selección destacada",
      ".hero-caption strong":"Rutina facial tecnológica",
      ".chip-a":"Catálogo interactivo",
      ".chip-b":"✦ Pedido por WhatsApp",
      ".about-copy .eyebrow":"Sobre Glow by Gaby",
      ".about-copy h2":"Una experiencia cercana para cuidar tu piel y descubrir nuevas oportunidades.",
      ".image-label":"Comunidad y acompañamiento",
      ".about-copy > p:nth-of-type(2)":"Glow by Gaby es un emprendimiento independiente ubicado en Los Olivos. Brinda orientación sobre productos Nu Skin y acompaña a cada persona desde la elección de su rutina hasta la coordinación del pedido.",
      ".about-copy > p:nth-of-type(3)":"También comparte información con quienes desean conocer una alternativa de emprendimiento y recibir acompañamiento para comenzar.",
      ".mini-stats div:nth-child(1) strong":"Atención 1 a 1",
      ".mini-stats div:nth-child(1) span":"Recomendación según objetivo",
      ".mini-stats div:nth-child(2) strong":"Catálogo directo",
      ".mini-stats div:nth-child(2) span":"Selección rápida y ordenada",
      ".mini-stats div:nth-child(3) strong":"Compra segura",
      ".mini-stats div:nth-child(3) span":"Confirmación antes del pago",
      ".featured-grid article:nth-child(1) strong":"Kit Anti-Manchas",
      ".featured-grid article:nth-child(1) small":"El más solicitado",
      ".featured-grid article:nth-child(2) strong":"LumiSpa iO",
      ".featured-grid article:nth-child(2) small":"Tecnología facial",
      ".featured-grid article:nth-child(3) strong":"Vitamina C + Boost",
      ".featured-grid article:nth-child(3) small":"Luminosidad y textura",
      ".products .section-heading .eyebrow":"Catálogo",
      ".products .section-heading h2":"Elige los productos que te interesan",
      ".products .section-heading p:not(.eyebrow)":"La disponibilidad, el precio final y la forma de pago se confirman personalmente.",
      ".products .section-top .button-soft":"Revisar mi pedido",
      ".routine .section-heading .eyebrow":"Sección extra",
      ".routine .section-heading h2":"Encuentra una rutina según tu objetivo",
      ".routine .section-heading p:not(.eyebrow)":"Elige una necesidad y abre una conversación personalizada por WhatsApp.",
      ".routine-card:nth-child(1) h3":"Manchas y tono desigual",
      ".routine-card:nth-child(1) p":"Opciones para mejorar visualmente la uniformidad y mantener una rutina constante.",
      ".routine-card:nth-child(1) button":"Consultar rutina",
      ".routine-card:nth-child(2) h3":"Limpieza profunda",
      ".routine-card:nth-child(2) p":"Alternativas para retirar impurezas y dejar una sensación de piel limpia y suave.",
      ".routine-card:nth-child(2) button":"Consultar rutina",
      ".routine-card:nth-child(3) h3":"Luminosidad e hidratación",
      ".routine-card:nth-child(3) p":"Productos para reforzar la apariencia fresca, luminosa y confortable de la piel.",
      ".routine-card:nth-child(3) button":"Consultar rutina",
      ".routine-card:nth-child(4) h3":"Cuidado corporal",
      ".routine-card:nth-child(4) p":"Rutinas para complementar la apariencia de firmeza, textura y bienestar corporal.",
      ".routine-card:nth-child(4) button":"Consultar rutina",
      ".gallery .section-heading .eyebrow":"Galería",
      ".gallery .section-heading h2":"Conoce productos, kits y presentaciones",
      ".gallery-note":"Las fotos y precios mostrados son referenciales. Presiona cualquier imagen para verla completa y confirma disponibilidad antes de comprar.",
      ".gallery-item:nth-child(1) figcaption":"Formas de armar tu rutina LumiSpa",
      ".gallery-item:nth-child(2) figcaption":"Beauty Focus Collagen+",
      ".gallery-item:nth-child(3) figcaption":"Tecnología de cuidado facial",
      ".gallery-item:nth-child(4) figcaption":"Kits y precios referenciales",
      ".gallery-item:nth-child(5) figcaption":"Rutina corporal con Body Serum",
      ".gallery-item:nth-child(6) figcaption":"Bienestar y cuidado corporal",
      ".process .section-heading .eyebrow":"Cómo comprar",
      ".process .section-heading h2":"Tu solicitud en cuatro pasos",
      ".step-card:nth-child(1) h3":"Explora",
      ".step-card:nth-child(1) p":"Revisa el catálogo y abre los detalles de cada producto.",
      ".step-card:nth-child(2) h3":"Selecciona",
      ".step-card:nth-child(2) p":"Agrega productos y cantidades a tu pedido.",
      ".step-card:nth-child(3) h3":"Completa tus datos",
      ".step-card:nth-child(3) p":"Nombre, teléfono, distrito, dirección y referencia.",
      ".step-card:nth-child(4) h3":"Coordina",
      ".step-card:nth-child(4) p":"Envía el resumen por WhatsApp y confirma precio, pago y envío.",
      ".business-copy .eyebrow":"Oportunidad de negocio",
      ".business-copy h2":"¿También quieres emprender?",
      ".business-copy > p:not(.eyebrow)":"Solicita información clara sobre cómo empezar, qué opciones existen y qué acompañamiento puedes recibir. La consulta es sin compromiso.",
      ".business-copy .button":"Quiero información",
      ".testimonials .section-heading .eyebrow":"Testimonios",
      ".testimonials .section-heading h2":"Experiencias publicadas con autorización",
      ".testimonials .section-heading p:not(.eyebrow)":"Este espacio se completa únicamente con opiniones reales y permiso de cada cliente.",
      ".testimonial-card p":"Próximamente encontrarás aquí testimonios verificados de clientes de Glow by Gaby.",
      ".testimonial-card button":"Solicitar referencias",
      ".contact-copy .eyebrow":"Contacto",
      ".contact-copy h2":"Conversemos sobre lo que necesitas",
      ".contact-copy > p:not(.eyebrow)":"Atención por WhatsApp para consultas, pedidos, disponibilidad y coordinación de envíos.",
      ".contact-list a:last-child":"Facebook de Glow by Gaby",
      ".contact-panel h3":"¿No sabes qué elegir?",
      ".contact-panel p":"Cuéntanos tu tipo de piel, objetivo principal y presupuesto aproximado.",
      ".contact-panel .button":"Hablar con Gaby",
      ".floating-whatsapp span":"Atención por WhatsApp",
      ".drawer-header .eyebrow":"Solicitud por WhatsApp",
      "#cart-title":"Mi pedido",
      ".cart-empty h3":"Aún no agregaste productos",
      ".cart-empty p":"Elige uno o más productos del catálogo.",
      ".cart-empty .button":"Ver catálogo",
      ".order-form h3":"Datos para coordinar el envío",
      ".privacy-note":"La web no almacena tus datos: se usan únicamente para preparar el mensaje que tú enviarás por WhatsApp.",
      ".order-form .button-primary":"Enviar solicitud por WhatsApp",
      ".disclaimer p":"Glow by Gaby es un emprendimiento independiente y no es el sitio oficial de Nu Skin. La información es orientativa y no sustituye evaluación médica o dermatológica. Los resultados pueden variar. Consulta a un profesional en caso de embarazo, lactancia, alergias, tratamiento médico o piel sensible.",
      ".footer-center > p:first-child":"© {year} Glow by Gaby. Atención independiente en Los Olivos.",
      ".footer-link":"Armar pedido",
      ".site-support":"Esta página tiene apoyo de | Mi Pequeño Espacio"
    },
    en: {
      ".skip-link":"Skip to content",
      ".announcement span:first-child":"Personalized service in Los Olivos",
      ".announcement span:last-child":"Deliveries coordinated through WhatsApp",
      ".main-nav a:nth-child(1)":"Products",
      ".main-nav a:nth-child(2)":"Routines",
      ".main-nav a:nth-child(3)":"Gallery",
      ".main-nav a:nth-child(4)":"Business",
      ".main-nav a:nth-child(5)":"Contact",
      ".cart-button span:first-child":"My order",
      ".hero-copy .eyebrow":"Personalized care for you",
      ".hero-copy h1":"Technology and beauty for skin that feels good.",
      ".hero-copy .hero-text":"Explore facial care, body care and wellness products. Select what interests you and send a complete request directly through WhatsApp.",
      ".hero-actions .button-primary":"Explore catalog",
      ".hero-actions .button-ghost":"Request guidance",
      ".trust-row span:nth-child(1)":"✓ Personalized guidance",
      ".trust-row span:nth-child(2)":"✓ Assisted purchase",
      ".trust-row span:nth-child(3)":"✓ Delivery coordination",
      ".hero-caption span":"Featured selection",
      ".hero-caption strong":"Technology-assisted facial routine",
      ".chip-a":"Interactive catalog",
      ".chip-b":"✦ WhatsApp ordering",
      ".about-copy .eyebrow":"About Glow by Gaby",
      ".about-copy h2":"A personal experience for caring for your skin and discovering new opportunities.",
      ".image-label":"Community and guidance",
      ".about-copy > p:nth-of-type(2)":"Glow by Gaby is an independent business based in Los Olivos. It provides guidance on Nu Skin products and supports each person from choosing a routine through order coordination.",
      ".about-copy > p:nth-of-type(3)":"It also provides information for people who want to explore a business opportunity and receive guidance as they get started.",
      ".mini-stats div:nth-child(1) strong":"One-to-one service",
      ".mini-stats div:nth-child(1) span":"Recommendations based on your goal",
      ".mini-stats div:nth-child(2) strong":"Direct catalog",
      ".mini-stats div:nth-child(2) span":"Fast and organized selection",
      ".mini-stats div:nth-child(3) strong":"Assisted purchase",
      ".mini-stats div:nth-child(3) span":"Confirmation before payment",
      ".featured-grid article:nth-child(1) strong":"Dark Spot Care Kit",
      ".featured-grid article:nth-child(1) small":"Most requested",
      ".featured-grid article:nth-child(2) strong":"LumiSpa iO",
      ".featured-grid article:nth-child(2) small":"Facial technology",
      ".featured-grid article:nth-child(3) strong":"Vitamin C + Boost",
      ".featured-grid article:nth-child(3) small":"Radiance and texture",
      ".products .section-heading .eyebrow":"Catalog",
      ".products .section-heading h2":"Choose the products that interest you",
      ".products .section-heading p:not(.eyebrow)":"Availability, final pricing and payment method are confirmed personally.",
      ".products .section-top .button-soft":"Review my order",
      ".routine .section-heading .eyebrow":"Extra section",
      ".routine .section-heading h2":"Find a routine based on your goal",
      ".routine .section-heading p:not(.eyebrow)":"Choose a need and start a personalized WhatsApp conversation.",
      ".routine-card:nth-child(1) h3":"Dark spots and uneven tone",
      ".routine-card:nth-child(1) p":"Options designed to support a visibly more even appearance and a consistent routine.",
      ".routine-card:nth-child(1) button":"Ask about this routine",
      ".routine-card:nth-child(2) h3":"Deep cleansing",
      ".routine-card:nth-child(2) p":"Alternatives for removing impurities and leaving skin feeling clean and soft.",
      ".routine-card:nth-child(2) button":"Ask about this routine",
      ".routine-card:nth-child(3) h3":"Radiance and hydration",
      ".routine-card:nth-child(3) p":"Products designed to support a fresh, radiant and comfortable-looking complexion.",
      ".routine-card:nth-child(3) button":"Ask about this routine",
      ".routine-card:nth-child(4) h3":"Body care",
      ".routine-card:nth-child(4) p":"Routines that complement the appearance of firmness, texture and body wellness.",
      ".routine-card:nth-child(4) button":"Ask about this routine",
      ".gallery .section-heading .eyebrow":"Gallery",
      ".gallery .section-heading h2":"Explore products, kits and presentations",
      ".gallery-note":"Photos and prices are for reference. Tap any image to view it in full and confirm availability before purchasing.",
      ".gallery-item:nth-child(1) figcaption":"Ways to build your LumiSpa routine",
      ".gallery-item:nth-child(2) figcaption":"Beauty Focus Collagen+",
      ".gallery-item:nth-child(3) figcaption":"Facial care technology",
      ".gallery-item:nth-child(4) figcaption":"Kits and reference prices",
      ".gallery-item:nth-child(5) figcaption":"Body Serum body-care routine",
      ".gallery-item:nth-child(6) figcaption":"Wellness and body care",
      ".process .section-heading .eyebrow":"How to order",
      ".process .section-heading h2":"Your request in four steps",
      ".step-card:nth-child(1) h3":"Explore",
      ".step-card:nth-child(1) p":"Review the catalog and open each product's details.",
      ".step-card:nth-child(2) h3":"Select",
      ".step-card:nth-child(2) p":"Add products and quantities to your order.",
      ".step-card:nth-child(3) h3":"Enter your information",
      ".step-card:nth-child(3) p":"Name, phone number, district, address and delivery reference.",
      ".step-card:nth-child(4) h3":"Coordinate",
      ".step-card:nth-child(4) p":"Send the summary through WhatsApp and confirm pricing, payment and delivery.",
      ".business-copy .eyebrow":"Business opportunity",
      ".business-copy h2":"Would you also like to start a business?",
      ".business-copy > p:not(.eyebrow)":"Request clear information about how to start, available options and the guidance you can receive. There is no obligation.",
      ".business-copy .button":"Request information",
      ".testimonials .section-heading .eyebrow":"Testimonials",
      ".testimonials .section-heading h2":"Experiences shared with permission",
      ".testimonials .section-heading p:not(.eyebrow)":"This area is completed only with genuine opinions and each client's permission.",
      ".testimonial-card p":"Verified Glow by Gaby customer testimonials will be available here soon.",
      ".testimonial-card button":"Request references",
      ".contact-copy .eyebrow":"Contact",
      ".contact-copy h2":"Let's discuss what you need",
      ".contact-copy > p:not(.eyebrow)":"WhatsApp assistance for questions, orders, availability and delivery coordination.",
      ".contact-list a:last-child":"Glow by Gaby on Facebook",
      ".contact-panel h3":"Not sure what to choose?",
      ".contact-panel p":"Tell us your skin type, main goal and approximate budget.",
      ".contact-panel .button":"Talk to Gaby",
      ".floating-whatsapp span":"WhatsApp assistance",
      ".drawer-header .eyebrow":"WhatsApp request",
      "#cart-title":"My order",
      ".cart-empty h3":"You have not added any products yet",
      ".cart-empty p":"Choose one or more products from the catalog.",
      ".cart-empty .button":"View catalog",
      ".order-form h3":"Information for delivery coordination",
      ".privacy-note":"The website does not store your information. It is only used to prepare the WhatsApp message that you choose to send.",
      ".order-form .button-primary":"Send request through WhatsApp",
      ".disclaimer p":"Glow by Gaby is an independent business and is not the official Nu Skin website. The information is for guidance only and does not replace medical or dermatological evaluation. Results may vary. Consult a professional during pregnancy, breastfeeding, allergies, medical treatment or for sensitive skin.",
      ".footer-center > p:first-child":"© {year} Glow by Gaby. Independent service in Los Olivos.",
      ".footer-link":"Build order",
      ".site-support":"This website has support from | Mi Pequeño Espacio"
    }
  };

  const formCopy = {
    es: {
      labels:["Nombre completo *","Número de contacto *","Ciudad o distrito *","Dirección de entrega *","Referencia de entrega","Modalidad *","Horario preferido","Método de pago preferido","Notas del pedido"],
      placeholders:{
        nombre:"Ej. María López",telefono:"Ej. 937 549 111",distrito:"Ej. Los Olivos",
        direccion:"Calle, avenida, número y urbanización",referencia:"Cerca de..., color de puerta, piso, etc.",
        notas:"Tipo de piel, alergias, preguntas o indicaciones adicionales"
      },
      options:{
        modalidad:["Seleccionar","Delivery en Lima","Envío a provincia","Recojo coordinado"],
        horario:["Por coordinar","Mañana","Tarde","Noche"],
        pago:["Por coordinar","Yape / Plin","Transferencia bancaria","Otro"]
      },
      consent:"Autorizo que Glow by Gaby me contacte para confirmar precio, disponibilidad, pago y envío. *"
    },
    en: {
      labels:["Full name *","Contact number *","City or district *","Delivery address *","Delivery reference","Delivery option *","Preferred time","Preferred payment method","Order notes"],
      placeholders:{
        nombre:"E.g. Maria Lopez",telefono:"E.g. 937 549 111",distrito:"E.g. Los Olivos",
        direccion:"Street, avenue, number and neighborhood",referencia:"Near..., door color, floor, etc.",
        notas:"Skin type, allergies, questions or additional instructions"
      },
      options:{
        modalidad:["Select","Delivery within Lima","Shipping to another region","Coordinated pickup"],
        horario:["To be arranged","Morning","Afternoon","Evening"],
        pago:["To be arranged","Yape / Plin","Bank transfer","Other"]
      },
      consent:"I authorize Glow by Gaby to contact me to confirm pricing, availability, payment and delivery. *"
    }
  };

  function loadJSON(key, fallback) {
    try {
      const parsed = JSON.parse(localStorage.getItem(key));
      return parsed && typeof parsed === "object" ? parsed : fallback;
    } catch {
      return fallback;
    }
  }

  function t() {
    return copy[state.language];
  }

  function productText(product, field) {
    if (state.language === "en") {
      const englishField = field === "details" ? "detailsEn" : `${field}En`;
      return product[englishField] || product[field];
    }
    return product[field];
  }

  function saveCart() {
    localStorage.setItem("glow-cart", JSON.stringify(state.cart));
  }

  function getProduct(id) {
    return products.find(product => product.id === id);
  }

  function totalUnits() {
    return Object.values(state.cart).reduce((sum, quantity) => sum + Number(quantity || 0), 0);
  }

  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, character => ({
      "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
    }[character]));
  }

  function renderProducts() {
    if (!elements.grid) return;

    const filtered = state.filter === "all"
      ? products
      : products.filter(product => product.categoryCode === state.filter);

    elements.grid.innerHTML = filtered.map(product => {
      const quantity = Number(state.cart[product.id] || 0);
      const name = productText(product, "name");
      const quantityControl = quantity > 0
        ? `<div class="card-qty-panel" aria-label="${t().inOrder}: ${escapeHTML(name)}">
            <button type="button" data-decrease-card="${product.id}" aria-label="${t().decrease}">−</button>
            <span><small>${t().inOrder}</small><strong>${quantity}</strong></span>
            <button type="button" data-increase-card="${product.id}" aria-label="${t().increase}">＋</button>
          </div>`
        : `<button class="add-button" type="button" data-add="${product.id}">${t().add}</button>`;

      return `<article class="product-card reveal visible ${quantity > 0 ? "product-selected" : ""}">
        <div class="product-media">
          <img src="${product.image}" alt="${escapeHTML(name)}" loading="lazy">
          <span class="product-badge">${escapeHTML(productText(product, "badge"))}</span>
          ${quantity > 0 ? `<span class="selected-badge">${t().selected} · ${quantity}</span>` : ""}
        </div>
        <div class="product-body">
          <span class="product-meta">${escapeHTML(productText(product, "subcat"))}</span>
          <h3>${escapeHTML(name)}</h3>
          <p>${escapeHTML(productText(product, "summary"))}</p>
          <div class="product-actions">
            ${quantityControl}
            <button class="detail-button" type="button" data-detail="${product.id}" aria-label="${t().details} ${escapeHTML(name)}">＋</button>
          </div>
        </div>
      </article>`;
    }).join("");
  }

  function renderCart() {
    const entries = Object.entries(state.cart).filter(([, quantity]) => quantity > 0);
    const units = totalUnits();

    if (elements.count) {
      elements.count.textContent = units;
      elements.count.setAttribute("aria-label", `${units} ${t().unitsSelected}`);
    }

    if (!entries.length) {
      elements.empty.hidden = false;
      elements.cartContent.hidden = true;
      elements.cartItems.innerHTML = "";
      return;
    }

    elements.empty.hidden = true;
    elements.cartContent.hidden = false;
    elements.cartItems.innerHTML = entries.map(([id, quantity]) => {
      const product = getProduct(id);
      if (!product) return "";
      const name = productText(product, "name");

      return `<article class="cart-item">
        <img src="${product.image}" alt="">
        <div>
          <h4>${escapeHTML(name)}</h4>
          <div class="qty-control" aria-label="${t().inOrder}: ${escapeHTML(name)}">
            <button type="button" data-decrease="${id}" aria-label="${t().decrease}">−</button>
            <span>${quantity}</span>
            <button type="button" data-increase="${id}" aria-label="${t().increase}">＋</button>
          </div>
        </div>
        <button class="remove-item" type="button" data-remove="${id}" aria-label="${t().remove} ${escapeHTML(name)}">×</button>
      </article>`;
    }).join("");
  }

  function animateCart() {
    const button = document.querySelector(".cart-button");
    if (!button) return;
    button.classList.remove("is-updated");
    void button.offsetWidth;
    button.classList.add("is-updated");
    window.setTimeout(() => button.classList.remove("is-updated"), 540);
  }

  function addToCart(id) {
    state.cart[id] = (state.cart[id] || 0) + 1;
    saveCart();
    renderProducts();
    renderCart();
    animateCart();

    const product = getProduct(id);
    showToast(`${product ? productText(product, "name") : "Producto"} ${t().added} · ${state.cart[id]}`);
  }

  function updateQuantity(id, change) {
    const next = (state.cart[id] || 0) + change;
    if (next <= 0) delete state.cart[id];
    else state.cart[id] = next;
    saveCart();
    renderProducts();
    renderCart();
    animateCart();
  }

  function openCart() {
    elements.drawer.classList.add("open");
    elements.drawer.setAttribute("aria-hidden", "false");
    elements.backdrop.hidden = false;
    document.body.classList.add("drawer-open");
    window.setTimeout(() => elements.drawer.querySelector("[data-close-cart]")?.focus(), 40);
  }

  function closeCart() {
    elements.drawer.classList.remove("open");
    elements.drawer.setAttribute("aria-hidden", "true");
    elements.backdrop.hidden = true;
    document.body.classList.remove("drawer-open");
  }

  function openProduct(id) {
    const product = getProduct(id);
    if (!product) return;

    const name = productText(product, "name");
    const details = productText(product, "details");
    const currentQuantity = Number(state.cart[id] || 0);

    elements.productModalContent.innerHTML = `<article class="modal-product">
      <div class="modal-product-image"><img src="${product.image}" alt="${escapeHTML(name)}"></div>
      <div class="modal-product-copy">
        <p class="eyebrow">${escapeHTML(productText(product, "subcat"))}</p>
        <h2>${escapeHTML(name)}</h2>
        <p>${escapeHTML(productText(product, "summary"))}</p>
        <ul>${details.map(item => `<li>${escapeHTML(item)}</li>`).join("")}</ul>
        <button class="button button-primary" type="button" data-modal-add="${product.id}">
          ${currentQuantity > 0 ? `${t().addAnother} · ${t().current} ${currentQuantity}` : t().add}
        </button>
      </div>
    </article>`;

    elements.productModal.showModal();
  }

  function closeProduct() {
    if (elements.productModal?.open) elements.productModal.close();
  }

  function openGallery(figure) {
    const image = figure.querySelector("img");
    const caption = figure.querySelector("figcaption");
    if (!image || !elements.galleryModal) return;

    elements.galleryImage.src = image.currentSrc || image.src;
    elements.galleryImage.alt = image.alt || "Glow by Gaby";
    elements.galleryCaption.textContent = caption?.textContent || image.alt || "Glow by Gaby";
    elements.galleryModal.showModal();
  }

  function closeGallery() {
    if (elements.galleryModal?.open) elements.galleryModal.close();
  }

  function showToast(message) {
    elements.toast.textContent = message;
    elements.toast.classList.add("show");
    clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => elements.toast.classList.remove("show"), 2300);
  }

  function openWhatsApp(message) {
    window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
  }

  function buildOrderMessage(formData) {
    const selectedProducts = Object.entries(state.cart)
      .filter(([, quantity]) => quantity > 0)
      .map(([id, quantity], index) => {
        const product = getProduct(id);
        if (!product) return "";
        const name = productText(product, "name");
        return state.language === "en"
          ? `${index + 1}. ${name}\n   Requested quantity: ${quantity}`
          : `${index + 1}. ${name}\n   Cantidad solicitada: ${quantity}`;
      })
      .filter(Boolean)
      .join("\n\n");

    const locale = state.language === "en" ? "en-US" : "es-PE";
    const generatedAt = new Intl.DateTimeFormat(locale, {
      dateStyle: "long",
      timeStyle: "short"
    }).format(new Date());

    if (state.language === "en") {
      return [
        "*QUOTE AND ORDER COORDINATION REQUEST*","",
        "Dear Gaby,","",
        "I am contacting you through the *Glow by Gaby* online catalog. I would like to request information, confirm availability and coordinate the purchase of the following products:","",
        "*1. SELECTED PRODUCTS*",selectedProducts,"",
        `Total requested: ${totalUnits()} unit(s)`,"",
        "*2. CUSTOMER INFORMATION*",
        `Full name: ${formData.get("nombre")}`,
        `Contact number: ${formData.get("telefono")}`,
        `City or district: ${formData.get("distrito")}`,"",
        "*3. DELIVERY INFORMATION*",
        `Address: ${formData.get("direccion")}`,
        `Reference: ${formData.get("referencia") || "Not provided"}`,
        `Requested option: ${formData.get("modalidad")}`,
        `Preferred time: ${formData.get("horario") || "To be arranged"}`,"",
        "*4. PAYMENT AND NOTES*",
        `Preferred payment method: ${formData.get("pago") || "To be arranged"}`,
        `Additional notes: ${formData.get("notas") || "No additional notes"}`,"",
        "*5. PLEASE CONFIRM*",
        "• Current availability of each product.",
        "• Unit prices and total order amount.",
        "• Estimated delivery cost and timeframe.",
        "• Available payment methods.",
        "• Basic use and storage recommendations.","",
        "I authorize Glow by Gaby to contact me through the number provided to respond to this request and coordinate the order.","",
        "I understand that this message is a request for information and that the purchase will only be confirmed after I receive Glow by Gaby's response, review the final amount and accept the payment and delivery conditions.","",
        `Request generated on ${generatedAt}.`,"",
        "I look forward to your confirmation. Thank you."
      ].join("\n");
    }

    return [
      "*SOLICITUD DE COTIZACIÓN Y COORDINACIÓN DE PEDIDO*","",
      "Estimada Gaby:","",
      "Me comunico desde el catálogo web de *Glow by Gaby*. Deseo solicitar información, confirmar la disponibilidad y coordinar la compra de los siguientes productos:","",
      "*1. PRODUCTOS SELECCIONADOS*",selectedProducts,"",
      `Cantidad total solicitada: ${totalUnits()} unidad(es)`,"",
      "*2. DATOS DE LA PERSONA SOLICITANTE*",
      `Nombre completo: ${formData.get("nombre")}`,
      `Número de contacto: ${formData.get("telefono")}`,
      `Ciudad o distrito: ${formData.get("distrito")}`,"",
      "*3. INFORMACIÓN PARA LA ENTREGA*",
      `Dirección: ${formData.get("direccion")}`,
      `Referencia: ${formData.get("referencia") || "No indicada"}`,
      `Modalidad solicitada: ${formData.get("modalidad")}`,
      `Horario preferido: ${formData.get("horario") || "Por coordinar"}`,"",
      "*4. PAGO Y OBSERVACIONES*",
      `Método de pago preferido: ${formData.get("pago") || "Por coordinar"}`,
      `Notas adicionales: ${formData.get("notas") || "No se registraron notas adicionales"}`,"",
      "*5. INFORMACIÓN QUE SOLICITO CONFIRMAR*",
      "• Disponibilidad actual de cada producto.",
      "• Precio unitario y monto total del pedido.",
      "• Costo y plazo estimado de entrega.",
      "• Métodos de pago disponibles.",
      "• Recomendaciones básicas de uso y conservación.","",
      "Autorizo que Glow by Gaby me contacte mediante el número indicado para responder esta solicitud y coordinar el pedido.","",
      "Comprendo que este mensaje constituye una solicitud de información y que la compra quedará confirmada únicamente después de recibir la respuesta de Glow by Gaby, revisar el importe final y aceptar las condiciones de pago y entrega.","",
      `Solicitud generada el ${generatedAt}.`,"",
      "Quedo atenta/o a su confirmación. Muchas gracias."
    ].join("\n");
  }

  function applyFormLanguage() {
    const current = formCopy[state.language];
    document.querySelectorAll(".order-form .field > span").forEach((element, index) => {
      if (current.labels[index]) element.textContent = current.labels[index];
    });

    Object.entries(current.placeholders).forEach(([name, value]) => {
      const field = elements.orderForm?.elements.namedItem(name);
      if (field) field.placeholder = value;
    });

    Object.entries(current.options).forEach(([name, values]) => {
      const select = elements.orderForm?.elements.namedItem(name);
      if (!select) return;
      Array.from(select.options).forEach((option, index) => {
        if (values[index]) {
          option.textContent = values[index];
          option.value = (name === "modalidad" && index === 0) ? "" : values[index];
        }
      });
    });

    const consent = document.querySelector(".checkbox-row span");
    if (consent) consent.textContent = current.consent;
  }

  function applyLanguage() {
    const language = state.language;
    document.documentElement.lang = language;
    document.title = copy[language].pageTitle;

    const description = document.querySelector('meta[name="description"]');
    if (description) description.content = copy[language].pageDescription;

    Object.entries(staticText[language]).forEach(([selector, value]) => {
      const element = document.querySelector(selector);
      if (!element) return;

      if (selector === ".site-support") {
        const link = element.querySelector("a");
        element.firstChild.textContent = language === "en"
          ? "This website has support from | "
          : "Esta página tiene apoyo de | ";
        if (link) link.textContent = "Mi Pequeño Espacio";
      } else if (selector === ".hero-copy h1") {
        element.innerHTML = language === "en"
          ? "Technology and beauty for skin that <em>feels good.</em>"
          : "Tecnología y belleza para una piel que <em>se siente bien.</em>";
      } else if (selector === ".footer-center > p:first-child") {
        element.innerHTML = value.replace("{year}", `<span data-year>${new Date().getFullYear()}</span>`);
      } else {
        element.textContent = value;
      }
    });

    document.querySelectorAll("[data-filter]").forEach(button => {
      const key = button.dataset.filter;
      if (t().filters[key]) button.textContent = t().filters[key];
    });

    document.querySelectorAll("[data-language]").forEach(button => {
      const active = button.dataset.language === language;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    elements.menuButton?.querySelector(".sr-only")?.replaceChildren(
      document.createTextNode(language === "en" ? "Open menu" : "Abrir menú")
    );

    document.querySelector("[data-close-gallery]")?.setAttribute("aria-label", t().closePhoto);
    applyFormLanguage();
    prepareGallery();
    renderProducts();
    renderCart();
    localStorage.setItem("glow-language", language);
  }

  function prepareGallery() {
    document.querySelectorAll(".gallery-item").forEach(figure => {
      const caption = figure.querySelector("figcaption")?.textContent || "Glow by Gaby";
      figure.tabIndex = 0;
      figure.setAttribute("role", "button");
      figure.setAttribute("aria-label", `${t().galleryOpen}: ${caption}`);
    });
  }

  document.addEventListener("click", event => {
    const galleryFigure = event.target.closest(".gallery-item");
    if (galleryFigure) {
      openGallery(galleryFigure);
      return;
    }

    const target = event.target.closest("button, a");
    if (!target) return;

    if (target.matches("[data-language]")) {
      state.language = target.dataset.language === "en" ? "en" : "es";
      applyLanguage();
      return;
    }

    if (target.matches("[data-open-cart]")) {
      event.preventDefault();
      openCart();
    }
    if (target.matches("[data-close-cart]")) closeCart();
    if (target.matches("[data-add]")) addToCart(target.dataset.add);
    if (target.matches("[data-detail]")) openProduct(target.dataset.detail);
    if (target.matches("[data-increase]")) updateQuantity(target.dataset.increase, 1);
    if (target.matches("[data-decrease]")) updateQuantity(target.dataset.decrease, -1);
    if (target.matches("[data-increase-card]")) updateQuantity(target.dataset.increaseCard, 1);
    if (target.matches("[data-decrease-card]")) updateQuantity(target.dataset.decreaseCard, -1);

    if (target.matches("[data-remove]")) {
      delete state.cart[target.dataset.remove];
      saveCart();
      renderProducts();
      renderCart();
      animateCart();
      showToast(t().removed);
    }

    if (target.matches("[data-modal-add]")) {
      addToCart(target.dataset.modalAdd);
      closeProduct();
      openCart();
    }

    if (target.matches("[data-close-product]")) closeProduct();
    if (target.matches("[data-close-gallery]")) closeGallery();

    if (target.matches("[data-topic-key]")) {
      const message = t().topics[target.dataset.topicKey];
      if (message) openWhatsApp(message);
    }

    if (target.matches("[data-filter]")) {
      document.querySelectorAll("[data-filter]").forEach(button => button.classList.remove("active"));
      target.classList.add("active");
      state.filter = target.dataset.filter;
      renderProducts();
    }
  });

  elements.orderForm?.addEventListener("submit", event => {
    event.preventDefault();
    if (!totalUnits()) {
      showToast(t().addAtLeast);
      return;
    }
    if (!elements.orderForm.reportValidity()) return;
    openWhatsApp(buildOrderMessage(new FormData(elements.orderForm)));
  });

  elements.backdrop?.addEventListener("click", closeCart);

  elements.menuButton?.addEventListener("click", () => {
    const isOpen = elements.mainNav.classList.toggle("open");
    elements.menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  elements.mainNav?.addEventListener("click", event => {
    if (event.target.matches("a")) {
      elements.mainNav.classList.remove("open");
      elements.menuButton?.setAttribute("aria-expanded", "false");
    }
  });

  elements.productModal?.addEventListener("click", event => {
    if (event.target === elements.productModal) closeProduct();
  });

  elements.galleryModal?.addEventListener("click", event => {
    if (event.target === elements.galleryModal) closeGallery();
  });

  document.addEventListener("keydown", event => {
    if ((event.key === "Enter" || event.key === " ") && event.target.matches(".gallery-item")) {
      event.preventDefault();
      openGallery(event.target);
    }
    if (event.key === "Escape") {
      closeCart();
      closeProduct();
      closeGallery();
    }
  });

  const year = document.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear();

  const observer = "IntersectionObserver" in window
    ? new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      }, {threshold:0.12})
    : null;

  document.querySelectorAll(".reveal").forEach(element => {
    if (observer) observer.observe(element);
    else element.classList.add("visible");
  });

  applyLanguage();
})();