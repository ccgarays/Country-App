const router  = require('express').Router();
const countries = require('./countries');
const activities = require('./activities');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');



// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/countries', countries);
router.use('/activities', activities);



module.exports = router;
/* module.exports = {
    countries: require('./countries'),
    activities: require('./activities'),
    index: router
}
 */