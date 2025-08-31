const app = require('./api/index')
const cors = require("cors");


// app.use(cors({
//     origin: ['http://localhost:5173', 'http://localhost:3000','https://minatoadminadminpage.vercel.app'], // allowed origins
//     methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization']
// }));

// ✅ Preflight handling
// app.options('*', cors());


module.exports = app