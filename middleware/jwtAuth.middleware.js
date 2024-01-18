const jwt = require('jsonwebtoken');
const secretKey = 'fullsecret'; // Replace with your actual secret key

const verify = () => {
  return (req, res, next) => {
    // Extract the token from the request headers or wherever it is stored
    const token = req.headers.authorization.split(' ')[1];
    console.log(token)

    if (!token) {
      return res.status(401).json({ status: 'invalid token' });
    }

    jwt.verify(token, secretKey, (err) => {
      if (err) {
        return res.status(401).json({ status: 'invalid token' });
      }

      // Attach the decoded user information to the request for further use

      next(); // Move to the next middleware or route handler
    });
  };
};

module.exports = { verify };
