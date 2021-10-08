const jwt = require("jsonwebtoken");


exports.verifyToken = function(req, res, next) {
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
        res.status(401).send("Missing token.");
    }
}