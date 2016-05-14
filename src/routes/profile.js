'use strict';

module.exports = (service) => {
    var express = require('express');
    var router = express.Router();

    router.post('/', function(req, res, next) {
        service.setUsername(req.user.id, req.body.name)
            .then(() => res.redirect('/'))
            .catch(next);
    });

    return router;
};