var express = require('express');
var router = express.Router();
var sql = require("../dboperations");

router.get('/0', function (req, res, next) {
    console.log("rendered");
    res.render('queries0', { title: 'Queries' });
});

router.get('/1', function (req, res, next) {});

router.get('/2', function (req, res, next) {});

router.get('/3', function (req, res, next) {});

router.get('/4', function (req, res, next) {});

router.get('/5', function (req, res, next) {});

router.get('/6', function (req, res, next) {});

router.get('/7', function (req, res, next) {});

router.get('/8', function (req, res, next) {});

router.get('/9', function (req, res, next) {});

router.get('/10', function (req, res, next) {});

router.get('/11', function (req, res, next) {});

router.get('/12', function (req, res, next) {});

router.get('/13', function (req, res, next) {});

router.post('/0', function (req, res, next) {});

router.post('/1', function (req, res, next) {});

router.post('/2', function (req, res, next) {});

router.post('/3', function (req, res, next) {});

router.post('/4', function (req, res, next) {});

router.post('/5', function (req, res, next) {});

router.post('/6', function (req, res, next) {});

router.post('/7', function (req, res, next) {});

router.post('/8', function (req, res, next) {});

router.post('/9', function (req, res, next) {});

router.post('/10', function (req, res, next) {});

router.post('/11', function (req, res, next) {});

router.post('/12', function (req, res, next) {});

router.post('/13', function (req, res, next) {});


module.exports = router;