// Catálogo de la Mueblería Hermanos Jota (11 productos), migrado del sitio original.
// Los precios son ficticios: el catálogo no trae precios.
const productos = [
  {
    id: 1,
    nombre: 'Aparador Uspallata',
    precio: 1420000,
    imagenURL: '/img/aparador-uspallata.png',
    descripcion:
      'Aparador de seis puertas fabricado en nogal sostenible con tiradores metálicos en acabado latón. Su silueta minimalista realza el veteado natural de la madera, creando una pieza que combina funcionalidad y elegancia atemporal para espacios contemporáneos.',
    especificaciones: [
      {
        nombre: 'Medidas',
        valor: '180 × 45 × 75 cm',
      },
      {
        nombre: 'Materiales',
        valor: 'Nogal macizo FSC®, herrajes de latón',
      },
      {
        nombre: 'Acabado',
        valor: 'Aceite natural ecológico',
      },
      {
        nombre: 'Peso',
        valor: '68 kg',
      },
      {
        nombre: 'Capacidad',
        valor: '6 compartimentos interiores',
      },
    ],
  },
  {
    id: 2,
    nombre: 'Biblioteca Recoleta',
    precio: 980000,
    imagenURL: '/img/biblioteca-recoleta.png',
    descripcion:
      'Sistema modular de estantes abierto que combina estructura de acero Sage Green y repisas en roble claro. Perfecta para colecciones y objetos de diseño, su diseño versátil se adapta a cualquier espacio contemporáneo con elegancia funcional.',
    especificaciones: [
      {
        nombre: 'Medidas',
        valor: '100 × 35 × 200 cm',
      },
      {
        nombre: 'Materiales',
        valor: 'Estructura de acero, estantes de roble',
      },
      {
        nombre: 'Acabado',
        valor: 'Laca mate ecológica',
      },
      {
        nombre: 'Capacidad',
        valor: '45 kg por estante',
      },
      {
        nombre: 'Modulares',
        valor: '5 estantes ajustables',
      },
    ],
  },
  {
    id: 3,
    nombre: 'Butaca Mendoza',
    precio: 680000,
    imagenURL: '/img/butaca-mendoza.png',
    descripcion:
      'Butaca tapizada en bouclé Dusty Rose con base de madera de guatambú. El respaldo curvo abraza el cuerpo y ofrece máximo confort, mientras que su diseño orgánico aporta calidez y sofisticación a cualquier ambiente contemporáneo.',
    especificaciones: [
      {
        nombre: 'Medidas',
        valor: '80 × 75 × 85 cm',
      },
      {
        nombre: 'Materiales',
        valor: 'Guatambú macizo, tela bouclé',
      },
      {
        nombre: 'Acabado',
        valor: 'Cera vegetal, tapizado premium',
      },
      {
        nombre: 'Tapizado',
        valor: 'Repelente al agua y manchas',
      },
      {
        nombre: 'Confort',
        valor: 'Espuma alta densidad',
      },
    ],
  },
  {
    id: 4,
    nombre: 'Sillón Copacabana',
    precio: 1250000,
    imagenURL: '/img/sillon-copacabana.png',
    descripcion:
      'Sillón lounge en cuero cognac con base giratoria en acero Burnt Sienna. Inspirado en la estética brasilera moderna de los 60, combina comodidad excepcional con un diseño icónico que trasciende tendencias y épocas.',
    especificaciones: [
      {
        nombre: 'Medidas',
        valor: '90 × 85 × 95 cm',
      },
      {
        nombre: 'Materiales',
        valor: 'Cuero curtido vegetal, acero pintado',
      },
      {
        nombre: 'Acabado',
        valor: 'Cuero anilina premium',
      },
      {
        nombre: 'Rotación',
        valor: '360° silenciosa y suave',
      },
      {
        nombre: 'Garantía',
        valor: '10 años en estructura',
      },
    ],
  },
  {
    id: 5,
    nombre: 'Mesa de Centro Araucaria',
    precio: 620000,
    imagenURL: '/img/mesa-centro-araucaria.png',
    descripcion:
      'Mesa de centro con sobre circular de mármol Patagonia y base de tres patas en madera de nogal. Su diseño minimalista se convierte en el punto focal perfecto para cualquier sala de estar contemporánea, combinando la frialdad del mármol con la calidez de la madera.',
    especificaciones: [
      {
        nombre: 'Medidas',
        valor: '90 × 90 × 45 cm',
      },
      {
        nombre: 'Materiales',
        valor: 'Sobre de mármol Patagonia, patas de nogal',
      },
      {
        nombre: 'Acabado',
        valor: 'Mármol pulido, aceite natural en madera',
      },
      {
        nombre: 'Peso',
        valor: '42 kg',
      },
      {
        nombre: 'Carga máxima',
        valor: '25 kg distribuidos',
      },
    ],
  },
  {
    id: 6,
    nombre: 'Mesa de Noche Aconcagua',
    precio: 380000,
    imagenURL: '/img/mesa-noche-aconcagua.png',
    descripcion:
      'Mesa de noche con cajón oculto y repisa inferior en roble certificado FSC®. Su diseño limpio y funcional permite convivir con diferentes estilos de dormitorio, ofreciendo almacenamiento discreto y elegante para objetos personales.',
    especificaciones: [
      {
        nombre: 'Medidas',
        valor: '45 × 35 × 60 cm',
      },
      {
        nombre: 'Materiales',
        valor: 'Roble macizo FSC®, herrajes soft-close',
      },
      {
        nombre: 'Acabado',
        valor: 'Barniz mate de poliuretano',
      },
      {
        nombre: 'Almacenamiento',
        valor: '1 cajón + repisa inferior',
      },
      {
        nombre: 'Características',
        valor: 'Cajón con cierre suave',
      },
    ],
  },
  {
    id: 7,
    nombre: 'Sofá Patagonia',
    precio: 1850000,
    imagenURL: '/img/sofa-patagonia.png',
    descripcion:
      'Sofá de tres cuerpos tapizado en lino Warm Alabaster con patas cónicas de madera. Los cojines combinan espuma de alta resiliencia con plumón reciclado, ofreciendo comodidad duradera y sostenible para el hogar moderno.',
    especificaciones: [
      {
        nombre: 'Medidas',
        valor: '220 × 90 × 80 cm',
      },
      {
        nombre: 'Estructura',
        valor: 'Madera de eucalipto certificada FSC®',
      },
      {
        nombre: 'Tapizado',
        valor: 'Lino 100% natural premium',
      },
      {
        nombre: 'Relleno',
        valor: 'Espuma HR + plumón reciclado',
      },
      {
        nombre: 'Sostenibilidad',
        valor: 'Materiales 100% reciclables',
      },
    ],
  },
  {
    id: 8,
    nombre: 'Mesa Comedor Pampa',
    precio: 1680000,
    imagenURL: '/img/mesa-comedor-pampa.png',
    descripcion:
      'Mesa extensible de roble macizo con tablero biselado y sistema de apertura suave. Su diseño robusto y elegante se adapta perfectamente a reuniones íntimas o grandes celebraciones familiares, extendiéndose de 6 a 10 comensales.',
    especificaciones: [
      {
        nombre: 'Medidas',
        valor: '160-240 × 90 × 75 cm',
      },
      {
        nombre: 'Materiales',
        valor: 'Roble macizo FSC®, mecanismo alemán',
      },
      {
        nombre: 'Acabado',
        valor: 'Aceite-cera natural',
      },
      {
        nombre: 'Capacidad',
        valor: '6-10 comensales',
      },
      {
        nombre: 'Extensión',
        valor: 'Sistema de mariposa central',
      },
    ],
  },
  {
    id: 9,
    nombre: 'Sillas Córdoba',
    precio: 890000,
    imagenURL: '/img/sillas-cordoba.png',
    descripcion:
      'Set de cuatro sillas apilables en contrachapado moldeado de nogal y estructura tubular pintada en Sage Green. Su diseño ergonómico y materiales de calidad garantizan comodidad y durabilidad en el uso diario, perfectas para comedores contemporáneos.',
    especificaciones: [
      {
        nombre: 'Medidas',
        valor: '45 × 52 × 80 cm (cada una)',
      },
      {
        nombre: 'Materiales',
        valor: 'Contrachapado nogal, tubo de acero',
      },
      {
        nombre: 'Acabado',
        valor: 'Laca mate, pintura epoxi',
      },
      {
        nombre: 'Apilables',
        valor: 'Hasta 6 sillas',
      },
      {
        nombre: 'Incluye',
        valor: 'Set de 4 sillas',
      },
    ],
  },
  {
    id: 10,
    nombre: 'Escritorio Costa',
    precio: 720000,
    imagenURL: '/img/escritorio-costa.png',
    descripcion:
      'Escritorio compacto con cajón organizado y tapa pasacables integrada en bambú laminado. Ideal para espacios de trabajo en casa, combina funcionalidad moderna con estética minimalista y sostenible, perfecto para el trabajo remoto.',
    especificaciones: [
      {
        nombre: 'Medidas',
        valor: '120 × 60 × 75 cm',
      },
      {
        nombre: 'Materiales',
        valor: 'Bambú laminado, herrajes ocultos',
      },
      {
        nombre: 'Acabado',
        valor: 'Laca mate resistente',
      },
      {
        nombre: 'Almacenamiento',
        valor: '1 cajón con organizador',
      },
      {
        nombre: 'Cables',
        valor: 'Pasacables integrado',
      },
    ],
  },
  {
    id: 11,
    nombre: 'Silla de Trabajo Belgrano',
    precio: 540000,
    imagenURL: '/img/silla-trabajo-belgrano.png',
    descripcion:
      'Silla ergonómica regulable en altura con respaldo de malla transpirable y asiento tapizado en tejido reciclado. Diseñada para largas jornadas de trabajo con máximo confort y apoyo lumbar, ideal para oficinas en casa y espacios de coworking.',
    especificaciones: [
      {
        nombre: 'Medidas',
        valor: '60 × 60 × 90-100 cm',
      },
      {
        nombre: 'Materiales',
        valor: 'Malla técnica, tejido reciclado',
      },
      {
        nombre: 'Acabado',
        valor: 'Base cromada, tapizado premium',
      },
      {
        nombre: 'Regulación',
        valor: 'Altura + inclinación respaldo',
      },
      {
        nombre: 'Certificación',
        valor: 'Ergonomía europea EN 1335',
      },
    ],
  },
];

module.exports = productos;
