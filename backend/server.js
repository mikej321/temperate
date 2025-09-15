const path = require('path');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authenticateMiddleware = require("./middleware/auth");
const searchRoute = require('./routes/searchRoute');

dotenv.config();
const app = express();

const allowedOrigins = [
    process.env.FRONTEND_ORIGIN,
    'http://localhost:5173'
];

app.use(cors({
    origin(origin, cb) {
        if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
        return cb(new Error('CORS origin error'));
    },
    credentials: true,
}))

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true
    })
);

app.get('/health', (req, res) => res.status(200).send('ok'));

app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.use('/search', searchRoute);

app.get("/*splat", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
})




app.listen(process.env.PORT || 4000, '0.0.0.0', () => {
    console.log(`Listening to port ${process.env.PORT || 4000}`);
})