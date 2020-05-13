const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const { errors } = require('celebrate');

require('dotenv').config();

const PORT = 3333 || process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', routes);
app.use(errors());

app.listen(PORT, () => console.log('App is listening on port ' + PORT));
