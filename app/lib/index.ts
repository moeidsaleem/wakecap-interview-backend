import expressLoader from './express';
import mongooseLoader from './mongoose';
import Logger from './logger';
import injector from './injector'

export default async ({ expressApp }) => {

    const mongoConnection = await mongooseLoader()
  
  const { agenda } = await injector({
    mongoConnection,
    models: []
  });

    await expressLoader({ app: expressApp });
    Logger.info('Express ready to go!!');
  };