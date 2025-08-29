const app = require('./api/index')
const cors = require("cors");

// app.options("*", cors({ origin: 'http://localhost:8000', optionsSuccessStatus: 200 }));

// app.use(cors({ origin: "http://localhost:8000", optionsSuccessStatus: 200 }))
app.use(cors())
// // connecting the server and frontend
app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Content-Allow-Orgin', 'https://www.minatofoundation.org/', 'http://localhost:5173/')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH,DELTE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    response.head("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next()
})


module.exports = app