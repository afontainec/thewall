const Main = require('./models/main');


Main.hasAccess(1, '/places/3').then((r) => { console.log('termino', r); }).catch((err) => { console.log(err); });
