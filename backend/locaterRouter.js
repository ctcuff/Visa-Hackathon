const express = require('express');
const mongoose = require('mongoose');
const locaterRouter = express.Router();

locaterRouter.post('/', async(req, res) => {
    let name = req.body.name;
    let long = req.body.longitude;
    let lat = req.body.latitude;
    let results = req.body.maxRecords;
    let dist = req.body.distance;
    // do something with getParameters()

    var api = require('./locater_api').merchant_locator_api;
    var authCredentials = require('./credentials.json');
    var merchant_locator_api = new api(authCredentials);

    merchant_locator_api.merchantLocator(getParameters(name, long, lat, results, dist)).then(function(result){
        // query visa API and return response
        let status = result.response.statusCode;
        let ret = result.response["body"]["merchantLocatorServiceResponse"]["response"];
        console.log(typeof(ret));
        res.json(ret);
    }).catch((error) => {
            console.log(error);
            res.send(error);
        }
    )

})

function getParameters(name, longitude=-121.929163, latitude=37.363922, maxRecords=5, distance=50) {
    var parameters = {
        "x-client-transaction-id": "{enter appropriate value}",
        "Accept": "application/json",
        "Content-Type": "application/json"
    };
    parameters.payload = {
        "responseAttrList": ["GNLOCATOR"],
        "header": {
            "messageDateTime": "2016-04-12T22:41:17.903",
            "startIndex": "0",
            "requestMessageId": "Request_001"
        },
        "searchOptions": {
            "matchScore": "true",
            "maxRecords": maxRecords,
            "matchIndicators": "true"
        },
        "searchAttrList": {
            "distance": distance,
            "merchantName": name,
            "longitude": longitude, // "-121.929163"
            "merchantCountryCode": "840",
            "distanceUnit": "M",
            "latitude": latitude // "37.363922"
        }
    };

    return parameters;
}

module.exports = locaterRouter;