const { constants } = require('../constants');

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;

    switch (statusCode) {
        case constants.ValidationError:
            res.status(constants.ValidationError).json({ title: "Validation Failed", message: err.message, stackTrace: err.stack });
            break;

        case constants.UNAUTHORIZED:
            res.status(constants.UNAUTHORIZED).json({ title: "Unauthorized", message: err.message, stackTrace: err.stack });
            break;

        case constants.FORBIDDEN:
            res.status(constants.FORBIDDEN).json({ title: "Forbidden", message: err.message, stackTrace: err.stack });
            break;

        case constants.NOT_FOUND:
            res.status(constants.NOT_FOUND).json({ title: "Not Found", message: err.message, stackTrace: err.stack });
            break;

        default:
            console.log("no errors");
            res.status(500).json({ title: "Internal Server Error", message: "An unexpected error occurred" });
            break;
    }
};

module.exports = errorHandler;
