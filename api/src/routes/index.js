const router  = require('express').Router();
const countries = require('./countries');
const activities = require('./activities');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');



// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/countries', countries);
router.use('/activity', activities);



module.exports = router;