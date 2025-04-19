const { body, param, query, validationResult } = require('express-validator');

exports.validate = (rules) => [
    rules,
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return next(errors);
        next();
    }
];

exports.registerRules = [
    body('email').isEmail(),
    body('password').isLength({ min: 6 })
];

exports.loginRules = [
    body('email').isEmail(),
    body('password').exists()
];

exports.taskCreateRules = [
    body('title').notEmpty(),
    body('dueDate').isISO8601(),
    body('status').optional().isIn(['pending', 'in-progress', 'completed'])
];

exports.taskUpdateRules = [
    param('id').isInt(),
    body('title').optional().notEmpty(),
    body('dueDate').optional().isISO8601(),
    body('status').optional().isIn(['pending', 'in-progress', 'completed'])
];

exports.taskQueryRules = [
    query('status').optional().isIn(['pending', 'in-progress', 'completed']),
    query('page').optional().isInt({ min: 1 }),
    query('limit').optional().isInt({ min: 1, max: 100 })
];
