const CognitoExpress = require("cognito-express");

const cognitoExpress = new CognitoExpress({
  region: process.env.AWS_REGION,
  cognitoUserPoolId: process.env.COGNITO_USER_POOL_ID,
  tokenUse: "id",
  tokenExpiration: 3600000,
});

module.exports = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) return res.status(401).json({ error: "No token provided" });
  token = token.replace("Bearer ", "");
  cognitoExpress.validate(token, (err, response) => {
    if (err) return res.status(401).json({ error: err });
    req.user = response;
    next();
  });
};
