import expressLoader from './express';
import mongooseLoader from './mongoose';
import jobsLoader from './jobs';
import Logger from './logger';
import injector from './injector'

export default async ({ expressApp }) => {

    const mongoConnection = await mongooseLoader()

    const clientModel = {
      name: 'clientModel',
      model: require('../models/client').default,
    };
    const siteModel ={
      name:'siteModel',
      model: require('../models/site').default,
    }
    const workerModel = {
      name: 'workerModel',
      model: require('../models/worker').default,
    };
    const locationModel ={
      name:'locationModel',
      model: require('../models/location').default,
    }
    const reportModel ={
      name:'reportModel',
      model: require('../models/report').default,
    }
  
  const { agenda } = await injector({
    mongoConnection,
    models: [
      clientModel,
      siteModel,
      workerModel,
      locationModel,
      reportModel,
    ]
  });

  await jobsLoader({ agenda });
  Logger.info('✌️ Jobs loaded');

    await expressLoader({ app: expressApp });
    Logger.info('Express ready to go!!');
  };