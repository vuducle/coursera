const bodyParser = require('body-parser')
const express = require('express')

const promoRouter = express()
const promoRouterId = express()

promoRouter.use(bodyParser.json())
promoRouterId.use(bodyParser.json())

promoRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req,res,next) => {
        res.end('Will send all the Promotions to you!');
    })
    .post((req, res, next) => {
        res.end('Will add the promotions: ' + req.body.name + ' with details: ' + req.body.description);
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /promotions');
    })
    .delete((req, res, next) => {
        res.end('Deleting all promotions');
    });

promoRouterId.route('/:promoId')
    .get((req,res,next) => {
        res.end('Will send details of the promotions: ' + req.params.promoId +' to you!');
    })

    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /promotions/'+ req.params.promoId);
    })

    .put((req, res, next) => {
        res.write('Updating the promotion Id: ' + req.params.promoId + '\n');
        res.end('Will update the promotion: ' + req.body.name + 
            ' with details: ' + req.body.description);
    })

    .delete((req, res, next) => {
        res.end('Deleting promotion: ' + req.params.promoId);
    })

module.exports = {promoRouter, promoRouterId}