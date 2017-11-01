// Cargamos el modulo para poder utilizar el enrutador de express
import {Router} from 'express'
import {} from 'services/jwt'

var router = Router();

export const routing_jaguer = () => {
	var UserController = require('../controllers/users');
	var jwt    = require('../services/jwt');
	
	// Index, pagina por defecto.
	router.get ("/", UserController.pruebas);
	router.post("/user", UserController.newUser);
	router.get ("/user/:id", UserController.getUser);
	router.put ("/user/:id", UserController.newUser);
	router.post("/login", UserController.loginUser);
	
	// Respuesta al POST formulario de login.
	router.get("/inicio", jwt.ensureAuth ,function (req: any, res: any){
			console.log('Se encuentra en el ingreso de la pagina.');
			console.log(req.user);
			res.status(200).send({message: 'Se encuentra en el ingreso de la pagina'})
	});
}

function test (req, res){
	console.log('Se encuentra en una prueba.');
	res.status(200).send({message: 'It is a microservice test.'})
}