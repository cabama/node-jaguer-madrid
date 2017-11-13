// Cargamos el modulo para poder utilizar el enrutador de express
import { Router } from 'express'
import { } from 'services/jwt'
import { JwtService } from '../services/jwt';
import { NewsController } from '../controllers/News.Ctrl'
import { RequestAuth } from '../config/interfaces.type'


export class NewsRouter {
	public router = Router();
	public jwt = new JwtService()
	public newsController = new NewsController()

	constructor()  {
		this.router.get('/', (req, res) => this.newsController.getAllNews(req, res));
		this.router.get('/:newsId', (req, res) => this.newsController.getANews(req, res));
		this.router.post('/', 
			this.jwt.ensureAuth,
			(req, res) => this.newsController.createNew(req as RequestAuth, res)
		);
	}

	get enrouting (): Router { return this.router }

}

