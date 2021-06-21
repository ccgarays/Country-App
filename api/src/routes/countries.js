const router = require('express').Router();
const { Country, Activity } = require('../db');
const axios = require('axios').default;
const Op = require('sequelize').Op;


router.get('/', async (req, res) => {
    try {
        const { page, size, name, continent, order, type } = req.query;
        const limit = size ? size : 10;
        const offset = page ? page * limit : 0;
        const countries = await Country.findAndCountAll({
            order: [
                [`${order}`, `${type}`]
            ],
            include: [
                {
                    model: Activity,
                    attributes: ['name'],
                    through: {
                        attributes: [], //de esta forma las respuesta no incluye los atributos 'activity_id', 'country_id'
                        // de la tabla de intermedia country_activity. Con attributes: ['activity_id', 'country_id']
                        // se devuelven estos valores en la respuesta
                    }
                }
            ],
            attributes: ['name', 'continent', 'flag', 'id', 'population'],
            limit,
            offset, 
            where: {
                [Op.and]: [name ? {name: {[Op.iLike]: `%${name}%`}}:null , continent ? {continent: `${continent}`}:null]
                //el operador iLike permite ignorar mayusculas
            }
        });
        res.send(countries);
    }catch (err) {
        console.log(err)
        res.status(404).send('Pais no encontradooooo')
    }
})


router.get('/:idPais', async (req, res) => {
    const { idPais } = req.params;
    try {
        const { subregion, area } = (await axios.get(`https://restcountries.eu/rest/v2/alpha/${idPais}`)).data;
        const countryDB = await Country.findByPk(idPais, {
            include: [
                {
                    model: Activity,
                    attributes: ['name', 'difficulty', 'duration', 'season'],
                    through: {
                        attributes: [],
                    }
                }
            ]
        })
        res.send({...countryDB.dataValues, subregion, area });
        console.log('success')
    }catch (err) {
        console.log(err)
        res.status(404).send('Pais no encontrado')
    }
});


module.exports = router;

