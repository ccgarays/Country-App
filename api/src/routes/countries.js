const router = require('express').Router();
const { Country, Activity } = require('../db');
const axios = require('axios').default;
const Op = require('sequelize').Op;


router.get('/', async (req, res) => {
    try {
        const { page, size, name } = req.query;
        const limit = size ? size : 10;
        const offset = page ? page * limit : 0;
        const countries = await Country.findAndCountAll({
            attributes: ['name', 'continent', 'flag', 'id'],
            limit,
            offset, 
            where: name ? {
                name: {
                    [Op.like]: `%${name}%`
                }
            } : null
        });
        res.send(countries);
    }catch (err) {
        console.log(err)
    }
})


router.get('/:idPais', async (req, res) => {
    const { idPais } = req.params;
    try {
        const { subregion, area, population } = (await axios.get(`https://restcountries.eu/rest/v2/alpha/${idPais}`)).data;
        const countryDB = await Country.findByPk(idPais, {
            include: [
                {
                    model: Activity,
                    attributes: ['name', 'difficulty', 'duration', 'season'],
                    through: {
                        attributes: ['activity_id', 'country_id'],
                    }
                }
            ]
        })
        res.send({...countryDB.dataValues, subregion, area, population});
        console.log('success')
    }catch (err) {
        console.log(err)
        res.status(404).send('Pais no encontrado')
    }
});


module.exports = router;

