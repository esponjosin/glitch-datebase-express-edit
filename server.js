const express = require('express');
const path = require('path');
// Initiliazations
const app = express();

// Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'))
app.set('json spaces', 2);
// Global Variables

// Routes
app.use(require('./routes/db'))
app.use(require('./routes/endpoints'))
app.use(require('./routes/index'))

// Static Files
app.use(express.static(path.join(__dirname, 'public')))

// Server is listenning
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'))
});