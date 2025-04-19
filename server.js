require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const errorHandler = require('./middleware/errorHandler');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
}

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 404 handler
app.use((req, res) => res.status(404).json({ message: 'Not Found' }));

// Error handler
app.use(errorHandler);

// at the very bottom of src/app.js
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () =>
        console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
}

module.exports = app;

