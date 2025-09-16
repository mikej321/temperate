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
    'http://localhost:5173',
    'http://127.0.0.1:5173'
].filter(Boolean);

app.use(cors({
  origin(origin, cb) {
    console.log('CORS check for:', origin); // TEMP: confirm what the browser sends
    if (!origin) return cb(null, true);     // server-to-server, curl, etc.
    if (allowedOrigins.includes(origin)) return cb(null, true);

    // If you want to be flexible about localhost hostnames/ports:
    try {
      const { hostname, port, protocol } = new URL(origin);
      if ((hostname === 'localhost' || hostname === '127.0.0.1') && port === '5173' && (protocol === 'http:' || protocol === 'https:')) {
        return cb(null, true);
      }
    } catch (_) {}

    cb(new Error('CORS origin error'));
  },
  methods: ['GET','POST','OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true
    })
);

// app.options('/(.*)', cors());

app.get('/healthz', (req, res) => res.status(200).send('ok'));

// app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.use('/search', searchRoute);

// app.get("/*splat", (req, res) => {
//     res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
// })




app.listen(process.env.PORT || 4000, '0.0.0.0', () => {
    console.log(`Listening to port ${process.env.PORT || 4000}`);
})