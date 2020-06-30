import { Router } from 'express'
import basicAuth from 'express-basic-auth';
import agendash from 'agendash'
import { Container } from 'typedi'
import config from '../../config'

export default (app: Router) => {

  const agendaInstance = Container.get('agendaInstance')

  app.use('/dash', 
    basicAuth({
	  users: {
	    "agendash": "123456",
	  },
	  challenge: true,
	}),
	agendash(agendaInstance)
  )
}

