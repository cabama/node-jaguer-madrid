// Cargamos el modulo para poder utilizar el enrutador de express
import { Router } from 'express'
import { JwtService } from '../services/jwt';
import { CtrUser } from '../controllers/Users.Ctrl'
import { NewsRouter } from './News.Router'

import {getRanking} from '../services/getMadridData'
import { AnalyticsController } from '../controllers/analytics.Ctrl';

export class routing_jaguer {
	
	public router = Router();
	public jwt = new JwtService ()
	public userController = new CtrUser ()
	public analytics = new AnalyticsController()

	constructor () {
		// this.router.get('/', this.jwt.ensureAuth, (req, res) => this.UserController.test(req, res));
		this.router.post('/user', (req, res) => this.userController.createUser(req, res));
		this.router.post('/login', (req, res) => this.userController.loginUser(req, res));
		this.router.get('/data/ranking', (req, res) => this.analytics.ranking(req, res));
		// Subroutes :)
		this.router.use('/news', new NewsRouter().enrouting)
	}
	
	get enrouting () { return this.router }
	
}

