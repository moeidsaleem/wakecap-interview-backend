import { Router } from 'express';
import client from './routes/client';
import site from './routes/site';
import worker from './routes/worker';
import report from './routes/report';
import location from './routes/location';
import agendash from './routes/agendash';


// guaranteed to get dependencies
export default () => {
	const app = Router();
	client(app);
	site(app);
	worker(app);
	report(app);
	location(app);
	agendash(app)

	return app
}