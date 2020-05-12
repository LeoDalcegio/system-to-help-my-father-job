const express = require('express');
const routes = require('./routes')

const PORT = 3333 || process.env.PORT;

const app = express();

app.use(routes);

app.listen(PORT, () => console.log('App is listening on port ' + PORT))