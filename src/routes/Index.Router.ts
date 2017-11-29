// Cargamos el modulo para poder utilizar el enrutador de express
import { Router } from 'express'
import { JwtService } from '../services/jwt';
import { NewsRouter } from './News.Router'
import { RequestAuth } from 'config/interfaces.type';
import { getRanking } from '../services/getMadridData';

import { CtrUser } from '../controllers/Users.Ctrl'
import { AnalyticsController } from '../controllers/analytics.Ctrl';
import { MatchController } from '../controllers/Match.Ctrl';

export class routing_jaguer {
	
	public router = Router();
	public jwt = new JwtService ()
	public userController = new CtrUser ()
	public matchController = new MatchController()
	public analytics = new AnalyticsController()

	constructor () {
		// this.router.get('/', this.jwt.ensureAuth, (req, res) => this.UserController.test(req, res));
		this.router.post('/login', (req, res) => this.userController.loginUser(req, res));
		this.router.post('/user', (req, res) => this.userController.createUser(req, res));
		this.router.get('/user/all', (req, res) => this.userController.getAllUsers(req, res));
		this.router.get('/user/allAdmin', 
			this.jwt.ensureAuth,
			(req, res) => this.userController.getAllUsersAdmin(req as RequestAuth, res)
		);
		this.router.get('/user/:userId', (req, res) => this.userController.getUserById(req, res));
		this.router.get('/data/ranking', (req, res) => this.analytics.getRanking(req, res));
		this.router.get('/data/calendar', (req, res) => this.analytics.getCalendar(req, res));

		this.router.get('/match/admin',
			this.jwt.ensureAuth,
			(req, res) => this.matchController.getAllMatchAdmin(req as RequestAuth, res)
		);
		this.router.post('/match/new',
			this.jwt.ensureAuth,
			(req, res) => this.matchController.createNewMatch(req as RequestAuth, res)
		);
		this.router.put('/match/status',
			this.jwt.ensureAuth,
			(req, res) => this.matchController.statusMatch(req as RequestAuth, res)
		);
	// Subroutes :)
		this.router.use('/news', new NewsRouter().enrouting)
	
	}
	
	get enrouting () { return this.router }
	
}


