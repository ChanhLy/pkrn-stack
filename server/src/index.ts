import * as dotenv from 'dotenv';
dotenv.config();

import debug from 'debug';
import app from './app';

const PORT = process.env.PORT || '3000';

const log = debug('Application');

const server = app.listen(PORT, () => {
  log('Listening on port ' + PORT);
});

app.on('SIGTERM', () => {
  server.close((err) => log(err));
});

export default server;
