const bodyParser = require('body-parser')
const express = require('express')
const Promotions = require('../models/promotions')
const mongoose = require('mongoose');
const promoRouter = express()
const promoRouterId = express()
const authenticate = require("../authenticate")
promoRouter.use(bodyParser.json())
promoRouterId.use(bodyParser.json())

promoRouter.route('/')
    .get((req,res,next) => {
        Promotions.find({})
          .then((promo) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json')
                res.json(promo)
            }, err => {
                next(err);
            })
            .catch((err) => { next(err) })
    })
    .post(authenticate.verifyUser,(req, res, next) => {
        Promotions.create(req.body)
            .then(promo => {
                console.log('Promotion created: ' + promo)
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.json(promo)
            }, err => { next(err) })
            .catch(err => { next(err) })
    })
    .put(authenticate.verifyUser,(req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /promotions');
    })
    .delete(authenticate.verifyUser,(req, res, next) => {
        Promotions.remove({})
            .then(resp => {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.json(resp)
            }, err => next(err))
            .catch(err => next(err))
    });

promoRouterId.route('/:promoId')
    .get((req,res,next) => {
        Promotions.findById(req.params.promoId)
           .then(promo => {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.json(promo)
            }, err => next(err))
            .catch(err => next(err))
    })

    .post(authenticate.verifyUser,(req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /promotions/'+ req.params.promoId);
    })

    .put(authenticate.verifyUser,(req, res, next) => {
        Promotions.findByIdAndUpdate(req.params.promoId, {
            $set: req.body
        }, {new: true})
        .then(promo => {
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.json()
        }, err => next(err))
        .catch(err => next(err))
    })

    .delete(authenticate.verifyUser,(req, res, next) => {
         Promotions.findByIdAndRemove(req.params.promoId)
            .then(resp => {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.json(resp)
            }, err => next(err))
            .catch(err => next(err))
    })

module.exports = {promoRouter, promoRouterId}