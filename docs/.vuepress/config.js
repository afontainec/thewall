module.exports = {
  title: 'ApañoTuPyme Manual de Inscripción',
  base: '/thewall/',
  themeConfig: {
    nav: [
      { text: 'ApañoTuPyme', link: 'https://apañotupyme.cl' },
      { text: 'ApañoTuPyme Dashboard', link: 'https://pyme.apanotupyme.cl/index.php?p=login' },
      { text: 'Preguntas Frecuentes', link: 'https://apanotupyme.cl/pages/preguntas-frecuentes'},
      { text: 'Términos y condiciones', link:'https://apanotupyme.cl/pages/terminos-y-condiciones'},
      { text: 'Contacto', link: '/pages/contact'}
    ],
    displayAllHeaders: true,
    sidebar: 'auto',
    sidebar: [
      {
        title: 'Registro de Pyme',   // required
        collapsable: true, // optional, defaults to true
        path: '/pages/pyme',
        sidebarDepth: 2,    // optional, defaults to 1
        children: [
          // ['/pages/pyme', 'test'],
          // ['/pages/pyme', 'Crear Usuario'],
          // ['/pages/pyme', 'Actualizar datos'],
          // ['/pages/pyme', 'Verificar Email'],
          // ['/pages/pyme', 'Cargar Logo'],
        ]
      },
      {
        title: 'Añadir Productos',   // required
        collapsable: true, // optional, defaults to true
        sidebarDepth: 2,    // optional, defaults to 1
        path: '/pages/product',
        children: [
        ]
      },
      {
        title: 'Entrega de Productos',   // required
        collapsable: true, // optional, defaults to true
        sidebarDepth: 2,    // optional, defaults to 1
        path: '/pages/order',
        children: [
        ]
      },
      {
        title: 'Pagos',   // required
        collapsable: true, // optional, defaults to true
        sidebarDepth: 2,    // optional, defaults to 1
        path: '/pages/payments',
        children: [
        ]
      },
      {
        title: 'Consultas de Consumidores',   // required
        collapsable: true, // optional, defaults to true
        sidebarDepth: 2,    // optional, defaults to 1
        path: '/pages/costumer-queries',
        children: [
        ]
      },
    ],
  }
}