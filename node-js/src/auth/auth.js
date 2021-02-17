const jwt = require('jsonwebtoken');
const jwksRsa = require('jwks-rsa');

const jwksClient = jwksRsa({
    jwksUri: 'https://login.microsoftonline.com/3aa4a235-b6e2-48d5-9195-7fcf05b459b0/discovery/v2.0/keys'
});

function getKey(header, callback){
    jwksClient.getSigningKey(header.kid, function(err, key) {
        const signingKey = key.publicKey || key.rsaPublicKey;
        callback(null, signingKey);
    });
}

function validScope(decodedToken) {
    const scope = "Inventory.books.ReadWrite";
    return decodedToken && "scp" in decodedToken && decodedToken.scp.includes(scope);
}

const validateOptions = {
    "audience" : "api://c1d85bd3-e00e-492b-9b5b-e8cd81c5a742",
    "issuer": "https://sts.windows.net/3aa4a235-b6e2-48d5-9195-7fcf05b459b0/",
    "maxAge": "1h"
};

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (! authHeader) {
        res.status(401).send("Missing access token");
    }
    else{
        const token = authHeader.split(' ')[1];

        jwt.verify(token, getKey, validateOptions, function(err, decoded) {
            if (err || ! validScope(decoded)) {
                return res.status(403).send("Invalid access token");
            }
            //req.user = decoded;
            next();
        });

    }
};

module.exports = {
    verifyToken
};