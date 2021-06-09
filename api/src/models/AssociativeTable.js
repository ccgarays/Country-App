const { DataTypes } = require('sequelize');
const Country = require('./Country');
const TourismActivity = require('./TourismActivity');

module.exports = (sequelize) => {
    //modelo para tabla asociativa/intermedia
    sequelize.define('ActivityCountry', {
        CountryId: {
            type: DataTypes.STRING,
            references: {
                model: Country,
                key: 'id'
            }
        },
        ActivityId: {
            type: DataTypes.INTEGER,
            references: {
                model: TourismActivity,
                key: 'id'
            }
        }
    });
}