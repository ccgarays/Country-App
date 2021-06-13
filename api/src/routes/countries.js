const router = require('express').Router();
//const { Country } = require('../models/Country');
const { Country } = require('../db');
const axios = require('axios').default;
const Op = require('sequelize').Op;


router.get('/', async (req, res) => {
    const { page, size, name } = req.query;
    const countries = await Country.findAndCountAll({
        limit: size,
        offset: size * page,
        where: {
            name: {
                [Op.like]: `%${name}%`
            }
        }
    });
    res.send(countries);
})


router.get('/:idPais', async (req, res) => {
    const { idPais } = req.params;
    //const country = await axios.get(`https://restcountries.eu/rest/v2/alpha/${idPais}`);
    const country = await Country.findByPk(idPais);
    res.send({country});
});

router.post('/', (req, res) => {

})

module.exports = router;

