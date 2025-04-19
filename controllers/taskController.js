const Task = require('../models/Task');

exports.createTask = async (req, res, next) => {
    try {
        const { title, description, status, dueDate } = req.body;
        const taskId = await Task.create({
            title,
            description: description || null,
            status: status || 'pending',
            dueDate,
            userId: req.user.id
        });
        res.status(201).json({ id: taskId, title, description, status, dueDate });
    } catch (err) {
        next(err);
    }
};

exports.getTasks = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const offset = (page - 1) * limit;
        const tasks = await Task.findAllByUser({
            userId: req.user.id,
            status: req.query.status,
            limit,
            offset
        });
        res.json({ page, limit, tasks });
    } catch (err) {
        next(err);
    }
};

exports.getTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id, req.user.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json(task);
    } catch (err) {
        next(err);
    }
};

exports.updateTask = async (req, res, next) => {
    try {
        const { title, description, status, dueDate } = req.body;

        // Add a check to ensure at least one value is present or required fields are there
        if (!title && !description && !status && !dueDate) {
            return res.status(400).json({ message: 'No valid fields provided to update' });
        }

        const updated = await Task.update(
            req.params.id,
            req.user.id,
            { title, description, status, dueDate }
        );

        if (!updated) return res.status(404).json({ message: 'Task not found' });
        res.json({ message: 'Task updated' });
    } catch (err) {
        next(err);
    }
};


exports.deleteTask = async (req, res, next) => {
    try {
        const deleted = await Task.delete(req.params.id, req.user.id);
        if (!deleted) return res.status(404).json({ message: 'Task not found' });
        res.status(204).send();
    } catch (err) {
        next(err);
    }
};
