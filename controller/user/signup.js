const express = require('express');
const addUser = require('../../models/userTable');
const BodyParser = require("body-parser");
const Mongoose = require("mongoose");
const Bcrypt = require("bcryptjs");


exports.userSignUp = function(req, res) {
    if (!req.body.userName || !req.body.password || !req.body.userType) {

        return res.status(500).send("object missing");
    }
    else {
        req.body.password = Bcrypt.hashSync(req.body.password, 10);

        const userAdd = new addUser.userTable(req.body);

        userAdd.save(function (err, success) {
            if (err) {
                res.send("error" + err)
            } else {

                res.send('user created')

            }
        });

    }
};
