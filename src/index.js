const express = require('express');
const cors = require('cors');
const app = express();

// Settings
app.set('port', process.env.PORT || 3005);

// Middlewares
app.use(cors())
app.use(express.json({type: "*/*"}));

// Routes
app.use(require('./routes/rol_routes'));
app.use(require('./routes/user_client_routes'));
app.use(require('./routes/user_worker_routes'));
app.use(require('./routes/genero_routes'));
app.use(require('./routes/horario_routes'));

// Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});