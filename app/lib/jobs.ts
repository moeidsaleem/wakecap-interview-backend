import config from '../config';
import addLocationJob from '../jobs/addLocation';
import Agenda from 'agenda';

export default  ({ agenda }: { agenda: Agenda }) => {
  agenda.define('send-location',
    new addLocationJob().handler,
  )
  agenda.start();
  (async function() { // IIFE to give access to async/await
  // await agenda.every('1 seconds', 'send-location');
  })();
};