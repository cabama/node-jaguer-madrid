import { MdUser } from '../models/MD_Users'
import {JwtService as jwt}  from '../services/jwt'
import * as bcrypt from 'bcrypt-nodejs'
import { Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import {everyTrue} from '../config/Utils'


class Email {
	public email: string
	constructor (email: string) {
		this.email = email.toLocaleLowerCase()
	}
	toString(): string{
		return this.email
	}
}

type User = {
	username: string
	password: string
	name: string    
	surname: string 
	email: Email   
	role: 'Admin' | 'User'
	image?: any
}


export class CtrUser {

	private request;
	private response;
	private params;

	test (req, res) {
		console.log('Me encuentro en el apartado de los test.')
		res.status(200).send('Estoy en una prueba');		
	}

	async createUser (req: Request, res: Response) {

		this.firstWork(req, res)
		const paramUser = this.getUserFromParams()

		if (  paramUser == false) {
			res.status(500).send('There arent all parameters');
			return
		}
			
		let mdUser = new MdUser()
		mdUser.username = paramUser.username
		mdUser.name     = paramUser.name
		mdUser.surname  = paramUser.surname
		mdUser.email    = paramUser.email.toString()
		mdUser.role     = 'ROLE_USER';
		mdUser.password = await this.hashPassword(paramUser.password)

		this.saveUser(mdUser)
		.then( () => {
			res.status(200).send('User saved!')
		})
		.catch( reason => {
			res.status(500).send(reason)
		})

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

	private firstWork (req: Request, res: Response) {
		this.request = req
		this.response = res
		this.params = req.body
	}

	private getUserFromParams (): User | false  {
		const username =  this.params.username ? this.params.username : false;
		const name =  this.params.name ? this.params.name : false;
		const surname = this.params.surname ? this.params.surname : false;
		const email = new Email (this.params.email as string);
		const role = 'Admin';
		const password = this.params.password ? this.params.password : false;

		const  checkParams = everyTrue([username, name, surname, email, password])
		if (checkParams) {
			return {username, name, surname, email, role, password}
		} else {
			return false
		}
	}

	private hashPassword (password: string): Promise<string> {
		return new Promise ((resolve, reject) => {
			bcrypt.hash(password, null, null, (err, hash) => {
				if (hash) {
					resolve(hash)
				} else {
					reject(err)
				}
			})
		})//Promise
	}//funct

	private saveUser(mdUser): Promise<boolean> {
		return new Promise ( (resolve, reject) => {
			mdUser.save((err, userStore) => {
				if (err) {
					return reject('Error saving user.')
				} else {
					if (!userStore){
						return reject('The user is not saved')
					} else {
						resolve(true)
					}
				}
			})
		})
	}



} //class
