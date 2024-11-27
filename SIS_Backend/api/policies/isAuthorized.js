module.exports = function (req, res, next) {
  var token, tokenClone;
  if (req.headers && req.headers.authorization) {
    var parts = req.headers.authorization.split(" ");
    if (parts.length == 2) {
      var scheme = parts[0],
        credentials = parts[1];

      if (/^Bearer$/i.test(scheme)) {
        token = credentials;
        tokenClone = token;
      }
    } else {
      return res.status(401).json({
        message: "Format is Authorization: Bearer [token]",
      });
    }
  } else if (req.param("token")) {
    token = req.param("token");
    tokenClone = token;
    // We delete the token from param to not mess with blueprints
    delete req.query.token;
  } else if (
    req.socket &&
    req.socket.handshake &&
    req.socket.handshake.query &&
    req.socket.handshake.query.token
  ) {
    token = req.socket.handshake.query.token;
    tokenClone = token;
  } else {
    return res.status(401).json({
      message: "No Authorization header was found",
    });
  }

  jwToken.verify(token, function (err, token) {
    if (err) {
      if (err.name == "TokenExpiredError") {
        return res.expired();
      } else return res.unauthorized();
    } else {
      req.token = token; // This is the decrypted token or the payload you provided

      User.findOne({
        id: token.id,
      }).exec(function (err, result) {
        if (err) {
          return res.status(401).json({
            message: "db error",
          });
        }
        if (!result)
          return res.status(401).json({
            message: "Token Missmatch",
          });

        req.userId = token.id;
        req.userRole = result.role;
        next();
      });
    }
  });
};
