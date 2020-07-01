import config from '../config';
import addLocationJob from '../jobs/addLocation';
import Agenda from 'agenda';

export default  ({ agenda }: { agenda: Agenda }) => {
  (async function() { // IIFE to give access to async/await
  agenda.define('send-location',new addLocationJob().handler)
   agenda.start()
   agenda.every('1 seconds', 'send-location');
  })();
};