const express = require('express');
const mongoose = require('mongoose');
const locaterRouter = express.Router();

locaterRouter.post('/', async(req, res) => {
    let info = req.body; // the info from frontend
    // do something with getParameters()

    var api = require('./locater_api').merchant_locator_api;
    var authCredentials = require('./credentials.json');
    var merchant_locator_api = new api(authCredentials);

    merchant_locator_api.merchantLocator(getParameters()).then(function(result){
        // query visa API and return response
        res.json(result.response);
    }).catch((error) => {
            console.log(error);
            res.send(error);
        }
    )

})

function getParameters() {
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
            "maxRecords": "5",
            "matchIndicators": "true"
        },
        "searchAttrList": {
            "distance": "50",
            "merchantName": "Starbucks",
            "longitude": "-121.929163",
            "merchantCountryCode": "840",
            "distanceUnit": "M",
            "latitude": "37.363922"
        }
    };

    return parameters;
}

module.exports = locaterRouter;