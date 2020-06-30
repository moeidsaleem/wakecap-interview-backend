import 'reflect-metadata';
import config from './config/index';
import express from 'express';
import Logger from './lib/logger';

async function startServer() {
  const app = express();
  await require('./lib').default({ expressApp: app });
  app.listen(config.port, (err: any) => {
    if (err) {
      Logger.error(err);
      process.exit(1);
      return;
    }
    Logger.info(`
     -------------------------------------------------
         Server listening on port: ${config.port}
    xxxxxxxxxxxxxxxx Moeid Saleem Khan xxxxxxxxxxxxxxx
    xxxxxxxxxxxx---- www.moeidsaleem.com ------xxxxxxx
    --------------------------------------------------
    `);
  });
}

startServer();