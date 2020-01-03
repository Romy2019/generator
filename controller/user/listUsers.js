const express = require('express');
const userModel = require('../../models/userTable');
const BodyParser = require("body-parser");
const Mongoose = require("mongoose");

exports.userListAll = function (req, res) {
    userModel.userTable.find({}, (err, docs) => {

        if (err) {

            return res.status(500).send("Error getting user");
        }

        //if user found.
        if (docs.length < 1 || docs == undefined) {
            res.send("no users found");//empty
        } else {
            res.status(200).send(docs);
        }

    }).lean();


};
