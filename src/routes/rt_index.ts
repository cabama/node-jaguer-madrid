// Cargamos el modulo para poder utilizar el enrutador de express
import {Router} from 'express'
import {} from 'services/jwt'
import { JwtService } from '../services/jwt';
import { CtrUser } from '../controllers/Users'
import * as enrouting from 'routes/rt_index';


export class routing_jaguer {
	
	public router = Router();
	public jwt = new JwtService ()
	public UserController = new CtrUser ()

	constructor () {
		this.router.get ('/', this.jwt.ensureAuth, this.UserController.test);
		this.router.post('/user', this.UserController.createUser);
		this.router.get ('/user/:id', this.UserController.getUser);
		this.router.put ('/user/:id', this.UserController.createUser);
		this.router.post('/login', this.UserController.loginUser);
		this.router.get('/test', this.UserController.test);
	}
	
	get enrouting () { return this.router }
	
}


