const jwt = require("jsonwebtoken");


exports.verifyToken = function(req, res, next) {
    //TODO: REMOVE FOR PRODUCTION
    /* if (process.env.NODE_ENV !== 'production') {
        console.log("SKIPPED JWT, DEV MODE ON");
        return next();
    } */

    const authBearer = req.headers.authorization;

    if (authBearer) {
        const authToken = authBearer.split(' ')[1];

        jwt.verify(authToken, process.env.JWT_SECRET, (err, player) => {
            if (err)
              return res.status(403).send("Unauthorized access");
            req.player = player;
            next();
        });
    } else {
        //TODO: handle too many tries
        res.status(401).send("Missing token.");
    }
}


