
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var authenticate = require('../authenticate');
const cors = require('./cors');
var Dishes = require('../models/dishes');
var dishRouter = express.Router();
let multer = require("multer");
const { v4: uuidv4 } = require('uuid');
const path = require("path")
const fs = require("fs")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images")
    },
    filename: (req, file,cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null,fileName)
    }
})

let upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

dishRouter.use(bodyParser.json());

dishRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, (req, res, next) => {
        Dishes.find(req.query).populate('comments.author')
            .then((dishes) => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(dishes);
            }, (err) => next(err)).catch((err) => next(err));
    })

    .post(cors.corsWithOptions,authenticate.verifyUser, authenticate.verifyAdmin, upload.single("image"), async(req, res, next) => {
        try {
            const dish = new Dishes();
            const {
                category,
                description,
                name,
                price,
                label,
                featured
            } = req.body;
            
            dish.category = category;
            dish.description = description;
            dish.image = req.file.path
            dish.name = name;
            dish.price = price;
            dish.label = label;
            dish.featured = featured;
            dish.user = req.user.username;

            const doc = await dish.save();
            res.status(201).send(doc);
        } catch (err) {
            console.error(err);
            res.status(500).send(err);
        }
    })

    .put(cors.corsWithOptions,authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation is not supported on /dishes');
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, async (req, res, next) => {
        console.log(req)
        console.log(res)
        try {
            const dish = new Dishes();
            console.log(dish)
            fs.unlink(req.file.path, (err => {
                if (err) console.log(err);
            }));
            console.log(dish)
            const doc = await dish.remove({})
            console.log(dish)
            res.status(200).send(doc)
            console.log(dish)
        } catch (err) {
            console.log(err);
            res.status(500).send(err)
        }
    })

dishRouter.route('/:dishId')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, (req, res, next) => {
        Dishes.findById(req.params.dishId).populate('comments.author').then((dishes) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(dishes);
        }, (err) => next(err)).catch((err) => next(err));
    })

    .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation is not supported on /dishes/' + req.params.dishId);
    })

    .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Dishes.findByIdAndUpdate(req.params.dishId, {
            $set: req.body
        }, {
            new: true
        }).then((dish) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(dish);
        }, (err) => next(err)).catch((err) => next(err));
    })

    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin,  async (req, res, next) => {
        Dishes.findByIdAndRemove(req.params.dishId).then((result) => {
            res.statusCode = 200;
            console.log(req)
            res.setHeader("Content-Type", "application/json");
            res.json(result);
        }, (err) => next(err)).catch((err) => next(err));
      

    });

dishRouter.route('/:dishId/comments')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, (req, res, next) => {
        Dishes.findById(req.params.dishId).populate('comments.author').then((dish) => {
            if (dish != null) {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(dish.comments);
            } else {
                err = new Error('Dish ' + req.params.dishId + ' not found');
                err.status = 404;
                return next(err);
            }
        }, (err) => next(err)).catch((err) => next(err));
    })

    .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Dishes.findById(req.params.dishId).then((dish) => {
            if (dish != null) {
                req.body.author = req.user._id;
                dish.comments.push(req.body);
                dish.save().then((dish) => {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json(dish);
                }, (err) => next(err)).catch((err) => next(err));
            } else {
                err = new Error('Dish ' + req.params.dishId + ' not found');
                err.status = 404;
                return next(err);
            }
        }, (err) => next(err)).catch((err) => next(err));
    })

    .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation is not supported on /dishes/' + req.params.dishId + '/comments');
    })

    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Dishes.findById(req.params.dishId).then((dish) => {
            if (dish != null) {
                console.log(dish);
                for (var i = (dish.comments.length - 1); i >= 0; i--) {
                    dish.comments.id(dish.comments[i]._id).remove();
                }
                dish.save().then((dish) => {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json(dish);
                }, (err) => next(err)).catch((err) => next(err));
            } else {
                err = new Error('Dish ' + req.params.dishId + ' not found');
                err.status = 404;
                return next(err);
            }
        }, (err) => next(err)).catch((err) => next(err));
    })

dishRouter.route('/:dishId/comments/:commentId')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, (req, res, next) => {
        Dishes.findById(req.params.dishId).populate('comments.author').then((dish) => {
            if (dish != null && dish.comments.id(req.params.commentId)) {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(dish.comments.id(req.params.commentId));
            } else if (dish == null) {
                err = new Error('Dish ' + req.params.dishId + ' not found');
                err.status = 404;
                return next(err);
            } else {
                err = new Error('Comment ' + req.params.commentId + ' not found');
                err.status = 404;
                return next(err);
            }
        }, (err) => next(err)).catch((err) => next(err));
    })

    .post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation is not supported on /dishes/' + req.params.dishId + '/comments/' + req.params.commentId);
    })

    .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Dishes.findById(req.params.dishId).then((dish) => {
            if (dish != null && dish.comments.id(req.params.commentId)) {
                if (dish.comments.id(req.params.commentId).author.toString() != req.user._id.toString()) {
                    err = new Error('You are not authorized to edit this comment');
                    err.status = 403;
                    return next(err);
                }
                if (req.body.rating) {
                    dish.comments.id(req.params.commentId).rating = req.body.rating;
                }

                if (req.body.comment) {
                    dish.comments.id(req.params.commentId).comment = req.body.comment;
                }
                dish.save().then((dish) => {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json(dish);
                }, (err) => next(err)).catch((err) => next(err));
            } else if (dish == null) {
                err = new Error('Dish ' + req.params.dishId + ' not found');
                err.status = 404;
                return next(err);
            } else {
                err = new Error('Comment ' + req.params.commentId + ' not found');
                err.status = 404;
                return next(err);
            }
        }, (err) => next(err)).catch((err) => next(err));
    })

    .delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        Dishes.findById(req.params.dishId).then((dish) => {
            if (dish != null && dish.comments.id(req.params.commentId)) {
                if (dish.comments.id(req.params.commentId).author.toString() != req.user._id.toString()) {
                    err = new Error('You are not authorized to edit this comment');
                    err.status = 403;
                    return next(err);
                }
                dish.comments.id(req.params.commentId).remove();
                dish.save().then((dish) => {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json(dish);
                }, (err) => next(err)).catch((err) => next(err));
            } else if (dish == null) {
                err = new Error('Dish ' + req.params.dishId + ' not found');
                err.status = 404;
                return next(err);
            } else {
                err = new Error('Comment ' + req.params.commentId + ' not found');
                err.status = 404;
                return next(err);
            }
        }, (err) => next(err)).catch((err) => next(err));
    });

module.exports = dishRouter;