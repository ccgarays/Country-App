const router = require('express').Router();
const { Activity, Country } = require('../db');

router.post('/', async (req, res) => {
    try {
        const { name, difficulty, duration, season, country } = req.body;
        const countryAdd = await Country.findOne({ where: { name: `${country}` } })
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
        res.send('Actividad agregada');
    }catch (err) {
        console.log(err)
    }
})

module.exports = router;