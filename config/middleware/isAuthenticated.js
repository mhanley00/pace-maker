module.exports = function (req, res, next) {
    if (req.user) {
        return next();
    }
    //aadd lert
    return res.redirect("/");
};
