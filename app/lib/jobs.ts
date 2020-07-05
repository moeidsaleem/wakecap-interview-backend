import config from '../config';
import addLocationJob from '../jobs/addLocation';
import Agenda from 'agenda';
import generateReportJob from '../jobs/generateReport';
import { Container } from 'winston';


export const AddLocationJob = async({ agenda }: { agenda: Agenda })=>{
  // const agenda = new Agenda();
  agenda.define('send-location',
  { name: 'send location', priority: 'default', concurrency: 10},
  new addLocationJob().handler
  )
  // agenda.processEvery('3 minutes');
  await agenda.start();

}

export const GenerateReportJob = async({ agenda }: { agenda: Agenda })=>{
  agenda.define('send-location',
  { name: 'generate report', priority: 'default', concurrency: 10},
  new generateReportJob().handler
  )
  // agenda.on('ready', function () {
  //   agenda.schedule('everyday at 00:00','first')
  // });
  // agenda.processEvery('1.5 minutes');

  await agenda.start();

  

}
// export default  async({ agenda }: { agenda: Agenda }) => {
//  const b = await sendLocation(agenda);
//   const a = await generateReport(agenda);


// };

