import expressLoader from './express';
import mongooseLoader from './mongoose';
import Logger from './logger';
import injector from './injector'

export default async ({ expressApp }) => {

    const mongoConnection = await mongooseLoader()

    const clientModel = {
      name: 'clientModel',
      model: require('../models/user').default,
    };
    const siteModel ={
      name:'siteModel',
      model: require('../models/shop').default,
    }
    const workerModel = {
      name: 'workerModel',
      model: require('../models/user').default,
    };
    const locationModel ={
      name:'locationModel',
      model: require('../models/shop').default,
    }
    const reportModel ={
      name:'reportModel',
      model: require('../models/shop').default,
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

    await expressLoader({ app: expressApp });
    Logger.info('Express ready to go!!');
  };