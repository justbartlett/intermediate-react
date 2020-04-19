import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { ServerLocation} from '@reach/router';
import fs from 'fs';
import App from '../src/App';

const PORT = process.env.PORT || 3000;

// read the output html so we can use it with our serverside rendering
const html = fs.readFileSync('dist/index.html').toString();

// now we have an array of two parts
const parts = html.split('not rendered');

// start a new express app
const app = express();

// statically serve everything in the dist directory
app.use('/dist', express.static('dist'));

// middleware to run everytime it gets a request
app.use((req, res) => {
  // the core idea is render it on the server and sent it to the client as complete markup  
  const reactMarkup = (
    // this is from reach router to do the server side rendering
    <ServerLocation url={req.url}>
      <App />
    </ServerLocation>
  )
  // first html part, the react code, second html part
  res.send(parts[0] + renderToString(reactMarkup) + parts[1]);
  res.end();
});

console.log('listening on ' + PORT);
app.listen(PORT);