const router = require('express').Router();
const { Activity, Country, country_activity } = require('../db');

router.post('/', async (req, res) => {
    try {
        const { name, difficulty, duration, season, country } = req.body;
        const countryy = await Country.findOne({ where: { name: `${country}` } })
        if (!countryy) return res.status(400).send('Ingrese un pais');
        const activity = await Activity.create({
                                name,
                                difficulty,
                                duration,
                                season
                            })
    
        await countryy.addActivity(activity)
        res.send('success');
    }catch (err) {
        console.log(err)
    }
})

module.exports = router;