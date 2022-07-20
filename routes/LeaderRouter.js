var bodyParser = require('body-parser')
var express = require('express')
var Leaders = require('../models/leaders')
var leaderRouter = express()
var authenticate = require("../authenticate")
leaderRouter.use(bodyParser.json())


leaderRouter.route('/')
    .get((req,res,next) => {
        Leaders.find({})
            .then(leader => {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.json(leader)
            }, err => next(err))
            .catch(err => next(err))
    })
    .post(authenticate.verifyUser,(req, res, next) => {
        Leaders.create(req.body)
            .then(leader => {
                console.log("Leader created: " + leader)
                res.statusCode = 200
                res.setHeader('Content-Type', "application/json")
                res.json(leader)
            })
    })
    .put(authenticate.verifyUser,(req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /leaders');
    })
    .delete(authenticate.verifyUser,(req, res, next) => {
        Leaders.remove({})
            .then(leader => {
                res.statusCode = 200
                res.setHeader('Content-Type', "application/json")
                res.json(leader)
            }, err => next(err))
            .catch(err => next(err))
    });

leaderRouter.route('/:leaderId')
    .get((req,res,next) => {
        Leaders.findById(req.params.leaderId)
            .then(leader => {
                res.statusCode = 200
                res.setHeader("Content-Type", "application/json")
                res.json(leader)
            },  err => next(err))
            .catch(err => next(err))
    })

    .post(authenticate.verifyUser,(req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /leaders/'+ req.params.leaderId);
    })

    .put(authenticate.verifyUser,(req, res, next) => {
        Leaders.findByIdAndUpdate(req.params.leaderId, {
            $set: req.body
        }, {new: true})
        .then(dish => {
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.json()
        }, err => next(err))
        .catch(err => next(err))
    })

    .delete(authenticate.verifyUser,(req, res, next) => {
         Leaders.findByIdAndRemove(req.params.leaderId)
            .then(resp => {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.json(resp)
            }, err => next(err))
            .catch(err => next(err))
    })

module.exports = leaderRouter