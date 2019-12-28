const addUser = require('../../models/userTable');
const jwt = require('jsonwebtoken');
const TOKEN_SECRET = "D0dKsugPi5r}Viv";

function generateJWT(_id) {
    const token = jwt.sign({userId: _id}, TOKEN_SECRET);
    return token;
}

exports.userLogIn = function (req, res) {
    const userlog = req.body;
    addUser.userTable.find({'userName': userlog.userName}, (err, docs) => {
        console.log(docs);

        if (err) {

            return res.status(500).send("Error getting user");
        }

        //if user found.
        if (docs.length < 1 || docs == undefined||docs.length >1) {
            res.status(401).send("invalid log in");//empty
        } else {
            if (docs[0].password === userlog.password) {
                const token = generateJWT(docs[0]._id);
                let result = {
                    status: "success",
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

        // return results;//console.log('logged in user' + userlog.userName);


    });


};
