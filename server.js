const express = require('express');

const app = express();

app.set('port', (process.env.PORT || 3001));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});


// Routes

const interestCalcRoutes = require('./apis/interest-calc/routes');
app.use('/api/interest-calc', interestCalcRoutes);


// Middleware

const ajaxErrorHandler = require('./apis/middleware/errorHandling').ajaxErrorHandler;
app.use(ajaxErrorHandler);


module.exports = app;
