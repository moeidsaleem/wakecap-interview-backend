import config from '../config';
import addLocationJob from '../jobs/addLocation';
import Agenda from 'agenda';

export default ({ agenda }: { agenda: Agenda }) => {
  agenda.define(
    'send-location',
    { priority: 'high', concurrency: config.agenda.concurrency },
    new addLocationJob().handler,
  );

  agenda.start();
};