const router = require('express').Router();
const { Activity, Country } = require('../db');

router.post('/', async (req, res) => {
    const { name, difficulty, duration, season, country } = req.body;
    try {
        for(let count of country) {
            const countryAdd = await Country.findOne({ where: { name: `${count}` } })
            if (!countryAdd) return res.status(400).send('Ingrese un pais');
            const [activity, created] = await Activity.findOrCreate({
                where: {name: `${name}`},
                defaults : {
                    difficulty,
                    duration,
                    season
                }
            })
            await countryAdd.addActivity(activity)
        }
        res.send('Actividad agregada');
    }catch (err) {
        console.log(err)
    }
})

//devuleve todas las actividades que se hallan agregado
router.get('/', async(req, res) => {
    try {
        const activities = await Activity.findAll({
            include: [
                {
                    model: Country,
                    attributes: ['name', 'continent', 'flag', 'id'],
                    through: {
                        attributes: [], //de esta forma las respuesta no incluye los atributos 'activity_id', 'country_id'
                        // de la tabla de intermedia country_activity. Con attributes: ['activity_id', 'country_id']
                        // se devuelven estos valores en la respuesta
                    }
                }
            ],
            attributes: ['name'],
        })
        res.send(activities)
    }catch (err){
        console.log(err)
    }
})

module.exports = router;