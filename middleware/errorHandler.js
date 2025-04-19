module.exports = (err, req, res, next) => {
    console.error(err);
    if (err.array) {
        // express-validator errors
        return res.status(400).json({ errors: err.array() });
    }
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};
