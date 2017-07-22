let ajaxErrorHandler = function (err, req, res, next) {
    res.status(400).json({'error': err.message});
};


module.exports = {
    ajaxErrorHandler: ajaxErrorHandler
}
