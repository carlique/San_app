import React from 'react';
import ReactDOMServer from 'react-dom/server';
import express from 'express';
import stormpath from 'express-stormpath';
import compression from 'compression';
import Html from './html';

const app = express();
const port = process.env.PORT || 8000;

app.use(compression());
app.use('/build', express.static('build'));

app.use(stormpath.init(app, {
  website: true
}));

app.get('*', (req, res) => {
  res.send(`<!DOCTYPE html>${ReactDOMServer.renderToStaticMarkup(<Html />)}`);
});

app.on('stormpath.ready', function() {
  app.listen(port);
  console.log(`Server started on port ${port}`); // eslint-disable-line
});
