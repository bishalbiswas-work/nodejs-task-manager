const migrate = require('../config/migrate');

module.exports = async () => {
    // rebuild schema before all tests
    process.env.NODE_ENV = 'test';
    await migrate();
};
