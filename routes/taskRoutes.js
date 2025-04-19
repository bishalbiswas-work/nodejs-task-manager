const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
    createTask, getTasks, getTask, updateTask, deleteTask
} = require('../controllers/taskController');
const { validate,
    taskCreateRules,
    taskUpdateRules,
    taskQueryRules
} = require('../middleware/validators');



router.use(auth);

router
    .route('/')
    .post(validate(taskCreateRules), createTask)
    .get(validate(taskQueryRules), getTasks);

router
    .route('/:id')
    .get(getTask)
    .put(validate(taskUpdateRules), updateTask)
    .delete(deleteTask);

module.exports = router;
