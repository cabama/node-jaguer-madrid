import { MdUser } from 'models/MD_Users'
import {JwtService as jwt}  from 'services/jwt'
import * as bcrypt from 'bcrypt-nodejs'


class CtrUser {

	constructor (){}

	createUser (req, res) {

		let user = new MdUser()
		var params   = req.body;

		user.username = params.username;
		user.name     = params.name;
		user.surname  = params.surname;
		user.email    = params.email.toLowerCase();
		user.role     = 'ROLE_USER';
		user.image    = 'null';

		if (params.password){
			console.log('Estoy dentro')
			console.log(user)
			bcrypt.hash(params.password, null, null, (err, hash) => {
				user.password = hash;
				user.save( (err, userStored) => {
					if (err) {
						console.log(err);
						res.status(500).send('Fallo al guardar el usuario, no todos los campos se encuentran disponibles');
					} else {
						res.status(200).send({user: userStored})
					}
				});
			});
		}
	}//create user

	updateUser (req, res) {
		var params   = req.body;
		let userID = 'undefined'
		let update = 'undefined'
	
		MdUser.findByIdAndUpdate(userID, update, (err, userUpdate) => {
			if (err){
				res.status(500).send({message: 'Error al actualizar el usuario.'});
			} else {
				if (!userUpdate){
					res.status(400).send({message: 'No se ha podido actualizar el usuario.'});
				} else {
					res.status(200).send({user: userUpdate})
				}
			}
		});
	}

	loginUser (req, res) {
		var params   = req.body;
		var email    = params.email;
		var password = params.password;
		// Consult in Mongo
		MdUser.findOne({email: email.toLowerCase()}, (err, user) => {
			if (err) {
				res.status(500).send({message: 'Error en la peticion.'});
			} else {
				if (!user){
					res.status(404).send({message: 'El usuario no existe.'});
				}
				else{
					// Comprobamos la contraseña
					bcrypt.compare(password, user.password as string, function (err, check) {
						if(check){
							//devolver los datos del usuario logueado.
							if (params.getHash){
								// devolvemos el token jwt
								res.status(200).send({token: jwt.createToken(user)})
							} else {
								// devolvemos el usuario entero
								res.status(200).send({user})
							}
						} else {
							res.status(404).send({message: 'El usuario no ha podido loguearse.'})
						}
					})
				}
			}
		})
	} // loginUser

	getUser(req, res)	{
		let id = req.params.id;
		MdUser.findById(id, (err, user) => {
			if (err){
				res.status(500).send({message: 'Error obteniendo el usuario'})
			} else {
				res.status(200).send({user: user})
			}
		});
	} //getUser


}
