// const swaggerJsdoc = require('swagger-jsdoc');
// const swaggerDefinition = {
//     openapi: '3.0.0',
//     info: {
//         title: 'Task Manager API',
//         version: '1.0.0',
//         description: 'CRUD tasks with JWT auth',
//     },
//     components: {
//         securitySchemes: {
//             bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }
//         }
//     },
//     security: [{ bearerAuth: [] }],
//     servers: [{ url: 'http://localhost:' + process.env.PORT }]
// };
// const options = {
//     swaggerDefinition,
//     apis: ['./routes/*.js', './controllers/*.js'],
// };
// module.exports = swaggerJsdoc(options);

// /docs/swagger.js
const fs = require('fs');
const path = require('path');

const swaggerSpec = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'swagger.json'), 'utf-8')
);

module.exports = swaggerSpec;