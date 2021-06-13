const router = require('express').Router();
//const { Country } = require('../models/Country');
const { Country } = require('../db');
const axios = require('axios').default;


router.get('/', async (req, res) => {
   const countries = await Country.findAll({limit: 10, offset: 2});
   res.send(countries);
})


router.get('/:idPais', async (req, res) => {
    const { idPais } = req.params;
    const country = await Country.findByPk(idPais);
    res.send(country);
});

router.post('/', (req, res) => {

})

module.exports = router;

