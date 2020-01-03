const addUser = require('../../models/userTable');
const jwt = require('jsonwebtoken');
const express = require('express');
const TOKEN_SECRET = "D0dKsugPi5r}Viv";
const BodyParser = require("body-parser");
const Mongoose = require("mongoose");
const Bcrypt = require("bcryptjs");

function generateJWT(_id) {
    const token = jwt.sign({userId: _id}, TOKEN_SECRET);
    return token;
}

exports.userLogIn = function (req, res) {
    if (!req.body.userName || !req.body.password) {

        return res.status(500).send("object missing");
    }
    else {
        const userlog = req.body;
        addUser.userTable.find({'userName': userlog.userName}, (err, docs) => {
            console.log(docs);

            if (err) {

                return res.status(500).send("Error getting user");
            }


            //if user found.
            if (docs.length < 1 || docs == undefined || docs.length > 1) {
                res.status(401).send("invalid log in");//empty
            } else {
                if (Bcrypt.compareSync(userlog.password, docs[0].password)/*docs[0].password === userlog.password*/) {
                    const token = generateJWT(docs[0]._id);
                    let result = {
                        status: " log in success",
                        data: {
                            userName: userlog.userName,
                            token: token
                        }
                    };
                    res.status(200).send(result);

                } else {
                    res.status(401).send("invalid log in");//empty
                }


            }



        });
    }

};
