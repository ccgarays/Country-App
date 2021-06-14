const router = require('express').Router();
const { Activity, Country, country_activity } = require('../db');

router.post('/', async (req, res) => {
    try {
        const { name, difficulty, duration, season, country } = req.body;
        const countryId = (await Country.findOne({ where: { name: `${country}` } })).dataValues.id
        if (!countryId) return res.status(400).send('Ingrese un pais');
        const activity = await Activity.create({
                                name,
                                difficulty,
                                duration,
                                season
                            })
    
        const countryActivity = await country_activity.create({
                                country_id: countryId,
                                activity_id: activity.dataValues.id
                            })
    
        res.send(countryId);

    }catch (err) {
        console.log(err)
    }
})

module.exports = router;