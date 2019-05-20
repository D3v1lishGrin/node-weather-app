const express = require('express');
const router = express.Router();
const request = require('request');


router.get('/', (req, res) => {
    const lat = req.query.lat;
    const lng = req.query.lng;

    request('https://api.openweathermap.org/data/2.5/find?lat=' + lat + '&lon=' + lng + '&APPID=062c05ac6bdf37eca9574c43268519b4',
        (error, response, body) => {

            //handle if there are no parameters provided
            if (lat === undefined || lng === undefined) {
                res.status(404).json({
                    "code": "NotFoundError",
                    "message": "not found"
                });
            } else {
                const parsedBody = JSON.parse(body);
                let ret = [];
                for (let i in parsedBody.list) {
                    ret.push({id: parsedBody.list[i].id, name: parsedBody.list[i].name});
                }

                res.status(200).json({
                    ret
                });
            }
        })
});

router.get('/:cityId', (req, res) => {
    const cityId = req.params.cityId;
    request('https://api.openweathermap.org/data/2.5/weather?id=' + cityId + '&APPID=062c05ac6bdf37eca9574c43268519b4',
        (error, response, body) => {

            if (error) {
                res.status(404).json({
                    'message':'not found',
                    'code':'NotFoundError'
                });
            } else {
                const parsedBody = JSON.parse(body);

                res.status(200).json({
                    id: parsedBody.id,
                    name: parsedBody.name,
                    lat: parsedBody.coord.lat,
                    lng: parsedBody.coord.lon

                });
            }
        })
});

router.get('/:cityId/weather', (req, res) => {
    const cityId = req.params.cityId;
    request('https://api.openweathermap.org/data/2.5/weather?id=' + cityId + '&APPID=062c05ac6bdf37eca9574c43268519b4',
        (error, response, body) => {

            if (error) {
                res.status(404).json({
                    'message':'not found',
                    'code':'NotFoundError'
                });
            } else {
                const parsedBody = JSON.parse(body);

                res.status(200).json({
                    "type": parsedBody.weather.main,
                    "type_description": parsedBody.weather.description,
                    "sunrise": parsedBody.sys.sunrise,
                    "sunset": parsedBody.sys.sunset,
                    "temp": parsedBody.main.temp,
                    "temp_min": parsedBody.main.temp_min,
                    "temp_max": parsedBody.main.temp_max,
                    "pressure": parsedBody.main.pressure,
                    "humidity": parsedBody.main.humidity,
                    "clouds_percent": parsedBody.clouds.all,
                    "wind_speed": parsedBody.wind.speed
                });
            }
        })
});

module.exports = router;