function permit(...allowed) {
    function isAllowed(userRoles) {
        return userRoles
            .map(role => allowed.indexOf(role) > -1)
            .reduce((acc, curr) => acc || curr, false);
    }

    function validate(req, res, next) {
        if (req.user && isAllowed(req.user.roles))
            next(); // role is allowed, so continue on the next middleware
        else {
            res.status(403).json({message: "Forbidden"}); // 403 - user is not authorized
        }
    }

    return validate;
}

module.exports = permit;