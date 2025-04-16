const { auth } = require('express-oauth2-jwt-bearer');

const jwtCheck = auth({
    audience: process.env.AUTH0_AUDIENCE,
    issuerBaseURL: process.env.AUTH0_BASEURL,
    tokenSigningAlg: process.env.AUTH0_ALGO
});

module.exports = { jwtCheck };
