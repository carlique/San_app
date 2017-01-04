import React from 'react';
import path from 'path';
import fs from 'fs';

const isProduction = process.env.NODE_ENV === 'production';
const buildDir = isProduction ? fs.readdirSync(path.resolve(__dirname, '../../build')) : '';
const appJS = isProduction ? buildDir.find(file => /^app\-\w+\.js$/.test(file)) : '';
const appCSS = isProduction ? buildDir.find(file => /^app\-\w+\.css$/.test(file)) : '';
const scripts = isProduction ? `/build/${appJS}` : '//localhost:8080/build/app.js';

export default () =>
  <html lang="cs-CZ">
    <head>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <base href="/" />
      <title>SAN App</title>
      <meta name="description" content="" />
      <meta name="viewport" content="width=device-width" />
      {isProduction && <link href={`/build/${appCSS}`} rel="stylesheet" />}
    </head>
    <body>
      <div id="app-container" />
      <script src={scripts} type="text/javascript" />
    </body>
  </html>;
