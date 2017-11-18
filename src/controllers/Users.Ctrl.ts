import { Request, Response } from 'express';
import {JwtService as jwt}  from '../services/jwt'
import * as bcrypt from 'bcrypt-nodejs'
import * as bodyParser from 'body-parser';
import { everyTrue, everyExist } from '../config/Utils';
import * as byps from '../services/bcrypt'
import { MdUser } from '../models/Users.Model';

type User = {
	username: string
	password: string
	name: string    
	surname: string
	email: string
	role: 'Admin' | 'User'
	image?: any
}

export class Rules {

	constructor (private res) {}
	noUserInHeader() {
		this.res.status(500).send('There arent all parameters');
		return -1
	}
}

export class CtrUser {

	private request;
	private response;
	private params;
	private errorRules: Rules

	private firstWork(req: Request, res: Response) {
		console.log('Estoy en el first work')
		this.errorRules = new Rules(res)
		this.request = req
		this.response = res
		this.params = req.body
	}


	async createUser (req: Request, res: Response) {
		this.firstWork(req, res)
		// Obtain user from header
		const paramUser = this.getUserFromParams() 
		if (!paramUser) { 
			this.errorRules.noUserInHeader
			return
		}
		// Create UserModel
		let mdUser = new MdUser()
		mdUser.username = paramUser.username
		mdUser.name     = paramUser.name
		mdUser.surname  = paramUser.surname
		mdUser.email    = paramUser.email.toLowerCase()
		mdUser.role     = 'ADMIN';
		mdUser.password = await byps.hash(paramUser.password)
		// Store user in mongodb
		this.saveUser(mdUser)
		.then( () => {
			res.status(200).send('User saved!')
		})
		.catch( reason => {
			res.status(500).send(reason)
		})
	}

	async loginUser (req, res) {
		this.firstWork(req, res)
		let checkParams = everyExist([
			this.params.password, 
			this.params.email
		])
		console.log(`Parametros tomados del loging: ${this.params.password} ${this.params.email}`)
		if (!checkParams) {this.errorRules.noUserInHeader}
		// Consult in Mongo
		let	user =  await MdUser.findOne({email: this.params.email});
		if (!user) res.status(404).send({message: 'Usuario o contraseña incorrectos.'});
		console.log(user)
		// Compare password
		let a = await byps.compare(this.params.password, user.password as string)
		if (!a) res.status(404).send({ message: 'Usuario o contraseña incorrectos.' });
		// Return token or user
		console.log(a)
		if (this.params.getHash) {
			res.status(200).send({ user, token: jwt.createToken(user) })
		} else {
			res.status(200).send({ user })
		}
	} // loginUser

	private getUserFromParams (): User | false  {		
		const username =  this.params.username
		const name =  this.params.name
		const surname = this.params.surname
		const email = this.params.email
		const role = 'Admin';
		const password = this.params.password

		const  checkParams = everyExist([username, name, surname, email, password])

		if (checkParams) {
			return {username, name, surname, email, role, password}
		} else {
			return false
		}
	}

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